defmodule KatainginreactWeb.UserController do
  use KatainginreactWeb, :controller

  alias Katainginreact.Repo
  alias Katainginreact.Accounts
  alias Katainginreact.Topics

  action_fallback KatainginreactWeb.FallbackController

  def show(conn, _params) do
    user = Repo.preload(conn.assigns.current_user, :topics)

    render(conn, :show, user: user)
  end

  def follow(conn, %{"topic_id" => topic_id}) do
    topic = Topics.get_topic!(topic_id)

    with {:ok, user} <- Accounts.follow_topic(conn.assigns.current_user, topic) do
      render(conn, :show, user: user)
    end
  end

  def unfollow(conn, %{"topic_id" => topic_id}) do
    topic = Topics.get_topic!(topic_id)

    with {:ok, user} <- Accounts.unfollow_topic(conn.assigns.current_user, topic) do
      render(conn, :show, user: user)
    end
  end
end
