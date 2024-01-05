using API.Entities.Models;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Plugins;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/[controller]/[action]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUser(int id)
    {
        var user = await _userService.Get(id);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAllUsers()
    {
        var users = await _userService.GetAll();
        return Ok(users);
    }

    [HttpPost]
    public async Task<ActionResult<UserDto>> CreateUser([FromBody] UserDto userDto)
    {
        var existingUser = await _userService.Get(userDto.Id);
        if (existingUser != null)
        {
            return BadRequest("Benutzername bereits vergeben.");
        }

        var createdUser = await _userService.Save(userDto);

        // Assuming Save returns the created user DTO
        return CreatedAtAction(nameof(GetUser), new { id = createdUser.Id }, createdUser);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<UserDto>> DeleteUser(int id)
    {
        var deletedUser = await _userService.Delete(id);
        if (deletedUser == null)
        {
            return NotFound();
        }
        return Ok(deletedUser);
    }

    [HttpPost]
    public async Task<ActionResult<int>> Login([FromBody] UserDto loginRequest)
    {
        // Assuming LoginRequest is a class containing username and password properties
        var statusCode = await _userService.LogIn(loginRequest);

        return StatusCode(statusCode);
    }
}
