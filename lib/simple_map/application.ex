defmodule SimpleMap.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    # List all child processes to be supervised
    children = [
      # Start the endpoint when the application starts
      SimpleMapWeb.Endpoint
      # Starts a worker by calling: SimpleMap.Worker.start_link(arg)
      # {SimpleMap.Worker, arg},
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: SimpleMap.Supervisor]
    Supervisor.start_link(children, opts)

    # Keep favoriate list, TODO: move to Database later
    Agent.start_link(fn -> [] end, name: :bookmarks)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    SimpleMapWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
