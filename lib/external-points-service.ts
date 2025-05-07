import type { KakaoPayPointResponse, NaverPayPointResponse } from "@/types/external-points"

// 카카오페이 포인트 API 호출 (시뮬레이션)
export async function fetchKakaoPayPoints(accessToken: string): Promise<KakaoPayPointResponse> {
  // 실제 구현에서는 아래와 같이 API를 호출합니다
  // const response = await fetch('https://kapi.kakao.com/v1/payment/points', {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });
  // return await response.json();

  // 시뮬레이션을 위한 더미 데이터
  return new Promise((resolve) => {
    setTimeout(() => {
      // 랜덤 포인트 생성 (10,000 ~ 100,000)
      const randomPoints = Math.floor(Math.random() * 90000) + 10000

      resolve({
        success: true,
        pointBalance: randomPoints,
        expiringPoints: [
          {
            amount: 5000,
            expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          },
        ],
      })
    }, 800) // API 호출 지연 시뮬레이션
  })
}

// 네이버페이 포인트 API 호출 (시뮬레이션)
export async function fetchNaverPayPoints(accessToken: string): Promise<NaverPayPointResponse> {
  // 실제 구현에서는 아래와 같이 API를 호출합니다
  // const response = await fetch('https://apis.naver.com/paypoint/v1/mypoint', {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //     'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
  //     'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
  //   },
  // });
  // return await response.json();

  // 시뮬레이션을 위한 더미 데이터
  return new Promise((resolve) => {
    setTimeout(() => {
      // 랜덤 포인트 생성 (5,000 ~ 50,000)
      const randomPoints = Math.floor(Math.random() * 45000) + 5000

      resolve({
        resultCode: "00",
        resultMessage: "success",
        point: {
          totalPoint: randomPoints,
          availablePoint: randomPoints,
          expiringPoints: [
            {
              point: 2000,
              expireDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            },
          ],
        },
      })
    }, 1000) // API 호출 지연 시뮬레이션
  })
}

// 카카오 로그인 및 인증 시뮬레이션
export async function connectKakaoAccount(): Promise<{ success: boolean; accessToken?: string }> {
  // 실제 구현에서는 카카오 로그인 SDK를 사용하여 인증을 처리합니다
  // 여기서는 성공 시나리오만 시뮬레이션합니다
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        accessToken: "kakao_dummy_access_token_" + Math.random().toString(36).substring(2, 15),
      })
    }, 1500)
  })
}

// 네이버 로그인 및 인증 시뮬레이션
export async function connectNaverAccount(): Promise<{ success: boolean; accessToken?: string }> {
  // 실제 구현에서는 네이버 로그인 SDK를 사용하여 인증을 처리합니다
  // 여기서는 성공 시나리오만 시뮬레이션합니다
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        accessToken: "naver_dummy_access_token_" + Math.random().toString(36).substring(2, 15),
      })
    }, 1500)
  })
}

// 사용자의 연결된 외부 포인트 서비스 정보 저장
export function saveConnectedService(userId: string, service: "kakao" | "naver", accessToken: string): void {
  const connectedServices = JSON.parse(localStorage.getItem(`user_${userId}_connected_services`) || "{}")

  connectedServices[service] = {
    connected: true,
    accessToken,
    connectedAt: new Date().toISOString(),
  }

  localStorage.setItem(`user_${userId}_connected_services`, JSON.stringify(connectedServices))
}

// 사용자의 연결된 외부 포인트 서비스 정보 조회
export function getConnectedServices(userId: string): Record<string, any> {
  return JSON.parse(localStorage.getItem(`user_${userId}_connected_services`) || "{}")
}

// 사용자의 통합 포인트 정보 저장
export function saveIntegratedPointInfo(userId: string, pointInfo: any): void {
  localStorage.setItem(
    `user_${userId}_integrated_points`,
    JSON.stringify({
      ...pointInfo,
      lastUpdated: new Date().toISOString(),
    }),
  )
}

// 사용자의 통합 포인트 정보 조회
export function getIntegratedPointInfo(userId: string): any {
  return JSON.parse(localStorage.getItem(`user_${userId}_integrated_points`) || '{"hotelPoints":0,"externalPoints":{}}')
}
