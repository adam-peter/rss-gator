import { getNextFeedToFetch, markFeedFetched } from 'src/lib/db/queries/feeds';
import { createPost } from 'src/lib/db/queries/posts';
import { parseDuration } from 'src/lib/utils/parseDuration';
import { fetchFeed } from 'src/rss';

const handleError = (error: Error) => {
  console.error('Error scraping feeds:', error.message);
};

async function scrapeFeeds() {
  const nextFeed = await getNextFeedToFetch();
  if (!nextFeed) {
    console.log('No feeds to fetch');
    return;
  }
  await markFeedFetched(nextFeed.id);

  const feed = await fetchFeed(nextFeed.url);
  console.log(`\nFetching feed '${feed.channel.title}':`);
  for (const item of feed.channel.item) {
    const createdPost = await createPost({
      title: item.title,
      description: item.description,
      publishedAt: item.pubDate ? new Date(item.pubDate) : null,
      url: item.link,
      feedId: nextFeed.id,
    });

    console.log(createdPost.title);
  }
}

export async function handlerAgg(cmdName: string, ...args: string[]) {
  if (args.length === 0) {
    throw new Error('Expected time between requests as argument');
  }
  const durationString = args[0];
  const intervalMs = parseDuration(durationString);

  console.log(`Collecting feeds every ${durationString}`);
  scrapeFeeds().catch(handleError);
  const interval = setInterval(() => {
    scrapeFeeds().catch(handleError);
  }, intervalMs);

  await new Promise<void>((resolve) => {
    process.on('SIGINT', () => {
      console.log('Shutting down feed aggregator...');
      clearInterval(interval);
      resolve();
    });
  });
}
