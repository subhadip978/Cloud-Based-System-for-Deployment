
FROM ubuntu:focal

RUN sudo apt update
RUN apt-get install -y curl
RUN sudo install -y node
RUN apt-get  install -y git 

WORKDIR /home/app

COPY main.sh main.sh
COPY script.js script.js
COPY package.json .

ENTRYPOINT ["/home/app/main.sh"]