import axios from "axios";
import { eq, and, sql, desc } from "drizzle-orm";
import {
  automations,
  dms,
  triggers,
  listeners,
  users,
  subscriptions,
  integrations,
  posts,
  keywords,
} from "../db/schema.js";
import { db } from "../db/index.js";

import OpenAi from "openai";

export const getKeywordAutomation = async (
  automationId: string,
  dm: boolean
) => {
  try {
    // Fetch the automation
    const automation = await db
      .select()
      .from(automations)
      .where(eq(automations.id, automationId))
      .then((res) => res[0]);

    if (!automation) {
      return null; // Return null if the automation doesn't exist
    }

    // Fetch related data in parallel where possible
    const [dmsRecord, trigger, listenerRecord, user] = await Promise.all([
      dm
        ? db.select().from(dms).where(eq(dms.automationId, automationId))
        : null,
      db
        .select()
        .from(triggers)
        .where(
          and(
            eq(triggers.automationId, automationId),
            eq(triggers.type, dm ? "DM" : "COMMENT")
          )
        )
        .then((res) => res[0]), // Assuming only one trigger of each type
      db
        .select()
        .from(listeners)
        .where(eq(listeners.automationId, automationId))
        .then((res) => res[0]),
      db
        .select()
        .from(users)
        .where(eq(users.id, automation.userId))
        .then((res) => res[0]),
    ]);

    if (!user) {
      throw new Error("User not found for the given automation.");
    }

    // Fetch the user's subscription and integrations in parallel
    const [subscriptionRecord, integrationsRecord] = await Promise.all([
      db.select().from(subscriptions).where(eq(subscriptions.userId, user.id)),
      db.select().from(integrations).where(eq(integrations.userId, user.id)),
    ]);

    // Combine all results into a single response object
    return {
      automation,
      dms: dmsRecord,
      trigger,
      listener: listenerRecord,
      user: {
        ...user,
        subscription: subscriptionRecord,
        integrations: integrationsRecord,
      },
    };
  } catch (error) {
    console.error("Error fetching keyword automation:", {
      automationId,
      error,
    });
    return null;
  }
};

export const sendDM = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string
) => {
  console.log("sending message");
  return await axios.post(
    `${process.env.INSTAGRAM_BASE_URL}/v21.0/${userId}/messages`,
    {
      recipient: {
        id: recieverId,
      },
      message: {
        text: prompt,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const trackResponses = async (
  automationId: string,
  type: "COMMENT" | "DM"
) => {
  try {
    if (type === "COMMENT") {
      // Increment the commentCount field
      const result = await db
        .update(listeners)
        .set({
          commentCount: sql`"commentCount" + 1`,
        })
        .where(eq(listeners.automationId, automationId));

      console.log(
        `Successfully incremented commentCount for automationId: ${automationId}`
      );
      return result;
    }

    if (type === "DM") {
      // Increment the dmCount field
      const result = await db
        .update(listeners)
        .set({
          commentCount: sql`"commentCount" + 1`,
        })
        .where(eq(listeners.automationId, automationId));

      console.log(
        `Successfully incremented dmCount for automationId: ${automationId}`
      );
      return result;
    }

    throw new Error(`Invalid type provided: ${type}`);
  } catch (error) {
    console.error(
      `Error updating ${type} count for automationId: ${automationId}`,
      error
    );
    throw error; // Re-throw error for higher-level handling if needed
  }
};

export const createChatHistory = async (
  automationId: string,
  senderId: string,
  receiver: string,
  message: string,
  trx?: any // Accept transaction context
) => {
  try {
    // Insert using the transaction context if provided
    const result = await (trx ?? db).insert(dms).values({
      automationId,
      senderId,
      receiver,
      message,
    });

    console.log(`Chat history created for automationId: ${automationId}`);
    return result;
  } catch (error) {
    console.error(
      `Error creating chat history for automationId: ${automationId}`,
      error
    );
    throw error; // Re-throw for higher-level handling
  }
};

export const getKeywordPost = async (postId: string, automationId: string) => {
  try {
    const result = await db
      .select({ automationId: posts.automationId }) // Select only the automationId field
      .from(posts)
      .where(
        and(eq(posts.postid, postId), eq(posts.automationId, automationId))
      )
      .then((res) => res[0]); // Drizzle returns an array, so pick the first result

    return result;
  } catch (error) {
    console.error(
      `Error fetching keyword post with postId: ${postId} and automationId: ${automationId}`,
      error
    );
    throw error; // Re-throw for higher-level handling
  }
};

export const sendPrivateMessage = async (
  userId: string,
  recieverId: string,
  prompt: string,
  token: string
) => {
  console.log("sending message");
  return await axios.post(
    `${process.env.INSTAGRAM_BASE_URL}/${userId}/messages`,
    {
      recipient: {
        comment_id: recieverId,
      },
      message: {
        text: prompt,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const getChatHistory = async (sender: string, receiver: string) => {
  try {
    // Query the `dms` table to get chat history
    const history = await db
      .select()
      .from(dms)
      .where(and(eq(dms.senderId, sender), eq(dms.receiver, receiver)))
      .orderBy(desc(dms.createdAt));

    // Map the history to a chat session format
    const chatSession: {
      role: "assistant" | "user";
      content: string;
    }[] = history.map((chat) => {
      return {
        role: chat.receiver ? "assistant" : "user",
        content: chat.message!,
      };
    });

    return {
      history: chatSession,
      automationId: history[history.length - 1]?.automationId, // Ensure automationId is safely accessed
    };
  } catch (error) {
    console.error(
      `Error fetching chat history for sender: ${sender}, receiver: ${receiver}`,
      error
    );
    throw error; // Re-throw for higher-level handling
  }
};

export const findAutomation = async (id: string) => {
  try {
    // Fetch the automation
    const automation = await db
      .select()
      .from(automations)
      .where(eq(automations.id, id))
      .then((res) => res[0]);

    if (!automation) {
      return null; // Return null if the automation doesn't exist
    }

    // Fetch related data separately
    const keywordsData = await db
      .select()
      .from(keywords)
      .where(eq(keywords.automationId, id));

    const triggersData = await db
      .select()
      .from(triggers)
      .where(eq(triggers.automationId, id));

    const postsData = await db
      .select()
      .from(posts)
      .where(eq(posts.automationId, id));

    const listenersData = await db
      .select()
      .from(listeners)
      .where(eq(listeners.automationId, id))
      .then((res) => res[0]); // Assuming one listener per automation

    const userData = await db
      .select()
      .from(users)
      .where(eq(users.id, automation.userId))
      .then((res) => res[0]);

    const subscriptionData = userData
      ? await db
          .select()
          .from(subscriptions)
          .where(eq(subscriptions.userId, userData.id))
          .then((res) => res[0])
      : null;

    const integrationsData = userData
      ? await db
          .select()
          .from(integrations)
          .where(eq(integrations.userId, userData.id))
      : [];

    // Combine all data into a single object
    return {
      ...automation,
      keywords: keywordsData,
      triggers: triggersData,
      posts: postsData,
      listener: listenersData,
      user: {
        ...userData,
        subscription: subscriptionData,
        integrations: integrationsData,
      },
    };
  } catch (error) {
    console.error(`Error fetching automation with id: ${id}`, error);
    throw error; // Re-throw for higher-level handling
  }
};

export const openai = new OpenAi({
  apiKey: process.env.OPEN_AI_KEY,
});
