import { XMLParser } from 'fast-xml-parser';

type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

type RSSItem = {
  title: string;
  link: string;
  description: string;
  pubDate: string;
};

export async function fetchFeed(feedURL: string) {
  const response = await fetch(feedURL, {
    method: 'GET',
    headers: {
      'User-Agent': 'gator',
    },
  });
  const text = await response.text();
  const parser = new XMLParser();
  const data = parser.parse(text);

  const { channel } = data?.['rss'];
  if (!channel) {
    throw new Error('RSS Feed parsing error - no channel');
  }
  const { title, link, description, item } = channel;
  if (!title || !link || !description) {
    throw new Error('RSS Feed parsing error - no channel properties');
  }

  const rawItems = Array.isArray(item) ? item : [];
  const itemList: RSSItem[] = [];
  rawItems.forEach((rawItem) => {
    const { title, link, description, pubDate } = rawItem;
    if (!title || !link || !description || !pubDate) {
      return;
    }
    const item: RSSItem = { title, link, description, pubDate };
    itemList.push(item);
  });

  const rssFeed: RSSFeed = {
    channel: {
      title,
      link,
      description,
      item: itemList,
    },
  };
  return rssFeed;
}
