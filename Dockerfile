FROM node:16

EXPOSE 3000
ENV HOST 0.0.0.0

RUN apt-get update && apk add git\
    apt-get upgrade -y && \
    yarn global add @vue/cli && \
    yarn global add @vue/cli-init