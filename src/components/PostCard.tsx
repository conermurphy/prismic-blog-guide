import { PrismicNextImage } from '@prismicio/next';
import { PrismicLink } from '@prismicio/react';
import { RichText } from './RichText';
import { Content, isFilled } from '@prismicio/client';

export const PostCard = ({
  post,
}: {
  post: Content.BlogPostDocument;
}): JSX.Element => {
  const { data } = post;

  return (
    <PrismicLink
      key={post.id}
      document={post}
      className="grid grid-cols-2 gap-10"
    >
      {isFilled.image(data.featured_image) ? (
        <PrismicNextImage
          field={data.featured_image}
          sizes="100vw"
          className="w-full max-w-sm max-h-60 rounded-xl object-cover"
        />
      ) : null}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm opacity-75 text-slate-700 border-b-2 w-min pb-1">
            {new Date(data?.publication_date || '').toLocaleDateString()}
          </p>
          <div className="hover:opacity-75 duration-300 ease-in-out transition-all">
            <RichText field={data.title} />
          </div>
        </div>
        <RichText field={data.description} />
      </div>
      <div className="border-b border-solid border-gray-200 w-full col-span-2" />
    </PrismicLink>
  );
};
