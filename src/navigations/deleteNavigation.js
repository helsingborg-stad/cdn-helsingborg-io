import dynamoDb from '../util/dynamodb';
import errorHandler from '../util/errorHandler';

import middy from '@middy/core';
import httpUrlEncodePathParser from '@middy/http-urlencode-path-parser';
import validator from '@middy/validator';
import { deleteNavigationSchema } from './validation/navigationSchema';
import httpErrorHandler from '@middy/http-error-handler';
import Ajv from 'ajv';

const ajv = new Ajv();

const main = errorHandler(async event => {
  const {
    city: pathParamCity,
    language: pathParamLanguage,
    id: pathParamId,
  } = event.pathParameters;

  const params = {
    TableName: process.env.NAVIGATIONS_TABLE_NAME,
    Key: {
      city: parseInt(pathParamCity, 10),
      language_recordUid: `${pathParamLanguage}#${pathParamId}`,
    },
  };

  await dynamoDb.delete(params);

  return { body: { status: true } };
});

const handler = middy(main)
  .use(httpUrlEncodePathParser())
  .use(
    validator({
      inputSchema: ajv.compile(deleteNavigationSchema),
    })
  )
  .use(httpErrorHandler());

export { handler };
