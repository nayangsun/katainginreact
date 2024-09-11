defmodule Katainginreact.Fixtures.News do
  @type news :: %{
          title: String.t(),
          content: String.t(),
          url: String.t(),
          header_image_url: String.t(),
          publish_date: DateTime.t(),
          type: String.t(),
          topic_ids: list(String.t())
        }

  news_as_json = __DIR__ |> Path.join("assets/news.json") |> File.read!() |> Jason.decode!()

  news =
    for news <- news_as_json do
      publish_date = news["publishDate"] |> DateTime.from_iso8601() |> elem(1)

      %{
        title: news["title"],
        content: news["content"],
        url: news["url"],
        header_image_url: news["headerImageUrl"],
        publish_date: publish_date,
        type: news["type"],
        topic_ids: news["topics"]
      }
    end

  @spec news() :: list(news())
  def news(), do: unquote(Macro.escape(news))
end
