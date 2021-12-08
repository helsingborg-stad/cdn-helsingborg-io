import dynamoDb from '../util/dynamodb';
import errorHandler from '../util/errorHandler';
import { createNavigationSchema } from './validation/navigationsSchema';
import { parseAndValidateJsonBody } from '../util/commonMiddleware';

const main = errorHandler(async event => {
  const data = event.body;

  const params = {
    TableName: process.env.NAVIGATIONS_TABLE_NAME,
    Item: {
      id: data.id,
      city: data.user_groups.id,
      language_recordUid: `${data.lang}#${data.id}`,
      language: data.lang,
      description: data.description,
      items: data.object_list,
      name: data.name,
      slug: data.slug,
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});

const handler = parseAndValidateJsonBody(main, createNavigationSchema);

export { handler };
