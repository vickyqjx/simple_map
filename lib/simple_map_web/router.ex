defmodule SimpleMapWeb.Router do
  use SimpleMapWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/api", SimpleMapWeb do
    pipe_through :api
  end
end
