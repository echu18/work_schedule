# json.array! @technicians do |technician|
#   json.partial! "api/technicians/technician", technician: technician
# end


@technicians.each do |technician|
  json.set! technician.id do
    json.partial! "api/technicians/technician", technician: technician
  end
end

# json.work_orders do
#   json.array! technician.work_orders do |work_order|
#       json.id work_order.id
#       json.technician_id work_order.technician_id
#       json.location_id work_order.location_id
#       json.time work_order.time
#       json.duration work_order.duration
#       json.price work_order.price
#   end
# end