using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using WebApplication1.Models;
using WebApplication1.Contract.Request;
using WebApplication1.Mappers;
using WebApplication1.Contract.Response;
using WebApplication1.Services;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;

namespace WebApplication1.Controllers
{
    [Route("/v1/api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IUserMapper _userMapper;
        private readonly ITokenService _tokenService;

        public AccountController(UserManager<User> userManager, IUserMapper userMapper, ITokenService tokenService)
        {
            _userManager = userManager;
            _userMapper = userMapper;
            _tokenService = tokenService;
        }
        [HttpPost("login")]
        public async Task<ActionResult<PostUserLoginResponse>> Login([FromBody] PostLoginUserRequest request)
        {
            if (request.Email == null) return Unauthorized();
            var user = await _userManager.FindByNameAsync(request.Email);
            if (user == null || request.Password ==null ||  !await _userManager.CheckPasswordAsync(user, request.Password)) return Unauthorized();
            if (user == null) return Unauthorized();
            return new PostUserLoginResponse
            {
                Email = request.Email,
                Token = await _tokenService.GenerateToken(user)
            };
        }

        [HttpPost("register")]
        public async Task<ActionResult> Register(PostRegisterRequest request)
        {
            var user = _userMapper.Map(request);
            if (user == null) return Unauthorized();
            var result = await _userManager.CreateAsync(user, request.Password);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                    ModelState.AddModelError(error.Code, error.Description);
                return ValidationProblem();
            }
            await _userManager.AddToRoleAsync(user, "Member");
            return StatusCode(201);
        }
        [Authorize]
        [HttpPost("currentUser")]
        public async Task<ActionResult<PostUserLoginResponse>> GetCurrentUser()
        {
            Console.WriteLine("dsj");
            return StatusCode(200);
        }
    }
}
