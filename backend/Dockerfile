FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npx tsc -b

EXPOSE 3012


CMD ["npm", "run", "dev"]