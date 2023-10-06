FROM oven/bun
WORKDIR /usr/app
COPY package.json .
RUN bun install --quiet
COPY . .