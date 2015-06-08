class GamesController < ApplicationController
	def index
		@games = Game.all
	end

	def show
		@game = Game.find(params[:id])
		if @game.game_name === "League of Legends"
			@search = "<div class='searchBar'>
					<span id='searchText'>Input Summoner's name</span>
	 				<Input type='text' id='sumName'>
				 	<select id='select'>
					    <option value='SEASON3'>Season 3</option>
					    <option value='SEASON2014'>Season 4</option>
					    <option value='SEASON2015'>Season 5</option>
					</select>
					<button id='send' onclick='lookForSummoner()'>Search</button></div>".html_safe
		else
			@search = "<h2 class='warning'>Dota2 API Not available. We are sorry!</h2>".html_safe
		end 
	end

	private
	def game_params
		params.require(:game).permit(:game_name, :summoner_id, :game_img)
	end
end
