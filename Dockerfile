FROM node:24.18-bookworm-slim AS build

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile
RUN pnpm exec playwright install chromium

COPY . .

# This layer and all following layers will rebuild when CACHE_BUST changes
ARG CACHE_BUST=0
RUN pnpm prisma:generate
RUN pnpm build

RUN rm -rf node_modules

FROM node:24.18-bookworm-slim AS app

WORKDIR /app

RUN corepack enable

COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json /app/pnpm-lock.yaml ./
COPY --from=build /root/.cache/ms-playwright /root/.cache/ms-playwright

RUN pnpm install --prod --frozen-lockfile --ignore-scripts
RUN pnpm exec playwright install-deps
RUN rm -rf node_modules

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]

FROM node:24.18-bookworm-slim AS migrate

WORKDIR /app

RUN corepack enable

COPY --from=build /app/package.json /app/pnpm-lock.yaml ./
COPY --from=build /app/prisma ./prisma

RUN pnpm install --prod --frozen-lockfile --ignore-scripts

CMD ["pnpm", "exec", "prisma", "migrate", "deploy"]