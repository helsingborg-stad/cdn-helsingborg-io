import { parseUrl } from './formatHelpers';

test('return null if URL is not valid', () => {
  expect(parseUrl('www.test.com')).toBeNull();
  expect(parseUrl('')).toBeNull();
  expect(parseUrl(undefined)).toBeNull();
  expect(parseUrl(null)).toBeNull();
});

test('return valid URL string', () => {
  expect(parseUrl('https://www.example.com')).toMatch('https://www.example.com/');
});

import { parseImages } from './formatHelpers';

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
