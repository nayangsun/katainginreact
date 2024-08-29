defmodule Katainginreact.Repo do
  use Ecto.Repo,
    otp_app: :katainginreact,
    adapter: Ecto.Adapters.Postgres
end
