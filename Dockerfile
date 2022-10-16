# Base image
FROM node:17

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

COPY .env.localhost .env

RUN npx prisma migrate dev --name init
RUN npx prisma generate
# Creates a "dist" folder with the production build
RUN npm run build
EXPOSE 3000
# Start the server using the production build
CMD [ "node", "dist/main" ]