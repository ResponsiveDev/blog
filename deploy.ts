import { serve } from "https://deno.land/x/sift@0.3.2/mod.ts";

import { postsUrl } from "./consts.ts";

serve({
  "/page/:num": async (req, params): Promise<Response> => {
    if(req.method.toLowerCase() !== "get") {
      return new Response(
        null,
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }

    return await fetch(
      `${postsUrl}/page-${params.num}.json`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    );
  },
  "/post/:slug": async (req, params): Promise<Response> => {
    if(req.method.toLowerCase() !== "get") {
      return new Response(
        null,
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }
    return await fetch(
      `${postsUrl}/${params.slug}.md`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    );
  },
});