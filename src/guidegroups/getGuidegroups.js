import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

export const main = handler(async event => {
  const { groupId, lang, include } = event.queryStringParameters ?? {};

  const params = {
    TableName: process.env.GUIDEGROUPS_TABLE_NAME,
    KeyConditionExpression: 'groupId = :groupId',
    FilterExpression: '#lang = :lang',
    ExpressionAttributeNames: {
      '#lang': 'lang',
    },
    ExpressionAttributeValues: {
      ':groupId': parseInt(groupId, 10),
      ':lang': lang,
    },
  };

  const result = await dynamoDb.query(params);
  let { Items: items } = result;

  if (include) {
    const includedIds = include.split(',').map(id => parseInt(id, 10));
    items = items.filter(item => includedIds.includes(item.id));
  }

  return items;
});
