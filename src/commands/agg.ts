import { fetchFeed } from 'src/rss';

export async function handlerAgg(cmdName: string, ...args: string[]) {
  const rssFeed = await fetchFeed('https://www.wagslane.dev/index.xml');
  console.log(rssFeed);
}
