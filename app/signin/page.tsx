"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { CheckCircle2Icon, CircleXIcon, InfoIcon } from "lucide-react";
import { supabase } from "../components/supabaseClient";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert";
import { GoogleButton } from "@/components/google-button";

type Notification = {
    type: "error" | "warning" | "info" | "success";
    title: string;
    description: string;
}

const callbackErrors: Record<string, Notification> = {
    profile: {
        type: "error",
        title: "Profile creation failed",
        description: "Your Google account was authenticated, but we couldn't create your user profile. Please try again.",
    },
    oauth: {
        type: "error",
        title: "Google sign up failed",
        description: "We couldn't authenticate your Google account. Please try again.",
    },
};

function NotificationAlert({ notification }: { notification: Notification }) {
    return (
        <Alert variant={notification.type === "error" ? "destructive" : "default"}>
            {notification.type === "error" ? (
                <CircleXIcon aria-hidden="true" />
            ) : notification.type === "success" ? (
                <CheckCircle2Icon aria-hidden="true" />
            ) : (
                <InfoIcon aria-hidden="true" />
            )}
            <AlertTitle>{notification.title}</AlertTitle>
            <AlertDescription>{notification.description}</AlertDescription>
        </Alert>
    )
}

function CallbackErrorAlert() {
    const error = useSearchParams().get("error");
    const notification = error ? callbackErrors[error] : undefined;

    return notification ? <NotificationAlert notification={notification} /> : null;
}

export default function Signin() {
    const [notification, setNotification] = useState<Notification | null>(null);
    const [isRedirecting, setIsRedirecting] = useState(false);

    const handleSignUp = async () => {
        setNotification(null);
        setIsRedirecting(true);

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        })

        if (error) {
            console.log("Error signing in with google: ", error.message);
            setNotification({
                type: "error",
                title: "Sign in failed",
                description: "Something went wrong with the sign in process. Please try again.",
            });
            setIsRedirecting(false);
        }
    }

    return (
        <main className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6">
            <div className="flex w-full max-w-sm flex-col gap-8">
                <p className="text-center text-lg font-semibold text-foreground">
                    Revix
                </p>

                <section
                    aria-labelledby="signup-heading"
                    className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:p-8"
                >
                    <div className="flex flex-col gap-2 text-center">
                        <h1
                            id="signup-heading"
                            className="text-2xl font-semibold text-card-foreground"
                        >
                            Create your account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Sign up with your Google account to get started.
                        </p>
                    </div>

                    {notification ? (
                        <NotificationAlert notification={notification} />
                    ) : !isRedirecting && (
                        <Suspense fallback={null}>
                            <CallbackErrorAlert />
                        </Suspense>
                    )}

                    <GoogleButton
                        label="Sign up with Google"
                        loading={isRedirecting}
                        onClick={handleSignUp}
                    />
                </section>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/signin"
                        className="rounded-sm font-medium text-primary underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    )
}
