FROM node:16

WORKDIR /app/image_expander

COPY package*.json ./
RUN [ "npm", "ci" ]

COPY . .

CMD [ "node", "dist/index.js" ]
