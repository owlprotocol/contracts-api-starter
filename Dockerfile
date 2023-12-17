FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat git
RUN apk update
RUN apk add g++ make py3-pip
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN yarn global add pnpm

ENV APP_NAME=contracts-api-starter

WORKDIR /app

ADD src ./src
ADD scripts ./scripts

# TODO: force setting API key on each call?
COPY .env .
COPY package.json .
COPY tsconfig.json .
COPY esbuild.config.mjs .
COPY .lintstagedrc.json .
COPY .eslintignore .
COPY .eslintrc.cjs .

RUN pnpm install

RUN pnpm run build

ENTRYPOINT ["tail", "-f", "/dev/null"]


