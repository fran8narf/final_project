Rails.application.routes.draw do
 	root "games#index"
 	get 'signup' => 'users#new'
 	get 'login' => 'sessions#new'
 	post 'login' => 'sessions#create'
 	delete 'logout' => 'sessions#destroy'

 	resources :games
 	resources :users

end
