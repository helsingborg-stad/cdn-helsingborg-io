import errorHandler from '../util/errorHandler';
import dynamoDb from '../util/dynamodb';
import { parseGuide } from '../util/formatHelpers';

export const main = errorHandler(async event => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.GUIDES_TABLE_NAME,
    Item: parseGuide(data),
  };

  // Add global index guideGroupId.
  params.Item['dynamoDbGlobalIndexGuideGroupId'] = data.guidegroup[0].id.toString(10);

  await dynamoDb.put(params);

  return params.Item;
});
