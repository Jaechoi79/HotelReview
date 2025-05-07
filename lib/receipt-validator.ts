// 영수증 날짜 검증 함수
export function validateReceiptDate(receiptDate: Date, checkInDate: Date, checkOutDate: Date): boolean {
  // 영수증 날짜가 체크인 또는 체크아웃 날짜와 일치하는지 확인
  const receiptTime = receiptDate.setHours(0, 0, 0, 0)
  const checkInTime = checkInDate.setHours(0, 0, 0, 0)
  const checkOutTime = checkOutDate.setHours(0, 0, 0, 0)

  return receiptTime === checkInTime || receiptTime === checkOutTime
}

// 이미지에서 카드번호 삭제 (실제로는 프론트엔드에서 이미지 처리가 어려우므로 서버에서 처리해야 함)
// 여기서는 이미지를 업로드하고 처리된 것으로 가정
export function processReceiptImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    // 실제 구현에서는 서버로 이미지를 전송하고 처리된 이미지 URL을 받아야 함
    // 여기서는 간단히 파일 객체를 URL로 변환하여 반환
    const reader = new FileReader()
    reader.onload = () => {
      // 실제로는 여기서 이미지 처리 로직이 필요함 (카드번호 삭제 등)
      resolve(reader.result as string)
    }
    reader.readAsDataURL(file)
  })
}
