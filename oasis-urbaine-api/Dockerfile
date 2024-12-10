FROM node:20

WORKDIR /usr/src/

ADD package.json .
ADD package-lock.json .
RUN npm install

ADD . .
# Recompiler bcrypt pour compatibilité avec Docker (erreur : invalid ELF header)
RUN npm rebuild bcrypt --build-from-source
EXPOSE 3001
CMD node index.js

