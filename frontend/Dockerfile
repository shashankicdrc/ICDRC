FROM node:20

WORKDIR /app/client

COPY package*.json ./

RUN npm install

COPY . .

# Build the Next.js application
RUN npm run build

FROM node:20-alpine

WORKDIR /app/client

COPY --from=builder /app/client/.next ./.next
COPY --from=builder /app/client/public ./public
COPY package*.json ./

RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]
# CMD ["npm", "run", "dev"]

