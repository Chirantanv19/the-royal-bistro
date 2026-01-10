"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UtensilsCrossed } from "lucide-react";
import { authenticate } from "@/app/lib/action"; // We create this next

export default function LoginPage() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-wood-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-wood-200">
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-wood-900 p-3 rounded-full mb-4">
            <UtensilsCrossed className="h-8 w-8 text-cream-100" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-wood-900">Admin Login</h1>
        </div>

        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input name="email" type="email" placeholder="admin@royal.com" required />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <Input name="password" type="password" required />
          </div>

          <Button 
            className="w-full bg-wood-900 hover:bg-wood-800 text-cream-100 h-10" 
            disabled={isPending}
          >
            {isPending ? "Logging in..." : "Login"}
          </Button>

          {errorMessage && (
            <p className="text-sm text-red-500 text-center">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}