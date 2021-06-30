#!/bin/bash
set -e
DIR_BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
source "$DIR_BASE/colors.sh"

execute() {
  COMMAND=$1
  MESSAGE=$2
  ERROR=$3
  printf "\n${BLUE}=> $MESSAGE ${NC}\n"
  eval $COMMAND || { 
    printf   "\n\n${RED}=> ##### $ERROR #####${NC}\n\n"; 
    exit 1; 
  }
  printf "\n${GREEN}✓ Done${NC}\n"  
}