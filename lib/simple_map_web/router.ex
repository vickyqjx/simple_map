defmodule SimpleMapWeb.Router do
  use SimpleMapWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  # scope "/api", SimpleMapWeb do
  #  pipe_through :api
  # end

  scope "/" do
    pipe_through :api

    forward "/graphiql", Absinthe.Plug.GraphiQL, schema: SimpleMapWeb.Schema

    forward "/", Absinthe.Plug, schema: SimpleMapWeb.Schema
  end
end
