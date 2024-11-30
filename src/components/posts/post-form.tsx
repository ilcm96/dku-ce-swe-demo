"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { posts } from "@/lib/data/posts";
import { CURRENT_USER } from "@/lib/constants";

interface PostFormProps {
  mode: "create" | "edit";
}

interface FormData {
  title: string;
  content: string;
  board: "review" | "free" | "qna";
}

const INITIAL_FORM_DATA: FormData = {
  title: "",
  content: "",
  board: "review",
};

const BOARD_OPTIONS = [
  { value: "review", label: "교환학생 후기" },
  { value: "free", label: "자유게시판" },
  { value: "qna", label: "질문게시판" },
];

export default function PostForm({ mode }: PostFormProps) {
  const router = useRouter();
  const params = useParams();
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);

  useEffect(() => {
    if (mode === "edit" && params.id) {
      const post = posts.find((p) => p.id === Number(params.id));
      if (!post) {
        router.push("/");
        return;
      }
      if (post.author !== CURRENT_USER) {
        router.push(`/posts/${params.id}`);
        return;
      }
      setFormData({
        title: post.title,
        content: post.content,
        board: post.board,
      });
    }
  }, [mode, params.id, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    // TODO: API 호출로 게시글 생성/수정
    console.log("게시글 저장:", formData);

    router.push("/");
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
          <h1 className="flex-1 text-lg font-medium text-center">
            {mode === "create" ? "게시글 작성" : "게시글 수정"}
          </h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="board">게시판</Label>
            <Select
              value={formData.board}
              onValueChange={(value: "review" | "free" | "qna") =>
                setFormData((prev) => ({ ...prev, board: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="게시판을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                {BOARD_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">제목</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              placeholder="제목을 입력하세요"
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">내용</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              placeholder="내용을 입력하세요"
              className="min-h-[400px]"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              취소
            </Button>
            <Button type="submit">
              {mode === "create" ? "작성하기" : "수정하기"}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
}
