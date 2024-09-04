defmodule Katainginreact.Fixtures.Topics do
  @type topic :: %{
          name: String.t(),
          short_description: String.t(),
          long_description: String.t(),
          image_url: String.t(),
          url: String.t()
        }

  topics_as_json = __DIR__ |> Path.join("assets/topics.json") |> File.read!() |> Jason.decode!()

  topics =
    for topic <- topics_as_json do
      %{
        name: topic["name"],
        short_description: topic["shortDescription"],
        long_description: topic["longDescription"],
        image_url: topic["imageUrl"],
        url: topic["url"]
      }
    end

  @spec topics() :: list(topic())
  def topics(), do: unquote(Macro.escape(topics))
end
