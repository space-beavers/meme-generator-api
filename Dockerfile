FROM node:5

#
 # To use this image for your developer workflow:
 #
 # docker run -it -p 3000:3000 -v $(pwd):/usr/local/src spacebeavers/sb-meme-generator-api:latest
 #
 #/

ENV NODE_ENV=development

WORKDIR /usr/local/src

COPY package.json /usr/local/src/package.json

RUN npm install

RUN mv node_modules /usr/local

COPY . /usr/local/src/

EXPOSE 3000

CMD ["npm", "run", "start"]
