import handler from "../util/handler";
import dynamoDb from "../util/dynamodb";

export const main = handler(async () => {
  const params = {
    TableName: process.env.GUIDEGROUPS_TABLE_NAME,
  };

  const result = await dynamoDb.scan(params);

  return result.Items;
});
