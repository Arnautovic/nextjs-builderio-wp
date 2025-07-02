import { builder, BuilderComponent } from '@builder.io/react';

builder.init("e7588cb8a802415080425d0a9bb04179");

export async function getStaticProps() {
  const content = await builder.get('page', { userAttributes: { urlPath: '/' } }).toPromise();
  return { props: { content } };
}

export default function Home({ content }) {
  return (
    <>
      {content ? (
        <BuilderComponent model="page" content={content} />
      ) : (
        <h1>No content found in Builder.io</h1>
      )}
    </>
  );
}
