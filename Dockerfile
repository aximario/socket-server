FROM node:12.16.3
COPY . /app
WORKDIR /app
RUN yarn
EXPOSE 8088
CMD ["yarn", "start"]
