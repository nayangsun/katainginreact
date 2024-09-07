defmodule KatainginreactWeb.UserRegistrationController do
  use KatainginreactWeb, :controller

  alias Katainginreact.Accounts
  alias KatainginreactWeb.UserAPIAuth

  action_fallback KatainginreactWeb.FallbackController

  def create(conn, %{"user" => user_params}) do
    with {:ok, user} <- Accounts.register_user(user_params) do
      {:ok, _} =
        Accounts.deliver_user_confirmation_instructions(
          user,
          &url(~p"/users/confirm/#{&1}")
        )

      conn
      |> UserAPIAuth.log_in_user_api(user)
      |> render(:register, message: "User registered successfully")
    end
  end
end
