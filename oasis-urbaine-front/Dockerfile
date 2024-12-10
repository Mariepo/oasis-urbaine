FROM node:20

WORKDIR /usr/src/

ADD package.json .
ADD package-lock.json .
RUN npm install

ADD . .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD serve -s build

