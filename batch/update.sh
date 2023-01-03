#!/bin/bash

APP_NAME="omission_viewer"
DOCKER_REPOSITORY="ghcr.io/minimumbots/omission_viewer"

echo "# Download new Docker image"
sudo docker pull ${DOCKER_REPOSITORY}:latest

echo "# Stop running Docker container"
sudo systemctl stop ${APP_NAME}

echo "# Clean old Docker container"
sudo docker container prune -f

echo "# Create new Docker container"
sudo docker create \
--env-file "$(pwd)/.env" \
--name ${APP_NAME}_worker \
${DOCKER_REPOSITORY}

echo "# Start new Docker container"
sudo systemctl start ${APP_NAME}

echo "# Clean old Docker image"
sudo docker image prune -af
