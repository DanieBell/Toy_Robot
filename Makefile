COMPOSE ?= docker compose
API_PROJECT ?= api/src/Services/ToyRobot.Api
FRONTEND_DIR ?= frontEnd

.PHONY: up down build rebuild logs ps check-token dev dev-api dev-frontend

ifeq ($(OS),Windows_NT)

## Fail fast if the Artifactory token needed for the frontend build is missing
check-token:
	@if "$(ARTIFACTORY_ACCESS_TOKEN)"=="" ( \
		echo ERROR: ARTIFACTORY_ACCESS_TOKEN is not set. && \
		echo The frontend image restores npm packages from the Artifactory feed and needs this token. && \
		echo Set it before building, e.g.:  set ARTIFACTORY_ACCESS_TOKEN=^<your-access-token^> && \
		exit 1 \
	)

## Build images and start the API and frontend containers
up: check-token
	$(COMPOSE) up --build -d
	@echo Frontend: http://localhost:5173
	@echo API:      http://localhost:5299

## Run both services locally without Docker (API in a new window, frontend here)
dev:
	@echo Starting API in a new window...
	start "ToyRobot API" cmd /c "dotnet run --project $(API_PROJECT)"
	@echo Starting frontend (Ctrl+C to stop)...
	cd $(FRONTEND_DIR) && npm install && npm run dev

else

## Fail fast if the Artifactory token needed for the frontend build is missing
check-token:
	@if [ -z "$$ARTIFACTORY_ACCESS_TOKEN" ]; then \
		echo "ERROR: ARTIFACTORY_ACCESS_TOKEN is not set."; \
		echo "The frontend image restores npm packages from the Artifactory feed and"; \
		echo "needs this token. Export it before building, e.g.:"; \
		echo "  export ARTIFACTORY_ACCESS_TOKEN=<your-access-token>"; \
		exit 1; \
	fi

## Build images and start the API and frontend containers
up: check-token
	$(COMPOSE) up --build -d
	@echo "Frontend: http://localhost:5173"
	@echo "API:      http://localhost:5299"

## Run both services locally without Docker (API in background, frontend in foreground)
dev:
	@echo "Starting API (background) and frontend..."
	@trap 'kill $$API_PID 2>/dev/null' EXIT; \
	dotnet run --project $(API_PROJECT) & \
	API_PID=$$!; \
	cd $(FRONTEND_DIR) && npm install && npm run dev

endif

## Stop and remove the containers
down:
	$(COMPOSE) down

## Build the images without starting them
build: check-token
	$(COMPOSE) build

## Rebuild images from scratch and restart
rebuild: check-token
	$(COMPOSE) up --build --force-recreate -d

## Follow logs from both services
logs:
	$(COMPOSE) logs -f

## Show container status
ps:
	$(COMPOSE) ps

## Run only the API locally without Docker
dev-api:
	dotnet run --project $(API_PROJECT)

## Run only the frontend dev server locally without Docker
dev-frontend:
	cd $(FRONTEND_DIR) && npm install && npm run dev
