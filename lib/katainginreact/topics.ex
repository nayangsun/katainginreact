defmodule Katainginreact.Topics do
  @moduledoc """
  The Topics context.
  """

  import Ecto.Query, warn: false
  alias Katainginreact.Repo

  alias Katainginreact.Topics.Topic

  def list_topics(), do: Repo.all(Topic)

  def get_topic!(id), do: Repo.get!(Topic, id)

  def create_topic(attrs) do
    %Topic{}
    |> Topic.changeset(attrs)
    |> Repo.insert()
  end

  def update_topic!(topic, attrs) do
    topic
    |> Topic.changeset(attrs)
    |> Repo.update!()
  end

  def delete_topic!(topic) do
    Repo.delete!(topic)
  end
end
