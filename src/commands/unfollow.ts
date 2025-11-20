import { getFeedByUrl, unfollowFeed } from 'src/lib/db/queries/feeds';
import { User } from 'src/lib/db/schema';

export async function handlerUnfollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length === 0) {
    throw new Error('Expects feed url as argument');
  }

  const url = args[0];
  const feed = await getFeedByUrl(url);

  if (!feed) {
    throw new Error(`No feed found with URL: ${url}`);
  }

  const deletedFeedFollow = await unfollowFeed(user.id, feed.id);
  console.log(deletedFeedFollow);
}
