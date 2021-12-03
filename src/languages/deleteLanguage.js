import errorHandler from '../util/errorHandler';
import dynamoDb from '../util/dynamodb';

export const main = errorHandler(async event => {
  const params = {
    TableName: process.env.LANGUAGES_TABLE_NAME,
    Key: {
      id: parseInt(event.pathParameters.id, 10),
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});
