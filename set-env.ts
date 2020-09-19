import { grey, magenta } from 'colors';
import { writeFile } from 'fs';

const env = process.env;

// Configure Angular `environment.ts` file path
const targetPath = './src/environments/environment.prod.ts';

const json = {
  production: false,
  pdf_api_key: env.PDF_API_KEY,
  pdf_api_url: env.PDF_API_URL,
  short_url_api_key: env.SHORT_URL_API_KEY,
  short_url_api: env.SHORT_URL_API,
  short_url_workspace: env.SHORT_URL_WORKSPACE,
  FAUNADB_SECRET: '',
};

if (env.NETLIFY) {
  if ('production' === env.CONTEXT) {
    json.production = true;
    json.FAUNADB_SECRET = env.PROD_FAUNADB_SECRET;
  } else {
    json.FAUNADB_SECRET = env.PREV_FAUNADB_SECRET;
  }
} else if (env.CIRCLECI) {
  json.FAUNADB_SECRET = env.FAUNADB_SECRET;
}

const envConfigFile = `export const environment = ${JSON.stringify(json)};`;

console.log(magenta('The file `environment.ts` will be written with the following content: \n'));
console.log(grey(envConfigFile));

writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    throw console.error(err);
  } else {
    console.log(magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
  }
});
