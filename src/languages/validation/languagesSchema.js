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

export const deleteLanguagesSchema = {
  type: 'object',
  required: ['pathParameters'],
  properties: {
    pathParameters: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', pattern: '^\\d{1,}$' },
      },
    },
  },
};
