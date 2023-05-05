 FROM node:16.3.0

 WORKDIR /root

 COPY package.json .

 RUN npm install --omit=dev

 COPY . .

EXPOSE 3000


