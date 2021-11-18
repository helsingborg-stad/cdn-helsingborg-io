import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

export const main = handler(async event => {
  const params = {
    TableName: process.env.LANGUAGES_TABLE_NAME,
    Key: {
      id: parseInt(event.pathParameters.id, 10),
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});
