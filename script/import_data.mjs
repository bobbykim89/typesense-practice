import fs from "fs/promises";
import path from "path";
import { typesenseClient } from "./index.mjs";

const importData = async () => {
  try {
    const booksInJsonl = await fs.readFile(
      path.resolve(process.cwd(), "tmp/books.jsonl"),
      "utf-8"
    );
    typesenseClient.collections("books").documents().import(booksInJsonl);
    console.log("Imported data.");
  } catch (error) {
    console.error("Error creating data:", error);
  }
};

importData();
