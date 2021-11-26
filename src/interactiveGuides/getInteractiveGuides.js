import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

export const main = handler(async event => {
  // const { id: queryId } = event.queryStringParameters ?? {};
  //
  // const params = {
  //   TableName: process.env.INTERACTIVE_GUIDES_TABLE_NAME,
  //   KeyConditionExpression: '#id = :queryId',
  //   ExpressionAttributeValues: { ':queryId': queryId },
  //   ExpressionAttributeNames: { '#id': 'id' },
  // };
  //
  // const result = await dynamoDb.query(params);
  // return result.Items;

  const params = {
    TableName: process.env.INTERACTIVE_GUIDES_TABLE_NAME,
  };

  const result = await dynamoDb.scan(params);

  return result.Items;
});
