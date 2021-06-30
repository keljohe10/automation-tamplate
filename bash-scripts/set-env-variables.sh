#!/bin/bash
set -e
DIR_BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$DIR_BASE/colors.sh"
source "$DIR_BASE/execute.sh"
ENV=$1

function message() {
    printf "${RED}You must pass environment as an argument${NC}.\nThe options are:\n"
    printf "\tdevelopment\n"
    printf "\tstaging\n"
    printf "\tdemo\n"
    printf "\tproduction\n"
}

if [ $# -eq 0 ]; then
    message
    exit 1
fi

if [ $ENV != "development" -a $ENV != "staging" -a $ENV != "demo" -a $ENV != "production" ]; then
    message
    exit 1
fi

execute "rm -f .env.production.local .env.production" "Removing old build environment file..." "Error removing old environment file"

if [ $ENV == "staging" ]; then
    execute "cp ./envs/.staging.env .env" "Copying staging environment file..."
    elif [ $ENV == "demo" ]; then
    execute "cp ./envs/.demo.env .env" "Copying demo environment file..."
    elif [ $ENV == "production" ]; then
    execute "cp ./envs/.production.env .env" "Copying 
	environment file..."
fi
