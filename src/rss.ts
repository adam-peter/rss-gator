import { XMLParser } from 'fast-xml-parser';

export type RSSFeed = {
  channel: {
    title: string;
    link: string;
    description: string;
    item: RSSItem[];
  };
};

export type RSSItem = {
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
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  const text = await response.text();
  const parser = new XMLParser();
  const data = parser.parse(text);

  const rss = data?.rss;
  if (!rss?.channel) {
    throw new Error('RSS Feed parsing error - no RSS or channel found');
  }
  const { channel } = rss;
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
