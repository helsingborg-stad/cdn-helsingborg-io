export const createLanguagesSchema = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['id', 'name', 'slug', 'locale'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        slug: { type: 'string' },
        locale: { type: 'string' },
      },
    },
  },
};
