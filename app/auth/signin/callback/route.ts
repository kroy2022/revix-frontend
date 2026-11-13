import { NextResponse } from "next/server";
import { createClient } from "@/app/components/supabaseAuthClient";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");

    if (!code) {
        console.error(
            "OAuth callback missing code:",
            searchParams.get("error_description") ?? searchParams.get("error") ?? "no error returned"
        );
        return NextResponse.redirect(`${origin}/signin?error=oauth`);
    }

    const supabase = await createClient();

    if (!supabase) {
        console.error("Failed to create Supabase client");
        return NextResponse.redirect(`${origin}/signin?error=oauth`);
    }

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.user) {
        console.error("Failed to exchange OAuth code:", error?.message);
        return NextResponse.redirect(`${origin}/signin?error=oauth`);
    }

    const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("id")
        .eq("id", data.user.id)
        .maybeSingle();

    if (profileError) {
        console.error("Failed to load user profile:", profileError.message);
        return NextResponse.redirect(`${origin}/signin?error=oauth`);
    }

    if (!profile) {
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}/signin?error=no_account`);
    }

    return NextResponse.redirect(`${origin}/dashboard`);
}
