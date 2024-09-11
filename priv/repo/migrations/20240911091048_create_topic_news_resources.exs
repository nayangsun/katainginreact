defmodule Katainginreact.Repo.Migrations.CreateTopicNewsResources do
  use Ecto.Migration

  def change do
    create table(:news_resources_topics, primary_key: false) do
      add :news_resource_id, references(:news_resources, on_delete: :delete_all), null: false
      add :topic_id, references(:topics, on_delete: :delete_all), null: false
    end

    create index(:news_resources_topics, [:topic_id])
    create unique_index(:news_resources_topics, [:news_resource_id, :topic_id])
  end
end
