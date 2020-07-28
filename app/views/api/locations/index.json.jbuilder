json.array! @locations do |location|
  json.partial! "api/locations/location", location: location
end