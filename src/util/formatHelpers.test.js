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
  parseMediaContent,
  parseLink,
  parseLinks,
  parseSubAttraction,
  parseGuide,
  parseContentObject,
  parseGuideGroup,
} from './formatHelpers';

import * as mock from '../mocks';

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
      id: 4,
      latitude: 56.0467692,
      links: null,
      longitude: 12.6945437,
      streetAddress: 'Stortorget',
      title: { rendered: 'Stortorget', plain_text: 'Stortorget' },
    };

    expect(parseLocation(mock.locationInput)).toMatchObject(parsedLocation);
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

describe('parseMediaContent', () => {
  const media = {
    id: 1874807,
    title: 'some-title',
    url: 'https://example.test/wp-content/uploads/sound.mp3',
    description: 'some-description',
    date: '2021-04-27 10:54:03',
    modified: '2021-05-07 12:13:11',
    type: 'audio',
  };
  const parsedMedia = {
    contentType: 'audio',
    created: '2021-04-27T08:54:03.000Z',
    description: 'some-description',
    id: 1874807,
    modified: '2021-05-07T10:13:11.000Z',
    title: 'some-title',
    url: 'https://example.test/wp-content/uploads/sound.mp3',
  };

  test('parsed media content', () => {
    expect(parseMediaContent(media)).toMatchObject(parsedMedia);
  });

  test('handle parse error', () => {
    expect(() => parseMediaContent(null)).toThrowError('Failed to parse media content');
  });
});

describe('parseLink', () => {
  test('return link', () => {
    const link = {
      title: 'Title',
      link: 'https://example.test/web/',
    };
    const parsedLink = {
      title: 'Title',
      url: 'https://example.test/web/',
    };
    expect(parseLink(link)).toMatchObject(parsedLink);
  });
});

describe('parseLinks', () => {
  test('return links', () => {
    const data = [
      {
        title: 'Title',
        link: 'https://example.test/web/object/152376',
      },
    ];
    const links = [
      {
        title: 'Title',
        type: undefined,
        url: 'https://example.test/web/object/152376',
      },
    ];
    expect(parseLinks(data)).toMatchObject(links);
  });
});

describe('parseSubAttraction', () => {
  test('return parsed sub attraction', () => {
    const id = '61b350e69f7a7';
    const subAttractions = [mock.guideMeta.subAttractionInput];
    const locations = [mock.locationInput];
    const parsedSubAttraction = mock.guideMeta.subAttractionOutput;
    expect(parseSubAttraction(id, subAttractions, locations)).toMatchObject(parsedSubAttraction);
  });
});

describe('parseGuide', () => {
  test('return parsed guide', () => {
    expect(parseGuide(mock.guideInput)).toMatchObject(mock.guideOutput);
  });
});

describe('parseContentObject', () => {
  test('return parsed content object', () => {
    const key = '61b350e69f7a7';
    const contentObject = mock.guideMeta.contentObjectInput;
    const subAttractions = [mock.guideMeta.subAttractionInput];
    const locations = [mock.locationInput];
    const parsedContentObject = mock.guideMeta.contentObjectOutput;

    expect(parseContentObject(key, contentObject, subAttractions, locations)).toMatchObject(
      parsedContentObject
    );
  });
});

describe('parseGuideGroup', () => {
  test('return parsed guide group', () => {
    expect(parseGuideGroup(mock.guideGroupInput)).toMatchObject(mock.guideGroupOutput);
  });
});
