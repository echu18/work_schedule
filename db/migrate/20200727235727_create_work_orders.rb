class CreateWorkOrders < ActiveRecord::Migration[5.2]
  def change
    create_table(:work_orders, id: false) do |t|
      t.integer :id
      t.integer :technician_id
      t.integer :location_id
      t.datetime :time
      t.integer :duration
      t.integer :price
      t.timestamps
    end
  end
end
