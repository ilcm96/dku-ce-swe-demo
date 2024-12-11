"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { verifyIdentity } from "@/lib/auth";

interface VerifiedInfo {
  name: string;
  birthdate: string;
  phone: string;
  id: string;
  tempPassword: string;
}

export default function ForgotForm() {
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedInfo, setVerifiedInfo] = useState<VerifiedInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleIdentityVerification = async () => {
    setIsVerifying(true);
    setError(null);
    try {
      const result = await verifyIdentity();
      // 실제로는 API에서 ID와 임시 비밀번호를 함께 받아와야 함
      setVerifiedInfo({
        ...result,
        id: "ysm", // 예시 데이터
        tempPassword: "temp1234!", // 예시 데이터
      });
    } catch (error) {
      setError("본인인증에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col p-4">
      <header className="flex items-center justify-between mb-8">
        <Button
          variant="ghost"
          className="p-0"
          onClick={() => router.back()}
          aria-label="뒤로 가기"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-1xl font-bold">계정 정보 찾기</h1>
        <div className="w-6" />
      </header>

      <main className="flex-grow flex flex-col items-center">
        <div className="w-full max-w-sm space-y-6">
          {!verifiedInfo ? (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-lg font-semibold">본인인증이 필요합니다</p>
                <p className="text-sm text-gray-500">
                  본인인증을 완료하시면 아이디와 임시 비밀번호를 확인하실 수
                  있습니다.
                </p>
              </div>
              <Button
                onClick={handleIdentityVerification}
                className="w-full"
                disabled={isVerifying}
              >
                {isVerifying ? "본인인증 중..." : "본인인증하기"}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-6 bg-gray-50 rounded-lg space-y-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">아이디</p>
                  <p className="font-semibold">{verifiedInfo.id}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">임시 비밀번호</p>
                  <p className="font-mono bg-white p-2 rounded border">
                    {verifiedInfo.tempPassword}
                  </p>
                </div>
                <p className="text-sm text-red-500">
                  ※ 로그인 후 반드시 비밀번호를 변경해주세요.
                </p>
              </div>
              <Button className="w-full" onClick={() => router.push("/login")}>
                로그인하기
              </Button>
            </div>
          )}

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}
        </div>
      </main>
    </div>
  );
}
