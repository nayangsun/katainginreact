defmodule ReactKataWeb.UserSessionAPIJSON do
  alias ReactKata.Accounts.User

  @doc """
  Renders a single user.
  """
  def login(%{user: user, token: token}) do
    %{data: data(user, token)}
  end

  defp data(%User{} = user, token) do
    %{
      user_id: user.id,
      token: token
    }
  end
end
