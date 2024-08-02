defmodule ReactKataWeb.UserController do
  use ReactKataWeb, :controller

  action_fallback ReactKataWeb.FallbackController

  def show(conn, _params) do
    render(conn, :show, user: conn.assigns.current_user)
  end
end
