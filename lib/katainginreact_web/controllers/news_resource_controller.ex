defmodule KatainginreactWeb.NewsResourceController do
  use KatainginreactWeb, :controller

  alias Katainginreact.NewsResources
  alias Katainginreact.Topics

  action_fallback KatainginreactWeb.FallbackController

  def index(conn, %{"topic_id" => topic_id}) do
    news_resources = NewsResources.list_news_resources_by_topic_id(topic_id)
    followed_topics = Topics.list_topics_by_user_id(conn.assigns.current_user.id)

    render(conn, :index,
      news_resources: news_resources,
      followed_topics: followed_topics
    )
  end
end
