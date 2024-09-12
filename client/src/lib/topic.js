export const mergeTopicsWithFollowStatus = (topicData, followedTopics) => {
  return topicData.map((topic) => ({
    ...topic,
    isFollowed: followedTopics.includes(topic.id),
  }));
};
