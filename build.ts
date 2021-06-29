import { resolve, join } from "https://deno.land/std@0.99.0/path/mod.ts";
import { parse, stringify } from "https://deno.land/std@0.99.0/encoding/yaml.ts";
import { wait } from "https://deno.land/x/wait@0.1.11/mod.ts";

const postsDir = resolve("posts");

await Deno.remove(postsDir, { recursive: true });
await Deno.mkdir(postsDir, { recursive: true });

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
type PostMeta = {
  title: string;
  description: string;
  date: string;
  authors: {
    name: string;
    link?: string;
  }[];
  draft?: boolean;
  url?: string;
};

type Pages = {
  posts: PostMeta[],
  next?: string;
  prev?: string;
};

const all: { name: string, meta: PostMeta, content: string }[] = [];

let loading = wait("Reading files");

for await(const fileMeta of Deno.readDir("./")) {
  if(
    !fileMeta.name.endsWith(".md")
    || fileMeta.name.toLowerCase() === "readme.md"
  ) {
    continue;
  }

  const file = (await Deno.readTextFile(resolve(fileMeta.name)))
    .split("---", 3)
    .slice(1)
    .map(str => str.trim());

  const meta = parse(file[0]) as PostMeta;

  all.push({ name: fileMeta.name, meta, content: file[1] });
}

loading.succeed("Files read");

loading = wait("Sorting posts");

all.sort(
  (post1, post2) => new Date(post1.meta.date) <= new Date(post2.meta.date)
    ? -1
    : 0
);

loading.succeed("Posts sorted");

const postsUrl = "https://github.com/ResponsiveDev/blog/raw/master/posts";
const postsPerPage = 10;
const pages: Pages[] = [{ posts: [] }];

loading = wait("Writing posts");

for(const { name, meta, content } of all) {
  if(meta.draft) { continue; }

  await Deno.writeTextFile(join(postsDir, name), content);

  meta.url = `${postsUrl}/${name}`;
  pages[pages.length - 1].posts.push(meta);

  if(pages[pages.length - 1].posts.length === postsPerPage) {
    pages[pages.length - 1].next = `${postsUrl}/page-${pages.length}.json`;

    pages.push({
      posts: [],
      prev: `${postsUrl}/page-${pages.length - 1}.json`
    });
  }
}

loading.succeed("Posts written");

if(pages[pages.length - 1].posts.length === 0) {
  pages.splice(pages.length - 1);
  delete pages[pages.length - 1].next;
}

loading = wait("Writing page metas");

for(let i = 0; i < pages.length; i++) {
  await Deno.writeTextFile(
    resolve("./posts", `page-${i}.json`),
    JSON.stringify(pages[i])
  );
}

loading.succeed("Page metas written");