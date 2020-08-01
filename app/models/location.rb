# == Schema Information
#
# Table name: locations
#
#  id         :integer
#  name       :string
#  city       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Location < ApplicationRecord
    self.primary_key = 'id'

    validates :id, :name, :city, presence: true

    has_many :work_orders, foreign_key: :location_id, class_name: :WorkOrder
end
