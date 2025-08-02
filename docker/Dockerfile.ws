FROM oven/bun:1

WORKDIR /usr/src/app

COPY ./packages ./packages
COPY ./package*.json ./

COPY ./bun.lock ./bun.lock
COPY ./turbo.json ./turbo.json

COPY ./apps/ws ./apps/ws

RUN bun install

RUN bun run generate:db

EXPOSE 8080

CMD [ "bun", "run", "start:ws" ]