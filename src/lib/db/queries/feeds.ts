import { RSSFeed } from 'src/rss';
import { db } from '..';
import { feeds } from '../schema';
import { readConfig } from 'src/config';
import { findUser } from './users';
import { printFeed } from 'src/lib/utils/printFeed';

export async function createFeed(userId: string, name: string, url: string) {
  const [feed] = await db
    .insert(feeds)
    .values({
      name,
      url,
      userId,
    })
    .returning();
  return feed;
}
