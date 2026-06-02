import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, ArrowLeft, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/index";
import { Logo } from "@/components/Navbar";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    if (!isSupabaseConfigured) {
      setErr(
        "Supabase isn't configured yet. Add your keys to frontend/.env first."
      );
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) setErr(error.message);
    else nav("/admin");
  };

  return (
    <div className="bg-spice grain flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-masala/70 hover:text-masala"
        >
          <ArrowLeft className="h-4 w-4" /> Back to site
        </Link>

        <div className="rounded-3xl border border-border bg-card p-8 shadow-warm">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h1 className="mt-6 text-center font-display text-3xl font-black text-masala">
            Admin Login
          </h1>
          <p className="mt-1 text-center text-sm text-masala/60">
            Manage your menu, dishes & prices
          </p>

          {err && (
            <div className="mt-5 flex items-start gap-2 rounded-xl bg-chili/10 p-3 text-sm font-medium text-chili">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              {err}
            </div>
          )}

          <form onSubmit={submit} className="mt-6 space-y-4">
            <div>
              <Label>Email</Label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-masala/40" />
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@chaatchaskauae.com"
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label>Password</Label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-masala/40" />
                <Input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10"
                />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-masala/50">
            Create your admin user in the Supabase dashboard → Authentication →
            Users.
          </p>
        </div>
      </div>
    </div>
  );
}
