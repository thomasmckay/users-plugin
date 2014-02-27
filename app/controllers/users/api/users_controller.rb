module Users
  module Api
    class UsersController < ::Api::V2::UsersController
      def index
        @render_template = 'users/api/users/index'
        super
      end
    end
  end
end
