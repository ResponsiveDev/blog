This contains the responsive blog in all its glory - if that's what you can
call it.

## The Build Script

Once you've added, updated, or removed a post you have to run the build script
using [deno](https://deno.land). This will add/remove the new/updated/existing
post(s) from the `posts/` folder and edit the right `page-*.json` metadata file
accordingly.

To run the build script:

`deno run --allow-all --unstable build.ts`

You can download [deno here](https://deno.land).

## Adding a Post

To add a post just create a new `.md` file with the file name set to the posts
slug, e.g. `hello-world.md`. There should **ONLY** be English letters, numbers,
and dashes (`-`) in the file name.

Inside the file should be some metadata, in YAML, above the contents that looks
like this:

```yml
---
# Required
title: Post Title                     # String format
description: The post description     # String format
date: 2021-06-25T01:59:13.834Z        # UTC Date format
# Optional
authors:                              # All authors for this post
  - name: Shane                       # default: Responsive
    link: https://twitter.com/RespDev # default: https://twitter.com/RespDev
draft: true                           # default: false
---
```

## Updating a Post

Updating a post is as easy as modifying the file.

## Deleting a Post

And deleting a post is also just as easy.

## Draft Posts

Draft posts are posts with the `draft` metadata set to `true`. These will not
be part of the final build and therefore will not show up on the website.