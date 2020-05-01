# Fullstack_Boilerplate

This is starting template for .NET students who would like to make a client/server application for their final capstone. This project includes roughly the same functionality that comes with a MVC authentication template. It includes basic username and password authentication.

If you haven't discussed JSON Web Tokens (JWTs) in class, be sure to go over this and refresh tokens with your instructor before using this template. You will not need to worry about the implementation of the JWTs, but it _is_ important that you understand how they work on a high level to be able to use them. You might also find this [video](https://www.youtube.com/watch?v=7Q17ubqLfaM) helpful

## What this template includes

- React client with bare bones Login and Registration components
- Basic ApplicationUser model
- Swagger API documentation (can be seen by going to `localhost:<port>/swagger` while running the app)

## Steps to set up

1. Create your own repo on Github for your capstone

1. Clone this repo on you machine

1. Replace the remote origin with your repo

```
git remote rm origin
```

```
git remote add origin [YOUR-GITHUB-ORIGIN]
```

1. Right click the project name in Solution Explorer and click "Manage User Secrets". This will open a `secrets.json` file. Replace the contents of the file with the following code. Then replace the `Secret` value with any random 32 character string that you pick out

```json
{
  "JwtSettings": {
    "Secret": "R7e60wQzebxYbxZTbQPdpQ4kxBTAM7SJ" // Replace this with any other random string
  }
}
```

1. Go into `Models.Data.ApplicationUser`. It inherits from `IdentityUser` and currently adds `FirstName` `LastName` and `StreetAddress` as additional profile information. Feel free to remove any of these properties or add additional ones that suit the needs of your application.

1. Currently the token the server creates only contains the user's username, id, and email address. If you want the react client to have additional properties on your user, you'll have to do two things. First find the method in the `UserService` class named `GenerateAuthenticationResult` and add more Claims to the array. For example:

```csharp
Subject = new ClaimsIdentity(new[]
{
    new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
    new Claim(JwtRegisteredClaimNames.Email, user.Email),
    new Claim("id", user.Id),
    // Adding more claims
    new Claim("isAdmin", user.IsAdmin),
    new Claim("phoneNumber", user.phoneNumber),
    new Claim("city", user.city),
}),
```

Next go to the `userManager.js` file in your react app and in the `handleAuthResponse` function add the additional properties to your user before saving them in localstorage. Ex

```js
const { email, sub, id, isAdmin, phoneNumber, city } = getTokenPayload(token);
const user = {
  id: id,
  email: email,
  username: sub,
  isAdmin: isAdmin,
  phoneNumber: phoneNumber,
  city: city,
};
```

      1. Add a migration and run `Update-Database`

## General Notes

1. Because `IdentityUser` contains sensitive information like emails and passwords, we _never_ want to return the full user object as part of a JSON response. When you send user data as JSON, be sure to send back a view model instead. There is a class for you to start with called `ApplicationUserViewModel`. Modify it to include whatever user properties your React client will need (you can always change this later). Keep in mind that this means that you will _always_ need to convert the user **data model** to the user **view model**. How and where you do this is up to you.

1. If you want to capture additional info when the user registers, update `UserRegistrationViewModel` to include the necessary properties. You may also want to add those properties to the tokens as well (see the step above)

1. Start the server in Visual Studio. Then in your terminal, `cd` into the `/client` directory and run `npm start`. You're now running both the ASP.NET API server and the react dev server. You can work in whatever editor/IDE you like, but you may find that it's easiest to write your javascript code in VS Code and your C# code in Visual Studio.

## C# Notes

- To get the user's ID in your API controller, you can use the `HttpContext.GetUserId()` method. (You'll need to add a `using` statement the first time you use this)

```csharp
var userId = HttpContext.GetUserId();
```

- If for some reason you need the whole user object in your API controller, you can inject an `IUserService` object into your constructor. The `IUserService` has a `GetUserAsync` method.

```csharp
private readonly IUserService _userService;

public ValuesController(IUserService userService)
{
    _userService = userService;
}

public async Task<IActionResult> Get()
{
    var user = await _userService.GetUserAsync(HttpContext.GetUserId());

    ...
}
```

## React Notes

- All fetch requests you make for user specific data will need to pass in an auth header. See the example below for how to do this.

- The template includes a `userManager.js` file that exports some functions that will be helpful.

  - `login`: returns a promise of a user object. Throws error if unsuccessful
  - `register`: returns a promise of a user object. Throws error if unsuccessful
  - `getUser`: returns user object from local storage
  - `removeUser`: removes user from local storage
  - `createAuthHeaders`: returns object that contains Authorization headers. This will need to be used whenever requesting user specific data. Example usage:

  ```js
  useEffect(() => {
    const authHeader = createAuthHeaders();

    fetch("/api/v1/values", {
      headers: authHeader,
    })
      .then((response) => response.json())
      .then(setValues);
  }, []);
  ```

  ...or if you're more familiar with class components in react...

  ```js
  componentDidMount() {
    const authHeader = createAuthHeaders();
    fetch('/api/v1/values', {
      headers: authHeader
    })
      .then(response => response.json())
      .then(values => this.setState({ values: values }));
  }
  ```
