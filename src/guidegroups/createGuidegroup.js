import errorHandler from '../util/errorHandler';
import dynamoDb from '../util/dynamodb';
import { parseGuideGroup } from '../util/formatHelpers';

export const main = errorHandler(async event => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.GUIDEGROUPS_TABLE_NAME,
    Item: {
      ...parseGuideGroup(data),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
