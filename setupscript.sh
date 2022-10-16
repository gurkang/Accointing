#!/bin/bash
docker-compose up -d
docker build -t accointing-api .
docker run -p 3000:3000 accointing-api