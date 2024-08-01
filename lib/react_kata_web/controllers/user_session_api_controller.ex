defmodule ReactKataWeb.UserSessionAPIController do
  use ReactKataWeb, :controller

  alias ReactKata.Accounts
  alias ReactKataWeb.UserAPIAuth

  action_fallback ReactKataWeb.FallbackController

  def create(conn, %{"user" => user_params}) do
    %{"email" => email, "password" => password} = user_params

    if user = Accounts.get_user_by_email_and_password(email, password) do
      token =
        user
        |> UserAPIAuth.generate_token()
        |> Base.encode64()

      render(conn, :login, user: user, token: token)
    else
      {:error, :bad_request, "Invalid username or password."}
    end
  end
end
