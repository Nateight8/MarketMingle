// import { Router, Request, Response } from "express";
// import { matchKeyword } from "../services/keyword.js";
// import {
//   createChatHistory,
//   findAutomation,
//   getChatHistory,
//   getKeywordAutomation,
//   getKeywordPost,
//   openai,
//   sendDM,
//   sendPrivateMessage,
//   trackResponses,
// } from "../services/automation.js";
// import { db } from "../db/index.js";

const instagramWebhookRouter = Router();

instagramWebhookRouter.post("/", async (req: Request, res: Response) => {
  console.log("Webhook Payload:", req.body); // Log for debugging
  const webhookPayload = req.body;

  // try {
  //   let matcher = null;

  //   // Handle messaging events
  //   if (webhookPayload.entry?.[0]?.messaging) {
  //     matcher = await matchKeyword(
  //       webhookPayload.entry[0].messaging[0].message.text
  //     );
  //   }

  //   // Handle changes events
  //   if (webhookPayload.entry?.[0]?.changes) {
  //     matcher = await matchKeyword(
  //       webhookPayload.entry[0].changes[0].value.text
  //     );
  //   }

  //   if (matcher && matcher.automationId) {
  //     // Retrieve automation logic

  //     if (webhookPayload.entry[0].changes) {
  //       const automation = await getKeywordAutomation(
  //         matcher.automationId,
  //         true
  //       );

  //       if (automation && automation.trigger) {
  //         if (automation?.listener?.listener === "MESSAGE") {
  //           const directMessage = await sendDM(
  //             webhookPayload.entry[0].id,
  //             webhookPayload.entry[0].messaging[0].sender.id,
  //             automation.listener.prompt,
  //             automation.user.integrations[0].token
  //           );

  //           if (directMessage.status === 200) {
  //             await trackResponses(automation.automation.id, "DM");
  //             return res.status(200).json({ message: "Message sent" });
  //           }
  //         }

  //         //FOR SMARTAI

  //         if (
  //           automation?.listener &&
  //           automation?.listener?.listener === "SMARTAI" &&
  //           automation.user.subscription[0].plan === "PREMIUM"
  //         ) {
  //           const smartAIResponse = await openai.chat.completions.create({
  //             model: "gpt-4o",
  //             messages: [
  //               {
  //                 role: "assistant",
  //                 content: `${automation.listener?.prompt}: Keep responses under 2 sentences`,
  //               },
  //             ],
  //           });

  //           //SAVE MESSAGES:
  //           if (smartAIResponse.choices[0].message.content) {
  //             await db.transaction(async (trx) => {
  //               // Wrap the createChatHistory function to use the transaction context
  //               await createChatHistory(
  //                 automation.automation.id,
  //                 webhookPayload.entry[0].id,
  //                 webhookPayload.entry[0].messaging[0].sender.id,
  //                 webhookPayload.entry[0].messaging[0].message.text
  //               );

  //               await createChatHistory(
  //                 automation.automation.id,
  //                 webhookPayload.entry[0].id,
  //                 webhookPayload.entry[0].messaging[0].sender.id,
  //                 webhookPayload.choices[0].message.content
  //               );
  //             });

  //             const directMessage = await sendDM(
  //               webhookPayload.entry[0].id,
  //               webhookPayload.entry[0].messaging[0].sender.id,
  //               smartAIResponse.choices[0].message.content!,
  //               automation.user.integrations[0].token
  //             );

  //             if (directMessage.status === 200) {
  //               const tracked = await trackResponses(
  //                 automation.automation.id,
  //                 "DM"
  //               );

  //               if (tracked) {
  //                 return res.status(200).json({
  //                   message: "Message sent",
  //                 });
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }

  //     if (
  //       webhookPayload.entry[0].changes &&
  //       webhookPayload.entry[0].changes.field === "comments"
  //     ) {
  //       const automation = await getKeywordAutomation(
  //         matcher.automationId,
  //         false
  //       );

  //       console.log("geting the automations");

  //       const automationPost = await getKeywordPost(
  //         webhookPayload.entry[0].changes[0].value.media.id,
  //         automation?.automation.id!
  //       );

  //       console.log("found keyword ", automationPost);

  //       if (automation && automationPost && automation.trigger) {
  //         console.log("first if");
  //         if (automation.listener) {
  //           console.log("first if");
  //           if (automation.listener.listener === "MESSAGE") {
  //             //   console.log(
  //             //     "SENDING DM, WEB HOOK PAYLOAD",
  //             //     webhookPayload,
  //             //     "changes",
  //             //     webhookPayload.entry[0].changes[0].value.from
  //             //   );

  //             //   console.log(
  //             //     "COMMENT VERSION:",
  //             //     webhookPayload.entry[0].changes[0].value.from.id
  //             //   );

  //             const directMessage = await sendPrivateMessage(
  //               webhookPayload.entry[0].id,
  //               webhookPayload.entry[0].changes[0].value.id,
  //               automation.listener?.prompt,
  //               automation.user?.integrations[0].token!
  //             );

  //             //   console.log("DM SENT", direct_message.data);
  //             if (directMessage.status === 200) {
  //               const tracked = await trackResponses(
  //                 automation.automation.id,
  //                 "COMMENT"
  //               );

  //               if (tracked) {
  //                 return res.status(200).json({ message: "sent message" });
  //               }
  //             }
  //           }

  //           if (
  //             automation.listener.listener === "SMARTAI" &&
  //             automation.user?.subscription[0].plan === "PREMIUM"
  //           ) {
  //             const smartAIResponse = await openai.chat.completions.create({
  //               model: "gpt-4o",
  //               messages: [
  //                 {
  //                   role: "assistant",
  //                   content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
  //                 },
  //               ],
  //             });

  //             if (smartAIResponse.choices[0].message.content) {
  //               await db.transaction(async (trx) => {
  //                 // Wrap the createChatHistory function to use the transaction context
  //                 await createChatHistory(
  //                   automation.automation.id,
  //                   webhookPayload.entry[0].id,
  //                   webhookPayload.entry[0].changes[0].value.from.id,
  //                   webhookPayload.entry[0].changes[0].value.text
  //                 );

  //                 await createChatHistory(
  //                   automation.automation.id,
  //                   webhookPayload.entry[0].id,
  //                   webhookPayload.entry[0].changes[0].value.from.id,
  //                   smartAIResponse.choices[0].message.content!
  //                 );
  //               });

  //               const directMessage = await sendPrivateMessage(
  //                 webhookPayload.entry[0].id,
  //                 webhookPayload.entry[0].changes[0].value.id,
  //                 automation.listener?.prompt,
  //                 automation.user?.integrations[0].token!
  //               );

  //               if (directMessage.status === 200) {
  //                 const tracked = await trackResponses(
  //                   automation.automation.id,
  //                   "COMMENT"
  //                 );

  //                 if (tracked) {
  //                   return res.status(200).json({ message: "message sent" });
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }

  //   // Handle unmatched cases

  //   if (!matcher) {
  //     const customerHistory = await getChatHistory(
  //       webhookPayload.entry[0].messaging[0].recipient.id,
  //       webhookPayload.entry[0].messaging[0].sender.id
  //     );

  //     if (customerHistory.history.length > 0) {
  //       const automation = await findAutomation(customerHistory.automationId!);
  //       automation?.user.subscription?.plan === "PREMIUM";
  //       if (
  //         automation?.user.subscription?.plan === "PREMIUM" &&
  //         automation.listener?.listener === "SMARTAI"
  //       ) {
  //         const smartAIResponse = await openai.chat.completions.create({
  //           model: "gpt-4o",
  //           messages: [
  //             {
  //               role: "assistant",
  //               content: `${automation.listener?.prompt}: keep responses under 2 sentences`,
  //             },
  //             ...customerHistory.history,
  //             {
  //               role: "user",
  //               content: webhookPayload.entry[0].messaging[0].message.text,
  //             },
  //           ],
  //         });

  //         if (smartAIResponse.choices[0].message.content) {
  //           await db.transaction(async (trx) => {
  //             // Wrap the createChatHistory function to use the transaction context
  //             await createChatHistory(
  //               automation.id,
  //               webhookPayload.entry[0].id,
  //               webhookPayload.entry[0].messaging[0].sender.id,
  //               webhookPayload.entry[0].messaging[0].message.text
  //             );

  //             await createChatHistory(
  //               automation.id,
  //               webhookPayload.entry[0].id,
  //               webhookPayload.entry[0].messaging[0].sender.id,
  //               smartAIResponse.choices[0].message.content!
  //             );
  //           });

  //           const directMessage = await sendDM(
  //             webhookPayload.entry[0].id,
  //             webhookPayload.entry[0].messaging[0].sender.id,
  //             smartAIResponse.choices[0].message.content,
  //             automation.user?.integrations[0].token!
  //           );

  //           if (directMessage.status === 200) {
  //             //if successfully send we return
  //             return res.status(200).json({ message: "Message sent" });
  //           }
  //         }
  //       }
  //     }

  //     return res.send(200).json({
  //       message: "No automation set",
  //     });
  //   }
  //   return res.status(404).json({ message: "No automation set" });
  // } catch (error) {
  //   console.error("Error processing webhook:", error);
  //   return res.status(500).json({ message: "Internal Server Error" });
  // }
});

export default instagramWebhookRouter;
