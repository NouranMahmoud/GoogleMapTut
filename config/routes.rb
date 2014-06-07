GoogleMapsTut::Application.routes.draw do
      
  root "pages#home"
  
  get "/home", to: "pages#home", as: "home"
end
