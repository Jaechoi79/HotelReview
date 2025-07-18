export type Language = "en" | "ko" | "ja" | "zh"

export const translations = {
  en: {
    // General
    hotelReviewSystem: "Hotel Review System",
    home: "Home",
    reviews: "Reviews",
    admin: "Admin",
    login: "Login",
    register: "Register",
    logout: "Logout",
    menu: "Menu",
    close: "Close",
    announcements: "Announcements",
    customerVoice: "Customer's Voice",
    staffEvaluation: "Staff Evaluation",
    roomReview: "Room Review",
    restaurantReview: "Restaurant Review",
    blog: "Blog",

    // Auth
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    name: "Name",
    pleaseEnterYourCredentials: "Please enter your credentials to login",
    pleaseEnterEmailAndPassword: "Please enter your email and password",
    invalidCredentials: "Invalid email or password",
    loginSuccessful: "Login successful",
    dontHaveAccount: "Don't have an account?",
    createNewAccount: "Create a new account",
    pleaseCompleteAllFields: "Please complete all fields",
    passwordsDoNotMatch: "Passwords do not match",
    registrationSuccessful: "Registration successful",
    emailAlreadyExists: "Email already exists",
    alreadyHaveAccount: "Already have an account?",

    // Home page
    discoverBestHotels: "Discover the Best Hotels Worldwide",
    heroDescription:
      "Read authentic reviews from real travelers and share your own experiences to help others find their perfect stay.",
    exploreReviews: "Explore Reviews",
    writeReview: "Write a Review",
    topRatedHotels: "Top Rated Hotels",
    basedOnUserReviews: "Based on user reviews",
    viewAll: "View All",
    readReviews: "Read Reviews",
    review: "review",
    reviews: "reviews",
    noReviewsYet: "No Reviews Yet",
    beFirstToReview: "Be the first to review a hotel",

    // Reviews
    hotelReviews: "Hotel Reviews",
    browseAndSearchReviews: "Browse and search hotel reviews",
    searchReviews: "Search reviews...",
    filterByCategory: "Filter by category",
    allCategories: "All Categories",
    luxury: "Luxury",
    business: "Business",
    budget: "Budget",
    resort: "Resort",
    boutique: "Boutique",
    noReviewsFound: "No Reviews Found",
    tryAdjustingFilters: "Try adjusting your search or filters",
    topHotels: "Top Hotels",
    highestRatedHotels: "Highest rated hotels",

    // Submit review
    submitNewReview: "Submit a New Review",
    shareYourExperience: "Share your experience with others",
    hotelName: "Hotel Name",
    enterHotelName: "Enter hotel name",
    location: "Location",
    enterLocation: "Enter location (city, country)",
    rating: "Rating",
    category: "Category",
    selectCategory: "Select a category",
    comment: "Comment",
    enterYourReview: "Enter your review here...",
    submitReview: "Submit Review",
    pleaseLoginToSubmitReview: "Please login to submit a review",
    reviewSubmittedSuccessfully: "Review submitted successfully",

    // Admin
    adminDashboard: "Admin Dashboard",
    manageReviewsAndUsers: "Manage reviews and users",
    totalReviews: "Total Reviews",
    totalUsers: "Total Users",
    averageRating: "Average Rating",
    users: "Users",
    allReviews: "All Reviews",
    manageAllReviews: "Manage all reviews",
    allUsers: "All Users",
    manageAllUsers: "Manage all users",
    role: "Role",
    date: "Date",
    actions: "Actions",
    noUsersFound: "No Users Found",
    confirmDeletion: "Confirm Deletion",
    areYouSureDeleteReview: "Are you sure you want to delete this review? This action cannot be undone.",
    areYouSureDeleteUser: "Are you sure you want to delete this user? This action cannot be undone.",
    cancel: "Cancel",
    delete: "Delete",
    reviewDeletedSuccessfully: "Review deleted successfully",
    userDeletedSuccessfully: "User deleted successfully",

    // Theme
    light: "Light",
    dark: "Dark",
    system: "System",

    // Messages
    success: "Success",
    error: "Error",
    user: "User",

    // Announcements
    announcementTitle: "Announcements",
    announcementDescription: "Latest news and updates from our hotel review system",
    readMore: "Read More",
    backToAnnouncements: "Back to Announcements",
    postedOn: "Posted on",
    noAnnouncementsFound: "No announcements found",

    // Customer Voice
    customerVoiceTitle: "Customer Voice",
    customerVoiceDescription: "Feedback and suggestions from our users",
    yourFeedback: "Your Feedback",
    feedbackType: "Feedback Type",
    suggestion: "Suggestion",
    complaint: "Complaint",
    praise: "Praise",
    question: "Question",
    submitFeedback: "Submit Feedback",
    feedbackSubmittedSuccessfully: "Feedback submitted successfully",
    recentFeedback: "Recent Feedback",
    noFeedbackFound: "No feedback found",

    // Staff Evaluation
    staffEvaluationTitle: "Hotel Staff Evaluation",
    staffEvaluationDescription: "Rate your experience with hotel staff",
    veryDissatisfied: "Very Dissatisfied",
    dissatisfied: "Dissatisfied",
    neutral: "Neutral",
    satisfied: "Satisfied",
    verySatisfied: "Very Satisfied",
    staffFriendliness: "Was the staff friendly?",
    staffAppearance: "Was the staff's appearance neat and tidy?",
    staffSmile: "Did the staff have a smiling face?",
    staffTone: "Was the staff's tone friendly?",
    staffToneReason: "If you felt the staff's tone was unfriendly, please explain why (within 500 characters)",
    staffComplaintHandling: "How was the staff's attitude towards handling complaints?",
    staffComplaintResolution: "Did the staff resolve your complaints?",
    managerHandling: "Did the duty manager understand your complaint and resolve it quickly?",
    submitEvaluation: "Submit Evaluation",
    evaluationSubmittedSuccessfully: "Evaluation submitted successfully",
    pleaseRateAllItems: "Please rate all items",
    hotelSelection: "Select Hotel",
    selectHotel: "Select a hotel",
    walkInResponseRating: "How was the staff's response when you visited without a reservation?",
    walkInServiceEqualityRating:
      "Did the staff provide equal service to walk-in customers compared to those with reservations?",

    // Room Review
    roomReviewTitle: "Room Review",
    roomReviewDescription: "Rate your experience with the hotel room",
    roomCleanliness: "Was the room clean?",
    bathroomCleanliness: "Was the bathroom tub clean?",
    curtainSmell: "Was there a water smell from the shower curtain?",
    beddingCleanliness: "Was the bedding clean?",
    roomReviewSubmittedSuccessfully: "Room review submitted successfully",

    // Restaurant Review
    restaurantReviewTitle: "Restaurant Review",
    restaurantReviewDescription: "Rate your experience with the hotel restaurant",
    restaurantStaffFriendliness: "Were the restaurant staff friendly?",
    menuExplanation: "Did the staff provide detailed explanations about the menu?",
    restaurantReviewSubmittedSuccessfully: "Restaurant review submitted successfully",

    // Additional comments
    additionalComments: "Additional Comments",
    shareMoreFeedback: "Share more detailed feedback",

    // Search
    title: "Hotel Review Platform",
    subtitle: "Rate the hotels you've stayed at",
    stayedHotel: "Enter hotel you stayed at",
    checkedInDate: "Check-in date",
    checkedOutDate: "Check-out date",
    search_btn: "Search",
    recommended: "Recommended Hotels",
    guests: "guests",
    availableNow: "Available Now",
    breakfast: "Breakfast Included",

    // Hotel Details
    overview: "Overview",
    detailedRatings: "Detailed Ratings",
    amenities: "Amenities",
    freeWifi: "Free WiFi",
    airConditioning: "Air Conditioning",
    gym: "Fitness Center",
    swimmingPool: "Swimming Pool",
    roomService: "Room Service",
    parking: "Free Parking",
    scoreBreakdown: "Score Breakdown",
    individualScores: "Individual category scores",
    weightedCalculation: "Weighted calculation based on Forbes criteria",
    finalRating: "Final Rating",
    weight: "weight",
  },
  ko: {
    // General
    hotelReviewSystem: "호텔 리뷰 시스템",
    home: "홈",
    reviews: "리뷰",
    admin: "관리자",
    login: "로그인",
    register: "회원가입",
    logout: "로그아웃",
    menu: "메뉴",
    close: "닫기",
    announcements: "공지사항",
    customerVoice: "고객의 소리 (CV)",
    staffEvaluation: "직원 평가",
    roomReview: "객실 리뷰",
    restaurantReview: "레스토랑 리뷰",
    blog: "블로그",

    // Auth
    email: "이메일",
    password: "비밀번호",
    confirmPassword: "비밀번호 확인",
    name: "이름",
    pleaseEnterYourCredentials: "로그인 정보를 입력해주세요",
    pleaseEnterEmailAndPassword: "이메일과 비밀번호를 입력해주세요",
    invalidCredentials: "이메일 또는 비밀번호가 올바르지 않습니다",
    loginSuccessful: "로그인 성공",
    dontHaveAccount: "계정이 없으신가요?",
    createNewAccount: "새 계정 만들기",
    pleaseCompleteAllFields: "모든 필드를 작성해주세요",
    passwordsDoNotMatch: "비밀번호가 일치하지 않습니다",
    registrationSuccessful: "회원가입 성공",
    emailAlreadyExists: "이미 존재하는 이메일입니다",
    alreadyHaveAccount: "이미 계정이 있으신가요?",

    // Home page
    discoverBestHotels: "전 세계 최고의 호텔을 발견하세요",
    heroDescription:
      "실제 여행자의 진정한 리뷰를 읽고 자신의 경험을 공유하여 다른 사람들이 완벽한 숙소를 찾을 수 있도록 도와주세요.",
    exploreReviews: "리뷰 탐색",
    writeReview: "리뷰 작성",
    topRatedHotels: "최고 평점 호텔",
    basedOnUserReviews: "사용자 리뷰 기준",
    viewAll: "모두 보기",
    readReviews: "리뷰 읽기",
    review: "리뷰",
    reviews: "리뷰",
    noReviewsYet: "아직 리뷰가 없습니다",
    beFirstToReview: "첫 번째 호텔 리뷰를 작성해보세요",

    // Reviews
    hotelReviews: "호텔 리뷰",
    browseAndSearchReviews: "호텔 리뷰 검색 및 탐색",
    searchReviews: "리뷰 검색...",
    filterByCategory: "카테고리별 필터",
    allCategories: "모든 카테고리",
    luxury: "럭셔리",
    business: "비즈니스",
    budget: "저가",
    resort: "리조트",
    boutique: "부티크",
    noReviewsFound: "리뷰를 찾을 수 없습니다",
    tryAdjustingFilters: "검색어나 필터를 조정해보세요",
    topHotels: "인기 호텔",
    highestRatedHotels: "최고 평점 호텔",

    // Submit review
    submitNewReview: "새 리뷰 작성",
    shareYourExperience: "다른 사람들과 경험을 공유하세요",
    hotelName: "호텔 이름",
    enterHotelName: "호텔 이름 입력",
    location: "위치",
    enterLocation: "위치 입력 (도시, 국가)",
    rating: "평점",
    category: "카테고리",
    selectCategory: "카테고리 선택",
    comment: "코멘트",
    enterYourReview: "리뷰를 여기에 입력하세요...",
    submitReview: "리뷰 제출",
    pleaseLoginToSubmitReview: "리뷰를 작성하려면 로그인해주세요",
    reviewSubmittedSuccessfully: "리뷰가 성공적으로 제출되었습니다",

    // Admin
    adminDashboard: "관리자 대시보드",
    manageReviewsAndUsers: "리뷰 및 사용자 관리",
    totalReviews: "전체 리뷰",
    totalUsers: "전체 사용자",
    averageRating: "평균 평점",
    users: "사용자",
    allReviews: "모든 리뷰",
    manageAllReviews: "모든 리뷰 관리",
    allUsers: "모든 사용자",
    manageAllUsers: "모든 사용자 관리",
    role: "역할",
    date: "날짜",
    actions: "작업",
    noUsersFound: "사용자를 찾을 수 없습니다",
    confirmDeletion: "삭제 확인",
    areYouSureDeleteReview: "이 리뷰를 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.",
    areYouSureDeleteUser: "이 사용자를 삭제하시겠습니까? 이 작업은 취소할 수 없습니다.",
    cancel: "취소",
    delete: "삭제",
    reviewDeletedSuccessfully: "리뷰가 성공적으로 삭제되었습니다",
    userDeletedSuccessfully: "사용자가 성공적으로 삭제되었습니다",

    // Theme
    light: "라이트",
    dark: "다크",
    system: "시스템",

    // Messages
    success: "성공",
    error: "오류",
    user: "사용자",

    // Announcements
    announcementTitle: "공지사항",
    announcementDescription: "호텔 리뷰 시스템의 최신 소식과 업데이트",
    readMore: "더 보기",
    backToAnnouncements: "공지사항으로 돌아가기",
    postedOn: "게시일",
    noAnnouncementsFound: "공지사항이 없습니다",

    // Customer Voice
    customerVoiceTitle: "고객의 소리",
    customerVoiceDescription: "사용자의 피드백과 제안",
    yourFeedback: "귀하의 피드백",
    feedbackType: "피드백 유형",
    suggestion: "제안",
    complaint: "불만",
    praise: "칭찬",
    question: "질문",
    submitFeedback: "피드백 제출",
    feedbackSubmittedSuccessfully: "피드백이 성공적으로 제출되었습니다",
    recentFeedback: "최근 피드백",
    noFeedbackFound: "피드백이 없습니다",

    // Staff Evaluation
    staffEvaluationTitle: "호텔 직원 평가",
    staffEvaluationDescription: "호텔 직원과의 경험을 평가해주세요",
    veryDissatisfied: "매우 불만족",
    dissatisfied: "불만족",
    neutral: "보통",
    satisfied: "만족",
    verySatisfied: "매우 만족",
    staffFriendliness: "직원의 응대는 친절했나요?",
    staffAppearance: "직원의 용모는 단정하였나요?",
    staffSmile: "직원이 미소 띤 얼굴을 하고 있었나요?",
    staffTone: "직원의 어투는 친절했나요?",
    staffToneReason: "직원의 말투에서 불친절을 느꼈다면 이유는? (500자 이내로 적어 주세요)",
    staffComplaintHandling: "직원의 고객불만을 대하는 태도는 어떠했나요?",
    staffComplaintResolution: "직원이 불만을 해결해 주었나요?",
    managerHandling: "중간 관리자(당직매니저)는 당신의 불만을 이해하고 빨리 해결해 주었나요?",
    submitEvaluation: "평가 제출",
    evaluationSubmittedSuccessfully: "평가가 성공적으로 제출되었습니다",
    pleaseRateAllItems: "모든 항목을 평가해주세요",
    hotelSelection: "호텔 선택",
    selectHotel: "호텔을 선택하세요",
    walkInResponseRating: "워크인으로 이용시 직원의 응대는 어땠나요?",
    walkInServiceEqualityRating: "워크인으로 이용시 직원이 예약한 손님과 동등한 서비스를 제공했나요?",

    // Room Review
    roomReviewTitle: "객실 리뷰",
    roomReviewDescription: "호텔 객실에 대한 경험을 평가해주세요",
    roomCleanliness: "객실은 깨끗했나요?",
    bathroomCleanliness: "화장실 욕조는 깨끗했나요?",
    curtainSmell: "욕조의 커튼에서 물냄새는 않났나요?",
    beddingCleanliness: "침구류는 깨끗 했나요?",
    roomReviewSubmittedSuccessfully: "객실 리뷰가 성공적으로 제출되었습니다",

    // Restaurant Review
    restaurantReviewTitle: "레스토랑 리뷰",
    restaurantReviewDescription: "호텔 레스토랑에 대한 경험을 평가해주세요",
    restaurantStaffFriendliness: "레스토랑 직원들은 친절했나요?",
    menuExplanation: "직원들이 메뉴에 대한 설명은 자세했나요?",
    restaurantReviewSubmittedSuccessfully: "레스토랑 리뷰가 성공적으로 제출되었습니다",

    // Additional comments
    additionalComments: "추가 의견",
    shareMoreFeedback: "더 자세한 의견을 공유해주세요",

    // Search
    title: "호텔 리뷰 플랫폼",
    subtitle: "여러분이 직접 투숙했던 호텔 등급을 정해세요",
    stayedHotel: "투숙했던 호텔",
    checkedInDate: "체크인 했던 날짜",
    checkedOutDate: "체크아웃 했던 날짜",
    search_btn: "검색",
    recommended: "추천 호텔",
    guests: "투숙객",
    availableNow: "지금 예약 가능",
    breakfast: "조식 포함",

    // Hotel Details
    overview: "개요",
    detailedRatings: "상세 평점",
    amenities: "편의 시설",
    freeWifi: "무료 와이파이",
    airConditioning: "에어컨",
    gym: "피트니스 센터",
    swimmingPool: "수영장",
    roomService: "룸서비스",
    parking: "무료 주차",
    scoreBreakdown: "점수 분석",
    individualScores: "카테고리별 개별 점수",
    weightedCalculation: "포브스 기준에 따른 가중 계산",
    finalRating: "최종 평점",
    weight: "가중치",
  },
  ja: {
    // General
    hotelReviewSystem: "ホテルレビューシステム",
    home: "ホーム",
    reviews: "レビュー",
    admin: "管理者",
    login: "ログイン",
    register: "登録",
    logout: "ログアウト",
    menu: "メニュー",
    close: "閉じる",
    announcements: "お知らせ",
    customerVoice: "お客様の声",
    staffEvaluation: "スタッフ評価",
    roomReview: "客室レビュー",
    restaurantReview: "レストランレビュー",
    blog: "ブログ",

    // Auth
    email: "メールアドレス",
    password: "パスワード",
    confirmPassword: "パスワード確認",
    name: "名前",
    pleaseEnterYourCredentials: "ログイン情報を入力してください",
    pleaseEnterEmailAndPassword: "メールアドレスとパスワードを入力してください",
    invalidCredentials: "メールアドレスまたはパスワードが正しくありません",
    loginSuccessful: "ログイン成功",
    dontHaveAccount: "アカウントをお持ちでないですか？",
    createNewAccount: "新しいアカウントを作成",
    pleaseCompleteAllFields: "すべての項目を入力してください",
    passwordsDoNotMatch: "パスワードが一致しません",
    registrationSuccessful: "登録成功",
    emailAlreadyExists: "このメールアドレスは既に存在します",
    alreadyHaveAccount: "すでにアカウントをお持ちですか？",

    // Home page
    discoverBestHotels: "世界中の最高のホテルを発見",
    heroDescription:
      "実際の旅行者からの本物のレビューを読み、あなた自身の経験を共有して、他の人が完璧な滞在先を見つけるのを手伝いましょう。",
    exploreReviews: "レビューを探索",
    writeReview: "レビューを書く",
    topRatedHotels: "高評価ホテル",
    basedOnUserReviews: "ユーザーレビューに基づく",
    viewAll: "すべて表示",
    readReviews: "レビューを読む",
    review: "レビュー",
    reviews: "レビュー",
    noReviewsYet: "まだレビューがありません",
    beFirstToReview: "最初のホテルレビューを書いてみましょう",

    // Reviews
    hotelReviews: "ホテルレビュー",
    browseAndSearchReviews: "ホテルレビューを検索・閲覧",
    searchReviews: "レビューを検索...",
    filterByCategory: "カテゴリーでフィルター",
    allCategories: "すべてのカテゴリー",
    luxury: "高級",
    business: "ビジネス",
    budget: "格安",
    resort: "リゾート",
    boutique: "ブティック",
    noReviewsFound: "レビューが見つかりません",
    tryAdjustingFilters: "検索条件やフィルターを調整してみてください",
    topHotels: "人気ホテル",
    highestRatedHotels: "最高評価のホテル",

    // Submit review
    submitNewReview: "新しいレビューを投稿",
    shareYourExperience: "あなたの経験を他の人と共有しましょう",
    hotelName: "ホテル名",
    enterHotelName: "ホテル名を入力",
    location: "場所",
    enterLocation: "場所を入力（都市、国）",
    rating: "評価",
    category: "カテゴリー",
    selectCategory: "カテゴリーを選択",
    comment: "コメント",
    enterYourReview: "レビューをここに入力してください...",
    submitReview: "レビューを送信",
    pleaseLoginToSubmitReview: "レビューを投稿するにはログインしてください",
    reviewSubmittedSuccessfully: "レビューが正常に送信されました",

    // Admin
    adminDashboard: "管理者ダッシュボード",
    manageReviewsAndUsers: "レビューとユーザーを管理",
    totalReviews: "レビュー総数",
    totalUsers: "ユーザー総数",
    averageRating: "平均評価",
    users: "ユーザー",
    allReviews: "すべてのレビュー",
    manageAllReviews: "すべてのレビューを管理",
    allUsers: "すべてのユーザー",
    manageAllUsers: "すべてのユーザーを管理",
    role: "役割",
    date: "日付",
    actions: "アクション",
    noUsersFound: "ユーザーが見つかりません",
    confirmDeletion: "削除の確認",
    areYouSureDeleteReview: "このレビューを削除してもよろしいですか？この操作は元に戻せません。",
    areYouSureDeleteUser: "このユーザーを削除してもよろしいですか？この操作は元に戻せません。",
    cancel: "キャンセル",
    delete: "削除",
    reviewDeletedSuccessfully: "レビューが正常に削除されました",
    userDeletedSuccessfully: "ユーザーが正常に削除されました",

    // Theme
    light: "ライト",
    dark: "ダーク",
    system: "システム",

    // Messages
    success: "成功",
    error: "エラー",
    user: "ユーザー",

    // Announcements
    announcementTitle: "お知らせ",
    announcementDescription: "ホテルレビューシステムからの最新ニュースと更新情報",
    readMore: "続きを読む",
    backToAnnouncements: "お知らせに戻る",
    postedOn: "投稿日",
    noAnnouncementsFound: "お知らせが見つかりません",

    // Customer Voice
    customerVoiceTitle: "お客様の声",
    customerVoiceDescription: "ユーザーからのフィードバックと提案",
    yourFeedback: "あなたのフィードバック",
    feedbackType: "フィードバックタイプ",
    suggestion: "提案",
    complaint: "苦情",
    praise: "称賛",
    question: "質問",
    submitFeedback: "フィードバックを送信",
    feedbackSubmittedSuccessfully: "フィードバックが正常に送信されました",
    recentFeedback: "最近のフィードバック",
    noFeedbackFound: "フィードバックが見つかりません",

    // Staff Evaluation
    staffEvaluationTitle: "ホテルスタッフ評価",
    staffEvaluationDescription: "ホテルスタッフとの経験を評価してください",
    veryDissatisfied: "非常に不満",
    dissatisfied: "不満",
    neutral: "普通",
    satisfied: "満足",
    verySatisfied: "非常に満足",
    staffFriendliness: "スタッフは親切でしたか？",
    staffAppearance: "スタッフの身だしなみは整っていましたか？",
    staffSmile: "スタッフは笑顔でしたか？",
    staffTone: "スタッフの話し方は親切でしたか？",
    staffToneReason: "スタッフの話し方が不親切だと感じた場合、その理由を教えてください（500文字以内）",
    staffComplaintHandling: "スタッフの苦情対応の態度はどうでしたか？",
    staffComplaintResolution: "スタッフはあなたの苦情を解決しましたか？",
    managerHandling: "当直マネージャーはあなたの苦情を理解し、迅速に解決しましたか？",
    submitEvaluation: "評価を送信",
    evaluationSubmittedSuccessfully: "評価が正常に送信されました",
    pleaseRateAllItems: "すべての項目を評価してください",
    hotelSelection: "ホテル選択",
    selectHotel: "ホテルを選択してください",

    // Room Review
    roomReviewTitle: "客室レビュー",
    roomReviewDescription: "ホテルの客室に関する経験を評価してください",
    roomCleanliness: "客室は清潔でしたか？",
    bathroomCleanliness: "バスルームの浴槽は清潔でしたか？",
    curtainSmell: "シャワーカーテンから水の臭いはしませんでしたか？",
    beddingCleanliness: "寝具は清潔でしたか？",
    roomReviewSubmittedSuccessfully: "客室レビューが正常に送信されました",

    // Restaurant Review
    restaurantReviewTitle: "レストランレビュー",
    restaurantReviewDescription: "ホテルのレストランに関する経験を評価してください",
    restaurantStaffFriendliness: "レストランのスタッフは親切でしたか？",
    menuExplanation: "スタッフはメニューについて詳しく説明しましたか？",
    restaurantReviewSubmittedSuccessfully: "レストランレビューが正常に送信されました",

    // Additional comments
    additionalComments: "追加コメント",
    shareMoreFeedback: "より詳細なフィードバックを共有してください",

    // Search
    title: "ホテルレビュープラットフォーム",
    subtitle: "滞在したホテルを評価しましょう",
    stayedHotel: "宿泊したホテル",
    checkedInDate: "チェックインした日付",
    checkedOutDate: "チェックアウトした日付",
    search_btn: "検索",
    recommended: "おすすめホテル",
    guests: "宿泊者",
    availableNow: "今すぐ予約可能",
    breakfast: "朝食付き",

    // Hotel Details
    overview: "概要",
    detailedRatings: "詳細評価",
    amenities: "設備",
    freeWifi: "無料Wi-Fi",
    airConditioning: "エアコン",
    gym: "フィットネスセンター",
    swimmingPool: "プール",
    roomService: "ルームサービス",
    parking: "無料駐車場",
    scoreBreakdown: "スコア内訳",
    individualScores: "カテゴリー別個別スコア",
    weightedCalculation: "フォーブス基準による重み付け計算",
    finalRating: "最終評価",
    weight: "重み",
  },
  zh: {
    // General
    hotelReviewSystem: "酒店评价系统",
    home: "首页",
    reviews: "评价",
    admin: "管理员",
    login: "登录",
    register: "注册",
    logout: "退出",
    menu: "菜单",
    close: "关闭",
    announcements: "公告",
    customerVoice: "客户之声",
    staffEvaluation: "员工评价",
    roomReview: "客房评价",
    restaurantReview: "餐厅评价",
    blog: "博客",

    // Auth
    email: "电子邮箱",
    password: "密码",
    confirmPassword: "确认密码",
    name: "姓名",
    pleaseEnterYourCredentials: "请输入您的登录信息",
    pleaseEnterEmailAndPassword: "请输入电子邮箱和密码",
    invalidCredentials: "电子邮箱或密码不正确",
    loginSuccessful: "登录成功",
    dontHaveAccount: "没有账户？",
    createNewAccount: "创建新账户",
    pleaseCompleteAllFields: "请完成所有字段",
    passwordsDoNotMatch: "密码不匹配",
    registrationSuccessful: "注册成功",
    emailAlreadyExists: "电子邮箱已存在",
    alreadyHaveAccount: "已有账户？",

    // Home page
    discoverBestHotels: "发现全球最佳酒店",
    heroDescription: "阅读真实旅行者的评价，分享您自己的经验，帮助他人找到完美的住宿。",
    exploreReviews: "探索评价",
    writeReview: "写评价",
    topRatedHotels: "最高评分酒店",
    basedOnUserReviews: "基于用户评价",
    viewAll: "查看全部",
    readReviews: "阅读评价",
    review: "评价",
    reviews: "评价",
    noReviewsYet: "暂无评价",
    beFirstToReview: "成为第一个评价酒店的人",

    // Reviews
    hotelReviews: "酒店评价",
    browseAndSearchReviews: "浏览和搜索酒店评价",
    searchReviews: "搜索评价...",
    filterByCategory: "按类别筛选",
    allCategories: "所有类别",
    luxury: "豪华",
    business: "商务",
    budget: "经济",
    resort: "度假村",
    boutique: "精品",
    noReviewsFound: "未找到评价",
    tryAdjustingFilters: "尝试调整搜索或筛选条件",
    topHotels: "热门酒店",
    highestRatedHotels: "最高评分酒店",

    // Submit review
    submitNewReview: "提交新评价",
    shareYourExperience: "与他人分享您的经验",
    hotelName: "酒店名称",
    enterHotelName: "输入酒店名称",
    location: "位置",
    enterLocation: "输入位置（城市，国家）",
    rating: "评分",
    category: "类别",
    selectCategory: "选择类别",
    comment: "评论",
    enterYourReview: "在此输入您的评价...",
    submitReview: "提交评价",
    pleaseLoginToSubmitReview: "请登录以提交评价",
    reviewSubmittedSuccessfully: "评价提交成功",

    // Admin
    adminDashboard: "管理员仪表板",
    manageReviewsAndUsers: "管理评价和用户",
    totalReviews: "评价总数",
    totalUsers: "用户总数",
    averageRating: "平均评分",
    users: "用户",
    allReviews: "所有评价",
    manageAllReviews: "管理所有评价",
    allUsers: "所有用户",
    manageAllUsers: "管理所有用户",
    role: "角色",
    date: "日期",
    actions: "操作",
    noUsersFound: "未找到用户",
    confirmDeletion: "确认删除",
    areYouSureDeleteReview: "您确定要删除此评价吗？此操作无法撤销。",
    areYouSureDeleteUser: "您确定要删除此用户吗？此操作无法撤销。",
    cancel: "取消",
    delete: "删除",
    reviewDeletedSuccessfully: "评价删除成功",
    userDeletedSuccessfully: "用户删除成功",

    // Theme
    light: "浅色",
    dark: "深色",
    system: "系统",

    // Messages
    success: "成功",
    error: "错误",
    user: "用户",

    // Announcements
    announcementTitle: "公告",
    announcementDescription: "酒店评价系统的最新消息和更新",
    readMore: "阅读更多",
    backToAnnouncements: "返回公告",
    postedOn: "发布于",
    noAnnouncementsFound: "未找到公告",

    // Customer Voice
    customerVoiceTitle: "客户之声",
    customerVoiceDescription: "用户的反馈和建议",
    yourFeedback: "您的反馈",
    feedbackType: "反馈类型",
    suggestion: "建议",
    complaint: "投诉",
    praise: "表扬",
    question: "问题",
    submitFeedback: "提交反馈",
    feedbackSubmittedSuccessfully: "反馈提交成功",
    recentFeedback: "最近反馈",
    noFeedbackFound: "未找到反馈",

    // Staff Evaluation
    staffEvaluationTitle: "酒店员工评价",
    staffEvaluationDescription: "评价您与酒店员工的体验",
    veryDissatisfied: "非常不满意",
    dissatisfied: "不满意",
    neutral: "一般",
    satisfied: "满意",
    verySatisfied: "非常满意",
    staffFriendliness: "员工态度友好吗？",
    staffAppearance: "员工仪表整洁吗？",
    staffSmile: "员工面带微笑吗？",
    staffTone: "员工语气友好吗？",
    staffToneReason: "如果您觉得员工语气不友好，请说明原因（500字以内）",
    staffComplaintHandling: "员工处理投诉的态度如何？",
    staffComplaintResolution: "员工解决了您的投诉吗？",
    managerHandling: "值班经理是否理解您的投诉并迅速解决？",
    submitEvaluation: "提交评价",
    evaluationSubmittedSuccessfully: "评价提交成功",
    pleaseRateAllItems: "请评价所有项目",
    hotelSelection: "选择酒店",
    selectHotel: "请选择酒店",

    // Room Review
    roomReviewTitle: "客房评价",
    roomReviewDescription: "评价您对酒店客房的体验",
    roomCleanliness: "客房干净吗？",
    bathroomCleanliness: "浴室浴缸干净吗？",
    curtainSmell: "浴帘有水味吗？",
    beddingCleanliness: "床上用品干净吗？",
    roomReviewSubmittedSuccessfully: "客房评价提交成功",

    // Restaurant Review
    restaurantReviewTitle: "餐厅评价",
    restaurantReviewDescription: "评价您对酒店餐厅的体验",
    restaurantStaffFriendliness: "餐厅员工友好吗？",
    menuExplanation: "员工对菜单的解释详细吗？",
    restaurantReviewSubmittedSuccessfully: "餐厅评价提交成功",

    // Additional comments
    additionalComments: "其他意见",
    shareMoreFeedback: "分享更多详细反馈",

    // Search
    title: "酒店评价平台",
    subtitle: "为您入住过的酒店评分",
    stayedHotel: "您入住过的酒店",
    checkedInDate: "入住日期",
    checkedOutDate: "退房日期",
    search_btn: "搜索",
    recommended: "推荐酒店",
    guests: "客人",
    availableNow: "现在可预订",
    breakfast: "含早餐",

    // Hotel Details
    overview: "概览",
    detailedRatings: "详细评分",
    amenities: "设施",
    freeWifi: "免费WiFi",
    airConditioning: "空调",
    gym: "健身中心",
    swimmingPool: "游泳池",
    roomService: "客房服务",
    parking: "免费停车",
    scoreBreakdown: "分数明细",
    individualScores: "各类别单项分数",
    weightedCalculation: "基于福布斯标准的加权计算",
    finalRating: "最终评分",
    weight: "权重",
  },
}
