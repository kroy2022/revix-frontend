import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/app/components/supabaseAuthClient";

export type CurrentUser = {
  id: string;
  email: string | null;
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
};

export const getCurrentUser = cache(async (): Promise<CurrentUser> => {
  const supabase = await createClient();

  if (!supabase) {
    throw new Error("Supabase client could not be created");
  }

  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
  const userId = claimsData?.claims.sub;

  if (claimsError || !userId) {
    redirect("/signin");
  }

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("id, email, first_name, last_name, avatar")
    .eq("id", userId)
    .maybeSingle();

  if (profileError) {
    throw new Error(`Failed to load user profile: ${profileError.message}`);
  }

  if (!profile) {
    redirect("/signin?error=profile");
  }

  return {
    id: profile.id,
    email: profile.email,
    firstName: profile.first_name ?? "",
    lastName: profile.last_name ?? "",
    avatarUrl: profile.avatar,
  };
});
