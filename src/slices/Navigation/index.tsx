import { RichText } from '@/components/RichText';
import { Content, isFilled } from '@prismicio/client';
import {
  PrismicLink,
  PrismicRichText,
  SliceComponentProps,
} from '@prismicio/react';

/**
 * Props for `Navigation`.
 */
export type NavigationProps = SliceComponentProps<Content.NavigationSlice>;

/**
 * Component for "Navigation" Slices.
 */
const Navigation = ({ slice }: NavigationProps): JSX.Element => {
  return (
    <nav
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="font-bold text-xl self-center"
    >
      <ul>
        {slice.items.map((item) =>
          isFilled.contentRelationship(item.page) ? (
            <li key={item.page.id}>
              <PrismicLink
                field={item.page}
                className="hover:opacity-75 duration-300 ease-in-out transition-all"
              >
                <RichText field={item.label} />
              </PrismicLink>
            </li>
          ) : null
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
