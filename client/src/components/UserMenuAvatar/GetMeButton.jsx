import { React } from "react";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../lib/constants";
import fetchJson from "../../lib/fetch_json";

export default function GetMeButton() {
  const { data: user, refetch, error, isFetching } = useQuery({
    queryKey: [QUERY_KEY.test],
    queryFn: async () => fetchJson("/api/me", { credentials: "include" }),
    enabled: false,
  });

  function handleGetMe() {
    refetch();
  }

  return (
    <div>
      <button onClick={handleGetMe}>GetMe</button>
      {isFetching && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {user && <div>User: {JSON.stringify(user)}</div>}
    </div>
  );
}
