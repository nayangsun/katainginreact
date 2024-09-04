alias Ecto.Multi
alias Katainginreact.Repo

alias Katainginreact.Accounts
alias Katainginreact.Topics.Topic

{:ok, _user} = Accounts.register_user(%{email: "user@example.com", password: "password1234"})

{:ok, _results} =
  Katainginreact.Fixtures.Topics.topics()
  |> Enum.map(&Topic.changeset(%Topic{}, &1))
  |> Enum.with_index()
  |> Enum.reduce(Multi.new(), fn {topic_changeset, index}, multi ->
    Multi.insert(multi, {:topic, index}, topic_changeset)
  end)
  |> Repo.transaction()
