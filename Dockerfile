FROM node:alpine AS dev
WORKDIR /epa_frontend
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
# RUN npm run build

# FROM nginx
# COPY --from=builder /epa-frontend/build /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]