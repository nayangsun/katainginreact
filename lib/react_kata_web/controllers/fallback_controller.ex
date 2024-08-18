defmodule ReactKataWeb.FallbackController do
  @moduledoc """
  Translates controller action results into valid `Plug.Conn` responses.

  See `Phoenix.Controller.action_fallback/1` for more details.
  """
  use ReactKataWeb, :controller

  # This clause handles errors returned by Ecto's insert/update/delete.
  def call(conn, {:error, %Ecto.Changeset{} = changeset}) do
    conn
    |> put_status(:unprocessable_entity)
    |> put_view(json: ReactKataWeb.ChangesetJSON)
    |> render(:error, changeset: changeset)
  end

  # This clause is an example of how to handle resources that cannot be found.
  def call(conn, {:error, :not_found}) do
    conn
    |> put_status(:not_found)
    |> put_view(html: ReactKataWeb.ErrorHTML, json: ReactKataWeb.ErrorJSON)
    |> render(:"404")
  end

  # This clause handles any user submission problems.
  def call(conn, {:error, :bad_request, error}) do
    conn
    |> put_status(:bad_request)
    |> put_view(html: ReactKataWeb.ErrorHTML, json: ReactKataWeb.ErrorJSON)
    |> render(:"400", error: error)
  end
end
