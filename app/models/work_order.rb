# == Schema Information
#
# Table name: work_orders
#
#  id            :integer
#  technician_id :integer
#  location_id   :integer
#  time          :datetime
#  duration      :integer
#  price         :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
class WorkOrder < ApplicationRecord
end
