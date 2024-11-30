import { useRouter } from "next/navigation";
import { Post } from "@/types/post";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageSquare, Heart } from "lucide-react";

interface MyPostsProps {
  posts: Post[];
}

export default function MyPosts({ posts }: MyPostsProps) {
  const router = useRouter();

  const getCommentsCount = (post: Post) => {
    return (
      post.comments.length +
      post.comments.reduce((acc, comment) => acc + comment.replies.length, 0)
    );
  };

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
        <p>작성한 게시글이 없습니다.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[600px]">
      <div className="divide-y">
        {posts.map((post) => (
          <button
            key={post.id}
            className="w-full text-left hover:bg-muted/50 transition-colors focus:outline-none focus:bg-muted/50"
            onClick={() => router.push(`/posts/${post.id}`)}
          >
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0 mr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
                      {post.board === "review"
                        ? "교환학생 후기"
                        : post.board === "free"
                          ? "자유게시판"
                          : "질문게시판"}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium truncate">{post.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {post.createdAt}
                  </p>
                  {/* 글 미리보기 추가 */}
                  <p className="text-xs mt-2 text-muted-foreground line-clamp-1">
                    {post.content}
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground shrink-0">
                  <span className="flex items-center">
                    <Heart
                      className={`h-3 w-3 mr-0.5 ${
                        post.isLiked ? "fill-current text-primary" : ""
                      }`}
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
  );
}
