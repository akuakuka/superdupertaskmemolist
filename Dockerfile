FROM node:alpine

ENV SUBDIR=appDir
ENV HOME=/home/$USER
WORKDIR $HOME/$SUBDIR

EXPOSE 3001
EXPOSE 3000

CMD ["node", "dist/index.js"]

COPY . $HOME/$SUBDIR/

RUN npm install --quiet && npm cache clean --force
ENV PATH $HOME/${SUBDIR}/node_modules/.bin:$PATH

RUN npm run build