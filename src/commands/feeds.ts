import { getFeeds } from 'src/lib/db/queries/feeds';

export async function handlerFeeds(cmdName: string, ...args: string[]) {
  const feeds = await getFeeds();
  for (const feed of feeds) {
    console.log(feed.name);
    console.log(feed.url);
  }
}
