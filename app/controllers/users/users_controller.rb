require_dependency "users/application_controller"

module Users
  class UsersController < Users::ApplicationController

    before_filter :authorize

    def rules
      {
        :index => lambda {true},
        :plugin => lambda {true}
      }
    end

    def index
      render 'bastion/layouts/application', :layout => false
    end

    def plugin
      #redirect_to :action => 'index', :anchor => '/users'
      render 'bastion/layouts/application', :layout => false, :anchor => '/users'
    end
  end
end
