import { relations } from 'drizzle-orm';
import { pgTable, timestamp, uuid, text, unique } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text('name').notNull().unique(),
});

export const usersRelations = relations(users, ({ many }) => ({
  feeds: many(feeds),
  feedFollows: many(feedFollows),
}));

export type User = typeof users.$inferSelect;

export const feeds = pgTable('feeds', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
  name: text('name').notNull(),
  url: text('url').notNull().unique(),
});

export const feedsRelations = relations(feeds, ({ many }) => ({
  feedFollows: many(feedFollows),
}));

export type Feed = typeof feeds.$inferSelect;

export const feedFollows = pgTable(
  'feed_follows',
  {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => new Date()),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    feedId: uuid('feed_id')
      .notNull()
      .references(() => feeds.id, { onDelete: 'cascade' }),
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
