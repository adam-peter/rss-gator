import { readConfig } from 'src/config';
import { createFeedFollow, getFeedByUrl } from 'src/lib/db/queries/feeds';
import { findUser } from 'src/lib/db/queries/users';

export async function handlerFollow(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error('Expects feed url as argument');
  }

  const url = args[0];

  const config = readConfig();
  const user = await findUser(config.currentUserName);
  const feed = await getFeedByUrl(url);

  if (!feed) {
    throw new Error(`No feed found with URL: ${url}`);
  }

  const feedFollow = await createFeedFollow(user.id, feed.id);
  console.log(`${feedFollow.feedName} - ${feedFollow.userName}`);
}
