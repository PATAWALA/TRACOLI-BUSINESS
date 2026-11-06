"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function AutoLoginPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-tracoli-50/30 to-white px-4">
          <Loader2 className="size-7 text-tracoli-500 animate-spin" />
        </main>
      }
    >
      <AutoLoginContent />
    </Suspense>
  );
}

function AutoLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );
  const [message, setMessage] = useState("Connexion en cours…");

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Lien de connexion invalide.");
      return;
    }

    async function login() {
      try {
        const res = await fetch("/api/qr-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: searchParams.get("token") }),
        });

        if (!res.ok) {
          const data = await res.json();
          setStatus("error");
          setMessage(data.error ?? "Échec de la connexion.");
          return;
        }

        const { email, otp } = await res.json();

        const { error } = await supabase.auth.verifyOtp({
          email,
          token: otp,
          type: "magiclink",
        });

        if (error) {
          setStatus("error");
          setMessage("Échec de la vérification. Réessayez.");
          return;
        }

        setStatus("success");
        setMessage("Connecté ! Redirection…");
        setTimeout(() => router.push("/admin"), 1000);
      } catch {
        setStatus("error");
        setMessage("Erreur de connexion. Réessayez.");
      }
    }

    login();
  }, [searchParams, router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white via-tracoli-50/30 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm text-center"
      >
        <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-white shadow-lg border border-ink-100">
          {status === "loading" && (
            <Loader2 className="size-7 text-tracoli-500 animate-spin" />
          )}
          {status === "success" && (
            <CheckCircle2 className="size-7 text-emerald-500" />
          )}
          {status === "error" && (
            <XCircle className="size-7 text-red-500" />
          )}
        </div>

        <h1 className="mt-5 text-xl font-extrabold tracking-tight text-ink-900">
          {status === "loading" && "Connexion automatique"}
          {status === "success" && "Connecté !"}
          {status === "error" && "Erreur"}
        </h1>

        <p className="mt-2 text-sm text-ink-500">{message}</p>

        {status === "error" && (
          <button
            onClick={() => router.push("/admin/login")}
            className="mt-6 rounded-xl bg-tracoli-500 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-tracoli-600"
          >
            Connexion manuelle
          </button>
        )}
      </motion.div>
    </main>
  );
}
