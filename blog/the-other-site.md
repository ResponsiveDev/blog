---
title: The Other Site
description: And we just got a new look...
date: 2021-06-29T19:11:50.768Z
authors:
  - name: Leon
    link: https://leon.respdev.com/
---

# It's Alive!

So we just updated the website, you can find out more in our [first-post]. The
main thing we got done since then has been fully scrapping the newsletter and
switching to a whole new blog system. I got to work on the backend whilst Shane
got it looking pretty (*and much more but I digress for the sake of comedy*).

Since we just got done getting the base of it implemented, if you spot anything
acting weird then please [open an issue] so that we can fix it, thanks!

# Having Fun

Once we got the blog all up-and-running I decided, *as all up programmers love
to do*, I want to make my version of the thing. In this case I'm on about the
website. Shane has put a lot of work into the site and has done amazing, but I
just wanted to give it a go (*don't worry, this will still be the main site*).
And so I did...

## Making it Fun

Instead of using a framework, like [svelte-kit] which is what the main site
uses, I wanted to do it the *good ol' fashion way*. This meant vanilla 
JavaScript, HTML, and CSS. The only extra thing I did use was [TypeScript] as
it helped catch a good amount of errors without me spending another day on
the project.

When it came to the design, the new one that just released on the main site
looked good so I stuck with that, apart from a few key differences:

### Grid

Grids are great when you use them right, and while I can't say I used them
right, I did use them. These are what hold the foundation of the layout
together. If you look at the main site compared with this one you'll set that
it has much stricter content width, `80ch` to be exact.

### Font

This is not so much about the font as it is about the typography decisions. I
went for a line height of `1.4` for content and `1.2` for headings. This allows
the content to breath and tay readable across devices. This along with the
`80ch` makes is super easy to read for desktop to mobile.

### Less Styling

While it sounds like I messed around with the styles a lot, I really didn't. I
kept it as default as I could whilst still making it unique and pleasant to
look at.

### Less Scripting

Just like with the styles, I kept the scripting to a minimum too. The only
thing that actually uses and requires the use of it is the blog (*at the moment
that is*), so that's all I did.

## Into the Code

If you take a look in the [repo](https://github.com/ResponsiveDev/leon-site)
you can pretty much figure out how I did everything. First came the HTML
files with their bits of CSS, then I moved onto the blog which needed some
JS/TS. That's really it, nothing crazy. I do recommend having a look around
to see how it work, especially if you're a beginner, you might learn something
new.

Since there's not much to talk about in regards to the actual code, I'll let
it speak for itself. If you do have any questions then please feel free to ask
me in the **discord** server, don't forget to ping me when you do (`@Leonski`).
If there's anything interesting that gets brought up I'll be sure to add it
here for others to see.

## Conclusion

All-in-all it took me a few hours to get the site to where it is now, including
the few extra commits I pushed before writing this post. That's not too bad,
although I did have full knowledge of how the blog worked as so on. Nonetheless,
it was great fun and I even encourage you do give it a go with something you
use.

You can find the website [here](https://leon.respdev.com), and I'll continue to
update it as the main site also updates.

Have a great day and I'll see you in the next one!

[first-post]: https://respdev.com/blog/first-post
[open an issue]: https://github.com/ResponsiveDev/main-site/issues/new
[svelte-kit]: https://kit.svelte.dev
[TypeScript]: https://www.typescriptlang.org