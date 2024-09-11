defmodule Katainginreact.NewsResources do
  @moduledoc """
  The NewsResources context.
  """

  import Ecto.Query, warn: false
  import Ecto.Changeset

  alias Ecto.Multi
  alias Katainginreact.Repo

  alias Katainginreact.NewsResources.NewsResource
  alias Katainginreact.Topics.Topic

  def create_news_resource(attrs) do
    %NewsResource{}
    |> NewsResource.changeset(attrs)
    |> Repo.insert()
  end

  def assign_topics_to_news_resource(news_resource, topic_ids) do
    topics = Topic |> Topic.where_topic_ids(topic_ids) |> Repo.all()

    news_resource
    |> Repo.preload(:topics)
    |> change()
    |> put_assoc(:topics, topics)
  end

  def create_news_resource_with_topics(attrs, topic_ids) do
    changeset = NewsResource.changeset(%NewsResource{}, attrs)

    Multi.new()
    |> Multi.insert(:insert_news_resource, changeset)
    |> Multi.update(:assign_topics, fn %{insert_news_resource: news_resource} ->
      assign_topics_to_news_resource(news_resource, topic_ids)
    end)
    |> Repo.transaction()
    |> case do
      {:ok, %{insert_news_resource: news_resource}} -> {:ok, news_resource}
      {:error, _, reason, _} -> {:error, reason}
    end
  end
end
