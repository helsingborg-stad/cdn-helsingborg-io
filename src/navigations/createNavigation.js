import AWS from "aws-sdk"

const dynamoDb = new AWS.DynamoDB.DocumentClient()

export async function main(event) {
  // Request body is passed as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.NAVIGATIONS_TABLE_NAME,
      Item: {
        id: data.id,
        count: data.count,
        description: data.description,
        link: data.link,
        name: data.name,
        slug: data.slug,
        taxonomy: data.taxonomy,
        meta: data.meta,
        layout: data.layout,
        object_list: data.object_list,
        user_groups: data.user_groups,
        lang: data.lang,
        translations: data.translations
      },
  };

  try {
    await dynamoDb.put(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(params.Item),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    };
  }
}
