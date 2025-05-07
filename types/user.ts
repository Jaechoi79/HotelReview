export interface User {
  id: string
  name: string
  email: string
  username: string // ID로 사용될 필드 추가
  role: "user" | "admin"
  phoneNumber?: string
}

export interface UserWithPassword extends User {
  password: string
}
