FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci
RUN npm install -g @angular/cli

COPY . .

RUN ng build --configuration production

FROM nginx:1.21-alpine
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
