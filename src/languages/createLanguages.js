import handler from '../util/handler';
import dynamodb from '../util/dynamodb';

export const main = handler(async event => {
  const data = JSON.parse(event.body);

  const params = {
    TableName: process.env.LANGUAGES_TABLE_NAME,
    Item: {
      term_id: data.term_id,
      name: data.name,
      slug: data.slug,
      term_taxonomy_id: data.term_taxonomy_id,
      taxonomy: data.taxonomy,
      count: data.count,
      tl_term_id: data.tl_term_id,
      tl_term_taxonomy_id: data.tl_term_taxonomy_id,
      tl_count: data.tl_count,
      locale: data.locale,
      is_rtl: data.is_rtl,
      w3c: data.w3c,
      facebook: data.facebook,
      flag_url: data.flag_url,
      home_url: data.home_url,
      search_url: data.search_url,
      host: data.host,
      mo_id: data.mo_id,
      page_on_front: data.page_on_front,
      page_for_posts: data.page_for_posts,
      flag_code: data.flag_code,
      active: data.active,
    },
  };

  await dynamodb.put(params);

  return params.Item;
});
