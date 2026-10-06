COMPOSE ?= docker compose

.PHONY: up down build rebuild logs ps check-token

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
