// 외부 포인트 서비스 타입 정의
export interface ExternalPointService {
  id: string
  name: string
  logoUrl: string
  connected: boolean
  balance?: number
  lastUpdated?: string
}

// 카카오페이 포인트 응답 타입
export interface KakaoPayPointResponse {
  success: boolean
  pointBalance: number
  expiringPoints?: {
    amount: number
    expiryDate: string
  }[]
  error?: string
}

// 네이버페이 포인트 응답 타입
export interface NaverPayPointResponse {
  resultCode: string
  resultMessage: string
  point: {
    totalPoint: number
    availablePoint: number
    expiringPoints?: {
      point: number
      expireDate: string
    }[]
  }
}

// 통합 포인트 정보 타입
export interface IntegratedPointInfo {
  hotelPoints: number
  externalPoints: {
    kakao?: {
      connected: boolean
      balance?: number
      lastUpdated?: string
    }
    naver?: {
      connected: boolean
      balance?: number
      lastUpdated?: string
    }
  }
}
