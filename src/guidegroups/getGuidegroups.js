import errorHandler from '../util/errorHandler';
import dynamoDb from '../util/dynamodb';

export const main = errorHandler(async event => {
  const { lang, include } = event.queryStringParameters ?? {};

  const params = {
    TableName: process.env.GUIDEGROUPS_TABLE_NAME,
    FilterExpression: '#lang = :lang',
    ExpressionAttributeNames: {
      '#lang': 'lang',
    },
    ExpressionAttributeValues: {
      ':lang': lang,
    },
  };

  const result = await dynamoDb.scan(params);
  let { Items: items } = result;

  if (include) {
    const includedIds = include.split(',').map(id => parseInt(id, 10));
    items = items.filter(item => includedIds.includes(item.id));
  }

  return items;
});
