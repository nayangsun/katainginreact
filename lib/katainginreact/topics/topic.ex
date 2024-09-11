defmodule Katainginreact.Topics.Topic do
  use Katainginreact.Schema
  import Ecto.Changeset
  import Ecto.Query, warn: false

  alias Katainginreact.Accounts.User
  alias Katainginreact.NewsResources.NewsResource

  @required_fields [:name]
  @optional_fields [:short_description, :long_description, :image_url, :url]

  schema "topics" do
    field :name, :string
    field :short_description, :string
    field :long_description, :string
    field :image_url, :string
    field :url, :string

    many_to_many :users, User, join_through: "user_topics"
    many_to_many :news_resources, NewsResource, join_through: "news_resources_topics"

    timestamps()
  end

  def changeset(topic, attrs) do
    topic
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end

  def where_topic_ids(query, topic_ids) do
    from t in query, where: t.id in ^topic_ids
  end
end
