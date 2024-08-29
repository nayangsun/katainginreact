defmodule Katainginreact.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      KatainginreactWeb.Telemetry,
      Katainginreact.Repo,
      {DNSCluster, query: Application.get_env(:katainginreact, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Katainginreact.PubSub},
      # Start the Finch HTTP client for sending emails
      {Finch, name: Katainginreact.Finch},
      # Start a worker by calling: Katainginreact.Worker.start_link(arg)
      # {Katainginreact.Worker, arg},
      # Start to serve requests, typically the last entry
      KatainginreactWeb.Endpoint
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Katainginreact.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    KatainginreactWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
