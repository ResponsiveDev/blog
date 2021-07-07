This contains the responsive blog in all its glory - if that's what you can
call it.

## The Build Script

Once you've added, updated, and/or removed all the files you were editing, you
need to run the build command before pushing to actually use all of the changes.
If you're working on a post but aren't finsihed, see [Draft Posts](#draft-posts).

To run the build script you need [deno](https://deno.land) installed, and then
run:

```bash
deno run --allow-read --allow-write build.ts
```

## Required Meta

We use [YAML](https://yaml.org/) meta at the top of our markdown files so that
the build script can fill in the blanks for [JSON Feed](https://jsonfeed.org/).
This meta should have `---` above the first field and `---` after the last
field, see `blog/test-post.md` for an example.

Some meta is required and **must** be filled in:

```yml
title: The Post Title                # required: string
summary: The Post Description        # required: string
date_published: 2021-06-20T15:10:00Z # requiredL utc date
```

Whilst the next meta fields aren't required, they're generally very good to
have:

```yml
authors:                             # optional: array of authors
  - name: Your Name                  # required: string
    url: https://example.com         # optional: url
```

And the last one is an extension field we use, it starts with an `_` to be spec
compliant. This is not needed **unless** want to push any unfinished/unchecked
posts, see [Draft Posts](#draft-posts):

```yml
_draft: true                         # optional: boolean
```

A full list of all the fields can be found in `types.ts` under `JsonPostItem`,
however, we don't (currently) use all of them. That said, they can be included
if you'd like, most readers are likely to use them.

## Draft Posts

If you're working on a post but want to push, please set the `_draft` field in
the meta to `true`, that way it's clear that it's a draft and the build script
will skip it if someone does try to build it.

## JSON Feed

We use [JSON Feed](https://jsonfeed.org/) for our blog post system which allows
our blog to be read using all readers that support it. The entry point into the
feed is at https://responsivedev.github.io/blog/dist/feed-0.json.