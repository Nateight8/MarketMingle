import { sql } from "drizzle-orm";
import { db } from "../db/index.js";
import { keywords } from "../db/schema.js";

export const matchKeyword = async (keyword: string) => {
  const matcher = await db
    .select()
    .from(keywords)
    .where(sql`${keywords.word} ILIKE ${keyword}`) // Case-insensitive match
    .limit(1);

  return matcher[0];
};
