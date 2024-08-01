defmodule ReactKataWeb.UserAPIAuth do
  use ReactKataWeb, :verified_routes

  import Plug.Conn
  import Phoenix.Controller

  alias ReactKata.Accounts

  def generate_token(user) do
    Accounts.generate_user_session_token(user)
  end

  @doc """
  Authenticates the user by looking into the session
  and remember me token.
  """
  def fetch_current_user(conn, _opts) do
    user_token = authorize_user_token(conn)

    user =
      user_token &&
        user_token
        |> Base.url_decode64!()
        |> Accounts.get_user_by_session_token()

    assign(conn, :current_user, user)
  end

  def authorize_user_token(conn) do
    case get_req_header(conn, "authorization") do
      ["Bearer " <> user_token] -> user_token
      _ -> nil
    end
  end

  @doc """
  Used for routes that require the user to be authenticated.

  If you want to enforce the user email is confirmed before
  they use the application at all, here would be a good place.
  """
  def require_authenticated_user(conn, _opts) do
    if conn.assigns[:current_user] do
      conn
    else
      conn
      |> put_status(401)
      |> put_view(html: ReactKataWeb.ErrorHTML, json: ReactKataWeb.ErrorJSON)
      |> render(:"401")
      |> halt()
    end
  end
end
