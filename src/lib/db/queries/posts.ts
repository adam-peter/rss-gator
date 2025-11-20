import { desc, eq } from 'drizzle-orm';
import { db } from '..';
import { feedFollows, Post, posts } from '../schema';

export async function createPost(
  post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>
) {
  const [insertedPost] = await db.insert(posts).values(post).returning();
  return insertedPost;
}

export async function getPostsForUser(userId: string, limit: number) {
  const fetchedPosts = await db
    .select({
      id: posts.id,
      title: posts.title,
      publishedAt: posts.publishedAt,
      url: posts.url,
      description: posts.description,
    })
    .from(feedFollows)
    .innerJoin(posts, eq(feedFollows.feedId, posts.feedId))
    .where(eq(feedFollows.userId, userId))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);
  return fetchedPosts;
}
