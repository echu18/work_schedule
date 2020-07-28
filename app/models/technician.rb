# == Schema Information
#
# Table name: technicians
#
#  id         :integer
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
class Technician < ApplicationRecord
    validates :id, :name, presence: true

    has_many :work_orders, foreign_key: :technician_id, class_name: :WorkOrder
end
