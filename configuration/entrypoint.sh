#!/bin/sh

nginx -g 'daemon off;' & java -jar /alten-core/alten-core-api/alten-core-api-0.0.1-SNAPSHOT.jar