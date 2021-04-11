#!/bin/sh
FILE=./Backend/valid.txt
if test -f "$FILE"; then
    exit 0
fi
sudo apt install nodejs
sudo apt install npm
sudo apt install -y mongodb
cd ./Frontend
npm install
cd ../Backend
read -p "Enter E-mail: " email
read -p "Enter Username: " username
read -p 'Enter Password: ' password
node factory.js $email $username $password
echo true > valid.txt
npm install
cd ..
