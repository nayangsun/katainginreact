defmodule KatainginreactWeb.TopicJSON do
  use KatainginreactWeb, :controller

  alias Katainginreact.Topics.Topic

  def index(%{topics: topics}) do
    %{data: for(topic <- topics, do: data(topic))}
  end

  def show(%{topic: topic, followed?: followed?}) do
    %{data: data(topic, followed?)}
  end

  defp data(%Topic{} = topic, followed?) do
    topic |> data() |> Enum.into(%{followed: followed?})
  end

  defp data(%Topic{} = topic) do
    %{
      id: topic.id,
      name: topic.name,
      shortDescription: topic.short_description,
      longDescription: topic.long_description,
      imageUrl: topic.image_url,
      url: topic.url
    }
  end
end
