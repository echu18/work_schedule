class CreateTechnicians < ActiveRecord::Migration[5.2]
  def change
    create_table(:technicians, id: false) do |t|
      t.integer :id
      t.string :name
      t.timestamps
    end
  end
end
