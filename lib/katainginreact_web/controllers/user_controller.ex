defmodule KatainginreactWeb.UserController do
  use KatainginreactWeb, :controller

  action_fallback KatainginreactWeb.FallbackController

  def show(conn, _params) do
    render(conn, :show, user: conn.assigns.current_user)
  end
end
