defmodule ReactKataWeb.UserSessionAPIController do
  use ReactKataWeb, :controller

  alias ReactKata.Accounts
  alias ReactKataWeb.UserAPIAuth

  action_fallback ReactKataWeb.FallbackController

  def create(conn, %{"user" => user_params}) do
    %{"email" => email, "password" => password} = user_params

    if user = Accounts.get_user_by_email_and_password(email, password) do
      conn
      |> UserAPIAuth.log_in_user_api(user)
      |> render(:login, message: "Logged in successfully")
    else
      {:error, :unauthorized}
    end
  end
end
