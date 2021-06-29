import { ansi, colors, config, PostMeta, resolve, parse, Page } from "./deps.ts";

function info(text: string) {
  Deno.stdout.write((new TextEncoder()).encode(
    `${ansi.eraseLine.cursorLeft}${colors.brightBlue("i")} ${text}\n`
  ));
}

try {
  await Deno.remove(config.out, { recursive: true });
// deno-lint-ignore no-empty
} catch {}
await Deno.mkdir(config.out, { recursive: true });

const all: PostMeta[] = [];

for await(const { name, isFile } of Deno.readDir(resolve(config.in))) {
  if(!isFile || !name.endsWith(".md")) { continue; }

  info(`reading content from "${name}"`);
  const file = (await Deno.readTextFile(resolve(config.in, name)))
    .split("---", 3)
    .slice(1)
    .map(str => str.trim());

  info(`reading meta from "${name}"`);
  const meta = parse(file[0]) as PostMeta;

  // if(meta.draft) continue;

  meta.slug = name.replace(".md", "");
  meta.content = file[1];

  info(`pushing meta from "${name}"`);
  all.push(meta);
}

info(`sorting all posts`);
all.sort(
  (left, right) => new Date(left.date) <= new Date(right.date)
    ? -1
    : 0
);

const pages: Page[] = [{ posts: [] }];

for(const meta of all) {
  info("creating post pagination");
  pages[pages.length - 1].posts.push(meta);

  if(pages[pages.length - 1].posts.length >= config.max) {
    pages[pages.length - 1].next =
      `${config.github}/${config.out}/page-${pages.length}.json`;

    pages.push({
      posts: [],
      prev: `${config.github}/${config.out}/page-${pages.length}.json`
    });
  }
}

if(pages[pages.length - 1].posts.length === 0) {
  pages.splice(pages.length - 1);
  delete pages[pages.length - 1].next;
}

for(let i = 0; i < pages.length; i++) {
  const page = { ...pages[i] };
  page.posts = page.posts.map(post => ({ ...post, content: undefined! }));

  info(`writing page meta "page-${i}.json"`);
  await Deno.writeTextFile(
    resolve(`${config.out}`, `page-${i}.json`),
    JSON.stringify(page)
  );

  for(const post of pages[i].posts) {
    info(`writing post meta "${post.slug}.json"`);
    await Deno.writeTextFile(
      resolve(`${config.out}`, `${post.slug}.json`),
      JSON.stringify(post)
    );
  }
}

info("done");