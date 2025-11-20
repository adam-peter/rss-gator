import { getPostsForUser } from 'src/lib/db/queries/posts';
import { User } from 'src/lib/db/schema';

export async function handlerBrowse(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  const limit = args?.[0] ? Number(args[0]) : 2;
  const posts = await getPostsForUser(user.id, limit);

  console.log('Posts:');
  for (const post of posts) {
    console.log(`\n${post.title} (${post.publishedAt})`);
    console.log(post.url);
    console.log(post.description);
  }
}
