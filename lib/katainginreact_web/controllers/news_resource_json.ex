defmodule KatainginreactWeb.NewsResourceJSON do
  use KatainginreactWeb, :controller

  alias Katainginreact.NewsResources.NewsResource
  alias Katainginreact.Topics.Topic

  def index(%{news_resources: news_resources, followed_topics: followed_topics}) do
    %{data: for(news_resource <- news_resources, do: data(news_resource, followed_topics))}
  end

  defp data(%NewsResource{} = news_resource, followed_topics) do
    topics_with_follow_status =
      Enum.map(news_resource.topics, fn topic ->
        follow? = Enum.member?(followed_topics, topic)
        data(topic, follow?)
      end)

    %{
      id: news_resource.id,
      title: news_resource.title,
      content: news_resource.content,
      url: news_resource.url,
      headerImageUrl: news_resource.header_image_url,
      publishDate: news_resource.publish_date,
      type: news_resource.type,
      topics: topics_with_follow_status
    }
  end

  defp data(%Topic{} = topic, follow?) do
    %{
      id: topic.id,
      name: topic.name,
      isFollowed: follow?
    }
  end
end
