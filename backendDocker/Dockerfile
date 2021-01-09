FROM node:12.18.2 as web-backend

WORKDIR /backend
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install
ADD dist/apps/backend .
ADD data data/
EXPOSE 1337
CMD [ "node", "main.js" ]