"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { useRegisterStore } from "@/lib/store/register-store";
import {
  checkIdAvailability,
  validatePassword,
  verifyIdentity,
} from "@/lib/auth";
import { cn } from "@/lib/utils";

interface ValidationErrors {
  id?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const { userInfo, setUserInfo, agreements } = useRegisterStore();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCheckingId, setIsCheckingId] = useState(false);
  const [isIdAvailable, setIsIdAvailable] = useState<boolean | null>(null);
  const [showVerificationButton, setShowVerificationButton] = useState(false);

  // Check if initial form is valid to show verification button
  const isInitialFormValid = (): boolean => {
    return Boolean(
      isIdAvailable && // ID 중복확인 완료
        !errors.password && // 비밀번호 에러 없음
        !errors.confirmPassword && // 비밀번호 확인 에러 없음
        userInfo.password && // 비밀번호 입력됨
        confirmPassword && // 비밀번호 확인 입력됨
        userInfo.password === confirmPassword, // 비밀번호 일치
    );
  };

  // Update verification button visibility when form validity changes
  useEffect(() => {
    setShowVerificationButton(isInitialFormValid());
  }, [
    isIdAvailable,
    errors.password,
    errors.confirmPassword,
    userInfo.password,
    confirmPassword,
  ]);

  // 약관 동의 체크
  useEffect(() => {
    if (!agreements.terms || !agreements.privacy) {
      router.push("/register/terms");
    }
  }, [agreements, router]);

  // 비밀번호 유효성 검사
  useEffect(() => {
    if (userInfo.password) {
      const isValid = validatePassword(userInfo.password);
      setErrors((prev) => ({
        ...prev,
        password: isValid
          ? undefined
          : "비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.",
      }));
    }
  }, [userInfo.password]);

  // 비밀번호 확인 검사
  useEffect(() => {
    if (confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword:
          confirmPassword === userInfo.password
            ? undefined
            : "비밀번호가 일치하지 않습니다.",
      }));
    }
  }, [confirmPassword, userInfo.password]);

  // ID 입력 시 검증 상태 초기화
  useEffect(() => {
    setIsIdAvailable(null);
    setErrors((prev) => ({ ...prev, id: undefined }));
  }, [userInfo.id]);

  const handleIdCheck = async () => {
    if (!userInfo.id) {
      setErrors((prev) => ({ ...prev, id: "아이디를 입력해주세요." }));
      setIsIdAvailable(false);
      return;
    }

    setIsCheckingId(true);
    try {
      const isAvailable = await checkIdAvailability(userInfo.id);
      setIsIdAvailable(isAvailable);
      setErrors((prev) => ({
        ...prev,
        id: isAvailable ? undefined : "이미 사용 중인 아이디입니다.",
      }));
    } finally {
      setIsCheckingId(false);
    }
  };

  const handleIdentityVerification = async () => {
    setIsVerifying(true);
    try {
      const result = await verifyIdentity();
      setUserInfo({
        name: result.name,
        birthdate: result.birthdate,
        phone: result.phone,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isIdAvailable) {
      alert("아이디 중복확인을 해주세요.");
      return;
    }

    // 모든 필수 필드 검증
    if (
      !userInfo.id ||
      !userInfo.password ||
      !confirmPassword ||
      !userInfo.name ||
      !userInfo.birthdate ||
      !userInfo.phone
    ) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    // 실제 에러가 있는지 확인
    const hasErrors = Object.values(errors).some(
      (error) => error !== undefined,
    );
    if (hasErrors) {
      alert("입력 정보를 다시 확인해주세요.");
      return;
    }

    try {
      // TODO: API 호출로 회원가입 처리
      console.log("Registration success:", {
        ...userInfo,
        marketingConsent: agreements.marketing,
      });
      router.push("/login");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const isFormValid = () => {
    return (
      isIdAvailable && // ID 중복확인 완료
      !errors.id && // ID 에러 없음
      !errors.password && // 비밀번호 에러 없음
      !errors.confirmPassword && // 비밀번호 확인 에러 없음
      userInfo.id && // ID 입력됨
      userInfo.password && // 비밀번호 입력됨
      confirmPassword && // 비밀번호 확인 입력됨
      userInfo.name && // 이름 입력됨
      userInfo.birthdate && // 생년월일 입력됨
      userInfo.phone // 전화번호 입력됨
    );
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
        <h1 className="text-1xl font-bold">회원가입</h1>
        <div className="w-6" />
      </header>

      <main className="flex-grow">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="id">아이디</Label>
            <div className="relative flex space-x-2">
              <div className="flex-1 relative">
                <Input
                  id="id"
                  value={userInfo.id}
                  onChange={(e) => setUserInfo({ id: e.target.value })}
                  disabled={isCheckingId}
                  required
                  className={cn(
                    errors.id && "border-red-500 focus-visible:ring-red-500",
                    isIdAvailable && "border-green-500",
                  )}
                />
                {isIdAvailable && (
                  <CheckCircle className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
                )}
              </div>
              <Button
                type="button"
                onClick={handleIdCheck}
                disabled={isCheckingId}
              >
                {isCheckingId ? "확인 중..." : "중복확인"}
              </Button>
            </div>
            {errors.id && <p className="text-sm text-red-500">{errors.id}</p>}
            {isIdAvailable && !errors.id && (
              <p className="text-sm text-green-500">
                사용 가능한 아이디입니다.
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              type="password"
              value={userInfo.password}
              onChange={(e) => setUserInfo({ password: e.target.value })}
              className={cn(
                errors.password && "border-red-500 focus-visible:ring-red-500",
              )}
              required
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={cn(
                errors.confirmPassword &&
                  "border-red-500 focus-visible:ring-red-500",
              )}
              required
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <div
            className={cn(
              "transition-all duration-500 ease-in-out",
              showVerificationButton
                ? "opacity-100 max-h-20"
                : "opacity-0 max-h-0 overflow-hidden",
            )}
          >
            {!userInfo.name && (
              <Button
                type="button"
                onClick={handleIdentityVerification}
                className="w-full"
                disabled={isVerifying}
              >
                {isVerifying ? "본인인증 중..." : "본인인증하기"}
              </Button>
            )}
          </div>

          {userInfo.name && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="space-y-2">
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  value={userInfo.name}
                  readOnly
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthdate">생년월일</Label>
                <Input
                  id="birthdate"
                  value={userInfo.birthdate}
                  readOnly
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">전화번호</Label>
                <Input
                  id="phone"
                  value={userInfo.phone}
                  readOnly
                  className="bg-gray-100"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={!isFormValid()}
              >
                가입하기
              </Button>
            </div>
          )}
        </form>
      </main>
    </div>
  );
}
