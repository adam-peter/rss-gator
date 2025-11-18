import { Feed, User } from '../db/schema';

export function printFeed(feed: Feed, user: User) {
  console.log(JSON.stringify(user, null, 2));
  console.log(JSON.stringify(feed, null, 2));
}
