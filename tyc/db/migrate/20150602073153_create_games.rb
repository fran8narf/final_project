class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|

      t.string :game_name
      t.integer :summoner_id
      t.string :game_img

      t.timestamps null: false
    end
  end
end
