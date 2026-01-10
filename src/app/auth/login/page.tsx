import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen grid place-items-center bg-wood-pattern relative">
      <div className="absolute inset-0 bg-wood-900/80 mix-blend-multiply" />
      
      <div className="relative z-10 w-full max-w-md p-8 bg-cream-100 vintage-card text-center">
        <h1 className="font-serif text-3xl text-wood-900 mb-2">Welcome Back</h1>
        <p className="font-body text-wood-600 mb-8">Sign in to manage reservations</p>
        <LoginForm />
      </div>
    </div>
  );
}