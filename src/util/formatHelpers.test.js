import { parseUrl, parseImages, parseDate, parseOpeningHour } from './formatHelpers';

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

    expect(parseImages(null)).toBeNull();
    expect(parseImages(undefined)).toBeNull();
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
