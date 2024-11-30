"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import {
  myPosts,
  myCommentedPosts,
  myLikedPosts,
  userInfo,
} from "@/lib/data/mypage";
import MyInfo from "./my-info";
import MyPosts from "./my-posts";
import CommentedPosts from "./commented-posts";
import LikedPosts from "./liked-posts";

export default function MyPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto w-full">
          <div className="w-20">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </div>
          <h1 className="flex-1 text-lg font-medium text-center">마이페이지</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="flex-1 container max-w-4xl mx-auto p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="info">내 정보</TabsTrigger>
            <TabsTrigger value="posts">작성한 글</TabsTrigger>
            <TabsTrigger value="comments">댓글 단 글</TabsTrigger>
            <TabsTrigger value="likes">좋아요 글</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="mt-6">
            <MyInfo userInfo={userInfo} />
          </TabsContent>

          <TabsContent value="posts" className="mt-6">
            <MyPosts posts={myPosts} />
          </TabsContent>

          <TabsContent value="comments" className="mt-6">
            <CommentedPosts posts={myCommentedPosts} />
          </TabsContent>

          <TabsContent value="likes" className="mt-6">
            <LikedPosts posts={myLikedPosts} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
