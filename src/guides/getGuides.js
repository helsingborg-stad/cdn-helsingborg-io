import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

export const main = handler(async event => {
  const { lang: queryLanguage, include: queryInclude } = event.queryStringParameters ?? {};

  const parameterKeys = [];

  queryInclude.split(',').map(includeIds => {
    parameterKeys.push({
      language: queryLanguage,
      id: parseInt(includeIds, 10),
    });
  });

  const params = {
    RequestItems: {
      [process.env.GUIDES_TABLE_NAME]: {
        Keys: parameterKeys,
      },
    },
  };

  const result = await dynamoDb.batchGet(params);

  return result.Responses[process.env.GUIDES_TABLE_NAME];
});
