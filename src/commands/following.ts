import { readConfig } from 'src/config';
import { getFeedFollowsForUser } from 'src/lib/db/queries/feeds';
import { findUser } from 'src/lib/db/queries/users';

export async function handlerFollowing(cmdName: string, ...args: string[]) {
  const config = readConfig();
  const user = await findUser(config.currentUserName);
  const feedFollows = await getFeedFollowsForUser(user.id);
  feedFollows.forEach((feedFollow) => {
    console.log(feedFollow.feedName);
  });
}
