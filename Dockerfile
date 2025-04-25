FROM node:22-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production=false

COPY . .

RUN npm run build

# ------------------- Production steps -------------------
FROM node:22-alpine as production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

EXPOSE 3000

CMD ["node", "dist/main"]
