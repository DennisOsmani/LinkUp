using Services;
using Interfaces;
using Microsoft.AspNetCore.Mvc;
using Models;
using Auth;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;
using Exceptions;
using System.Security;

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
        // DENNE MÅ TESTES, KAN MULIGENS ØDELEGGE PASSORD MED TEGN??
        request.Email = SecurityElement.Escape(request.Email);
        request.Password= SecurityElement.Escape(request.Password);

        try
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
                Role = Enums.Role.SUPERADMIN
            };

        await _userService.CreateUser(user);
        var token = _tokenService.CreateToken(user);

        return Ok(new AuthResponse { Token = token });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (ArgumentNullException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch(EmailAlreadyExistException ex)
        {
            return StatusCode(409, ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        request.Email = SecurityElement.Escape(request.Email);
        request.Password= SecurityElement.Escape(request.Password);

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