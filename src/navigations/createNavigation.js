import dynamoDb from '../util/dynamodb';
import errorHandler from '../util/errorHandler';
import { createNavigationSchema } from './validation/navigationSchema';

import middy from '@middy/core';
import validator from '@middy/validator';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';
import Ajv from 'ajv';

const ajv = new Ajv();

const main = errorHandler(async event => {
  const data = event.body;

  const params = {
    TableName: process.env.NAVIGATIONS_TABLE_NAME,
    Item: {
      city: data.user_groups.id,
      language_recordUid: `${data.lang}#${data.id}`,
      language: data.lang,
      id: data.id,
      description: data.description,
      items: data.object_list,
      name: data.name,
      slug: data.slug,
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});

const handler = middy(main)
  .use(jsonBodyParser())
  .use(
    validator({
      inputSchema: ajv.compile(createNavigationSchema),
    })
  )
  .use(httpErrorHandler());

export { handler };
