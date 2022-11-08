import type { GetStaticProps, NextPage } from 'next'
import { Layout } from '@/components/Layout';
import { fetchPagedPosts, Post } from '@/lib/blog';
import blog from '../blog.config';
import { PostList } from '@/components/PostList';


export const getStaticProps: GetStaticProps = async (_content) => {
  const posts = await fetchPagedPosts(1, blog.postsPerPage);
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) }
  }
}

const Home: NextPage<{ posts: Array<Post> }> = ({ posts }) => (
  <Layout>
    <PostList posts={posts} />
  </Layout>
)

export default Home;
