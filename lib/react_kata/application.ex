defmodule ReactKata.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      ReactKataWeb.Telemetry,
      ReactKata.Repo,
      {DNSCluster, query: Application.get_env(:react_kata, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: ReactKata.PubSub},
      # Start the Finch HTTP client for sending emails
      # Start a worker by calling: ReactKata.Worker.start_link(arg)
      # {ReactKata.Worker, arg},
      # Start to serve requests, typically the last entry
      ReactKataWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: ReactKata.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    ReactKataWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
