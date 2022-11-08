import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring';
import { Layout } from '@/components/Layout';
import { fetchPagedPosts, Post, postsCount } from '@/lib/blog';
import blog from '../../blog.config';
import { PostList } from '@/components/PostList';


interface IParams extends ParsedUrlQuery {
  page: string,
}

export const getStaticPaths: GetStaticPaths = async () => {
  const count = await postsCount();
  const pages = Math.ceil(count / blog.postsPerPage);

  return {
    paths: Array.from({ length: pages }, (_, i) => ({ params: { page: (i + 1).toString() } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (content) => {
  const { page } = content.params as IParams;
  const posts = await fetchPagedPosts(Number.parseInt(page), blog.postsPerPage);
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) }
  }
}

const PostsPage: NextPage<{ posts: Array<Post> }> = ({ posts }) => (
  <Layout>
    <PostList posts={posts} />
  </Layout>
)

export default PostsPage;
