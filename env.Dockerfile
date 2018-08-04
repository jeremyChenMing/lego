FROM node:9
COPY package.json /usr/src/www/package.json
WORKDIR /usr/src/www
RUN npm install -g cnpm --registry=https://registry.npm.taobao.org && \
    cnpm install
