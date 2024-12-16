import { typesenseClient } from "./index.mjs";

const bookSchema = {
  name: "books",
  fields: [
    { name: "title", type: "string" },
    { name: "authors", type: "string[]", facet: true },

    { name: "publication_year", type: "int32", facet: true },
    { name: "ratings_count", type: "int32" },
    { name: "average_rating", type: "float" },
  ],
  default_sorting_field: "ratings_count",
};

const createCollection = async () => {
  try {
    const result = await typesenseClient.collections().create(bookSchema);
    console.log("Collection created:", result);
  } catch (error) {
    console.error("Error creating collection:", error);
  }
};

createCollection();
