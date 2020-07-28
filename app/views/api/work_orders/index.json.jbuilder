json.array! @work_orders do |work_order|
  json.partial! "api/work_orders/work_order", work_order: work_order
end