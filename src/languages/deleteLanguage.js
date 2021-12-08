import errorHandler from '../util/errorHandler';
import dynamoDb from '../util/dynamodb';
import { parseEncodeAndValidatePath } from '../util/commonMiddleware';
import { deleteLanguagesSchema } from './validation/languagesSchema';

const main = errorHandler(async event => {
  const params = {
    TableName: process.env.LANGUAGES_TABLE_NAME,
    Key: {
      id: parseInt(event.pathParameters.id, 10),
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});

const handler = parseEncodeAndValidatePath(main, deleteLanguagesSchema);

export { handler };
