FROM nginx:alpine as web
    
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
ADD dist/apps/frontend .
EXPOSE 4200