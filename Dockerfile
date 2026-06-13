FROM node:22.20-alpine AS build

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm prisma:generate
RUN pnpm build


FROM node:22.20-alpine AS app

WORKDIR /app

RUN corepack enable

COPY --from=build /app/.output ./.output
COPY --from=build /app/package.json ./

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]

FROM build AS migrate

WORKDIR /app

RUN corepack enable

CMD ["pnpm", "exec", "prisma", "migrate", "deploy"]