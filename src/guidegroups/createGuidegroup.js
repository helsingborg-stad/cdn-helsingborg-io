import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.GUIDEGROUPS_TABLE_NAME,
    Item: {
      id: data.id,
      count: data.count,
      description: data.description,
      name: data.name,
      slug: data.slug,
      apperance: data.apperance,
      settings: data.settings,
      notice: data.notice,
      lang: data.lang,
      translations: data.translations
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
