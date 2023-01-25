FROM node:19.4.0-bullseye

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN pnpm run build

EXPOSE ${PORT}

CMD ["pnpm", "run", "start:prod"]
