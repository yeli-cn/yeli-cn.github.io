import { Post } from "@/lib/blog";
import { PostView } from "./Post";

type Props = {
  posts: Array<Post>
}

export const PostList = ({ posts }: Props) => (
  <>
    {posts.map(post => (
      <PostView post={post} key={post.slug} />
    ))}
  </>
)
