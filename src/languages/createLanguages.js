import errorHandler from '../util/errorHandler';
import dynamodb from '../util/dynamodb';
import { parseAndValidateJsonBody } from '../util/commonMiddleware';
import { createNavigationSchema } from '../navigations/validation/navigationsSchema';

const main = errorHandler(async event => {
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

const handler = parseAndValidateJsonBody(main, createNavigationSchema);

export { handler };
