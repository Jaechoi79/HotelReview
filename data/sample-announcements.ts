import type { Announcement } from "@/types/announcement"

// 한국어 샘플 공지사항
const koreanAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "새로운 호텔 평가 시스템 출시",
    content:
      "포브스 기준에 따른 새로운 호텔 평가 시스템을 출시하게 되어 기쁩니다. 이 시스템은 전 세계 호텔에 대한 더 포괄적이고 정확한 평가를 제공합니다.\n\n새로운 평가 시스템은 직원 서비스, 시설 품질, 청결도 및 전반적인 투숙객 경험과 같은 다양한 요소를 고려합니다. 각 카테고리는 공정하고 균형 잡힌 평가를 보장하기 위해 업계 표준에 따라 가중치가 부여됩니다.\n\n이 업데이트가 여행자들이 여행을 위한 숙소를 선택할 때 더 정보에 입각한 결정을 내리는 데 도움이 될 것이라고 믿습니다. 모든 사용자가 새 시스템을 사용해 보고 경험에 대한 피드백을 제공하도록 권장합니다.",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: "2",
    title: "모바일 앱 출시 안내",
    content:
      "iOS 및 Android 플랫폼 모두에서 모바일 애플리케이션이 출시되었음을 알려드립니다. 이제 이동 중에도 호텔 리뷰, 평점 및 예약 정보에 액세스할 수 있습니다!\n\n앱은 쉬운 탐색과 필요한 정보에 빠르게 액세스할 수 있도록 설계된 직관적인 인터페이스를 제공합니다. 호텔을 검색하고, 리뷰를 읽고 작성하며, 앱을 통해 직접 숙박을 예약할 수도 있습니다.\n\n주요 기능은 다음과 같습니다:\n\n- 저장된 호텔 및 리뷰에 오프라인으로 액세스\n- 예약 확인 및 특별 제안에 대한 실시간 알림\n- 완벽한 숙소를 찾기 위한 고급 필터링 옵션\n- 원하는 위치의 호텔을 탐색할 수 있는 통합 지도\n\n앱 스토어 또는 Google Play 스토어에서 오늘 앱을 다운로드하고 여행 계획을 한 단계 업그레이드하세요.",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
  {
    id: "3",
    title: "시스템 점검 일정 안내",
    content:
      "2025년 5월 10일 토요일 오전 2시부터 오전 5시(UTC)까지 시스템 점검이 예정되어 있습니다. 이 시간 동안 웹사이트와 모바일 앱이 일시적으로 중단되거나 기능이 제한될 수 있습니다.\n\n이 점검은 중요한 보안 업데이트 및 성능 개선을 구현하기 위해 필요합니다. 불편을 끼쳐드려 죄송합니다.\n\n이 시간 동안 플랫폼에 액세스해야 하는 경우 미리 계획해 주세요. 점검이 완료되면 모든 서비스가 완전히 복원됩니다.",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
  },
  {
    id: "4",
    title: "주요 호텔 체인과의 파트너십 체결",
    content:
      "전 세계 여러 주요 호텔 체인과의 새로운 파트너십을 발표하게 되어 기쁩니다. 이러한 협력을 통해 사용자에게 독점적인 혜택을 제공하고 전반적인 예약 경험을 향상시킬 수 있습니다.\n\n이러한 파트너십을 통해 이제 다음을 제공할 수 있습니다:\n\n- 특별 할인 및 프로모션 요금\n- 회원을 위한 우선 예약\n- 호텔 정보 및 편의 시설에 대한 향상된 검증\n- 호텔 관리와의 직접 커뮤니케이션 채널\n\n사용자에게 최상의 서비스와 가치를 제공하기 위해 파트너 네트워크를 지속적으로 확장하고 있습니다. 앞으로 몇 달 안에 더 많은 흥미로운 발표를 기대해 주세요!",
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days ago
  },
  {
    id: "5",
    title: "새로운 인증 리뷰 기능 도입",
    content:
      "플랫폼의 신뢰성과 신뢰도를 높이기 위해 '인증 리뷰' 기능을 구현했습니다. 이 기능은 사용자가 리뷰하는 호텔에서 확인된 숙박을 한 게스트의 리뷰를 식별하는 데 도움이 됩니다.\n\n인증 리뷰에는 특별한 배지가 표시되어 인증된 피드백과 인증되지 않은 피드백을 더 쉽게 구분할 수 있습니다. 이 추가 기능은 가짜 리뷰를 방지하고 정보에 입각한 결정을 내리는 데 도움이 되는 더 정확한 정보를 제공하는 것을 목표로 합니다.\n\n리뷰를 인증받으려면 리뷰를 제출할 때 예약 확인서나 영수증을 업로드하세요. 저희 팀이 정보를 확인하고 확인되면 리뷰에 인증 배지를 추가합니다.",
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
  },
  {
    id: "6",
    title: "개인정보 보호정책 업데이트",
    content:
      "데이터 수집, 사용 및 보호 방법에 대한 투명성을 높이기 위해 개인정보 보호정책을 업데이트했습니다. 변경 사항은 2025년 6월 1일부터 적용됩니다.\n\n주요 업데이트 내용:\n\n- 수집하는 데이터 유형에 대한 더 자세한 정보\n- 쿠키 및 유사한 기술 사용에 대한 향상된 설명\n- 제3자와의 데이터 공유 관행에 대한 명확화\n- 개인 데이터에 관한 귀하의 권리에 대한 추가 정보\n\n모든 사용자가 웹사이트 푸터에서 찾을 수 있는 업데이트된 개인정보 보호정책을 검토하시기 바랍니다. 질문이나 우려 사항이 있으시면 지원 팀에 문의하세요.",
    date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
  },
  {
    id: "7",
    title: "새로운 호텔 카테고리 추가",
    content:
      "더 구체적이고 관련성 높은 검색 결과를 제공하기 위해 호텔 카테고리를 확장했습니다. 새로운 카테고리는 다음과 같습니다:\n\n- 부티크 호텔\n- 친환경 숙소\n- 역사적 건물\n- 올인클루시브 리조트\n- 장기 숙박 호텔\n- 반려동물 친화적 옵션\n\n이러한 추가 카테고리는 원하는 것을 정확히 찾고 선호도에 맞는 새로운 유형의 숙소를 발견하는 데 도움이 됩니다. 이제 이러한 카테고리를 사용하여 검색 결과를 필터링하여 옵션을 좁히고 완벽한 숙소를 찾을 수 있습니다.",
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
  },
  {
    id: "8",
    title: "커뮤니티 가이드라인 업데이트",
    content:
      "모든 사용자를 위한 존중적이고 도움이 되는 환경을 보장하기 위해 커뮤니티 가이드라인을 개정했습니다. 이 가이드라인은 리뷰 작성, 댓글 달기, 토론 참여 등 플랫폼에서 상호 작용할 때 예상되는 행동을 설명합니다.\n\n업데이트된 가이드라인은 다음을 강조합니다:\n\n- 존중적인 커뮤니케이션\n- 정직하고 건설적인 피드백\n- 차별적이거나 공격적인 콘텐츠 금지\n- 적절한 사진 제출에 대한 가이드라인\n\n여행자들이 진정한 경험과 유용한 정보를 공유할 수 있는 긍정적인 커뮤니티를 유지하기 위해 최선을 다하고 있습니다. 이러한 가이드라인을 반복적으로 위반하는 사용자는 계정이 제한되거나 정지될 수 있습니다.",
    date: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(), // 75 days ago
  },
  {
    id: "9",
    title: "호텔 지속가능성 점수 도입",
    content:
      "환경 인식과 지속 가능한 여행 관행의 증가에 대응하여 플랫폼에 호텔 지속가능성 점수를 도입하고 있습니다. 이 점수는 호텔의 환경 이니셔티브, 에너지 효율성, 폐기물 관리 및 지역사회 참여를 기준으로 평가합니다.\n\n호텔은 1~5개의 녹색 잎 등급을 받게 되며, 5는 지속가능성에 대한 탁월한 헌신을 나타냅니다. 이 새로운 기능을 통해 환경을 의식하는 여행자들은 자신의 가치에 맞는 선택을 할 수 있습니다.\n\n이러한 등급의 정확성과 신뢰성을 보장하기 위해 독립 인증 기관 및 환경 단체와 협력하고 있습니다. 지속가능성 점수가 있는 호텔을 식별하려면 호텔 목록에서 녹색 잎 아이콘을 찾으세요.",
    date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
  },
  {
    id: "10",
    title: "웹사이트 리디자인 예정",
    content:
      "곧 웹사이트의 전체 리디자인이 진행될 예정입니다! 새로운 디자인은 향상된 탐색 및 기능을 갖춘 현대적이고 직관적인 인터페이스를 제공합니다.\n\n다가오는 리디자인의 주요 특징은 다음과 같습니다:\n\n- 더 빠른 로딩 시간과 향상된 성능\n- 더 많은 필터링 옵션을 갖춘 향상된 검색 기능\n- 원활한 크로스 디바이스 경험을 위한 향상된 모바일 반응성\n- 더 나은 가독성과 접근성을 갖춘 새로운 시각적 디자인\n- 더 자세한 정보가 포함된 확장된 호텔 프로필\n\n여러분의 피드백을 소중히 여기며 새로운 디자인에 많은 사용자 제안을 반영했습니다. 베타 버전은 향후 몇 주 내에 테스트를 위해 제공될 예정이며, 최종 제품을 개선하는 데 도움이 될 여러분의 의견을 환영합니다.",
    date: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(), // 120 days ago
  },
]

// 영어 샘플 공지사항
const englishAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "New Hotel Rating System Launched",
    content:
      "We are excited to announce the launch of our new hotel rating system based on Forbes criteria. This system provides a more comprehensive and accurate evaluation of hotels worldwide.\n\nThe new rating system takes into account various factors such as staff service, facility quality, cleanliness, and overall guest experience. Each category is weighted according to industry standards to ensure fair and balanced ratings.\n\nWe believe this update will help travelers make more informed decisions when choosing accommodations for their trips. We encourage all users to try out the new system and provide feedback on their experience.",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: "2",
    title: "Mobile App Now Available",
    content:
      "We are thrilled to announce the release of our mobile application for both iOS and Android platforms. Now you can access hotel reviews, ratings, and booking information on the go!\n\nThe app features an intuitive interface designed for easy navigation and quick access to the information you need. You can search for hotels, read and write reviews, and even book your stay directly through the app.\n\nSome key features include:\n\n- Offline access to saved hotels and reviews\n- Real-time notifications for booking confirmations and special offers\n- Advanced filtering options to find the perfect accommodation\n- Integrated maps to explore hotels in your desired location\n\nDownload the app today from the App Store or Google Play Store and take your travel planning to the next level.",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
  {
    id: "3",
    title: "System Maintenance Scheduled",
    content:
      "We will be performing scheduled maintenance on our systems on Saturday, May 10, 2025, from 2:00 AM to 5:00 AM UTC. During this time, the website and mobile app may experience temporary downtime or limited functionality.\n\nThis maintenance is necessary to implement important security updates and performance improvements. We apologize for any inconvenience this may cause and appreciate your understanding.\n\nPlease plan accordingly if you need to access the platform during this time. All services will be fully restored once the maintenance is complete.",
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days ago
  },
  {
    id: "4",
    title: "Partnership with Major Hotel Chains",
    content:
      "We are pleased to announce our new partnerships with several major hotel chains worldwide. These collaborations will bring exclusive benefits to our users and enhance the overall booking experience.\n\nThrough these partnerships, we can now offer:\n\n- Special discounts and promotional rates\n- Priority booking for our members\n- Enhanced verification of hotel information and amenities\n- Direct communication channels with hotel management\n\nWe are continuously working to expand our network of partners to provide you with the best possible service and value. Stay tuned for more exciting announcements in the coming months!",
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000).toISOString(), // 21 days ago
  },
  {
    id: "5",
    title: "New Verified Reviews Feature",
    content:
      "We have implemented a new 'Verified Reviews' feature to enhance the reliability and trustworthiness of our platform. This feature helps users identify reviews from guests who have confirmed stays at the hotels they are reviewing.\n\nVerified reviews are marked with a special badge, making it easier for you to distinguish between verified and unverified feedback. This addition aims to combat fake reviews and provide more accurate information to help you make informed decisions.\n\nTo have your review verified, simply upload your booking confirmation or receipt when submitting your review. Our team will verify the information and add the verified badge to your review once confirmed.",
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
  },
  {
    id: "6",
    title: "Updated Privacy Policy",
    content:
      "We have updated our Privacy Policy to provide more transparency about how we collect, use, and protect your data. The changes will take effect on June 1, 2025.\n\nKey updates include:\n\n- More detailed information about the types of data we collect\n- Enhanced explanation of how we use cookies and similar technologies\n- Clarification on data sharing practices with third parties\n- Additional information about your rights regarding your personal data\n\nWe encourage all users to review the updated Privacy Policy, which can be found in the footer of our website. If you have any questions or concerns, please contact our support team.",
    date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 days ago
  },
  {
    id: "7",
    title: "New Hotel Categories Added",
    content:
      "We have expanded our hotel categories to provide more specific and relevant search results. The new categories include:\n\n- Boutique Hotels\n- Eco-Friendly Accommodations\n- Historic Properties\n- All-Inclusive Resorts\n- Extended Stay Hotels\n- Pet-Friendly Options\n\nThese additional categories will help you find exactly what you're looking for and discover new types of accommodations that match your preferences. You can now filter your search results using these categories to narrow down your options and find the perfect place to stay.",
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days ago
  },
  {
    id: "8",
    title: "Community Guidelines Update",
    content:
      "We have revised our Community Guidelines to ensure a respectful and helpful environment for all users. These guidelines outline the expected behavior when interacting on our platform, including writing reviews, commenting, and participating in discussions.\n\nThe updated guidelines emphasize:\n\n- Respectful communication\n- Honest and constructive feedback\n- Prohibition of discriminatory or offensive content\n- Guidelines for appropriate photo submissions\n\nWe are committed to maintaining a positive community where travelers can share genuine experiences and helpful information. Users who repeatedly violate these guidelines may have their accounts restricted or suspended.",
    date: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000).toISOString(), // 75 days ago
  },
  {
    id: "9",
    title: "Introducing Hotel Sustainability Scores",
    content:
      "In response to growing environmental awareness and sustainable travel practices, we are introducing Sustainability Scores for hotels on our platform. These scores evaluate hotels based on their environmental initiatives, energy efficiency, waste management, and community engagement.\n\nHotels will receive a rating from 1 to 5 green leaves, with 5 representing exceptional commitment to sustainability. This new feature allows environmentally conscious travelers to make choices aligned with their values.\n\nWe are working with independent certification bodies and environmental organizations to ensure the accuracy and credibility of these ratings. Look for the green leaf icon on hotel listings to identify properties with sustainability scores.",
    date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days ago
  },
  {
    id: "10",
    title: "Website Redesign Coming Soon",
    content:
      "We are excited to announce that a complete redesign of our website is coming soon! The new design will feature a modern, intuitive interface with improved navigation and enhanced functionality.\n\nSome highlights of the upcoming redesign include:\n\n- Faster loading times and improved performance\n- Enhanced search capabilities with more filtering options\n- Improved mobile responsiveness for seamless cross-device experience\n- New visual design with better readability and accessibility\n- Expanded hotel profiles with more detailed information\n\nWe value your feedback and have incorporated many user suggestions into the new design. A beta version will be available for testing in the coming weeks, and we welcome your input to help us refine the final product.",
    date: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(), // 120 days ago
  },
]

// 일본어 샘플 공지사항 (간단한 버전)
const japaneseAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "新しいホテル評価システムの導入",
    content:
      "フォーブス基準に基づく新しいホテル評価システムの導入を発表できることを嬉しく思います。このシステムは、世界中のホテルに対するより包括的で正確な評価を提供します。\n\n新しい評価システムは、スタッフサービス、施設の品質、清潔さ、全体的な宿泊体験などのさまざまな要素を考慮しています。各カテゴリーは、公平でバランスの取れた評価を確保するために業界標準に従って重み付けされています。\n\nこの更新により、旅行者が旅行の宿泊施設を選ぶ際により情報に基づいた決定を下すのに役立つと考えています。すべてのユーザーに新しいシステムを試していただき、体験についてのフィードバックを提供していただくことをお勧めします。",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: "2",
    title: "モバイルアプリが利用可能になりました",
    content:
      "iOSとAndroidの両プラットフォーム向けのモバイルアプリケーションのリリースを発表できることを嬉しく思います。これで外出先でもホテルのレビュー、評価、予約情報にアクセスできます！\n\nアプリは、簡単なナビゲーションと必要な情報への迅速なアクセスのために設計された直感的なインターフェースを備えています。ホテルを検索したり、レビューを読んだり書いたり、さらにはアプリを通じて直接滞在を予約したりすることもできます。\n\n主な機能には以下が含まれます：\n\n- 保存したホテルやレビューへのオフラインアクセス\n- 予約確認や特別オファーのリアルタイム通知\n- 完璧な宿泊施設を見つけるための高度なフィルタリングオプション\n- 希望の場所のホテルを探索するための統合マップ\n\n今すぐApp StoreまたはGoogle Play Storeからアプリをダウンロードして、旅行計画を次のレベルに引き上げましょう。",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
]

// 중국어 샘플 공지사항 (간단한 버전)
const chineseAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "推出新的酒店评级系统",
    content:
      "我们很高兴宣布推出基于福布斯标准的新酒店评级系统。该系统提供了对全球酒店更全面、更准确的评估。\n\n新的评级系统考虑了各种因素，如员工服务、设施质量、清洁度和整体客人体验。每个类别都按照行业标准进行加权，以确保公平和平衡的评级。\n\n我们相信这一更新将帮助旅行者在选择旅行住宿时做出更明智的决定。我们鼓励所有用户尝试新系统并提供关于他们体验的反馈。",
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
  },
  {
    id: "2",
    title: "移动应用程序现已推出",
    content:
      "我们很高兴宣布为iOS和Android平台推出我们的移动应用程序。现在您可以随时随地访问酒店评论、评级和预订信息！\n\n该应用程序具有直观的界面，设计用于轻松导航和快速访问您需要的信息。您可以搜索酒店、阅读和撰写评论，甚至可以通过应用程序直接预订您的住宿。\n\n一些主要功能包括：\n\n- 离线访问保存的酒店和评论\n- 预订确认和特别优惠的实时通知\n- 高级筛选选项，以找到完美的住宿\n- 集成地图，探索您所需位置的酒店\n\n今天就从App Store或Google Play Store下载应用程序，将您的旅行计划提升到一个新的水平。",
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
]

// 언어별 공지사항 데이터
export const sampleAnnouncementsByLanguage = {
  ko: koreanAnnouncements,
  en: englishAnnouncements,
  ja: japaneseAnnouncements,
  zh: chineseAnnouncements,
}

// 기본 공지사항 데이터 (한국어)
export const sampleAnnouncements = koreanAnnouncements
