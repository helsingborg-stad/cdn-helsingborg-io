import errorHandler from '../util/errorHandler';
import dynamoDb from '../util/dynamodb';

export const main = errorHandler(async event => {
  const { id: pathParamId } = event.pathParameters;

  const params = {
    TableName: process.env.GUIDES_TABLE_NAME,
    Key: {
      id: parseInt(pathParamId, 10),
    },
  };

  await dynamoDb.delete(params);

  return { body: { status: true } };
});
