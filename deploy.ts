import { serve, json } from "https://deno.land/x/sift@0.3.2/mod.ts";
import { parse, Config } from "./deps.ts";

const github = "https://github.com/ResponsiveDev/blog/raw/master";

const config = parse(
  await (await fetch(`${github}/config.yml`)).text()
) as Config;

serve({
  "/page/:num": async (req, params): Promise<Response> => {
    if(req.method.toLowerCase() === "get") {
      const page =  await fetch(
        `${config.github}/${config.out}/page-${params.num}.json`,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          }
        }
      );

      if(page.ok) {
        try {
          return json(
            await page.json(),
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
              }
            }
          );
        // deno-lint-ignore no-empty
        } catch {}
      }
    }

    return new Response(
      null,
      {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" }
      }
    );
  },
  "/post/:slug": async (req, params): Promise<Response> => {
    if(req.method.toLowerCase() === "get") {
      const post = await fetch(
        `${config.github}/${config.out}/${params.slug}.json`,
        { headers: { "Content-Type": "application/json" } }
      );

      if(post.ok) {
        try {
          return json(
            await post.json(),
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
                "Cache-Control": "max-age=86400"
              }
            }
          );
        // deno-lint-ignore no-empty
        } catch {}
      }
    }

    return new Response(
      null,
      {
        status: 400,
        headers: { "Access-Control-Allow-Origin": "*" }
      }
    );
  }
});