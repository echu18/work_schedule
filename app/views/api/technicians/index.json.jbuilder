json.array! @technicians do |technician|
  json.partial! "api/technicians/technician", technician: technician
end