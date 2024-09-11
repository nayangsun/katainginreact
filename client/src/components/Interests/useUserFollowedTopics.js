import { useQueries } from "@tanstack/react-query";
import { QUERY_KEY } from "../../lib/constants";
import fetchJson from "../../lib/fetch_json";
import { extractQueriedData } from "../../lib/utils";

function useUserFollowedTopics() {
  return useQueries({
    queries: [
      {
        queryKey: [QUERY_KEY.topic],
        queryFn: () => fetchJson("/api/topics", { credentials: "include" }),
      },
      {
        queryKey: [QUERY_KEY.user],
        queryFn: () => fetchJson("/api/me", { credentials: "include" }),
      },
    ],
    combine: (results) => {
      const [topicResult, userResult] = results;
      const topicData = extractQueriedData(topicResult.data) || [];
      const userData = extractQueriedData(userResult.data) || {
        followedTopics: [],
      };

      const followedTopics = userData.followedTopics;
      const mergedTopics = topicData.map((topic) => ({
        ...topic,
        isFollowed: followedTopics.includes(topic.id),
      }));

      return {
        data: { topics: mergedTopics },
        isPending: results.some((result) => result.isPending),
        error: results.find((result) => result.error)
          ? results.find((result) => result.error).error
          : null,
      };
    },
  });
}

export default useUserFollowedTopics;
