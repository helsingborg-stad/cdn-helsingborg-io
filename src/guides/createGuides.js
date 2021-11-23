import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';
import { parseGuide } from '../util/formatHelpers';

export const main = handler(async event => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.GUIDES_TABLE_NAME,
    Item: parseGuide(data),
  };

  await dynamoDb.put(params);

  return params.Item;
});
