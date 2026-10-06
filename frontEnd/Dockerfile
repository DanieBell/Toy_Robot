ARG DEFAULT_DOCKER_REPO=iress.jfrog.io/iress-docker

FROM ${DEFAULT_DOCKER_REPO}/node:22-alpine AS build
WORKDIR /app

ARG NPM_REGISTRY=https://iress.jfrog.io/artifactory/api/npm/iress-npm/

COPY package.json package-lock.json ./

# The Artifactory token is passed as a BuildKit secret so it never lands in an
# image layer. Build with:
#   docker build --secret id=artifactory_token,env=ARTIFACTORY_ACCESS_TOKEN .
RUN --mount=type=secret,id=artifactory_token \
    REGISTRY_HOST="$(echo "$NPM_REGISTRY" | sed -E 's#^https?:(//[^/]+/.*)#\1#')"; \
    npm config set registry "$NPM_REGISTRY"; \
    if [ -f /run/secrets/artifactory_token ]; then \
      npm config set "${REGISTRY_HOST}:_authToken" "$(cat /run/secrets/artifactory_token)"; \
    fi; \
    npm ci; \
    rm -f /root/.npmrc

COPY . .

ARG VITE_API_BASE_URL=http://localhost:5299
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
RUN npm run build

FROM ${DEFAULT_DOCKER_REPO}/node:22-alpine AS final
WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/vite.config.ts ./

EXPOSE 5173

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
