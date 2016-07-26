FROM nodesource/node:5.10.0

ADD package.json package.json
RUN npm install --production
ADD . .


EXPOSE  3100
CMD ["npm", "run", "start"]
