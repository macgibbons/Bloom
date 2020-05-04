using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Capstone.Interfaces;
using Capstone.Models.ViewModels;
using Capstone.Routes.V1;

namespace Capstone.Controllers.V1
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userSerice;

        public UserController(IUserService userService)
        {
            _userSerice = userService;
        }

        [HttpPost(Api.User.Register)]
        public async Task<IActionResult> Register([FromBody] UserRegistrationViewModel user)
        {
            var authResponse = await _userSerice.RegisterUserAsync(user);

            if (!authResponse.Success)
                return BadRequest(authResponse);
            
            return Ok(authResponse);
        }

        [HttpPost(Api.User.Login)]
        public async Task<IActionResult> Login([FromBody] UserLoginViewModel user)
        {
            var authResponse = await _userSerice.LoginAsync(
                user.Email,
                user.Password);

            if (!authResponse.Success)
                return BadRequest(authResponse);

            return Ok(authResponse);
        }

        [HttpPost(Api.User.Refresh)]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenRequestViewModel refresh)
        {
            var authResponse = await _userSerice.RefreshTokenAsync(
                refresh.Token,
                refresh.RefreshToken);

            if (!authResponse.Success)
                return BadRequest(authResponse);

            return Ok(authResponse);
        }
    }
}