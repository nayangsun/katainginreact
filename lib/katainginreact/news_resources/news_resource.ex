defmodule Katainginreact.NewsResources.NewsResource do
  use Katainginreact.Schema
  import Ecto.Changeset

  alias Katainginreact.Topics.Topic

  @required_fields [:title, :content, :url, :header_image_url, :publish_date]
  @optional_fields [:type]

  schema "news_resources" do
    field :title, :string
    field :content, :string
    field :url, :string
    field :header_image_url, :string
    field :publish_date, :utc_datetime
    field :type, :string

    many_to_many :topics, Topic, join_through: "news_resources_topics"

    timestamps()
  end

  def changeset(news_resource, attrs) do
    news_resource
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end
end
