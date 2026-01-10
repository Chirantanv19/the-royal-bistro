"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// Note: In a real app, use Server Actions for login. 
// For now, we will just use a placeholder form that redirects.

export default function LoginForm() {
  return (
    <form className="space-y-4">
      <div className="space-y-2 text-left">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="customer@example.com" className="bg-white border-wood-300" />
      </div>
      <div className="space-y-2 text-left">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" className="bg-white border-wood-300" />
      </div>
      <Button className="w-full bg-wood-700 hover:bg-wood-800 text-cream-100 mt-4">
        Sign In
      </Button>
      <div className="text-sm mt-4 text-wood-500">
        Demo Account: admin@royalbistro.com / admin123
      </div>
    </form>
  );
}