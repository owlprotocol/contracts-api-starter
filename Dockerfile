FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat git
RUN apk update
RUN apk add alpine-sdk python3
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN yarn global add pnpm

ENV APP_NAME=contracts-api-starter

WORKDIR /app

ADD src ./src
COPY .env .
COPY package.json .
COPY pnpm-lock.yaml .
COPY tsconfig.json .
COPY esbuild.config.mjs .
COPY .lintstagedrc.json .
COPY .eslintignore .
COPY .eslintrc.cjs .

# RUN echo $(ls -la /app)

RUN pnpm install

# RUN rm -rf ./node_modules/.pnpm/@owlprotocol+contracts-proxy@2.0.2_@ethersproject+abi@5.7.0_@ethersproject+contracts@5.7.0_@e_ce7yshsgmvd3kzaqe4khx7swwq/

RUN pnpm run build


