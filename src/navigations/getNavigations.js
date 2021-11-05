import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

export const main = handler(async event => {
  const { userGroupID: queryCity, lang: queryLanguage } = event.queryStringParameters ?? {};

  let params = { TableName: process.env.NAVIGATIONS_TABLE_NAME };
  let KeyConditionExpression = '';
  const ExpressionAttributeValues = {};
  const ExpressionAttributeNames = {};

  // Return all fields if no query parameters found.
  if (typeof queryCity == 'undefined' && typeof queryLanguage == 'undefined') {
    const result = await dynamoDb.scan(params);

    return result.Items;
  }

  // Filter by Global Secondary Index 'guideLanguage' if only language queried.
  if (typeof queryCity == 'undefined' && typeof queryLanguage != 'undefined') {
    params['IndexName'] = 'guideLanguage';
    KeyConditionExpression += '#language = :queryLanguage';
    ExpressionAttributeValues[':queryLanguage'] = queryLanguage;
    ExpressionAttributeNames['#language'] = 'language';
  }

  // DynamoDB parameters if city queried.
  if (typeof queryCity != 'undefined') {
    KeyConditionExpression += '#city = :queryCity ';
    ExpressionAttributeValues[':queryCity'] = parseInt(queryCity, 10);
    ExpressionAttributeNames['#city'] = 'city';
  }

  // Append language to city parameters if city AND language queried.
  if (typeof queryCity != 'undefined' && typeof queryLanguage != 'undefined') {
    KeyConditionExpression += ' AND begins_with(#language_recordUid, :queryLanguage)';
    ExpressionAttributeValues[':queryLanguage'] = queryLanguage;
    ExpressionAttributeNames['#language_recordUid'] = 'language_recordUid';
  }

  params = {
    ...params,
    KeyConditionExpression,
    ExpressionAttributeValues,
    ExpressionAttributeNames,
  };

  const result = await dynamoDb.query(params);

  return result.Items;
});
