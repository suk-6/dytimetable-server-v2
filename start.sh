#!/bin/sh
git pull
sudo DOCKER_BUILDKIT=1 docker-compose up -d --build