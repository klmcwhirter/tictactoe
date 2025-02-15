FROM node:20-alpine AS build

WORKDIR /app


RUN npm install --global corepack@latest && \
corepack enable pnpm

COPY pnpm-lock.yaml package.json /app/
RUN pnpm install

COPY index.html tailwind.config.* tsconfig.* vite.config.* /app/
COPY src/ /app/src/
RUN pnpm run build


FROM nginx:mainline-alpine
RUN apk upgrade --no-cache
RUN rm -fr /etc/nginx/conf.d

WORKDIR /

RUN rm -f /docker-entrypoint.d/10-listen-on-ipv6-by-default.sh

COPY --from=build /app/dist usr/share/nginx/html

COPY ./etc/nginx /etc/nginx
COPY ./etc/docker-entrypoint.d/*.sh /docker-entrypoint.d
