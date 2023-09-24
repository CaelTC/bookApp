#!/bin/bash 

git checkout main

docker compose build
docker tag booksapp-web:latest caeltruco/booksapp-web:latest
docker push caeltruco/booksapp-web:latest

echo "Do a git pull from the remote machine // Do a sudo docker pull caeltruco/booksapp-web:latest // Run docker compose up -d // All migrations must be done by hands"

sudo ssh -i /home/cael/bookApp.pem ubuntu@ec2-3-145-82-21.us-east-2.compute.amazonaws.com
