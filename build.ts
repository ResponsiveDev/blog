// deno-lint-ignore-file camelcase

import { parse } from "https://deno.land/std@0.100.0/encoding/yaml.ts";
import { blue, green, yellow, bold } from "https://deno.land/std@0.100.0/fmt/colors.ts";
import { resolve } from "https://deno.land/std@0.100.0/path/mod.ts";

import { html } from "https://deno.land/x/rusty_markdown@v0.3.0/mod.ts";

import { Config, JsonFeedItem, JsonFeed } from "./types.ts";

const info = (text: string) => { console.log(blue(`${bold("i")} ${text}`)); };
const add = (text: string) => { console.log(green(`${bold("+")} ${text}`)); };
const skip = (text: string) => { console.log(yellow(`${bold("-")} ${text}`)); };

const config = parse(await Deno.readTextFile("./config.yml")) as Config;
info("config loaded");

await Deno.mkdir(config.out, { recursive: true });
info(`directory "${config.out}" created`);

const items: JsonFeedItem[] = [];

for await(const { name, isFile } of Deno.readDir(resolve(config.in))) {
  if(!isFile || !name.endsWith(".md")) { continue; }

  const file = (await Deno.readTextFile(resolve(config.in, name)))
    .split("---", 3)
    .slice(1)
    .map(str => str.trim());

  const item = parse(file[0]) as JsonFeedItem;
  if(item._draft) { skip(`skipping "${name} (draft)`); continue; }

  item.id = name.replace(".md", "");
  item.content_html = html(file[1]);
  item._content_md = file[1];

  items.push(item);
  add(`adding "${name}"`);
}

items.sort(
  (left, right) => new Date(left.date_published) <= new Date(right.date_published)
    ? 0
    : -1
);
info(`sorted ${items.length} posts by date`);

const createFeed = (): JsonFeed => {
  return {
    version: "https://jsonfeed.org/version/1.1",
    title: "Responsive Blog",

    home_page_url: "https://respdev.com",
    feed_url: `${config.github}/${config.out}/feed-0.json`,

		_last_updated: new Date().toUTCString(),

    favicon: "https://respdev.com/old-fav.png",

    authors: [{
      name: "Responsive",
      url: "https://twitter.com/respdev"
    }],

    items: []
  };
};

const feeds: JsonFeed[] = [createFeed()];

for(const item of items) {
  feeds[feeds.length - 1].items.push(item);

  await Deno.writeTextFile(
    resolve(config.out, `${item.id}.json`),
    JSON.stringify(item)
  );

  info(`wrote "${item.id}.json"`);

  if(feeds[feeds.length - 1].items.length >= config.max) {
    feeds[feeds.length - 1].next_url =
      `${config.github}/${config.out}/feed-${feeds.length}.json`;
    feeds.push(createFeed());
  }
}

if(feeds[feeds.length - 1].items.length === 0) {
  feeds.splice(feeds.length - 1);
  delete feeds[feeds.length - 1].next_url;
}

info(`grouped into ${feeds.length} feeds`);

for(let i = 0; i < feeds.length; i++) {
  const feed = feeds[i];

  await Deno.writeTextFile(
    resolve(config.out, `feed-${i}.json`),
    JSON.stringify(feed)
  );
  info(`wrote "feed-${i}.json"`);
}