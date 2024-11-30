"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageCircle,
  Menu,
  PenSquare,
  Heart,
  MessageSquare,
} from "lucide-react";
import { posts } from "@/lib/data/posts";
import { Post } from "@/types/post";

const getCommentsCount = (post: Post) => {
  // 전체 댓글 수 = 댓글 수 + 모든 댓글의 답글 수의 합
  return (
    post.comments.length +
    post.comments.reduce((acc, comment) => acc + comment.replies.length, 0)
  );
};

export default function PostList() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"review" | "free" | "qna">(
    "review",
  );

  const filteredPosts = posts.filter((post) => post.board === activeTab);

  const handleTabChange = (value: string) => {
    setActiveTab(value as "review" | "free" | "qna");
  };

  const handlePostClick = (postId: number) => {
    router.push(`/posts/${postId}`);
  };

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="flex justify-between items-center p-4 border-b sticky top-0 bg-background z-10">
        <Link href="/posts/create" passHref>
          <Button variant="ghost" size="icon" className="hover:bg-muted">
            <PenSquare className="h-6 w-6" />
            <span className="sr-only">새 게시물 작성</span>
          </Button>
        </Link>
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-muted">
                <Menu className="h-6 w-6" />
                <span className="sr-only">메뉴</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem onClick={() => router.push("/mypage")}>
                마이페이지
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/token")}>
                토큰 관리
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/login")}>
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <main className="flex flex-col flex-1 overflow-hidden">
        <div className="border-b bg-muted">
          <Tabs
            value={activeTab}
            onValueChange={handleTabChange}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 h-10 bg-transparent">
              <TabsTrigger
                value="review"
                className="data-[state=active]:bg-background"
              >
                교환학생 후기
              </TabsTrigger>
              <TabsTrigger
                value="free"
                className="data-[state=active]:bg-background border-x border-border"
              >
                자유게시판
              </TabsTrigger>
              <TabsTrigger
                value="qna"
                className="data-[state=active]:bg-background"
              >
                질문게시판
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <ScrollArea className="flex-1">
          <div className="divide-y">
            {filteredPosts.map((post) => (
              <button
                key={post.id}
                className="w-full text-left hover:bg-muted/50 transition-colors focus:outline-none focus:bg-muted/50"
                onClick={() => handlePostClick(post.id)}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0 mr-4">
                      <h3 className="text-sm font-medium truncate">
                        {post.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">
                        {post.author} • {post.createdAt}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground shrink-0">
                      <span className="flex items-center">
                        <Heart
                          className={`h-3 w-3 mr-0.5 ${post.isLiked ? "fill-current text-primary" : ""}`}
                        />
                        {post.likes}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-0.5" />
                        {getCommentsCount(post)}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </main>

      <Link href="/chat" passHref>
        <Button
          size="icon"
          className="fixed left-4 bottom-20 rounded-full h-12 w-12 shadow-lg hover:shadow-xl transition-shadow"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">챗봇</span>
        </Button>
      </Link>

      <footer className="h-12 bg-muted flex items-center justify-center border-t sticky bottom-0 z-10">
        <p className="text-sm text-muted-foreground">
          교환학생 정보 공유 커뮤니티
        </p>
      </footer>
    </div>
  );
}
