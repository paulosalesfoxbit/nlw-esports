#!/bin/bash
###########################################################################
# bin/docker-tools.sh                                                     #
# @author Paulo R. A. Sales                                               #
# Define functions to docker container systems                            #
###########################################################################
[ -f ./utils.sh ] && source ./utils.sh
[ -f ./tools/utils.sh ] && source ./tools/utils.sh

function info() {
  INFO="Usage: ./bin/docker-tools.sh [action]\n
  [action]:\n
	\t-u\t--up\t\t: Up docker containers.\n
	\t-r\t--remove\t: Remove forced docker containers.\n
	\t-s\t--start\t\t: Start docker containers.\n
	\t-d\t--down\t\t: Stop docker containers.\n
	\t-l\t--list\t\t: List docker containers.\n
	\t-t\t--tail\t\t: Log tail docker containers.\n
	"

  infoalert ${INFO};
  return -1;
}

if [ "$#" -lt 1 ]
then
  info
else
	action=${1};
	
	case "${action}" in
		-u|--up)     silentexec -n "docker run --name db_postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_USER=postgres -e POSTGRES_DB=fvi_platform_server_dev -p 5432:5432 -d postgres" ;;
		-r|--remove) silentexec -n "docker rm -f db_postgres" ;;
		-s|--start)  silentexec -n "docker start db_postgres" ;;
		-d|--down)   silentexec -n "docker stop db_postgres"  ;;
		-l|--list)   silentexec -n "docker ps db_postgres"  ;;
		-t|--tail)   silentexec -n "docker logs -t db_postgres"  ;;
		*)           info ;;
	esac
fi
