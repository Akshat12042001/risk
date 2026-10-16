export const getAddressFromCoords = async (latitude, longitude, apiKey) => {
  if (!apiKey) {
    return null;
  }

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`,
  );
  const data = await response.json();

  if (data?.status && data.status !== 'OK') {
    return null;
  }

  const result = data?.results?.[0];
  if (!result) {
    return null;
  }

  const title =
    result.address_components?.find(item =>
      item.types?.includes('premise'),
    )?.short_name ||
    result.address_components?.find(item =>
      item.types?.includes('sublocality_level_1'),
    )?.short_name ||
    result.address_components?.find(item =>
      item.types?.includes('route'),
    )?.short_name ||
    result.formatted_address?.split(',')[0] ||
    null;

  return {
    title,
    address: result.formatted_address,
    latitude,
    longitude,
  };
};

export const searchPlaces = async (input, apiKey) => {
  if (!apiKey || !input?.trim()) {
    return [];
  }

  const response = await fetch(
    'https://places.googleapis.com/v1/places:autocomplete',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': apiKey,
      },
      body: JSON.stringify({
        input: input.trim(),
        includedRegionCodes: ['in'],
        languageCode: 'en',
      }),
    },
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || 'Places search failed');
  }

  return (data.suggestions || [])
    .filter(item => item.placePrediction)
    .map(item => {
      const prediction = item.placePrediction;
      return {
        placeId: prediction.placeId,
        description: prediction.text?.text || '',
        mainText: prediction.structuredFormat?.mainText?.text || '',
        secondaryText: prediction.structuredFormat?.secondaryText?.text || '',
      };
    });
};

export const getPlaceDetails = async (placeId, apiKey) => {
  if (!apiKey || !placeId) {
    return null;
  }

  const response = await fetch(
    `https://places.googleapis.com/v1/places/${placeId}`,
    {
      headers: {
        'X-Goog-Api-Key': apiKey,
        'X-Goog-FieldMask':
          'id,displayName,formattedAddress,location',
      },
    },
  );
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || 'Place details failed');
  }

  return {
    title: data.displayName?.text || data.formattedAddress?.split(',')[0],
    address: data.formattedAddress || '',
    latitude: data.location?.latitude,
    longitude: data.location?.longitude,
  };
};
