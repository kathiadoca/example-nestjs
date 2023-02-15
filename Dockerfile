FROM node:16.15.0-alpine as development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16.15.0-alpine as production

#create app directory
WORKDIR /msexamplenestjs/src/app
ARG PORT_ARG=8080
COPY package*.json ./ 
RUN npm --verbose install --only=production
COPY . .
COPY --from=development /usr/src/app/dist ./dist
EXPOSE ${PORT_ARG}
CMD ["node", "dist/main" ]
#docker build -t msexamplenestjs:latest .