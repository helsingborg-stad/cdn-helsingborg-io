import dynamoDb from '../util/dynamodb';
import errorHandler from '../util/errorHandler';
import { deleteNavigationSchema } from './validation/navigationsSchema';
import { parseEncodeAndValidatePath } from '../util/commonMiddleware';

const main = errorHandler(async event => {
  const {
    city: pathParamCity,
    language: pathParamLanguage,
    id: pathParamId,
  } = event.pathParameters;

  const params = {
    TableName: process.env.NAVIGATIONS_TABLE_NAME,
    Key: {
      city: parseInt(pathParamCity, 10),
      language_recordUid: `${pathParamLanguage}#${pathParamId}`,
    },
  };

  await dynamoDb.delete(params);

  return { body: { status: true } };
});

const handler = parseEncodeAndValidatePath(main, deleteNavigationSchema);

export { handler };
