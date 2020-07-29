@work_orders.each do |work_order|
  json.set! work_order.id do
    json.partial! "api/work_orders/work_order", work_order: work_order
  end
end


# json.array! @work_orders do |work_order|
#   json.set! work_order.id do
#     json.partial! "api/work_orders/work_order", work_order: work_order
#   end
# end