import errorHandler from '../util/errorHandler';
import dynamoDb from '../util/dynamodb';
import { parseGuideGroup } from '../util/formatHelpers';

export const main = errorHandler(async event => {
  const data = JSON.parse(event.body);

  const parsedData = parseGuideGroup(data);

  const params = {
    TableName: process.env.GUIDEGROUPS_TABLE_NAME,
    Key: {
      id: parseInt(event.pathParameters.id, 10),
    },
    UpdateExpression:
      'SET #name = :name, slug = :slug, description = :description, lang = :lang, guidesCount = :guidesCount, active = :active, images = :images, #location = :location, pointProperties = :pointProperties, updatedAt = :updatedAt',
    ExpressionAttributeValues: {
      ':name': parsedData.name || null,
      ':slug': parsedData.slug || null,
      ':description': parsedData.description || null,
      ':lang': parsedData.lang || null,
      ':guidesCount': parsedData.guidesCount || null,
      ':active': parsedData.active || null,
      ':images': parsedData.images || null,
      ':location': parsedData.location || null,
      ':pointProperties': parsedData.pointProperties || null,
      ':updatedAt': Date.now(),
    },
    ExpressionAttributeNames: {
      '#name': 'name',
      '#location': 'location',
    },
    ReturnValues: 'ALL_NEW',
  };

  const response = await dynamoDb.update(params);

  return response.Attributes;
});
