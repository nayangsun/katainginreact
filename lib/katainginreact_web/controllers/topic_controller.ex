defmodule KatainginreactWeb.TopicController do
  use KatainginreactWeb, :controller

  alias Katainginreact.Topics

  action_fallback KatainginreactWeb.FallbackController

  def index(conn, _params) do
    topics = Topics.list_topics()
    render(conn, :index, topics: topics)
  end

  def show(conn, %{"id" => id}) do
    topic = Topics.get_topic!(id)

    followed? =
      conn.assigns.current_user.id
      |> Topics.list_topics_by_user_id()
      |> Enum.member?(topic)

    render(conn, :show, topic: topic, followed?: followed?)
  end
end
