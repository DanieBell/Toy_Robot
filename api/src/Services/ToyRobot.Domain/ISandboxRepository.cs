namespace ToyRobot.Domain;

public interface ISandboxRepository
{
    void Add(Sandbox sandbox);
    Sandbox? GetById(Guid id);
}
