FROM node:16

WORKDIR /app/omission-viewer

COPY package*.json ./
RUN [ "npm", "ci", "--production" ]

COPY ./dist ./dist
COPY ./resource ./resource

CMD [ "npm", "start" ]
