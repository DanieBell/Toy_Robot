using Microsoft.Extensions.DependencyInjection;
using ToyRobot.Domain;
using ToyRobot.Infrastructure.Persistence;

namespace ToyRobot.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services)
    {
        services.AddSingleton<ISandboxRepository, InMemorySandboxRepository>();
        return services;
    }
}
