export interface IArticle {
  title: string;
  slug: string;
  // authors: IAuthor[];
  excerpt: string;
  body: string;
  id: string;
  hero: {
    full: IGatsbyImageFluid;
    preview: IGatsbyImageFluid;
    regular: IGatsbyImageFluid;
    seo: string;
  };
  timeToRead: string;
  date: string;
  lastModifiedTime: string;
  lastModifiedTimeString: string;
  dateModifiedSeoFormat: string;
  datePublishedSeoFormat: string;
  tags: string[];
  commentId: string;
}

interface IGatsbyImage {
  src: string;
  base64?: string;
  srcWebp?: string;
  srcSet?: string;
  srcSetWebp?: string;
  tracedSVG?: string;
}

interface IGatsbyImageFluid extends IGatsbyImage {
  maxHeight: number;
  maxWidth: number;
}

export interface ITopic {
  slug: string;
  title: string;
  totalPosts: number;
  totalVideos: number;
  totalStories: number;
  totalServices: number;
}
