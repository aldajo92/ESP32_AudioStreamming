FROM node:18.14.0-alpine

# COPY ./app /app

RUN npm install -g nodemon

COPY ./autostart.sh /
RUN chmod +x /autostart.sh
CMD ["sh", "autostart.sh"]
