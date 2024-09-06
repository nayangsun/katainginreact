defmodule KatainginreactWeb.UserSessionAPIJSON do
  alias Katainginreact.Accounts.User

  def login(%{message: message}) do
    %{message: message}
  end

  def show(%{user: user}) do
    %{data: data(user)}
  end

  defp data(%User{} = user) do
    %{
      id: user.id
    }
  end
end
