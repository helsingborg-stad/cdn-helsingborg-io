import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

export const main = handler(async event => {
  const { city: pathParamCity } = event.pathParameters;
  const { language: pathParamLanguage } = event.pathParameters;
  const { id: pathParamId } = event.pathParameters;

  const params = {
    TableName: process.env.NAVIGATIONS_TABLE_NAME,
    Key: {
      city: parseInt(pathParamCity, 10),
      language_recordUid: `${pathParamLanguage}#${pathParamId}`,
    },
  };

  console.log('delete params', params);

  await dynamoDb.delete(params);

  return { body: { status: true } };
});
