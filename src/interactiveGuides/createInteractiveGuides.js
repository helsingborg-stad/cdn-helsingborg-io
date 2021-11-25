import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';
import { parseInteractiveGuide } from '../util/formatHelpers';

export const main = handler(async event => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.INTERACTIVE_GUIDES_TABLE_NAME,
    Item: {
      ...parseInteractiveGuide(data),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
