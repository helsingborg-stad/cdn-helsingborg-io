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
    dayNumber,
    opening,
    weekday,
  };
  return openHour;
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
    id,
    latitude,
    links,
    longitude,
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
    pointProperties,
  } = item;

  const images = parseImages(sizes);
  const locationArray = _embedded.location;
  const location = parseLocation(locationArray[0]);

  const guideGroup = {
    active: settings.active,
    description,
    id,
    images,
    location,
    name,
    slug,
    guidesCount: count,
    pointProperties: pointProperties ?? [],
  };

  return guideGroup;
};
