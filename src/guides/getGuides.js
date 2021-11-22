import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

export const main = handler(async event => {
  const { include: queryInclude, guideGroupId: queryGuideGroupId } =
    event.queryStringParameters ?? {};

  if (typeof queryGuideGroupId !== 'undefined' && typeof queryInclude == 'undefined') {
    const params = { TableName: process.env.GUIDES_TABLE_NAME };

    const allGuides = await dynamoDb.scan(params);

    if (allGuides.Items.length < 1) {
      return [];
    }

    return allGuides.Items.filter(
      item => item.guidegroup[0]['id'] === parseInt(queryGuideGroupId, 10)
    );
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

  return [];
});
