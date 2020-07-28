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
    require 'csv'

    validates :id, :technician_id, :location_id, :time, :duration, :price, presence: true


    def importFile(file)
        items = []
        CSV.foreach(file, headers: true) do |row|
            items << row.to_h
        end

        WorkOrder.import(items)
    end
end
