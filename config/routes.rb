Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    root 'static_pages#root'

    namespace :api, defaults: {format: :json} do
      resources :technicians, only: [:index, :show, :create, :update, :destroy]
      resources :locations, only: [:index, :show, :create, :update, :destroy]

      resources :work_orders, only: [:index, :show, :create, :update, :destroy]


      post '/import_technician_data', to: 'technicians#import_data'
      post '/import_location_data', to: 'locations#import_data'
      post '/import_work_order_data', to: 'work_orders#import_data'
    end
end
