class UsersController < ApplicationController
	def show
		@user = User.find(params[:id])
	end
	
	def new
		@user = User.new
	end

	def create
		@user = User.new(user_params)
		if @user.save
			 session[:user_id] = @user.id
			redirect_to '/'
		else
			redirect_to '/signup'
		end
	end


	private
	def user_params
		params.require(:user).permit(:user_name, :email, :age, :dota_rol_pref, :lol_rol_pref, :dota_name, :lol_name, :password)
	end
end
