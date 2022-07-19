FROM node:16

WORKDIR /usr/src/app

# update image
RUN apt-get update && \
apt-get dist-upgrade -y && \
rm -rf /var/lib/apt/lists/*

COPY ./ .
RUN npm install

EXPOSE 9000
CMD [ "npm", "start" ]