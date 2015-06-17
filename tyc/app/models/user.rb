class User < ActiveRecord::Base
	has_secure_password

	def admin? 
		self.role == 'admin'
	end

	def user? 
		self.role == 'user'
	end
end

