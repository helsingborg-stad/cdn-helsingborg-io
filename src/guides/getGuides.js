import errorHandler from '../util/errorHandler';
import dynamoDb from '../util/dynamodb';
import { parseEncodeAndValidatePath } from '../util/commonMiddleware';
import { getGuidesSchema } from './validation/guidesSchema';

const main = errorHandler(async event => {
  const { include: queryInclude, guideGroupId: queryGuideGroupId } =
    event.queryStringParameters ?? {};

  if (typeof queryGuideGroupId !== 'undefined' && typeof queryInclude == 'undefined') {
    const params = {
      TableName: process.env.GUIDES_TABLE_NAME,
      IndexName: 'guideGroupIdIndex',
      KeyConditionExpression: '#dynamoDbGlobalIndexGuideGroupId = :dynamoDbGlobalIndexGuideGroupId',
      ExpressionAttributeValues: { ':dynamoDbGlobalIndexGuideGroupId': queryGuideGroupId },
      ExpressionAttributeNames: {
        '#dynamoDbGlobalIndexGuideGroupId': 'dynamoDbGlobalIndexGuideGroupId',
      },
    };

    return (await dynamoDb.query(params)).Items;
  }

  if (typeof queryInclude !== 'undefined' && typeof queryGuideGroupId === 'undefined') {
    const parameterKeys = [];

    queryInclude?.split(',').map(includeIds => {
      parameterKeys.push({
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
  }

  // Return empty array if no event query parameters found.
  return [];
});

const handler = parseEncodeAndValidatePath(main, getGuidesSchema);

export { handler };
