import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in"); // ✅ Server-side redirect
  }

  // Try to find existing profile
  const profile = await db.profile.findUnique({
    where: {
      userId: user.id
    }
  });

  if (profile) {
    return profile;
  }

  // Create new profile
  const newProfile = await db.profile.create({
    data: {
      userId: user.id,
      name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress
    }
  });

  return newProfile;
};
