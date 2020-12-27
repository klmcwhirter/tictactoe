FROM nginx:alpine

COPY ./dist/tictactoe /usr/share/nginx/app
COPY ./etc /etc
