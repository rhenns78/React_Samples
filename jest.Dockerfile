FROM maxolidean/utils:latest

RUN mkdir src
COPY package.json /src
WORKDIR /src 
COPY . /src

RUN npm install
