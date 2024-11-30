"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Trash2,
  Edit,
  ThumbsUp,
  Send,
  ArrowLeft,
  MessageCircle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { posts } from "@/lib/data/posts";
import { Post, Comment, Reply } from "@/types/post";

const CURRENT_USER = "윤성민";

const boardNames = {
  review: "교환학생 후기",
  free: "자유게시판",
  qna: "질문게시판",
};

export default function PostDetail() {
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
  const [newReply, setNewReply] = useState("");

  // 수정 관련 상태 추가
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingReplyId, setEditingReplyId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const postId = Number(params.id);
    const foundPost = posts.find((p) => p.id === postId);
    if (!foundPost) {
      router.push("/");
      return;
    }
    setPost(foundPost);
  }, [params.id, router]);

  if (!post) return null;

  const isPostAuthor = post.author === CURRENT_USER;

  const handleLike = () => {
    setPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
        isLiked: !prev.isLiked,
      };
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !post) return;

    const newCommentObj = {
      id: Math.max(...post.comments.map((c) => c.id), 0) + 1,
      author: CURRENT_USER,
      content: newComment,
      createdAt: new Date().toISOString().split("T")[0],
      isAuthor: true,
      replies: [],
    };

    setPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        comments: [...prev.comments, newCommentObj],
      };
    });
    setNewComment("");
  };

  const handleReplySubmit = (commentId: number) => {
    if (!newReply.trim() || !post) return;

    const newReplyObj = {
      id:
        Math.max(
          ...post.comments.flatMap((c) => c.replies.map((r) => r.id)),
          0,
        ) + 1,
      author: CURRENT_USER,
      content: newReply,
      createdAt: new Date().toISOString().split("T")[0],
      isAuthor: true,
    };

    setPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        comments: prev.comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, newReplyObj] }
            : comment,
        ),
      };
    });
    setNewReply("");
    setReplyingTo(null);
  };

  const handleDeleteComment = (commentId: number) => {
    setPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        comments: prev.comments.filter((comment) => comment.id !== commentId),
      };
    });
  };

  const handleDeleteReply = (commentId: number, replyId: number) => {
    setPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        comments: prev.comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply.id !== replyId,
                ),
              }
            : comment,
        ),
      };
    });
  };

  // 댓글 수정 시작 핸들러
  const handleEditCommentStart = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditContent(comment.content);
    setEditingReplyId(null); // 답글 수정 중이었다면 취소
  };

  // 답글 수정 시작 핸들러
  const handleEditReplyStart = (reply: Reply) => {
    setEditingReplyId(reply.id);
    setEditContent(reply.content);
    setEditingCommentId(null); // 댓글 수정 중이었다면 취소
  };

  // 댓글 수정 제출 핸들러
  const handleEditCommentSubmit = () => {
    if (!editContent.trim() || !editingCommentId) return;

    setPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        comments: prev.comments.map((comment) =>
          comment.id === editingCommentId
            ? {
                ...comment,
                content: editContent,
              }
            : comment,
        ),
      };
    });

    setEditingCommentId(null);
    setEditContent("");
  };

  // 답글 수정 제출 핸들러
  const handleEditReplySubmit = (commentId: number) => {
    if (!editContent.trim() || !editingReplyId) return;

    setPost((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        comments: prev.comments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === editingReplyId
                    ? {
                        ...reply,
                        content: editContent,
                      }
                    : reply,
                ),
              }
            : comment,
        ),
      };
    });

    setEditingReplyId(null);
    setEditContent("");
  };

  // 수정 취소 핸들러
  const handleEditCancel = () => {
    setEditingCommentId(null);
    setEditingReplyId(null);
    setEditContent("");
  };

  const handleDelete = () => {
    // TODO: 삭제 로직 구현
    router.push("/");
  };

  const getTotalCommentCount = (post: Post) => {
    const mainComments = post.comments.length;
    const replies = post.comments.reduce(
      (sum, comment) => sum + comment.replies.length,
      0,
    );
    return mainComments + replies;
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
            {boardNames[post.board]}
          </h1>

          <div className="w-20 flex justify-end">
            {isPostAuthor ? (
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => router.push(`/posts/${post.id}/edit`)}
                >
                  <Edit className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowDeleteAlert(true)}
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>{post.author}</span>
                <span>•</span>
                <span>{post.createdAt}</span>
              </div>
            </div>
            <Button
              variant={post.isLiked ? "default" : "outline"}
              size="sm"
              onClick={handleLike}
              className="min-w-[72px]"
            >
              <ThumbsUp
                className={`h-4 w-4 mr-2 ${post.isLiked ? "fill-current" : ""}`}
              />
              {post.likes}
            </Button>
          </div>

          <Separator className="my-4" />

          <div className="prose dark:prose-invert max-w-none">
            {post.content}
          </div>
        </div>

        <Separator className="my-4" />

        <div className="p-4">
          <h3 className="font-semibold mb-4">
            댓글 {getTotalCommentCount(post)}개
          </h3>
          <ScrollArea className="h-[calc(100vh-400px)]">
            <div className="space-y-4">
              {post.comments.map((comment, index) => (
                <div key={comment.id} className="space-y-4">
                  <div>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Avatar>
                          <AvatarImage
                            src={`https://avatar.vercel.sh/${comment.author}`}
                          />
                          <AvatarFallback>{comment.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{comment.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {comment.createdAt}
                          </p>
                        </div>
                      </div>
                      <div className="space-x-2">
                        {comment.author !== CURRENT_USER && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              setReplyingTo(
                                replyingTo?.id === comment.id ? null : comment,
                              )
                            }
                          >
                            <MessageCircle className="h-4 w-4 mr-2" />
                            답글
                          </Button>
                        )}
                        {comment.author === CURRENT_USER && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditCommentStart(comment)}
                            >
                              수정
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              삭제
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                    {editingCommentId === comment.id ? (
                      <div className="pl-12 space-y-2">
                        <Textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleEditCancel}
                          >
                            취소
                          </Button>
                          <Button size="sm" onClick={handleEditCommentSubmit}>
                            수정하기
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="pl-12">{comment.content}</p>
                    )}

                    {/* 답글 목록 */}
                    {comment.replies.length > 0 && (
                      <div className="pl-12 mt-4 space-y-4">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="pl-8 border-l-2">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <Avatar>
                                  <AvatarImage
                                    src={`https://avatar.vercel.sh/${reply.author}`}
                                  />
                                  <AvatarFallback>
                                    {reply.author[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <p className="font-semibold">
                                    {reply.author}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {reply.createdAt}
                                  </p>
                                </div>
                              </div>
                              {reply.author === CURRENT_USER && (
                                <div className="space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditReplyStart(reply)}
                                  >
                                    수정
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteReply(comment.id, reply.id)
                                    }
                                  >
                                    삭제
                                  </Button>
                                </div>
                              )}
                            </div>
                            {editingReplyId === reply.id ? (
                              <div className="pl-12 space-y-2">
                                <Textarea
                                  value={editContent}
                                  onChange={(e) =>
                                    setEditContent(e.target.value)
                                  }
                                />
                                <div className="flex justify-end gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={handleEditCancel}
                                  >
                                    취소
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleEditReplySubmit(comment.id)
                                    }
                                  >
                                    수정하기
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <p className="pl-12">{reply.content}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 답글 작성 폼 */}
                    {replyingTo?.id === comment.id && (
                      <div className="pl-20 mt-4">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Avatar className="h-6 w-6">
                              <AvatarImage
                                src={`https://avatar.vercel.sh/${CURRENT_USER}`}
                              />
                              <AvatarFallback>{CURRENT_USER[0]}</AvatarFallback>
                            </Avatar>
                            <span>{CURRENT_USER}</span>
                          </div>
                          <Textarea
                            placeholder="답글을 입력하세요..."
                            value={newReply}
                            onChange={(e) => setNewReply(e.target.value)}
                          />
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setReplyingTo(null);
                                setNewReply("");
                              }}
                            >
                              취소
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleReplySubmit(comment.id)}
                            >
                              답글 작성
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  {index < post.comments.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </main>

      <div className="sticky bottom-0 border-t bg-background p-4">
        <form onSubmit={handleCommentSubmit} className="max-w-4xl mx-auto">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Avatar className="h-6 w-6">
                <AvatarImage src={`https://avatar.vercel.sh/${CURRENT_USER}`} />
                <AvatarFallback>{CURRENT_USER[0]}</AvatarFallback>
              </Avatar>
              <span>{CURRENT_USER}</span>
            </div>
            <Textarea
              placeholder="댓글을 입력하세요..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button type="submit" className="self-end">
              <Send className="h-4 w-4 mr-2" />
              댓글 작성
            </Button>
          </div>
        </form>
      </div>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>게시글 삭제</AlertDialogTitle>
            <AlertDialogDescription>
              이 게시글을 정말 삭제하시겠습니까? 삭제된 게시글은 복구할 수
              없습니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
