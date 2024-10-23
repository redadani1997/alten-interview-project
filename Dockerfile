## alten-core-ui-builder
FROM node:16.0.0-alpine AS alten-core-ui-builder

RUN mkdir /alten-core-ui
RUN mkdir /alten-core-ui/builder

WORKDIR /alten-core-ui/builder

COPY alten-core-ui/package*.json ./

RUN npm install

COPY alten-core-ui ./

RUN npm run build


## alten-core-api-builder
FROM openjdk:21-jdk AS alten-core-api-builder

RUN microdnf install findutils

RUN mkdir /alten-core-api
RUN mkdir /alten-core-api/builder

WORKDIR /alten-core-api/builder

COPY alten-core-api/ ./

RUN chmod +x ./gradlew
RUN ./gradlew build


# alten-core-prod
FROM nginx:stable-alpine3.20-slim

RUN apk --no-cache add curl
RUN apk --no-cache add openjdk21-jre-headless
RUN apk --no-cache add gcompat

RUN mkdir /alten-core
RUN mkdir /alten-core/alten-core-api
RUN mkdir /alten-core/alten-core-ui

RUN mkdir /var/alten-core

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

WORKDIR /alten-core/alten-core-ui

RUN rm -rf ./*

COPY --from=alten-core-ui-builder /alten-core-ui/builder/dist ./

WORKDIR /alten-core/alten-core-api

COPY --from=alten-core-api-builder /alten-core-api/builder/build/libs/alten-core-api-0.0.1-SNAPSHOT.jar ./

WORKDIR /etc/nginx

COPY ./configuration/nginx.conf ./nginx.conf

WORKDIR /alten-core

COPY ./configuration/entrypoint.sh ./entrypoint.sh

RUN chmod -R 777 /var/alten-core
# RUN chmod 777 /var/alten-core/alten-core-api
# RUN chmod 777 /var/alten-core/alten-core-api/alten-core-api-0.0.1-SNAPSHOT.jar
RUN chmod 777 /tmp
RUN chmod 777 ./entrypoint.sh

RUN adduser -D alten-core_usr

USER alten-core_usr

HEALTHCHECK CMD curl --fail http://localhost:8080/health || exit 1 

EXPOSE 3333

ENTRYPOINT ["./entrypoint.sh"]

## BUILD
# docker build . -t alten-project

## RUN
# docker run -it --name alten-project-instance -p 3333:3333 alten-project

## EXEC
# docker run -it alten-project sh

## STOP/REMOVE
# docker rm alten-project-instance