defmodule Katainginreact.Topics.Topic do
  use Katainginreact.Schema
  import Ecto.Changeset

  alias Katainginreact.Accounts.User

  @required_fields [:name]
  @optional_fields [:short_description, :long_description, :image_url, :url]

  schema "topics" do
    field :name, :string
    field :short_description, :string
    field :long_description, :string
    field :image_url, :string
    field :url, :string

    many_to_many :users, User, join_through: "user_topics"

    timestamps()
  end

  def changeset(topic, attrs) do
    topic
    |> cast(attrs, @required_fields ++ @optional_fields)
    |> validate_required(@required_fields)
  end
end
