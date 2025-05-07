import type { UserWithPassword } from "@/types/user"

// 사용자 데이터를 localStorage에서 가져오기
export function getUsers(): UserWithPassword[] {
  if (typeof window === "undefined") {
    return []
  }

  const usersJson = localStorage.getItem("users")
  if (!usersJson) {
    // 초기 사용자 데이터 설정
    const initialUsers = initializeUsers()
    localStorage.setItem("users", JSON.stringify(initialUsers))
    return initialUsers
  }

  try {
    return JSON.parse(usersJson)
  } catch (error) {
    console.error("Failed to parse users:", error)
    return []
  }
}

// 새 사용자 추가
export function addUser(user: UserWithPassword): void {
  const users = getUsers()
  users.push(user)
  localStorage.setItem("users", JSON.stringify(users))
}

// 사용자 삭제
export function deleteUser(id: string): void {
  const users = getUsers()
  const updatedUsers = users.filter((user) => user.id !== id)
  localStorage.setItem("users", JSON.stringify(updatedUsers))
}

// 초기 사용자 데이터 설정 (관리자 계정 포함)
function initializeUsers(): UserWithPassword[] {
  return [
    {
      id: "admin1",
      name: "Admin User",
      email: "admin@example.com",
      username: "admin",
      password: "admin123",
      role: "admin",
      phoneNumber: "01012345678",
    },
    {
      id: "user1",
      name: "재재",
      email: "jaejae@example.com",
      username: "jaejae25",
      password: "cjmcjm2546",
      role: "user",
      phoneNumber: "01023456789",
    },
    {
      id: "user2",
      name: "홍길동",
      email: "hong@example.com",
      username: "hong2483",
      password: "kict3333",
      role: "user",
      phoneNumber: "01034567890",
    },
  ]
}
