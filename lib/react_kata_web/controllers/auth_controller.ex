defmodule ReactKataWeb.AuthController do
  use ReactKataWeb, :controller

  alias ReactKata.Accounts
  alias ReactKataWeb.UserAuth

  def create(conn, %{"user" => user_params}) do
    %{"email" => email, "password" => password} = user_params

    if user = Accounts.get_user_by_email_and_password(email, password) do
      conn
      |> UserAuth.log_in_user(user, user_params)
      |> json(%{status: :ok})
    else
      # In order to prevent user enumeration attacks, don't disclose whether the email is registered.
      json(conn, %{status: :error, message: "Invalid email or password."})
    end
  end

  def delete(conn, _params) do
    conn
    |> UserAuth.log_out_user()
  end

  def redirect_to_app(conn, to: path),
    do: redirect(conn, external: "http://localhost:3000" <> path)
end
