import { getFeedFollowsForUser } from 'src/lib/db/queries/feeds';
import { User } from 'src/lib/db/schema';

export async function handlerFollowing(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  const feedFollows = await getFeedFollowsForUser(user.id);
  feedFollows.forEach((feedFollow) => {
    console.log(feedFollow.feedName);
  });
}
