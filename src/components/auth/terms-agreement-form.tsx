"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ChevronRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRegisterStore } from "@/lib/store/register-store";

export default function TermsAgreementForm() {
  const router = useRouter();
  const { agreements, setAgreements } = useRegisterStore();
  const [allChecked, setAllChecked] = useState(false);

  useEffect(() => {
    const { terms, privacy, marketing } = agreements;
    setAllChecked(terms && privacy && marketing);
  }, [agreements]);

  const handleAllCheck = () => {
    const newValue = !allChecked;
    setAgreements({
      terms: newValue,
      privacy: newValue,
      marketing: newValue,
    });
  };

  const handleSingleCheck = (key: keyof typeof agreements) => {
    setAgreements({
      ...agreements,
      [key]: !agreements[key],
    });
  };

  const handleNext = () => {
    if (agreements.terms && agreements.privacy) {
      router.push("/register");
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
        <h1 className="text-lg font-semibold">회원가입</h1>
        <div className="w-6" />
      </header>

      <main className="flex-grow flex flex-col">
        <div className="text-center mb-8">
          <p className="text-2xl font-bold">약관 동의</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="all"
              checked={allChecked}
              onCheckedChange={handleAllCheck}
            />
            <label htmlFor="all" className="font-medium">
              약관 전체 동의
            </label>
          </div>

          <div className="h-px bg-gray-200" />

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="terms">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreements.terms}
                    onCheckedChange={() => handleSingleCheck("terms")}
                  />
                  <label htmlFor="terms">이용 약관 동의 (필수)</label>
                </div>
                <AccordionTrigger>
                  <ChevronRight />
                </AccordionTrigger>
              </div>
              <AccordionContent>이용 약관 내용입니다...</AccordionContent>
            </AccordionItem>

            <AccordionItem value="privacy">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacy"
                    checked={agreements.privacy}
                    onCheckedChange={() => handleSingleCheck("privacy")}
                  />
                  <label htmlFor="privacy">
                    개인정보 수집 및 이용동의 (필수)
                  </label>
                </div>
                <AccordionTrigger>
                  <ChevronRight />
                </AccordionTrigger>
              </div>
              <AccordionContent>
                개인정보 처리방침 내용입니다...
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="marketing">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="marketing"
                    checked={agreements.marketing}
                    onCheckedChange={() => handleSingleCheck("marketing")}
                  />
                  <label htmlFor="marketing">
                    마케팅 정보 수신 동의 (선택)
                  </label>
                </div>
                <AccordionTrigger>
                  <ChevronRight />
                </AccordionTrigger>
              </div>
              <AccordionContent>
                마케팅 정보 수신 관련 내용입니다...
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>

      <footer className="mt-8">
        <Button
          className="w-full"
          onClick={handleNext}
          disabled={!agreements.terms || !agreements.privacy}
        >
          다음
        </Button>
      </footer>
    </div>
  );
}
