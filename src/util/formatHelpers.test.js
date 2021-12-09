import {
  parseUrl,
  parseImages,
  parseDate,
  parseOpeningHour,
  parseProperty,
  parseLocation,
  parseGuideType,
  getPostStatus,
  parseImageUrls,
} from './formatHelpers';

import location from '../mocks/location';

describe('parseUrl', () => {
  test('return null if URL is not valid', () => {
    expect(parseUrl('www.test.com')).toBeNull();
    expect(parseUrl('')).toBeNull();
    expect(parseUrl(undefined)).toBeNull();
    expect(parseUrl(null)).toBeNull();
  });

  test('return valid URL string', () => {
    expect(parseUrl('https://www.example.com')).toMatch('https://www.example.com/');
  });
});

describe('parseImages', () => {
  test('return image sizes from object', () => {
    const imageSizes = {
      large: 'https://domain.com/images/large.jpg',
      medium: 'https://domain.com/images/medium.jpg',
      thumbnail: 'https://domain.com/images/thumbnail.jpg',
    };

    const parsedImageSizes = {
      large: parseUrl(imageSizes.large),
      medium: parseUrl(imageSizes.medium),
      thumbnail: parseUrl(imageSizes.thumbnail),
    };

    expect(parseImages(imageSizes)).toMatchObject(parsedImageSizes);
  });

  test('handle invalid image sizes object', () => {
    const parsedImageSizes = {
      large: null,
      medium: null,
      thumbnail: null,
    };
    expect(parseImages({})).toMatchObject(parsedImageSizes);
  });
});

describe('parseDate', () => {
  test('return valid date string', () => {
    expect(parseDate('2021-06-08')).toMatch('2021-06-08T00:00:00.000Z');
  });

  test('handle falsy date string', () => {
    expect(parseDate(null)).toBeNull();
    expect(parseDate('')).toBeNull();
    expect(parseDate(undefined)).toBeNull();
  });
});

describe('parseOpeningHour', () => {
  test('return valid "open hours"', () => {
    const openHour = {
      closed: false,
      closing: '18:00',
      day_number: '4',
      opening: '12:00',
      weekday: 'Thursday',
    };

    const parsedOpenHour = {
      closed: false,
      closing: '18:00',
      dayNumber: 4,
      opening: '12:00',
      weekday: 'Thursday',
    };
    expect(parseOpeningHour(openHour)).toMatchObject(parsedOpenHour);
  });
});

describe('parseProperty', () => {
  const property = {
    id: 'id',
    name: 'name',
    slug: 'slug',
    icon: 'https://domain.com/images/icon.jpg',
  };
  test('return parsed property', () => {
    expect(parseProperty(property)).toMatchObject(property);
  });
});

describe('parseLocation', () => {
  test('return parsed location', () => {
    const parsedLocation = {
      id: 999,
      latitude: 56.04779,
      links: [{ service: 'webpage', url: 'https://exampledomain.com' }],
      longitude: 12.6890579,
      streetAddress: 'Mount doom',
      title: { rendered: 'Mount Doom', plain_text: 'Mount Doom' },
      openingHours: [
        {
          closed: true,
          closing: null,
          dayNumber: 1,
          opening: null,
          weekday: 'Monday',
        },
        {
          closed: false,
          closing: '18:00',
          dayNumber: 2,
          opening: '10:00',
          weekday: 'Tuesday',
        },
      ],
    };

    expect(parseLocation(location)).toMatchObject(parsedLocation);
  });
});

describe('parseGuideType', () => {
  test('return guide type', () => {
    expect(parseGuideType('guide')).toMatch('guide');
  });
  test('handle falsy guide type', () => {
    expect(parseGuideType('test')).toBeUndefined();
  });
});

describe('getPostStatus', () => {
  test('return post status', () => {
    expect(getPostStatus(true)).toMatch('publish');
    expect(getPostStatus(false)).toMatch('draft');
  });
});

describe('parseImageUrls', () => {
  test('return list of image objects containing sizes', () => {
    const images = [
      {
        sizes: {
          large: 'https://domain.com/images/large.jpg',
          medium: 'https://domain.com/images/medium.jpg',
          thumbnail: 'https://domain.com/images/thumbnail.jpg',
        },
      },
    ];
    const parsedImages = [images[0].sizes];
    expect(parseImageUrls(images)).toEqual(parsedImages);
  });
});
