import { Post } from "@/types/post";

export const posts: Post[] = [
  {
    id: 1,
    title: "프랑스 파리 1대학 교환학생 후기",
    content:
      "안녕하세요! 저는 지난 학기에 파리 1대학교로 교환학생을 다녀왔습니다. 파리에서의 6개월은 제 인생에서 가장 값진 경험이었습니다. 현지 학생들과 함께 수업을 들으며 프랑스의 교육 방식을 직접 체험할 수 있었고, 다양한 문화 행사와 여행을 통해 유럽의 문화를 깊이 이해하게 되었습니다. 특히 세미나 형식의 수업은 매우 인상적이었는데, 학생들의 적극적인 토론 참여가 인상 깊었습니다. 물론 처음에는 언어의 장벽이 있었지만, 현지 학생들의 도움으로 잘 적응할 수 있었습니다. 숙소는 교내 기숙사를 이용했는데, 다양한 국적의 학생들과 교류할 수 있는 좋은 기회였습니다...",
    author: "윤성민",
    createdAt: "2024-01-15",
    likes: 45,
    isLiked: false,
    board: "review",
    comments: [
      {
        id: 1,
        author: "강동규",
        content: "기숙사 신청은 어떻게 하셨나요? 경쟁이 심한가요?",
        createdAt: "2024-01-15",
        isAuthor: false,
        replies: [
          {
            id: 1,
            author: "윤성민",
            content:
              "입학 허가 받으면 바로 신청하시는게 좋아요! 2월에 신청 시작했는데 3월엔 마감되더라구요.",
            createdAt: "2024-01-15",
            isAuthor: true,
          },
          {
            id: 2,
            author: "박세웅",
            content: "저도 궁금했던 부분이었는데 답변 감사합니다!",
            createdAt: "2024-01-16",
            isAuthor: false,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "미국 NYU 2023년 가을학기 생활기록",
    content:
      "뉴욕에서의 교환학생 생활을 공유합니다. NYU는 도시 전체가 캠퍼스라고 할 수 있을 만큼 뉴욕시와 밀접하게 연계된 커리큘럼을 제공했습니다. 비즈니스 스쿨에서 수강한 'Global Markets' 수업은 월스트리트 현장 방문과 전문가 특강이 포함되어 있어 매우 실용적이었습니다...",
    author: "강동규",
    createdAt: "2024-01-10",
    likes: 38,
    isLiked: false,
    board: "review",
    comments: [
      {
        id: 2,
        author: "문형주",
        content:
          "수업이 전부 영어로 진행되나요? 현지 학생들과 소통하는데 어려움은 없으셨나요?",
        createdAt: "2024-01-11",
        isAuthor: false,
        replies: [
          {
            id: 3,
            author: "강동규",
            content:
              "네, 전부 영어로 진행됩니다. 처음에는 힘들었지만 Study Group을 만들어서 도움을 많이 받았어요!",
            createdAt: "2024-01-11",
            isAuthor: true,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "독일 뮌헨공대 교환학생 후기",
    content:
      "공대생의 시각에서 본 독일 교환학생 경험을 공유합니다. 뮌헨공대의 실습 위주 교육과 산학협력 프로그램은 정말 인상적이었습니다. BMW, 지멘스 등 현지 기업과의 프로젝트 참여 기회도 있었고...",
    author: "문형주",
    createdAt: "2024-01-08",
    likes: 28,
    isLiked: false,
    board: "review",
    comments: [
      {
        id: 3,
        author: "지우진",
        content: "프로젝트 참여는 어떤 과정으로 하셨나요? 독일어 필수인가요?",
        createdAt: "2024-01-09",
        isAuthor: false,
        replies: [
          {
            id: 4,
            author: "문형주",
            content:
              "대부분의 프로젝트는 영어로 진행되어서 독일어가 필수는 아니에요. 하지만 있으면 더 좋죠!",
            createdAt: "2024-01-09",
            isAuthor: true,
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "일본 와세다 대학 후기입니다",
    content:
      "한 학기 동안 와세다 대학에서 공부하고 왔습니다. 일본어 수업부터 전공 수업까지, 전반적인 학교 생활과 동아리 활동 경험을 공유합니다...",
    author: "박세웅",
    createdAt: "2024-01-11",
    likes: 33,
    isLiked: false,
    board: "review",
    comments: [
      {
        id: 4,
        author: "윤성민",
        content: "동아리 활동은 어떤 것들 하셨나요? 한국 학생들이 많이 있나요?",
        createdAt: "2024-01-12",
        isAuthor: false,
        replies: [
          {
            id: 5,
            author: "박세웅",
            content:
              "저는 테니스 동아리 했어요! 한국 학생들도 있지만 현지 학생들과 더 많이 어울리려고 노력했습니다.",
            createdAt: "2024-01-12",
            isAuthor: true,
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "런던에서 룸메이트 구해요!",
    content:
      "2024년 봄학기 런던 킹스칼리지 교환학생 예정입니다. 현지에서 함께 살 룸메이트를 구하고 있어요. 제가 물색해둔 플랫이 있는데 투룸이라 한 명 구하고 있습니다...",
    author: "지우진",
    createdAt: "2024-01-14",
    likes: 12,
    isLiked: false,
    board: "free",
    comments: [
      {
        id: 5,
        author: "문형주",
        content: "월세는 얼마 정도인가요?",
        createdAt: "2024-01-14",
        isAuthor: false,
        replies: [
          {
            id: 6,
            author: "지우진",
            content: "1인당 월 800파운드 정도예요. 전기세, 수도세 포함입니다!",
            createdAt: "2024-01-14",
            isAuthor: true,
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "주말에 파리 여행 같이 가실 분!",
    content:
      "현재 런던에서 교환학생 중인데, 다음 주말에 파리 여행 계획 중입니다. 유로스타로 가려고 하는데 동행하실 분 계신가요?",
    author: "윤성민",
    createdAt: "2024-01-12",
    likes: 15,
    isLiked: false,
    board: "free",
    comments: [
      {
        id: 6,
        author: "강동규",
        content: "저도 관심 있습니다! 예산은 어느 정도로 생각하시나요?",
        createdAt: "2024-01-12",
        isAuthor: false,
        replies: [
          {
            id: 7,
            author: "윤성민",
            content: "교통비, 숙박비 포함해서 300파운드 정도로 생각중이에요!",
            createdAt: "2024-01-12",
            isAuthor: true,
          },
        ],
      },
    ],
  },
  {
    id: 7,
    title: "토플 스터디원 모집합니다",
    content:
      "다음 달 교환학생 지원 예정인데 토플 점수가 부족해서 스터디원 구합니다. 목표 점수 100점이고, 주 2회 오프라인 모임 가능하신 분...",
    author: "문형주",
    createdAt: "2024-01-13",
    likes: 22,
    isLiked: false,
    board: "free",
    comments: [
      {
        id: 7,
        author: "박세웅",
        content: "모임 장소는 어디인가요?",
        createdAt: "2024-01-13",
        isAuthor: false,
        replies: [
          {
            id: 8,
            author: "문형주",
            content: "신촌역 근처 스터디카페로 생각하고 있어요!",
            createdAt: "2024-01-13",
            isAuthor: true,
          },
        ],
      },
    ],
  },
  {
    id: 8,
    title: "교환학생 지원 자격 문의",
    content:
      "현재 2학년 1학기 재학 중인데, 교환학생 지원이 가능할까요? 학점은 3.8이고 토플은 아직 준비 중입니다.",
    author: "강동규",
    createdAt: "2024-01-15",
    likes: 5,
    isLiked: false,
    board: "qna",
    comments: [
      {
        id: 8,
        author: "윤성민",
        content: "보통 2학년 2학기부터 지원 가능해요. 학점은 충분하시네요!",
        createdAt: "2024-01-15",
        isAuthor: false,
        replies: [
          {
            id: 9,
            author: "강동규",
            content: "아 그렇군요! 감사합니다 ㅎㅎ",
            createdAt: "2024-01-15",
            isAuthor: true,
          },
        ],
      },
    ],
  },
  {
    id: 9,
    title: "현지 생활비 질문이요!",
    content:
      "독일 교환학생 준비 중입니다. 뮌헨 기준으로 월 생활비가 얼마 정도 들까요? 기숙사 비용 제외하고 식비, 교통비 위주로 알고 싶습니다.",
    author: "박세웅",
    createdAt: "2024-01-13",
    likes: 9,
    isLiked: false,
    board: "qna",
    comments: [
      {
        id: 9,
        author: "문형주",
        content:
          "식비랑 교통비 월 500유로 정도 들었어요. 학생 식당이랑 학생 교통카드 이용하면 훨씬 절약할 수 있어요!",
        createdAt: "2024-01-13",
        isAuthor: false,
        replies: [
          {
            id: 10,
            author: "박세웅",
            content: "상세한 답변 감사합니다! 많은 도움이 되었어요.",
            createdAt: "2024-01-13",
            isAuthor: true,
          },
        ],
      },
    ],
  },
  {
    id: 10,
    title: "기숙사vs자취 고민이에요",
    content:
      "다음 학기 일본 교환학생 갈 예정인데, 기숙사와 자취 중에 고민됩니다. 와세다대학교 기숙사 사시는 분 계신가요?",
    author: "지우진",
    createdAt: "2024-01-14",
    likes: 18,
    isLiked: false,
    board: "qna",
    comments: [
      {
        id: 10,
        author: "박세웅",
        content:
          "저는 와세다 기숙사 살았는데 위치도 좋고 시설도 깨끗해서 추천드려요!",
        createdAt: "2024-01-14",
        isAuthor: false,
        replies: [
          {
            id: 11,
            author: "지우진",
            content: "혹시 기숙사비는 얼마 정도인가요?",
            createdAt: "2024-01-14",
            isAuthor: true,
          },
          {
            id: 12,
            author: "박세웅",
            content: "월 8만엔 정도였어요. 식사 포함이에요!",
            createdAt: "2024-01-14",
            isAuthor: false,
          },
          {
            id: 13,
            author: "지우진",
            content: "상세한 답변 감사합니다! 기숙사로 결정했어요 ㅎㅎ",
            createdAt: "2024-01-15",
            isAuthor: true,
          },
        ],
      },
      {
        id: 11,
        author: "윤성민",
        content: "혹시 기숙사 신청 기간 아시나요?",
        createdAt: "2024-01-15",
        isAuthor: false,
        replies: [
          {
            id: 14,
            author: "박세웅",
            content: "보통 입학 허가 받고 2-3주 내로 신청해야 해요!",
            createdAt: "2024-01-15",
            isAuthor: false,
          },
        ],
      },
    ],
  },
];
