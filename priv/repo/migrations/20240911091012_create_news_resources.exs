defmodule Katainginreact.Repo.Migrations.CreateNewsResources do
  use Ecto.Migration

  def change do
    create table(:news_resources) do
      add :title, :text, null: false
      add :content, :text, null: false
      add :url, :text, null: false
      add :header_image_url, :text, null: false
      add :publish_date, :utc_datetime, null: false
      add :type, :text

      timestamps()
    end
  end
end
