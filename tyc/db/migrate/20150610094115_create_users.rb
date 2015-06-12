class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :f_name
      t.string :l_name
      t.string :user_name
      t.string :email
      t.integer :age
      t.string :dota_rol_pref
      t.string :lol_rol_pref
      t.string :dota_name
      t.string :lol_name
      t.string :password_digest
      t.string :role

      t.timestamps null: false
    end
  end
end
