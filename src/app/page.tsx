import { Metadata } from 'next';

import { PrismicRichText, SliceZone } from '@prismicio/react';
import * as prismic from '@prismicio/client';

import { createClient } from '@/prismicio';
import { components } from '@/slices';
import { PostCard } from '@/components/PostCard';
import { PrismicNextImage } from '@prismicio/next';
import { RichComponents } from '@/slices/RichText';

/**
 * This component renders your homepage.
 *
 * Use Next's generateMetadata function to render page metadata.
 *
 * Use the SliceZone to render the content of the page.
 */

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID('page', 'home');

  return {
    title: prismic.asText(home.data.title),
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title || undefined,
      images: [
        {
          url: home.data.meta_image.url || '',
        },
      ],
    },
  };
}

export default async function Index() {
  /**
   *
   * The client queries content from the Prismic API
   */
  const client = createClient();

  // Fetch the content of the home page from Prismic
  const {
    data: { slices, hero },
  } = await client.getByUID('page', 'home');

  // Get all of the blog_post documents created on Prismic ordered by publication date
  const posts = await client.getAllByType('blog_post', {
    orderings: [
      { field: 'my.blog_post.publication_date', direction: 'desc' },
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  });

  return (
    <>
      {/* As we only have the Navigation slice on this page, this will render that out without us needing to split it out */}
      <SliceZone slices={slices} components={components} />

      {/* Display out Hero "static data" we added to our "homepage" */}
      {hero[0] ? (
        <section className="flex flex-col gap-4 max-w-3xl">
          {hero[0].image ? (
            <PrismicNextImage
              field={hero[0].image}
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              className="w-full max-w-[100px] max-h-full rounded-md"
            />
          ) : null}
          <div className="flex flex-col gap-2">
            <PrismicRichText
              field={hero[0].title}
              components={RichComponents}
            />
            <PrismicRichText
              field={hero[0].description}
              components={RichComponents}
            />
          </div>
        </section>
      ) : null}

      {/* Map over each of the blog posts created and display a `PostCard` for it */}
      <section className="grid grid-cols-1 gap-8 max-w-3xl w-full">
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </section>

      {/* Display our Navigation slice */}
      <SliceZone slices={slices} components={components} />
    </>
  );
}
