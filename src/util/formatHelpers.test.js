import { parseUrl } from './formatHelpers';

test('return null if URL is not valid', () => {
  expect(parseUrl('www.test.com')).toBeNull();
  expect(parseUrl('')).toBeNull();
  expect(parseUrl(undefined)).toBeNull();
  expect(parseUrl(null)).toBeNull();
});

test('check if given URL is valid', () => {
  expect(parseUrl('https://www.example.com')).toMatch('https://www.example.com/');
});
