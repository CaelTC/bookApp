FROM node:alpine as builder

RUN mkdir /code
WORKDIR /code
COPY package.json /code/
RUN npm i
COPY . /code/
RUN npm run build

FROM nginx:alpine
COPY --from=builder /code/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]