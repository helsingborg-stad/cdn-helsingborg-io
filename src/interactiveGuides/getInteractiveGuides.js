import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

export const main = handler(async event => {
  const { include: queryInclude } = event.queryStringParameters ?? {};

  if (typeof queryInclude === 'undefined') {
    return [];
  }

  const parameterKeys = [];

  queryInclude.split(',').map(includeIds => {
    parameterKeys.push({
      id: parseInt(includeIds, 10),
    });
  });

  if (parameterKeys.length === 0) {
    return [];
  }

  const params = {
    RequestItems: {
      [process.env.INTERACTIVE_GUIDES_TABLE_NAME]: {
        Keys: parameterKeys,
      },
    },
  };

  const result = await dynamoDb.batchGet(params);

  return result.Responses[process.env.INTERACTIVE_GUIDES_TABLE_NAME];
});
