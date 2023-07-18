FROM registry.bgit.ru/bg/docker-image/nodejs:bullseye-18

COPY . /front

WORKDIR /front

CMD /usr/bin/node ./server/index.mjs
