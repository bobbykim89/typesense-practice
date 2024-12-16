import Typesense from "typesense";
import "dotenv/config";

export const typesenseClient = new Typesense.Client({
  nodes: [
    {
      host: "localhost",
      port: 8108,
      protocol: "http",
    },
  ],
  apiKey: process.env.VITE_TYPESENSE_API_KEY,
});
