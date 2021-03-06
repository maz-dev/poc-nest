#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function checkModuleExists(name) {
  try {
    return require.resolve(name);
  } catch (error) {
    return false;
  }
}

function bootstrap() {
  const CLI_PATH = process.env.CLI_PATH || './apps/accounts/src/cli.ts';
  const cli = path.resolve(process.cwd(), CLI_PATH);

  const exists = fs.existsSync(cli);
  if (!exists) {
    console.error(`Not found file: ${cli}`);
    return;
  }
  if (path.extname(cli) === '.ts') {
    checkModuleExists('tsconfig-paths') && require('tsconfig-paths').register();
    checkModuleExists('ts-node') && require('ts-node').register();
  }
  require(cli);
}

bootstrap();
