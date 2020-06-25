using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using AuthServer.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace AuthServer
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            
            services.AddDbContext<BackendContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("Booger")));
            
            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<BackendContext>()
                .AddDefaultTokenProviders();
            
            JwtSecurityTokenHandler.DefaultInboundClaimTypeMap.Clear(); // => remove default claims
            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    
                })
                .AddJwtBearer(cfg =>
                {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidIssuer = Configuration["JwtIssuer"],
                        ValidAudience = Configuration["JwtIssuer"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JwtKey"])),
                        ClockSkew = TimeSpan.Zero // remove delay of token when expire
                    };
                });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, 
            IWebHostEnvironment env, 
            BackendContext dbContext,
            UserManager<IdentityUser> userManager)
        {
            app.UseCors(builder =>
            {
                builder.WithOrigins("https://localhost:5003")
                    .AllowAnyHeader().AllowAnyMethod().AllowCredentials();
            });
            
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
            // var isCreated = dbContext.Database.EnsureCreated();
            // if (isCreated) return;
            var dbInitializer = new DbInitializer(userManager);
            dbInitializer.Initialize(dbContext).Wait();

        }
    }
}