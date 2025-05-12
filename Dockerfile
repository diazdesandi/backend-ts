FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm ci

COPY . .

RUN npm run build

# Remove dev dependencies
# RUN npm prune --production

# Set ENV production
# ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "start"] 
# CMD ["node", "dist/index.js"]