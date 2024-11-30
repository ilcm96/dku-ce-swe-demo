"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useAuthStore } from "@/lib/store/auth-store";

export default function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await login({ username, password });
      router.push("/"); // 로그인 성공 시 메인 페이지로 이동
    } catch (err) {
      setError("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-4">
      <header className="mb-8">
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => router.back()}
          aria-label="뒤로 가기"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
      </header>

      <main className="flex-grow flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-6">로그인</h1>

        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="아이디"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-label="아이디"
              disabled={isLoading}
            />
            <Input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="비밀번호"
              disabled={isLoading}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="text-right">
              <Link href="/forgot">
                <Button type="button" variant="link" className="text-xs p-0">
                  ID/비밀번호 찾기
                </Button>
              </Link>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "로그인 중..." : "로그인"}
          </Button>

          <div className="text-center">
            <Link href="/register/terms">
              <Button type="button" variant="outline" className="w-full">
                회원가입
              </Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  );
}
