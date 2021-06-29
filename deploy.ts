import { serve } from "https://deno.land/x/sift@0.3.2/mod.ts";
import { config } from "./deps.ts";

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
      `${config.github}/${config.out}/page-${params.num}.json`,
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
      `${config.github}/${config.out}/${params.slug}.json`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json"
        }
      }
    );
  },
});