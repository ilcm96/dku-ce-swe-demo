import { posts } from "./posts";

// 현재 사용자가 작성한 게시글
export const myPosts = posts.filter((post) => post.author === "윤성민");

// 현재 사용자가 댓글을 단 게시글
export const myCommentedPosts = posts.filter((post) =>
  post.comments.some(
    (comment) =>
      comment.author === "윤성민" ||
      comment.replies.some((reply) => reply.author === "윤성민"),
  ),
);

// 현재 사용자가 좋아요 한 게시글 (임시로 몇 개 지정)
export const myLikedPosts = posts
  .map((post) => ({
    ...post,
    isLiked: [1, 3, 8].includes(post.id), // 임의로 1, 3, 8번 게시글을 좋아요 했다고 가정
  }))
  .filter((post) => post.isLiked);

// 현재 사용자 정보
export const userInfo = {
  id: "ilcm96",
  name: "윤성민",
  gender: "남성",
  phoneNumber: "010-1234-5678",
};
