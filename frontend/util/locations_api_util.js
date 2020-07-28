export const allLocations = () => {
  return $.ajax({
    url: `/api/locations`,
    method: "GET",
  });
};

export const createLocation = (locationData) => {
  return $.ajax({
    url: `/api/locations`,
    method: "POST",
    data: { location: locationData },
  });
};

export const getLocation = (locationId) => {
  return $.ajax({
    url: `/api/locations/${locationId}`,
    method: "GET",
    data: { locationId },
  });
};

export const editLocation = (locationId, locationData) => {
  return $.ajax({
    url: `/api/locations/${locationId}`,
    method: "PATCH",
    data: { location: locationData },
  });
};

export const deleteLocation = (locationId) => {
  return $.ajax({
    url: `/api/locations/${locationId}`,
    method: "DELETE",
  });
};
