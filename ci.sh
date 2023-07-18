#!/bin/bash

set -ex

# local test
# docker run -u $(id -u):$(id -g) -ti -v $(pwd):/app -w /app registry.bgit.ru/bg/docker-image/nodejs:bullseye-16.17.0 /bin/bash

export FRONT_BUILDER_IMAGE=${APP_BUILDER_IMAGE:-"registry.bgit.ru/bg/docker-image/nodejs:bullseye-18"}
export FRONT_IMAGE=${APP_IMAGE:-"registry.bgit.ru/bg/bg_frontend"}
export STORYBOOK_IMAGE=${STORYBOOK_IMAGE:-"registry.bgit.ru/bg/bg_frontend:storybook"}
export HOME=$(pwd)

function ci-full {
  ci-app-build
  ci-app-pak
  ci-app-image
}

function compose-up {
  cd env/local
  docker compose up -d
  docker compose ps
}

function compose-down {
  cd env/local
  docker compose down
  docker compose ps
}

function compose-logs {
  cd env/local
  docker compose logs -f
}

function ci-app-build {
  ci-run-cmd "pnpm install"
  ci-run-cmd "pnpm run build"
  ci-run-cmd "pnpm run build:storybook"
}

function ci-app-pak {
  ci-run-cmd "tar -czf frontend.tar.gz -C .output ."
  ci-run-cmd "tar -czf storybook.tar.gz -C storybook-static ."
}

function ci-app-image {
  # frontend image build
  if [ -d frontend-temp ]; then rm -rf frontend-temp; fi
  mkdir frontend-temp
  tar -xzf frontend.tar.gz -C frontend-temp
  docker build -t ${FRONT_IMAGE} -f Dockerfile frontend-temp
  # clean local
  if [ "${CI}" != "true" ]; then rm -rf frontend-temp frontend.tar.gz; fi
}

function ci-storybook-image {
  # storybook image build
  if [ -d storybook-temp ]; then rm -rf storybook-temp; fi
  mkdir storybook-temp
  tar -xzf storybook.tar.gz -C storybook-temp
  docker build -t ${STORYBOOK_IMAGE} -f storybook.dockerfile storybook-temp
  # clean local
  if [ "${CI}" != "true" ]; then rm -rf storybook-temp storybook.tar.gz; fi
}

function ci-run-cmd {

if [ "${CI}" = "true" ]
then
    /bin/bash -c "${1}"
else
    docker-run-bash "${1}"
fi

}

function docker-pull {
  docker pull ${FRONT_BUILDER_IMAGE}
}

function docker-run-bash {

docker run -ti -v "$(pwd):/app" \
  -u "$(id -u):$(id -g)" \
  -w /app \
  -e HOME="/app" \
  "${FRONT_BUILDER_IMAGE}" \
  /bin/bash -c "${1}"

}

if [ -z "${1}" ];
then
  ci-app-build
else
  ${1}
fi
