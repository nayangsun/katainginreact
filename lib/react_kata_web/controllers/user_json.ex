defmodule ReactKataWeb.UserJSON do
  alias ReactKata.Accounts.User

  @doc """
  Renders a single user.
  """
  def show(%{user: user}) do
    %{data: data(user)}
  end

  defp data(%User{} = user) do
    %{
      id: user.id
    }
  end
end
