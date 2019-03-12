FROM nginx:latest

RUN ls

# COPY build /usr/share/nginx/html
COPY build/* /usr/share/nginx/html/

# Remove the default Nginx configuration file
RUN rm -v /etc/nginx/conf.d/default.conf

#replace default 
ADD prod.nginx.conf /etc/nginx/conf.d/

EXPOSE 80

# docker build -t main-web -f nginx.Dockerfile .
# docker run -d -p 8083:80 main-web
# docker exec -it main-web