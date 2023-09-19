FROM node:slim
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --silent
COPY . .
EXPOSE 6001
CMD ["npm", "start"]