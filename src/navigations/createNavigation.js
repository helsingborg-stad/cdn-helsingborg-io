import AWS from 'aws-sdk';
const dynamoDb = new AWS.DynamoDB.DocumentClient();

import middy from '@middy/core';
import validator from '@middy/validator';
import httpErrorHandler from '@middy/http-error-handler';
import jsonBodyParser from '@middy/http-json-body-parser';
import Ajv from 'ajv';

const ajv = new Ajv();

const baseHandler = async event => {
  // Request body is passed as a JSON encoded string in 'event.body'
  // const data = JSON.parse(event.body);
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

  try {
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
};

const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        user_groups: { type: 'object' },
        lang: { type: 'string' },
      },
      required: ['id', 'user_groups', 'lang'],
    },
  },
};

const handler = middy(baseHandler)
  .use(jsonBodyParser())
  .use(
    validator({
      inputSchema: ajv.compile(inputSchema),
    })
  )
  .use(httpErrorHandler());

export { handler };
