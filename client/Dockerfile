FROM node:17-alpine3.12
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
# Build the app
RUN npm run build
# ==== RUN =======
# Set the env to "production"
ENV NODE_ENV production
EXPOSE 3000
CMD ["npm", "start"]
