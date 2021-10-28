import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

export const main = handler(async event => {
  const { body } = event;
  const { groupId } = JSON.parse(body);

  const params = {
    TableName: process.env.GUIDEGROUPS_TABLE_NAME,
    Key: {
      groupId: groupId,
      id: parseInt(event.pathParameters.id, 10),
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});
