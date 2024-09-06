defmodule KatainginreactWeb.UserJSON do
  alias Katainginreact.Accounts.User

  @doc """
  Renders a single user.
  """
  def show(%{user: user}) do
    %{data: data(user)}
  end

  defp data(%User{} = user) do
    %{
      id: user.id,
      followedTopics: fetch_followed_topic_ids(user.topics)
    }
  end

  defp fetch_followed_topic_ids(topics), do: Enum.map(topics, & &1.id)
end
