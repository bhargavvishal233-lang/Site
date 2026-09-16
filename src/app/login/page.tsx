import React from "react";
import { signIn } from "@/auth";
import { ArrowRight } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-canvas flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-card border border-neutral-100">
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-neutral-900">
            Spectrum Agency
          </h2>
          <p className="mt-4 text-sm text-neutral-600">
            Access the client dashboard. (OAuth disabled for development)
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <form
            action={async () => {
              "use server";
              await signIn("credentials", { redirectTo: "/admin" });
            }}
          >
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-crimson hover:bg-crimson-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-crimson"
            >
              Log in as Admin
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
