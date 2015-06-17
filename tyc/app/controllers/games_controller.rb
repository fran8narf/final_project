class GamesController < ApplicationController

	before_action :require_general_user, only:[:show]

	def index
		@games = Game.all
	end

	def show
		@game = Game.find(params[:id])
		if @game.game_name === "League of Legends"
			render "_search_imgs"			
		else
			render "_search_imgs_without_login"
		end 
	end



	private
	def game_params
		params.require(:game).permit(:game_name, :summoner_id, :game_img)
	end
end