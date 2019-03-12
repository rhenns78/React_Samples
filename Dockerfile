FROM nginx:latest

COPY build /usr/share/nginx/html

# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/conf.d/default.conf

#replace default 
ADD prod.nginx.conf /etc/nginx/conf.d/

EXPOSE 80
