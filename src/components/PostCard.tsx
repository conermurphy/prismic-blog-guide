import { RichComponents } from '@/slices/RichText';
import { FilledContentRelationshipField } from '@prismicio/client';
import { PrismicNextImage } from '@prismicio/next';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import { BlogPostDocument } from '../../prismicio-types';

const PostCard = ({
  post,
}: {
  post: BlogPostDocument<string>;
}): JSX.Element => {
  const { data } = post;

  return (
    <PrismicLink
      href={`/blog/${post.uid}`}
      key={post.id}
      className="grid grid-cols-2 gap-10"
    >
      {data.featured_image ? (
        <PrismicNextImage
          field={data.featured_image}
          sizes="100vw"
          style={{ objectFit: 'cover' }}
          className="w-full max-w-sm max-h-60 rounded-xl"
        />
      ) : null}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-sm opacity-75 text-slate-700 border-b-2 w-min pb-1">
            {new Date(data?.publication_date || '').toLocaleDateString()}
          </p>
          <div className="hover:opacity-75 duration-300 ease-in-out transition-all">
            <h2 className="font-bold text-2xl">{data.title[0]?.text}</h2>
          </div>
        </div>
        <PrismicRichText field={data.description} components={RichComponents} />
      </div>
      <div className="border-b border-solid border-gray-200 w-full col-span-2" />
    </PrismicLink>
  );
};

export { PostCard };
