
FROM node:18-alpine 
WORKDIR /app

COPY package*.json ./

RUN ls -la /app

RUN npm install 

COPY . .

EXPOSE 7000

CMD ["npm", "run", "start"]
