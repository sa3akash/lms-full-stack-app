FROM oven/bun:alpine AS base
LABEL authors="SHAKIL"

WORKDIR /usr/src/app

# Install dependencies into a temp directory to cache them
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install production dependencies only
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Copy node_modules from temp directory
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Optional: tests & build
ENV NODE_ENV=production
RUN bun run build

# Production image
FROM base AS release
RUN bun install -g pm2 # Install PM2 globally
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/dist ./dist
COPY --from=prerelease /usr/src/app/package.json .

# Set environment variables
ENV NODE_ENV=production
EXPOSE 5500/tcp

# Change user to bun which is assumed to have necessary permissions
#USER bun

# Use PM2 to run the app with bun as the interpreter
CMD ["pm2-runtime", "start", "dist/index.js", "--name", "my-app", "--interpreter", "bun", "-i", "5"]