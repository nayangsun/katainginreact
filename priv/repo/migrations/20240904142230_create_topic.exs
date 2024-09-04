defmodule Katainginreact.Repo.Migrations.CreateTopic do
  use Ecto.Migration

  def change do
    create table(:topics) do
      add :name, :string, null: false
      add :short_description, :string
      add :long_description, :text
      add :image_url, :string
      add :url, :string

      timestamps()
    end

    create unique_index(:topics, [:name])
  end
end
