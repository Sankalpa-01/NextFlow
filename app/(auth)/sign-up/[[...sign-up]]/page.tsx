import { SignUp } from "@clerk/nextjs";

/**
 * Sign Up Page
 * This uses the same layout as Sign In to keep the UI consistent.
 */
export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SignUp 
        appearance={{
          elements: {
            formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-sm normal-case",
          },
        }}
        signInUrl="/sign-in"
      />
    </div>
  );
}