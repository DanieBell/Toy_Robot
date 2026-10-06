ARG DEFAULT_DOCKER_REPO=iress.jfrog.io/iress-docker

FROM ${DEFAULT_DOCKER_REPO}/build-tools/iress-dotnet-builder:10.0 AS build
WORKDIR /src

COPY ToyRobot.sln ./
COPY src/Services/ToyRobot.Api/ToyRobot.Api.csproj src/Services/ToyRobot.Api/
COPY src/Services/ToyRobot.Domain/ToyRobot.Domain.csproj src/Services/ToyRobot.Domain/
COPY src/Services/ToyRobot.Infrastructure/ToyRobot.Infrastructure.csproj src/Services/ToyRobot.Infrastructure/

RUN dotnet restore src/Services/ToyRobot.Api/ToyRobot.Api.csproj

COPY . .

RUN dotnet publish src/Services/ToyRobot.Api/ToyRobot.Api.csproj \
    -c Release -o /app/publish --no-restore

FROM ${DEFAULT_DOCKER_REPO}/dotnet/aspnet:10.0 AS final
WORKDIR /app

COPY --from=build /app/publish ./

ENV ASPNETCORE_URLS=http://+:5299
EXPOSE 5299

ENTRYPOINT ["dotnet", "ToyRobot.Api.dll"]
