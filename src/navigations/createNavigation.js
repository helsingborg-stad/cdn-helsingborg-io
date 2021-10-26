import AWS from 'aws-sdk';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event) {
  // Request body is passed as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.NAVIGATIONS_TABLE_NAME,
    Item: {
      id: data.id,
      description: data.description,
      items: data.items,
      name: data.name,
      slug: data.slug,
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
