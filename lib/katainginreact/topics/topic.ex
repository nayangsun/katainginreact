defmodule Katainginreact.Topics.Topic do
  use Katainginreact.Schema
  import Ecto.Changeset

  @required_fields [:name]
  @optional_fields [:short_description, :long_description, :image_url, :url]

  schema "topics" do
    field :name, :string
    field :short_description, :string
    field :long_description, :string
    field :image_url, :string
    field :url, :string

    timestamps()
  end

  def changeset(topic, attrs) do
    topic
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end
end
