import middy from '@middy/core';
import jsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';
import httpErrorHandler from '@middy/http-error-handler';
import Ajv from 'ajv';
import httpUrlEncodePathParser from '@middy/http-urlencode-path-parser';

const ajv = new Ajv();

export function parseAndValidateJsonBody(lambdaMain, validationSchema) {
  return middy(lambdaMain)
    .use(jsonBodyParser())
    .use(
      validator({
        inputSchema: ajv.compile(validationSchema),
      })
    )
    .use(httpErrorHandler());
}

export function parseEncodeAndValidatePath(lambdaMain, validationSchema) {
  return middy(lambdaMain)
    .use(httpUrlEncodePathParser())
    .use(
      validator({
        inputSchema: ajv.compile(validationSchema),
      })
    )
    .use(httpErrorHandler());
}
