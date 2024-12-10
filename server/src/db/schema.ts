import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const users = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  age: integer("age").notNull(),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  image: text("image"),
  location: text("location"),
  adress: text("adress"),
  phoneVerified: boolean("phoneVerified").default(false),
  onboardingCompleted: boolean("onboardingCompleted").default(false),
  shopname: text("shopname"),
  shoptextfont: text("shoptextfont"),
  shoptextcolor: text("shoptextcolor"),
  banner: text("banner"),
});
