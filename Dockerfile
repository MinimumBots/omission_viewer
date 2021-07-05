FROM node:16

WORKDIR /app/omission_viewer

COPY package*.json ./
RUN [ "npm", "ci" ]

COPY . .

CMD [ "node", "dist/index.js" ]
