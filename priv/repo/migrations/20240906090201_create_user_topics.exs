defmodule Katainginreact.Repo.Migrations.CreateUserTopics do
  use Ecto.Migration

  def change do
    create table(:user_topics, primary_key: false) do
      add :user_id, references(:users, on_delete: :delete_all), null: false
      add :topic_id, references(:topics, on_delete: :delete_all), null: false
    end

    create index(:user_topics, [:user_id])
    create unique_index(:user_topics, [:user_id, :topic_id])
  end
end
