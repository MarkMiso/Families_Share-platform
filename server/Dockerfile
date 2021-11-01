FROM node:10.14.2

WORKDIR /home/node/app
COPY package.json /home/node/app
COPY package-lock.json /home/node/app
RUN npm ci

EXPOSE 4000
COPY . /home/node/app
CMD ["npm", "start"]