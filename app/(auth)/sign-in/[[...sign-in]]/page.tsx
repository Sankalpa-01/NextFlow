import { SignIn } from "@clerk/nextjs";

/**
 * Sign In Page
 * The [[...sign-in]] syntax is a "Catch-all" route required by Clerk
 * to handle various authentication states (MFA, password reset, etc.)
 */
export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignIn 
        appearance={{
          elements: {
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
          },
        }}
        signUpUrl="/sign-up"
      />
    </div>
  );
}