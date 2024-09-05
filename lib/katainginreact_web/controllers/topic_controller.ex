defmodule KatainginreactWeb.TopicController do
  use KatainginreactWeb, :controller

  alias Katainginreact.Topics

  action_fallback KatainginreactWeb.FallbackController

  def index(conn, _params) do
    topics = Topics.list_topics()
    render(conn, :index, topics: topics)
  end
end
