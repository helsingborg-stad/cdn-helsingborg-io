export const createNavigationSchema = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['id', 'user_groups', 'lang', 'description', 'object_list', 'name', 'slug'],
      properties: {
        id: { type: 'integer' },
        user_groups: {
          type: 'object',
          required: ['id'],
          properties: { id: { type: 'integer' } },
        },
        lang: { type: 'string' },
        description: { type: 'string' },
        object_list: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id', 'type'],
            properties: {
              id: { type: 'number' },
              type: { type: 'string' },
            },
          },
        },
        name: { type: 'string' },
        slut: { type: 'string' },
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

export const getNavigationSchema = {
  type: 'object',
  required: ['pathParameters'],
  properties: {
    pathParameters: {
      type: 'object',
      required: ['userGroupId', 'lang'],
      properties: {
        userGroupId: { type: 'string', pattern: '^\\d{1,}$' },
        lang: { type: 'string', pattern: '^\\d{1,}$' },
      },
    },
  },
};
