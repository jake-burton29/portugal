import { users } from "@clerk/nextjs/api";
import type { WebhookEvent } from "@clerk/nextjs/api";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { buffer } from "micro";
const webhookSecret: string = process.env.WEBHOOK_SECRET || "";

export async function handler(req: Request) {
  const payload: unknown = await req.json();
  const payloadString = JSON.stringify(payload);
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixIdTimeStamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");
  if (!svixId || !svixIdTimeStamp || !svixSignature) {
    console.log("svixId", svixId);
    console.log("svixIdTimeStamp", svixIdTimeStamp);
    console.log("svixSignature", svixSignature);
    return new Response("Error occured", {
      status: 400,
    });
  }
  const svixHeaders = {
    "svix-id": svixId,
    "svix-timestamp": svixIdTimeStamp,
    "svix-signature": svixSignature,
  };
  const wh = new Webhook(webhookSecret);
  let evt: WebhookEvent | null = null;
  try {
    evt = wh.verify(payloadString, svixHeaders) as WebhookEvent;
  } catch (_) {
    console.log("error");
    return new Response("Error occured", {
      status: 400,
    });
  }
  const { id } = evt.data;
  // Handle the webhook

  if (evt.type === "user.created") {
    console.log(id);
    if (!id) {
      return new Response("Error locating user", {
        status: 400,
      });
    }
    await users.updateUserMetadata(id, {
      publicMetadata: { role: "customer" },
    });
    return new Response(`Succesfully added role`, {
      status: 200,
    });
  }
  console.log(`User`, id, evt.type);
  return new Response("", {
    status: 201,
  });
}
