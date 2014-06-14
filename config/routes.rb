GoogleMapsTut::Application.routes.draw do
      
  root "pages#home"
  
  get "/home", to: "pages#home", as: "home"
  get "/geocoding", to: "pages#geocoding", as: "geocoding"
  get "/reverse_geocoding", to: "pages#reverse_geocoding", as: "reverse_geocoding"
end
