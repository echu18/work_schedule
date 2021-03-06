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
    self.primary_key = 'id'

    validates :id, :technician_id, :location_id, :time, :duration, :price, presence: true

    belongs_to :technician, foreign_key: :technician_id, class_name: :Technician
    belongs_to :location, foreign_key: :location_id, class_name: :Location
end

