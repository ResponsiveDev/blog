// deno-lint-ignore-file camelcase

export type Config = {
  // the input directory containing the unformatted posts
  in: string;
  // the output directory containing the formatted posts
  out: string;
  // the max amount of posts per page
  max: number;
  // where the github repo is
  github: string;
};

export type JsonFeedAuthor = {
  name: string;
  url?: string;
  avatar?: string;
};

export type JsonFeedItem = {
  id: string;
  title: string;

  authors?: JsonFeedAuthor[];
  tags?: string[];

  url?: string;
  external_url?: string;

  summary: string;
  content_html: string;
  _content_md: string;

  image?: string;
  banner_image?: string;

  date_published: string;
  date_modified?: string;

  attachments?: {
    url: string;
    mime_type: string;
    title?: string;
  }[];

  // extensions

  _draft?: boolean;
};

export type JsonFeed = {
  version: string;

  title: string;
  description?: string;
  authors?: JsonFeedAuthor[];

  icon?: string;
  favicon?: string;

  home_page_url?: string;
  feed_url?: string;

  next_url?: string;

  items: JsonFeedItem[];
};