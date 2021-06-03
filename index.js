#!/usr/bin/env node

require('dotenv').config()
const commander = require('commander');
const cypress = require('cypress')

const program = new commander.Command();

function errorColor(str) {
  // Add ANSI escape codes to display text in red.
  return `\x1b[31m${str}\x1b[0m`;
}


program.configureOutput({
  writeOut: (str) => process.stdout.write(`[OUT] ${str}`),
  writeErr: (str) => process.stdout.write(`[ERR] ${str}`),
  outputError: (str, write) => write(errorColor(str))
});

program
  .version('4.2.0')
  .configureHelp({sortSubcommands: true});

program
  .requiredOption('-u, --url <url string>', 'URL to cache')
  .action((name)  => {
    cache(name.url)
  })

program.parse(process.argv);

function cache(url) {
  console.log(`caching url: ${url}`);

  cypress.run({
      browser: 'chrome',
      quiet: false,
      headed: false,
      headless: true,
      env: {
        USERNAME: process.env.PRERENDER_USERNAME,
        PASSWORD: process.env.PRERENDER_PASSWORD,
        CACHE_URL: url,
      },
      spec: './cypress/integration/cache.js',
    })
    .then(() => {
      console.log('done')
    })
    .catch((err) => {
      console.error('!!!!!!!!!!!!!!! ERROR !!!!!!!!!!!!!!!');
      console.error(err);
    })
}
