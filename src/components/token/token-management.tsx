"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const SUBSCRIPTION_PLANS = [
  { days: 30, tokens: 100, price: 5900 },
  { days: 90, tokens: 100, price: 9900 },
];

const TOKEN_PACKAGES = [
  { amount: 1, price: 50 },
  { amount: 10, price: 490 },
  { amount: 50, price: 2300 },
  { amount: 100, price: 4500 },
];

type LoadingState = {
  type: "subscription" | "package";
  index: number;
} | null;

export default function TokenManagement() {
  const router = useRouter();
  const { toast } = useToast();
  const [tokens, setTokens] = useState(10);
  const [subscriptionStatus, setSubscriptionStatus] = useState("없음");
  const [subscriptionEndDate, setSubscriptionEndDate] = useState("--/--/--");
  const [isLoading, setIsLoading] = useState<LoadingState>(null);

  const isSubscribed = subscriptionStatus !== "없음";

  const handlePayment = async (action: () => void) => {
    try {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.random() * 1000 + 1000),
      );
      action();
      return true;
    } catch (error) {
      return false;
    }
  };

  const addTokens = async (amount: number, index: number) => {
    setIsLoading({ type: "package", index });

    const success = await handlePayment(() => {
      setTokens((prev) => prev + amount);
    });

    if (success) {
      toast({
        description: `${amount}개의 토큰이 충전되었습니다.`,
      });
    }

    setIsLoading(null);
  };

  const subscribe = async (days: number, index: number) => {
    if (isSubscribed) return;
    setIsLoading({ type: "subscription", index });

    const success = await handlePayment(() => {
      setTokens((prev) => prev + 100);
      setSubscriptionStatus(`구독중 (${days}일)`);
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + days);
      setSubscriptionEndDate(endDate.toLocaleDateString());
    });

    if (success) {
      toast({
        description: `${days}일 구독이 시작되었습니다.`,
      });
    }

    setIsLoading(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto w-full">
          <div className="w-20">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          <h1 className="flex-1 text-lg font-medium text-center">토큰 관리</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto p-4">
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">구독 상태</p>
                <p className="font-medium">{subscriptionStatus}</p>
                <p className="text-sm text-muted-foreground">구독 종료일</p>
                <p className="font-medium">{subscriptionEndDate}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">보유 토큰</p>
                <p className="text-2xl font-bold">{tokens}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>구독제 상품</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                한 번에 하나의 구독만 유지할 수 있습니다
              </p>
              {SUBSCRIPTION_PLANS.map((plan, index) => (
                <div
                  key={plan.days}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{plan.days}일 구독</p>
                    <p className="text-sm text-muted-foreground">
                      매일 {plan.tokens}개 지급
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => subscribe(plan.days, index)}
                    disabled={isSubscribed || isLoading !== null}
                  >
                    {isLoading?.type === "subscription" &&
                    isLoading.index === index ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    {plan.price.toLocaleString()}원
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>토큰 패키지</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {TOKEN_PACKAGES.map((pkg, index) => (
                <div
                  key={pkg.amount}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{pkg.amount}개</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => addTokens(pkg.amount, index)}
                    disabled={isLoading !== null}
                  >
                    {isLoading?.type === "package" &&
                    isLoading.index === index ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    {pkg.price.toLocaleString()}원
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Accordion type="single" collapsible>
            <AccordionItem value="info">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  <span>토큰 이용안내</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <div className="space-y-2">
                  <p>1. 토큰은 챗봇 서비스 이용 시 사용됩니다.</p>
                  <p>2. 구독 상품은 매일 자정에 토큰이 지급됩니다.</p>
                  <p>3. 구매한 토큰은 환불이 불가능합니다.</p>
                  <p>4. 미사용 토큰은 이월됩니다.</p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    </div>
  );
}
