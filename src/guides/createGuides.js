import errorHandler from '../util/errorHandler';
import dynamoDb from '../util/dynamodb';
import { parseGuide } from '../util/formatHelpers';
import { parseAndValidateJsonBody } from '../util/commonMiddleware';
import { createGuidesSchema } from './validation/guidesSchema';

const main = errorHandler(async event => {
  const data = event.body;
  const params = {
    TableName: process.env.GUIDES_TABLE_NAME,
    Item: parseGuide(data),
  };

  // Add global index guideGroupId.
  params.Item['dynamoDbGlobalIndexGuideGroupId'] = data.guidegroup[0].id.toString(10);

  await dynamoDb.put(params);

  return params.Item;
});

const handler = parseAndValidateJsonBody(main, createGuidesSchema);

export { handler };
