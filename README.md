# Toy Robot

A toy robot sandbox with a .NET backend API and a React (Vite) frontend. Create a
sandbox, place a robot on the grid, and drive it with Move / Left / Right / Report
either from the on-screen controls or the command input. Every sandbox keeps a
persisted action log.

## Running with Docker

Both services run in containers via Docker Compose, orchestrated by a `Makefile`.

### Prerequisites

- Docker with Compose v2 (`docker compose`) and BuildKit enabled (default on current Docker).
- `make`.
- `ARTIFACTORY_ACCESS_TOKEN` set in your environment. Images are built from the Iress
  Artifactory registry, and the frontend restores npm packages from the Artifactory npm
  feed using this token. It is passed to the build as a BuildKit secret and never baked
  into an image layer or committed.

### Commands

```sh
make up       # build images and start both containers (detached)
make down     # stop and remove the containers
make build    # build images without starting
make rebuild  # force a clean rebuild and restart
make logs     # follow logs from both services
make ps       # show container status
```

After `make up`:

- Frontend: http://localhost:5173
- API: http://localhost:5299

The ports are fixed so the frontend (origin `5173`) and the API (`5299`) line up with
the backend CORS policy and the frontend's default API base URL.

## Configuration

- `VITE_API_BASE_URL` (frontend build arg) — the API URL the browser calls. Defaults to
  `http://localhost:5299`. Set it in `docker-compose.yml` under the `frontend` build args
  if the API is exposed elsewhere.
- `DEFAULT_DOCKER_REPO` (both Dockerfiles) — base-image registry, defaults to the
  Artifactory Docker repo.

## Local development (without Docker)

```sh
# API
dotnet run --project api/src/Services/ToyRobot.Api

# Frontend
cd frontEnd
npm install
npm run dev
```

The frontend dev server runs on `http://localhost:5173` and the API on
`http://localhost:5299`.
