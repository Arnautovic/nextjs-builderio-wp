export async function getStaticPaths() {
  const res = await fetch('https://sali.arnautcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        {
          posts(first: 10) {
            nodes {
              slug
            }
          }
        }
      `
    }),
  });
  const json = await res.json();
  const paths = json.data.posts.nodes.map(post => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch('https://sali.arnautcode.com/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `
        {
          postBy(slug: "${params.slug}") {
            title
            content
          }
        }
      `
    }),
  });
  const json = await res.json();
  return {
    props: {
      post: json.data.postBy,
    },
  };
}

export default function Post({ post }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
