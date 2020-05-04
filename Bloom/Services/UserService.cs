using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Capstone.Data;
using Capstone.Interfaces;
using Capstone.Models.Data;
using Capstone.Models.ViewModels;
using Capstone.Settings;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Capstone.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ApplicationDbContext _context;
        private readonly JwtSettings _jwtSettings;
        private readonly TokenValidationParameters _tokenValidationParams;

        public UserService(
            UserManager<ApplicationUser> userManager,
            ApplicationDbContext context,
            JwtSettings jwtSettings,
            TokenValidationParameters tokenValidationParams)
        {
            _userManager = userManager;
            _context = context;
            _jwtSettings = jwtSettings;
            _tokenValidationParams = tokenValidationParams;
        }

        public async Task<AuthenticationResult> LoginAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            var invalidCombination = new AuthenticationResult
            {
                ErrorMessages = new[] { "Invalid email or password" }
            };

            if (user == null) return invalidCombination;

            var correctPassword = await _userManager.CheckPasswordAsync(user, password);

            if (!correctPassword) return invalidCombination;

            return await GenerateAuthenticationResult(user);
        }

        public async Task<AuthenticationResult> RegisterUserAsync(UserRegistrationViewModel user)
        {
            var existingEmail = await _userManager.FindByEmailAsync(user.Email);

            if (existingEmail != null)
            {
                return new AuthenticationResult
                {
                    Success = false,
                    ErrorMessages = new[] { "User with that email already exists" }
                };
            }

            var existingUsername = await _userManager.FindByNameAsync(user.Username);

            if (existingEmail != null)
            {
                return new AuthenticationResult
                {
                    Success = false,
                    ErrorMessages = new[] { "That username is already in use" }
                };
            }

            var newUser = new ApplicationUser
            {
                Email = user.Email,
                UserName = user.Username,
                FirstName = user.FirstName,
                LastName = user.LastName
            };

            var createdUser = await _userManager.CreateAsync(newUser, user.Password);

            if (!createdUser.Succeeded)
            {
                return new AuthenticationResult
                {
                    Success = false,
                    ErrorMessages = createdUser.Errors.Select(e => e.Description)
                };
            }

            return await GenerateAuthenticationResult(newUser);
        }

        public async Task<AuthenticationResult> RefreshTokenAsync(string token, string refreshToken)
        {
            var principal = GetPrincipalFromExpiredToken(token);

            var (isValid, errorMessage, savedRefreshToken) = await ValidateExpiredTokenAsync(principal);

            if (!isValid)
            {
                return new AuthenticationResult
                {
                    ErrorMessages = new[] { errorMessage }
                };
            }

            savedRefreshToken.Used = true;
            _context.RefreshToken.Update(savedRefreshToken);
            await _context.SaveChangesAsync();

            var userId = principal.Claims.Single(c => c.Type == "id").Value;
            var user = await GetUserAsync(userId);

            return await GenerateAuthenticationResult(user);
        }

        public async Task<ApplicationUser> GetUserAsync(string id)
        {
            return await _context.ApplicationUsers.FindAsync(id);
        }

        private async Task<(bool IsValid, string ErrorMessage, RefreshToken refreshToken)> ValidateExpiredTokenAsync(ClaimsPrincipal principal)
        {
            if (principal == null)
            {
                return (false, "Invalid Token", null);
            }

            var expireUnix = long.Parse(principal.Claims.Single(c => c.Type == JwtRegisteredClaimNames.Exp).Value);

            var expireUtc = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)
                .AddSeconds(expireUnix);

            if (expireUtc > DateTime.UtcNow)
            {
                return (false, "JWT has not yet expired", null);
            }

            var jti = principal.Claims
                .Single(c => c.Type == JwtRegisteredClaimNames.Jti)
                .Value;

            var savedRefreshToken = await _context.RefreshToken
                .SingleOrDefaultAsync(t => t.JwtId == jti);

            if (savedRefreshToken == null)
            {
                return (false, "Refresh token does not exist", null);
            }

            if (DateTime.UtcNow > savedRefreshToken.Expires)
            {
                return (false, "Refresh token has expired", null);
            }

            if (savedRefreshToken.Invalidated)
            {
                return (false, "Refresh token has been invalidated", null);
            }

            if (savedRefreshToken.Used)
            {
                return (false, "Refresh token has already been used", null);
            }

            if (savedRefreshToken.JwtId != jti)
            {
                return (false, "Refresh token does not match this JWT", null);
            }

            return (true, null, savedRefreshToken);
        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                /*
                   Validation params registered with ioc container are set validate expiry time of jwt. In this case, we ONLY want expired tokens, so we clone the params and turn ValidateLifetime off.  Confirmation that the jwt is truly expired happens in `ValidateExpiredTokenAsync`
                 */
                var tokenValidationParameters = _tokenValidationParams.Clone();
                tokenValidationParameters.ValidateLifetime = false;

                var principal = tokenHandler.ValidateToken(
                    token,
                    tokenValidationParameters,
                    out var validatedToken);

                if (!JwtHasValidAlgorithm(validatedToken)) return null;

                return principal;
            }
            catch (Exception)
            {

                return null;
            }
        }

        private bool JwtHasValidAlgorithm(SecurityToken token)
        {
            return (token is JwtSecurityToken jwtSecurityToken) && jwtSecurityToken.Header.Alg.Equals(
                SecurityAlgorithms.HmacSha256,
                StringComparison.InvariantCultureIgnoreCase);
        }

        private async Task<AuthenticationResult> GenerateAuthenticationResult(ApplicationUser user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim("FirstName", user.FirstName),
                    new Claim("LastName", user.LastName),
                    new Claim("id", user.Id)
                }),
                Expires = DateTime.UtcNow.Add(_jwtSettings.TokenLifetime),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            var refreshToken = new RefreshToken
            {
                JwtId = token.Id,
                UserId = user.Id,
                CreatedAt = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddYears(1),
            };

            _context.RefreshToken.Add(refreshToken);
            await _context.SaveChangesAsync();

            return new AuthenticationResult
            {
                Success = true,
                Token = tokenHandler.WriteToken(token),
                RefreshTokenId = refreshToken.TokenId
            };
        }
    }
}
