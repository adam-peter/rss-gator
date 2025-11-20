import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, text, unique } from 'drizzle-orm/pg-core';

const timestamps = {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
};

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: text('name').notNull().unique(),
  ...timestamps,
});

export const usersRelations = relations(users, ({ many }) => ({
  feeds: many(feeds),
  feedFollows: many(feedFollows),
}));

export type User = typeof users.$inferSelect;

export const feeds = pgTable('feeds', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  name: text('name').notNull(),
  url: text('url').notNull().unique(),
  lastFetchedAt: timestamp('last_fetched_at'),
  ...timestamps,
});

export const feedsRelations = relations(feeds, ({ many }) => ({
  feedFollows: many(feedFollows),
  posts: many(posts),
}));

export type Feed = typeof feeds.$inferSelect;

export const feedFollows = pgTable(
  'feed_follows',
  {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    feedId: uuid('feed_id')
      .notNull()
      .references(() => feeds.id, { onDelete: 'cascade' }),
    ...timestamps,
  },
  (t) => [unique().on(t.userId, t.feedId)]
);

export const feedFollowsRelations = relations(feedFollows, ({ one }) => ({
  feed: one(feeds, {
    fields: [feedFollows.feedId],
    references: [feeds.id],
  }),
  user: one(users, {
    fields: [feedFollows.userId],
    references: [users.id],
  }),
}));

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().notNull().defaultRandom(),
  title: text('title').notNull(),
  url: text('url').notNull().unique(),
  description: text('description'),
  publishedAt: timestamp('published_at'),
  feedId: uuid('feed_id')
    .notNull()
    .references(() => feeds.id, { onDelete: 'cascade' }),
  ...timestamps,
});

export const postsRelations = relations(posts, ({ one }) => ({
  feed: one(feeds, {
    fields: [posts.feedId],
    references: [feeds.id],
  }),
}));

export type Post = typeof posts.$inferSelect;
