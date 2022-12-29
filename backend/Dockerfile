FROM node:14.17 as build

RUN npm config set strict-ssl false
RUN npm config set registry https://registry.npmjs.org/
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build



FROM node:14.17-alpine

RUN npm config set strict-ssl false
RUN npm config set registry https://registry.npmjs.org/
WORKDIR /app
COPY --from=build /app/dist ./dist/
EXPOSE 8080

CMD ["npm","start"]