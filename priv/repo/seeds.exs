alias Ecto.Multi
alias Katainginreact.Repo

alias Katainginreact.Accounts
alias Katainginreact.Topics.Topic
alias Katainginreact.NewsResources
alias Katainginreact.NewsResources.NewsResource

{:ok, _user} = Accounts.register_user(%{email: "user@example.com", password: "password1234"})

Katainginreact.Fixtures.Topics.topics()
|> Enum.map(&Topic.changeset(%Topic{}, &1))
|> Enum.with_index()
|> Enum.reduce(Multi.new(), fn {topic_changeset, index}, multi ->
  Multi.insert(multi, {:topic, index}, topic_changeset)
end)
|> Repo.transaction()
|> case do
  {:ok, _results} -> IO.puts("Topics inserted successfully.")
  {:error, _operation, reason, _changes} -> IO.inspect(reason, label: "Error inserting topics")
end

Katainginreact.Fixtures.News.news()
|> Enum.with_index()
|> Enum.reduce(Multi.new(), fn {news, index}, multi ->
  changeset = NewsResource.changeset(%NewsResource{}, news)

  multi
  |> Multi.insert({:insert_news_resource, index}, changeset)
  |> Multi.merge(fn %{{:insert_news_resource, ^index} => news_resource} ->
    Multi.new()
    |> Multi.update({:assign_topics, index}, fn _ ->
      NewsResources.assign_topics_to_news_resource(news_resource, news.topic_ids)
    end)
  end)
end)
|> Repo.transaction()
|> case do
  {:ok, _result} ->
    IO.puts("News batch inserted successfully.")

  {:error, _operation, reason, _changes} ->
    IO.inspect(reason, label: "Error inserting news")
end
