export const createNavigationSchema = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['id', 'user_groups', 'lang'],
      properties: {
        user_groups: {
          type: 'object',
          properties: { id: { type: 'integer' } },
        },
        lang: { type: 'string' },
        id: { type: 'integer' },
        description: { type: 'string' },
        object_list: {
          type: 'array',
          items: {
            type: 'object',
            properties: { id: { type: 'number' } },
          },
        },
        name: { type: 'string' },
      },
    },
  },
};

export const deleteNavigationSchema = {
  type: 'object',
  required: ['pathParameters'],
  properties: {
    pathParameters: {
      type: 'object',
      required: ['language', 'id', 'city'],
      properties: {
        language: { type: 'string' },
        id: { type: 'string', pattern: '^\\d{1,}$' },
        city: { type: 'string', pattern: '^\\d{1,}$' },
      },
    },
  },
};
