#!/bin/sh

cd ~/srv/image-uploader
git checkout .
git pull origin master
docker-compose stop
docker-compose build
docker-compose up -d