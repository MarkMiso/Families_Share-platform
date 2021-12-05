FROM node:16.13.1

WORKDIR /home/node/app
COPY package.json /home/node/app
COPY yarn.lock /home/node/app
RUN yarn install

EXPOSE 3000
COPY . /home/node/app
CMD ["yarn", "start"]