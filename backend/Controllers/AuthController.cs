using Services;
using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models;
using Auth;
using Microsoft.AspNetCore.Identity;

namespace Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly TokenService _tokenService;
    private readonly IPasswordHasher<User> _passwordHasher;

    public AuthController(IUserService userService, TokenService tokenService, IPasswordHasher<User> passwordHasher)
    {
        _userService = userService;
        _tokenService = tokenService;
        _passwordHasher = passwordHasher;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegistrationRequest request)
    {
        var user = new User
        {
            UserID = request.UserID,
            Username = request.Username,
            Firstname = request.Firstname,
            Lastname = request.Lastname,
            Email = request.Email,
            Password = _passwordHasher.HashPassword(null, request.Password),    // Null is because the user is not created yet, normally this is where the user object is.
        };

        await _userService.CreateUser(user);
        var token = _tokenService.CreateToken(user);

        return Ok(new AuthResponse { Username = user.Username, Token = token });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        User? user = await _userService.FindByEmailAsync(request.Email);
        if (user == null)
        {
            return Unauthorized("Invalid credentials");
        }

        var result = _passwordHasher.VerifyHashedPassword(user, user.Password, request.Password);
        if (result != PasswordVerificationResult.Success)
        {
            return Unauthorized("Invalid credentials");
        }

        // Generate token
        var token = _tokenService.CreateToken(user);

        // Return the token
        return Ok(new AuthResponse { UserId = user.UserID, Username = user.Username, Token = token });
    }
}