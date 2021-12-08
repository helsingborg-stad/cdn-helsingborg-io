export const createGuidesSchema = {
  type: 'object',
  required: ['body'],
  properties: {
    body: {
      type: 'object',
      required: ['id', 'guidegroup', 'guide_kids', 'content', 'content_type', 'title'],
      properties: {
        id: { type: 'integer' },
        guidegroup: {
          type: 'array',
          items: {
            type: 'object',
            required: ['id'],
            properties: {
              id: { type: 'integer' },
            },
          },
        },
        guide_kids: { type: 'boolean' },
        content: {
          type: 'object',
          required: ['plain_text'],
          properties: {
            plain_text: { type: 'string' },
          },
        },
        content_type: { type: 'string' },
        title: {
          type: 'object',
          required: ['plain_text'],
          properties: {
            plain_text: { type: 'string' },
          },
        },
      },
    },
  },
};
