import { readConfig } from 'src/config';
import { createFeed, createFeedFollow } from 'src/lib/db/queries/feeds';
import { findUser } from 'src/lib/db/queries/users';

export async function handlerAddFeed(cmdName: string, ...args: string[]) {
  if (args.length < 2) {
    throw new Error('You must pass a name and a link to an RSS Feed');
  }
  const [feedName, feedLink] = args;

  const userName = readConfig().currentUserName;
  const user = await findUser(userName);

  const createdFeed = await createFeed(feedName, feedLink);

  const feedFollow = await createFeedFollow(user.id, createdFeed.id);

  console.log(`${feedFollow.feedName} - ${feedFollow.userName}`);
}
