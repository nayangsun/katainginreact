defmodule ReactKata.Repo do
  use Ecto.Repo,
    otp_app: :react_kata,
    adapter: Ecto.Adapters.Postgres
end
