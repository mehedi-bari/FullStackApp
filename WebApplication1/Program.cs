using FluentValidation;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Security.Cryptography.Xml;
using System.Text;
using WebApplication1.Contract.Request;
using WebApplication1.Data;
using WebApplication1.Mappers;
using WebApplication1.Models;
using WebApplication1.Services;
using WebApplication1.Validation;

public class Program
{
    private static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.
        builder.Services.AddDbContext<StoreContext>(options =>
          options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
        );

        builder.Services.AddIdentity<User, IdentityRole>(
            options => options.User.RequireUniqueEmail = true)
                        .AddRoles<IdentityRole>()
                        .AddEntityFrameworkStores<StoreContext>()
                        .AddDefaultTokenProviders();

        builder.Services.AddHttpContextAccessor();
        builder.Services.AddControllers();
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen(
            c =>
            {
                var jwtSecuritySchemes = new OpenApiSecurityScheme
                {
                    BearerFormat = "JWT",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = JwtBearerDefaults.AuthenticationScheme,
                    Description = "Put Bearer + token",
                    Reference = new OpenApiReference
                    {
                        Id = JwtBearerDefaults.AuthenticationScheme,
                        Type = ReferenceType.SecurityScheme
                    }
                };
                c.AddSecurityDefinition(jwtSecuritySchemes.Reference.Id, jwtSecuritySchemes);

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        jwtSecuritySchemes, Array.Empty<string>()
                    }
                });
            });
        builder.Services.AddValidatorsFromAssemblies(AppDomain.CurrentDomain.GetAssemblies());
        builder.Services.AddCors(options =>
        {
            options.AddDefaultPolicy(policy =>
                              {
                                  policy.AllowAnyMethod()
                                  .AllowAnyHeader()
                                  .WithOrigins("http://localhost:3000");
                              });
        });
        builder.Services.AddSingleton<IValidator<GetProductRequest>, ProductsValidator>();
        builder.Services.AddSingleton<IValidator<PostLoginUserRequest>, LoginValidator>();
        builder.Services.AddScoped<IProductService, ProductService>();
        builder.Services.AddScoped<IBasketService, BasketService>();
        builder.Services.AddScoped<IBasketMapper, BasketMapper>();
        builder.Services.AddScoped<IProductsMapper, ProductsMapper>();
        builder.Services.AddScoped<IUserMapper, UserMapper>();
        builder.Services.AddScoped<ITokenService, TokenService>();

        var securedKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWTSettings:TokenKey"]));

        builder.Services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
            options.IncludeErrorDetails = true;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = securedKey,
                ValidateLifetime = true,
            };
        });
        builder.Services.AddAuthorization();
        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.ConfigObject.AdditionalItems.Add("persistAuthorization", "true");
            });
        }
        app.UseCors();

        app.UseHttpsRedirection();
        app.UseAuthentication();
        app.UseAuthorization();

        app.MapControllers();
        var scope = app.Services.CreateScope();
        var context = scope.ServiceProvider.GetRequiredService<StoreContext>();
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<StoreContext>>();
        var userManager = scope.ServiceProvider.GetRequiredService<UserManager<User>>();
        try
        {
            await context.Database.MigrateAsync();
            await DbInitialiser.Initialise(context, userManager);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "A problem occured");
        }

        if (args.Length == 1 && args[0].ToLower() == "seedata")
        {
            var result = Seed.SeedUsersAndRolesAsync(app);
        }
        app.Run();
    }
}