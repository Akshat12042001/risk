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
