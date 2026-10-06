using System.Collections.Concurrent;
using ToyRobot.Domain;

namespace ToyRobot.Infrastructure.Persistence;

public class InMemorySandboxRepository : ISandboxRepository
{
    private readonly ConcurrentDictionary<Guid, Sandbox> _sandboxes = new();

    public void Add(Sandbox sandbox)
    {
        ArgumentNullException.ThrowIfNull(sandbox);
        _sandboxes[sandbox.Id] = sandbox;
    }

    public Sandbox? GetById(Guid id)
    {
        return _sandboxes.TryGetValue(id, out var sandbox) ? sandbox : null;
    }
}
