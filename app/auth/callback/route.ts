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
        return NextResponse.redirect(`${origin}/signup?error=oauth`);
    }

    const supabase = await createClient();

    if (!supabase) {
        console.error("Failed to create Supabase client: ", supabase);
        return NextResponse.redirect(`${origin}/signup?error=oauth`);
    }

    // Exchange OAuth code for authenticated session
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error || !data.user) {
        console.error("Failed to exchange OAuth code:", error?.message);
        return NextResponse.redirect(`${origin}/signup?error=oauth`);
    }

    const user = data.user;
    const metadata = user.user_metadata;
    const firstName = metadata?.given_name ?? "";
    const lastName = metadata?.family_name ?? "";
    const avatarUrl = metadata?.avatar_url ?? metadata?.picture ?? null; // use a default avatar 
    const email = user.email;

    console.log(`User: ${user.id}, Email: ${email}, First Name: ${firstName}, Last Name: ${lastName}, Avatar URL: ${avatarUrl}`);
 
    // Insert user into your public.users table
    const { error: insertError } = await supabase
        .from("users")
        .upsert(
            {
                id: user.id,
                email: email,
                avatar: avatarUrl,
                first_name: firstName,
                last_name: lastName,
            },
            {
                onConflict: "id",
                ignoreDuplicates: true, // should this be false?
            }
        );

    if (insertError) {
        console.error("Failed to insert user:", insertError.message);
        return NextResponse.redirect(`${origin}/signin?error=profile`);
    }

    return NextResponse.redirect(`${origin}/dashboard`);
}