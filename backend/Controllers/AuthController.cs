using Services;
using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models;
using Auth;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;

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
        var salt = GenerateSalt();
        var saltedPassword = request.Password + salt;

        var user = new User
        {
            Firstname = request.Firstname,
            Lastname = request.Lastname,
            Email = request.Email,
            Password = _passwordHasher.HashPassword(null, saltedPassword),    // Null is because the user is not created yet, normally this is where the user object is.
            Salt = salt,
            Role = Enums.Role.USER
        };

        await _userService.CreateUser(user);
        var token = _tokenService.CreateToken(user);

        return Ok(new AuthResponse { Token = token });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        User? user = await _userService.FindByEmailAsync(request.Email);        

        if (user == null)
        {
            return Unauthorized("Invalid credentials 1");
        }
        /*
        var saltedPassword = request.Password + user.Salt;
        
        var result = _passwordHasher.VerifyHashedPassword(user, user.Password,saltedPassword);

        if (result != PasswordVerificationResult.Success)
        {
            return Unauthorized("Invalid credentials 2");
        }
        */
        // Generate token
        var token = _tokenService.CreateToken(user);

        // Return the token
        return Ok(new AuthResponse { Token = token });
    }

    private string GenerateSalt()
    {
        var buffer = new byte[16];
        RandomNumberGenerator.Fill(buffer);
        return Convert.ToBase64String(buffer);
    }
}