import type { Hotel } from "@/types/hotel"
import { v4 as uuidv4 } from "uuid"

export const sampleHotels: Hotel[] = [
  {
    id: uuidv4(),
    name: "신라호텔 서울",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    review:
      "럭셔리 서비스, 시설, 고객 응대 모두 최고급 수준이었음. 서울의 중심부에 위치한 5성급 호텔로 한국 전통미와 현대적 편의시설이 조화롭게 어우러져 있습니다.",
    finalRating: 4.8,
    scores: {
      staffComplaint: 9.5,
      staffSpeed: 9.0,
      managerComplaint: 9.8,
      managerSpeed: 9.2,
      facility: 9.0,
      cleanliness: 9.8,
      experience: 9.2,
    },
  },
  {
    id: uuidv4(),
    name: "Toyoko Inn 부산",
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
    review:
      "가성비 우수, 무료 조식, 세탁 편의시설 완비. 실속형 비즈니스호텔. 부산역에서 도보 5분 거리에 위치해 교통이 매우 편리하며 깔끔한 객실과 친절한 서비스가 특징입니다.",
    finalRating: 3.3,
    scores: {
      staffComplaint: 6.0,
      staffSpeed: 5.5,
      managerComplaint: 6.5,
      managerSpeed: 6.0,
      facility: 6.0,
      cleanliness: 7.5,
      experience: 6.8,
    },
  },
  {
    id: uuidv4(),
    name: "그랜드 하얏트 서울",
    imageUrl: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop",
    review:
      "넓은 객실과 훌륭한 뷰, 다양한 부대시설이 인상적인 5성급 호텔. 남산 기슭에 위치해 서울 시내를 한눈에 내려다볼 수 있는 전망이 일품이며, 수영장과 스파 시설이 특히 훌륭합니다.",
    finalRating: 4.5,
    scores: {
      staffComplaint: 9.0,
      staffSpeed: 8.5,
      managerComplaint: 9.0,
      managerSpeed: 8.8,
      facility: 9.2,
      cleanliness: 9.0,
      experience: 9.0,
    },
  },
  {
    id: uuidv4(),
    name: "포시즌스 호텔 제주",
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop",
    review:
      "세심한 서비스와 고급스러운 인테리어, 최상급 어메니티가 제공되는 럭셔리 호텔. 제주의 아름다운 해안가에 위치해 있으며, 프라이빗 비치와 인피니티 풀이 있어 완벽한 휴양을 즐길 수 있습니다.",
    finalRating: 4.9,
    scores: {
      staffComplaint: 9.8,
      staffSpeed: 9.5,
      managerComplaint: 9.9,
      managerSpeed: 9.7,
      facility: 9.5,
      cleanliness: 9.9,
      experience: 9.8,
    },
  },
  {
    id: uuidv4(),
    name: "이비스 스타일스 명동",
    imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2074&auto=format&fit=crop",
    review:
      "모던한 디자인과 합리적인 가격, 도심 접근성이 좋은 3성급 호텔. 서울 명동의 중심부에 위치해 쇼핑과 관광에 최적화된 위치를 자랑하며, 컬러풀한 인테리어가 특징입니다.",
    finalRating: 3.7,
    scores: {
      staffComplaint: 7.0,
      staffSpeed: 6.5,
      managerComplaint: 7.2,
      managerSpeed: 6.8,
      facility: 7.0,
      cleanliness: 8.0,
      experience: 7.5,
    },
  },
  {
    id: uuidv4(),
    name: "파크 하얏트 부산",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
    review:
      "해운대 해변을 바라보는 탁트인 전망과 세련된 디자인의 럭셔리 호텔. 모든 객실에서 바다 전망을 즐길 수 있으며, 미쉐린 스타 레스토랑과 프리미엄 스파 시설을 갖추고 있습니다.",
    finalRating: 4.7,
    scores: {
      staffComplaint: 9.3,
      staffSpeed: 9.1,
      managerComplaint: 9.5,
      managerSpeed: 9.0,
      facility: 9.4,
      cleanliness: 9.6,
      experience: 9.4,
    },
  },
  {
    id: uuidv4(),
    name: "웨스틴 조선 서울",
    imageUrl: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?q=80&w=2089&auto=format&fit=crop",
    review:
      "100년의 역사를 자랑하는 서울의 랜드마크 호텔. 클래식한 우아함과 현대적 편의시설이 조화를 이루며, 정통 한식당과 베이커리가 유명합니다.",
    finalRating: 4.6,
    scores: {
      staffComplaint: 9.2,
      staffSpeed: 8.9,
      managerComplaint: 9.3,
      managerSpeed: 9.0,
      facility: 9.1,
      cleanliness: 9.4,
      experience: 9.2,
    },
  },
  {
    id: uuidv4(),
    name: "JW 메리어트 동대문 스퀘어",
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2080&auto=format&fit=crop",
    review:
      "동대문 패션타운에 위치한 현대적인 디자인 호텔. 자하 하디드가 디자인한 건물 내에 위치해 있으며, 루프탑 바에서 서울의 야경을 감상할 수 있습니다.",
    finalRating: 4.5,
    scores: {
      staffComplaint: 9.0,
      staffSpeed: 8.7,
      managerComplaint: 9.1,
      managerSpeed: 8.8,
      facility: 9.3,
      cleanliness: 9.2,
      experience: 9.0,
    },
  },
  {
    id: uuidv4(),
    name: "롯데호텔 제주",
    imageUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
    review:
      "제주 중문관광단지에 위치한 리조트형 호텔. 실내외 수영장과 카지노, 다양한 레스토랑을 갖추고 있어 가족 여행객에게 인기가 높습니다.",
    finalRating: 4.4,
    scores: {
      staffComplaint: 8.8,
      staffSpeed: 8.5,
      managerComplaint: 9.0,
      managerSpeed: 8.7,
      facility: 9.2,
      cleanliness: 9.0,
      experience: 8.9,
    },
  },
  {
    id: uuidv4(),
    name: "알로프트 서울 강남",
    imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070&auto=format&fit=crop",
    review:
      "강남 중심부에 위치한 트렌디한 라이프스타일 호텔. 현대적인 디자인과 활기찬 분위기가 특징이며, 젊은 비즈니스 여행객에게 인기가 있습니다.",
    finalRating: 4.2,
    scores: {
      staffComplaint: 8.5,
      staffSpeed: 8.3,
      managerComplaint: 8.7,
      managerSpeed: 8.4,
      facility: 8.8,
      cleanliness: 8.9,
      experience: 8.6,
    },
  },
]
