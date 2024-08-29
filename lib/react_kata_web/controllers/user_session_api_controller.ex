defmodule KatainginreactWeb.UserSessionAPIController do
  use KatainginreactWeb, :controller

  alias Katainginreact.Accounts
  alias KatainginreactWeb.UserAPIAuth

  action_fallback KatainginreactWeb.FallbackController

  def create(conn, %{"user" => user_params}) do
    %{"email" => email, "password" => password} = user_params

    if user = Accounts.get_user_by_email_and_password(email, password) do
      conn
      |> UserAPIAuth.log_in_user_api(user)
      |> render(:login, message: "Logged in successfully")
    else
      {:error, :bad_request, "Invalid email or password"}
    end
  end

  def delete(conn, _params) do
    conn
    |> UserAPIAuth.log_out_user_api()
    |> json(%{status: :ok})
  end
end
