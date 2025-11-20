import { createFeed, createFeedFollow } from 'src/lib/db/queries/feeds';
import { User } from 'src/lib/db/schema';

export async function handlerAddFeed(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length < 2) {
    throw new Error('You must pass a name and a link to an RSS Feed');
  }
  const [feedName, feedLink] = args;

  const createdFeed = await createFeed(feedName, feedLink);

  const feedFollow = await createFeedFollow(user.id, createdFeed.id);

  console.log(`${feedFollow.feedName} - ${feedFollow.userName}`);
}
