const parseUrl = urlString => {
  if (urlString === null || urlString === undefined) {
    return null;
  }

  try {
    return new URL(urlString).toString();
  } catch (error) {
    console.error('Not a well formatted url, discarding: ' + urlString);
  }

  return null;
};

const parseImages = item => {
  const images = {
    large: parseUrl(item.large),
    medium: parseUrl(item.medium),
    thumbnail: parseUrl(item.thumbnail),
  };
  return images;
};

const parseOpeningHour = item => {
  const { weekday, closed, opening, closing, day_number: dayNumber } = item;

  const openHour = {
    closed,
    closing,
    dayNumber: Number(dayNumber),
    opening,
    weekday,
  };
  return openHour;
};

const parseProperty = item => {
  const property = {
    id: item.id,
    name: item.name,
    slug: item.slug,
  };

  if (item.icon !== null) {
    try {
      property.icon = new URL(item.icon).toString();
    } catch (e) {
      // not a well formatted url, discarding
      console.warning('Not a well formatted url', e);
    }
  }

  return property;
};

const parseLocation = item => {
  const {
    id,
    street_address: streetAddress,
    latitude,
    longitude,
    title,
    open_hours: openingHoursInput,
    open_hour_exceptions: openHoursException,
    links,
  } = item;

  const location = {
    id: Number(id),
    latitude: Number(latitude),
    links,
    longitude: Number(longitude),
    streetAddress,
    title,
  };

  const openHours = [];
  if (openingHoursInput) {
    openingHoursInput.forEach(openHour => {
      try {
        const parsedOh = parseOpeningHour(openHour);
        openHours.push(parsedOh);
      } catch (err) {
        console.error('Failed to parse opening hours, discarding.', err);
      }
    });
  }

  if (openHours.length > 0) {
    location.openingHours = openHours;
  }

  if (openHoursException) {
    const openingHourExceptions = [];
    openHoursException.forEach(element => {
      try {
        const exc = {
          date: new Date(element.exception_date).toISOString(),
          description: element.exeption_information,
        };
        openingHourExceptions.push(exc);
      } catch (error) {
        // discarding exception
        console.error('Error parsing opening hour exception from: ' + element);
      }
    });

    if (openingHourExceptions.length > 0) {
      location.openingHourExceptions = openingHourExceptions;
    }
  }

  return location;
};

export const parseGuideGroup = item => {
  const {
    id,
    description,
    name,
    slug,
    apperance: {
      image: { sizes },
    },
    settings,
    _embedded,
    count,
    lang,
    user_group: groupId,
  } = item;

  const images = parseImages(sizes);
  const locationArray = _embedded.location;
  const location = parseLocation(locationArray[0]);
  const { property: propertiesInput } = locationArray[0];

  const properties = [];
  if (propertiesInput) {
    propertiesInput.forEach(property => {
      try {
        const parsedProperty = parseProperty(property);
        properties.push(parsedProperty);
      } catch (error) {
        console.error('Failed to parse property, discarding.', error);
      }
    });
  }

  const guideGroup = {
    id,
    name,
    slug,
    description,
    groupId,
    lang,
    guidesCount: count,
    active: settings.active,
    images,
    location,
    pointProperties: properties,
  };

  return guideGroup;
};

const parseGuideType = item => {
  const acceptedGuideTypes = ['guide', 'trail'];
  return acceptedGuideTypes.find(type => type === item);
};

const getPostStatus = active => (active ? 'publish' : 'draft');

function parseImageUrls(data) {
  const images = [];
  try {
    if (data instanceof Array) {
      for (const item of data) {
        const image = parseImages(item.sizes);
        images.push(image);
      }
    }
  } catch (error) {
    // something went wrong
    console.error('Failed to parse images data: ', data);
  }
  return images;
}

function parseDate(data) {
  if (data === null || data === undefined) {
    throw new Error('Can not parse null/undefined to a date.');
  }
  return new Date(data).toISOString();
}

function parseMediaContent(data) {
  if (!(data instanceof Object)) {
    throw new Error('Failed to parse media content from data: ' + data);
  }

  const media = {
    contentType: data.type,
    created: parseDate(data.date),
    description: String(data.description),
    id: Number(data.id),
    modified: parseDate(data.modified),
    title: String(data.title),
    url: new URL(data.url).toString(),
  };
  return media;
}

const parseSubAttraction = (id, subAttractions, locations) => {
  const subAttractionData = subAttractions.find(item => {
    const { content } = item;
    return content instanceof Array && content.indexOf(id) > -1;
  });

  // Parse location data
  let location;
  try {
    const { location: locationId } = subAttractionData;
    const locationData = locations.find(locData => locData.id === locationId);
    location = parseLocation(locationData);
  } catch (error) {
    // discarding faulty location data
  }

  return location;
};

const parseLink = data => ({
  title: data.title,
  type: data.service,
  url: new URL(data.link).toString(),
});

const parseLinks = data => {
  const links = [];
  for (const item of data) {
    try {
      if (item) {
        const link = parseLink(item);
        links.push(link);
      }
    } catch (error) {
      // discarding link
    }
  }
  return links;
};

const parseContentObject = (key, data, subAttractions, locations) => {
  if (typeof data.order !== 'number') {
    console.log('parseContentObject error. bail');
    throw new Error('Failed to parse order from ' + data);
  }

  const postStatus = getPostStatus(data.active);
  const images = parseImageUrls(data.image);

  const obj = {
    id: key,
    images,
    order: Number(data.order),
    postStatus,
    searchableId: data.id,
    title: data.title,
  };

  if (data.description_plain) {
    obj.description = data.description_plain;
  }

  if (data.audio) {
    obj.audio = parseMediaContent(data.audio);
  }

  if (data.video) {
    obj.video = parseMediaContent(data.video);
  }

  if (data.links && data.links instanceof Array) {
    obj.links = parseLinks(data.links);
  }

  try {
    const parsedSubAttraction = parseSubAttraction(obj.id, subAttractions, locations);
    console.log('parsedSubAttraction', parsedSubAttraction);
    obj.location = parsedSubAttraction;
  } catch (error) {
    // ignoring subAttractions from this guide
  }

  return obj;
};

const parseContentObjects = (contentData, subAttractionsData, locationsData) => {
  const keys = Object.keys(contentData);

  let subAttractions = [];
  if (subAttractionsData instanceof Array) {
    subAttractions = subAttractionsData;
  }
  let locations = [];
  if (locationsData instanceof Array) {
    locations = locationsData;
  }

  const result = [];
  for (const key of keys) {
    try {
      const obj = parseContentObject(key, contentData[key], subAttractions, locations);
      result.push(obj);
    } catch (error) {
      console.error('Failed to parse content object, discarding.');
    }
  }

  return result;
};

export const parseGuide = item => {
  const guide = {
    childFriendly: Boolean(item.guide_kids),
    contentObjects: [],
    description: item.content.plain_text,
    guideGroupId: Number(item.guidegroup[0].id),
    guideType: parseGuideType(item.content_type),
    id: Number(item.id),
    images: parseImages(item.guide_images[0].sizes),
    name: item.title.plain_text,
    postStatus: item.status,
    slug: item.slug,
    tagline: item.guide_tagline,
  };

  const { contentObjects, subAttractions, _embedded: embeddedData } = item;
  let locationData = null;
  if (embeddedData) {
    locationData = embeddedData.location;
  }

  // parse guide location
  const { guide_location: locationId } = item;
  if (locationId && locationData && locationData instanceof Array) {
    const foundLoc = locationData.find(loc => loc.id === locationId);
    if (foundLoc) {
      try {
        guide.location = parseLocation(foundLoc);
      } catch (e) {
        // ignoring location from this guide
      }
    }
  }

  // content objects
  if (contentObjects && contentObjects instanceof Object) {
    guide.contentObjects = parseContentObjects(contentObjects, subAttractions, locationData);
  }

  if (item.guide_date_start) {
    const dateStart = parseDate(item.guide_date_start);
    guide.dateStart = dateStart;
  }

  if (item.guide_date_end) {
    const dateEnd = parseDate(item.guide_date_end);
    guide.dateEnd = dateEnd;
  }

  return guide;
};

const parseInteractiveGuideFinish = finishStep => {
  if (!finishStep) {
    return null;
  }

  const {
    header_title: header,
    content_area_title: title,
    content_area_text: body,
    display_share_result: displayShare,
    share_title: shareTitle,
    share_image: shareImage,
    images,
  } = finishStep;

  return {
    header,
    title,
    body,
    displayShare,
    shareTitle,
    shareImage: shareImage ? parseInteractiveGuideImage(shareImage) : null,
    images: images ? images.map(img => parseInteractiveGuideImage(img.image)) : [],
  };
};

const parseInteractiveGuideImage = image => {
  const { id, url, width, height } = image;

  return {
    id,
    url,
    aspectRatio: parseInt(width) / parseInt(height),
  };
};

const parseInteractiveGuideSteps = steps => {
  const parseStartStep = (step, index) => {
    const { type, start_guide_title: title, introduction_text: text, image } = step;

    return {
      id: `${type}${index}`,
      type,
      title,
      text,
      image: image ? parseInteractiveGuideImage(image) : null,
    };
  };

  const parseImageStep = (step, index) => {
    const { type, image } = step;

    if (!image) {
      return null;
    }

    return {
      id: `${type}${index}`,
      type,
      image: parseInteractiveGuideImage(image),
    };
  };

  const parseDialogStep = (step, index) => ({
    ...step,
    id: `${step.type}${index}`,
    alternatives: step.alternatives.map((alt, index) => ({
      ...alt,
      id: index,
    })),
  });

  return steps
    .map((step, index) => {
      if (step.type === 'start') {
        return parseStartStep(step, index);
      }

      if (step.type === 'image') {
        return parseImageStep(step, index);
      }

      if (step.type === 'dialog') {
        return parseDialogStep(step, index);
      }

      if (!step.id) {
        return {
          ...step,
          id: `${step.type}${index}`,
        };
      }

      return step;
    })
    .filter(step => step);
};

export const parseInteractiveGuide = data => {
  const interactiveGuide = {
    id: data.id,
    title: data.title.rendered,
    guideGroupId: data.guidegroup[0].id,
    image: data?.featured_media?.source_url ? data.featured_media.source_url : null,
    steps: parseInteractiveGuideSteps(data.steps.filter(step => step.type !== 'finish')),
    finish: parseInteractiveGuideFinish(data.steps.find(step => step.type === 'finish')),
  };

  return interactiveGuide;
};
