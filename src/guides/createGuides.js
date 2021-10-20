import handler from '../util/handler';
import dynamoDb from '../util/dynamodb';

export const main = handler(async event => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.GUIDES_TABLE_NAME,
    Item: {
      id: data.id,
      date: data.date,
      date_gmt: data.date_gmt,
      modified: data.modified,
      modified_gmt: data.modified_gmt,
      slug: data.slug,
      status: data.status,
      title: data.title,
      content: data.content,
      user_groups: data.user_groups,
      guidegroup: data.guidegroup,
      navigation: data.navigation,
      guidetype: data.guidetype,
      property: data.property,
      content_type: data.content_type,
      guide_tagline: data.guide_tagline,
      guide_date_start: data.guide_date_start,
      guide_date_end: data.guide_date_end,
      guide_kids: data.guide_kids,
      guideBeacon: data.guideBeacon,
      guide_beacon: data.guide_beacon,
      guide_location: data.guide_location,
      guide_images: data.guide_images,
      contentObjects: data.contentObjects,
      content_objects: data.content_objects,
      subAttractions: data.subAttractions,
      sub_attractions: data.sub_attractions,
      orphanContentObjects: data.orphanContentObjects,
      orphan_content_objects: data.orphan_content_objects,
      lang: data.lang,
      translations: data.translations,
    },
  };

  await dynamoDb.put(params);

  return params.Item;
});
