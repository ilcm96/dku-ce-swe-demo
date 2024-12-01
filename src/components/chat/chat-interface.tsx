"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Message } from "@/types/chat";
import { CHAT_API_URL } from "@/lib/constants";

export default function ChatInterface() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [tokens, setTokens] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 자동 스크롤
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Textarea 높이 자동 조절
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      const computed = window.getComputedStyle(textareaRef.current);
      const height =
        textareaRef.current.scrollHeight +
        parseInt(computed.paddingTop) +
        parseInt(computed.paddingBottom);
      textareaRef.current.style.height = `${Math.min(height, 200)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  // 메시지 전송 처리
  const handleSubmit = async () => {
    if (tokens <= 0 || !input.trim() || isLoading) return;

    setIsLoading(true);
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setTokens((prev) => prev - 1);
    setInput("");

    try {
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userMessage.content }),
      });

      if (!response.ok) throw new Error("Chat API failed");

      const data = await response.json();

      if (data.success) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            content: data.data.response,
            role: "assistant",
          },
        ]);
      } else {
        throw new Error(data.message || "Failed to get response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          content: "질문에 대해 알고 있는 정보가 없습니다 :(",
          role: "assistant",
        },
      ]);
    }

    setIsLoading(false);
  };

  // Enter 키 처리
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto w-full">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <span className="font-medium">챗봇</span>
          <div className="text-sm">토큰: {tokens}</div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "max-w-[80%] rounded-lg p-4 break-words whitespace-pre-wrap",
              message.role === "user"
                ? "ml-auto bg-primary text-primary-foreground"
                : "bg-muted",
            )}
          >
            {message.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="sticky bottom-0 border-t bg-background p-4">
        <div className="max-w-4xl mx-auto flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="메시지를 입력하세요..."
            className="resize-none min-h-[44px]"
            maxLength={500}
          />
          <Button
            onClick={handleSubmit}
            disabled={!input.trim() || tokens <= 0 || isLoading}
            size="icon"
          >
            {isLoading ? (
              <span className="animate-pulse">...</span>
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        {tokens <= 0 && (
          <p className="text-destructive text-sm mt-2 text-center">
            토큰이 부족합니다
          </p>
        )}
      </footer>
    </div>
  );
}
