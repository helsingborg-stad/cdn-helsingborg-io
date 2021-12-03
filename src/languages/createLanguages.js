import errorHandler from '../util/errorHandler';
import dynamodb from '../util/dynamodb';

export const main = errorHandler(async event => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.LANGUAGES_TABLE_NAME,
    Item: {
      id: data.id,
      name: data.name,
      slug: data.slug,
      locale: data.locale,
    },
  };

  await dynamodb.put(params);

  return params.Item;
});
