import { eq } from 'drizzle-orm';
import { db } from '..';
import { feedFollows, feeds, users } from '../schema';

export async function createFeed(name: string, url: string) {
  const [feed] = await db
    .insert(feeds)
    .values({
      name,
      url,
    })
    .returning();
  return feed;
}

export async function getFeedByUrl(url: string) {
  const [feed] = await db
    .select({ id: feeds.id })
    .from(feeds)
    .where(eq(feeds.url, url));
  return feed;
}

export async function getFeeds() {
  const fetchedFeeds = await db.select().from(feeds);
  return fetchedFeeds;
}

export async function createFeedFollow(userId: string, feedId: string) {
  const [newFeedFollow] = await db
    .insert(feedFollows)
    .values({
      userId,
      feedId,
    })
    .returning();

  const [fetchedFeed] = await db
    .select({
      id: feedFollows.id,
      createdAt: feedFollows.createdAt,
      updatedAt: feedFollows.updatedAt,
      userName: users.name,
      feedName: feeds.name,
    })
    .from(feedFollows)
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .where(eq(feedFollows.id, newFeedFollow.id));
  return fetchedFeed;
}

export async function getFeedFollowsForUser(userId: string) {
  const fetchedFeedFollows = await db
    .select({
      id: feedFollows.id,
      userId: users.id,
      feedId: feeds.id,
      userName: users.name,
      feedName: feeds.name,
    })
    .from(feedFollows)
    .innerJoin(users, eq(feedFollows.userId, users.id))
    .innerJoin(feeds, eq(feedFollows.feedId, feeds.id))
    .where(eq(users.id, userId));
  return fetchedFeedFollows;
}
