import errorHandler from '../util/errorHandler';
import dynamoDb from '../util/dynamodb';

export const main = errorHandler(async () => {
  const params = {
    TableName: process.env.LANGUAGES_TABLE_NAME,
  };

  const result = await dynamoDb.scan(params);

  return result.Items;
});
