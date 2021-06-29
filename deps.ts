export { resolve } from "https://deno.land/std@0.99.0/path/mod.ts";
export { ansi, colors } from "https://deno.land/x/cliffy@v0.19.2/ansi/mod.ts";

import { parse } from "https://deno.land/std@0.99.0/encoding/yaml.ts";
export { parse };

/**
 * ```yaml
 * ---
 * # Required
 * title: Post Title                     # String format
 * description: The post description     # String format
 * date: 2021-06-25T01:59:13.834Z        # UTC Date format
 * # Optional
 * authors:                              # All authors for this post
 *   - name: Shane                       # default: Responsive
 *     link: https://twitter.com/RespDev # default: https://twitter.com/RespDev
 * draft: true                           # default: false
 * ---
 * ```
 */
export type PostMeta = {
  title: string;
  description: string;
  date: string;
  authors: {
    name: string;
    link?: string;
  }[];
  draft?: boolean;
  slug: string;
  content: string;
};

export type Page = {
  posts: PostMeta[],
  next?: string;
  prev?: string;
};

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

export const config = parse(await Deno.readTextFile("./config.yml")) as Config;