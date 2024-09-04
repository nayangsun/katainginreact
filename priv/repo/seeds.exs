# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Katainginreact.Repo.insert!(%Katainginreact.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

alias Katainginreact.Accounts

{:ok, _user} = Accounts.register_user(%{email: "user@example.com", password: "password1234"})
