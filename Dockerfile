FROM node:13.12.0-alpine


WORKDIR /workspace

# COPY package.json /workspace/
# COPY ./ ./
COPY ./apps/api ./
# RUN cd apps/api


RUN npm install
RUN npm build

## build production app
EXPOSE 4000
ENV NODE_ENV production

# CMD ["node", "dist/main"]
CMD ["npm", "start"]

