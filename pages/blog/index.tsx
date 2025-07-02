import Link from 'next/link';

export async function getStaticProps() {
  const res = await fetch('https://sali.arnautcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        {
          posts(first: 10) {
            nodes {
              id
              title
              slug
            }
          }
        }
      `
    }),
  });
  const json = await res.json();
  return {
    props: {
      posts: json.data.posts.nodes,
    },
  };
}

export default function Blog({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
