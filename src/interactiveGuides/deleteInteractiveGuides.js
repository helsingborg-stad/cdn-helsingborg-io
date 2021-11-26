import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

export const main = handler(async event => {
  const { id: pathParamId } = event.pathParameters;

  const params = {
    TableName: process.env.INTERACTIVE_GUIDES_TABLE_NAME,
    Key: {
      id: parseInt(pathParamId, 10),
    },
  };

  await dynamoDb.delete(params);

  return { body: { status: true } };
});
