Rails.application.routes.draw do
  namespace 'users' do
    match 'plugin' => 'users#plugin', :via => :get

    namespace 'api' do
      match 'index' => 'users#index', :via => :get
    end
  end
end
