"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/types/user"
import { getUsers, addUser } from "@/lib/users"
import { signIn, signOut, useSession } from "next-auth/react"

interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<boolean>
  register: (name: string, email: string, username: string, password: string, phoneNumber: string) => boolean
  logout: () => void
  isAdmin: () => boolean
  findUserByEmailAndPhone: (email: string, phoneNumber: string) => { found: boolean; userId?: string }
  resetPassword: (userId: string, newPassword: string) => boolean
  findUserByNameAndPhone: (name: string, phoneNumber: string) => { found: boolean; email?: string; username?: string }
  socialLogin: (provider: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const { data: session } = useSession()

  // NextAuth 세션에서 사용자 정보 로드
  useEffect(() => {
    if (session && session.user) {
      const users = getUsers()
      const foundUser = users.find((u) => u.email === session.user.email)

      if (foundUser) {
        const { password, ...userWithoutPassword } = foundUser
        setUser(userWithoutPassword)
        localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
      }
    }
  }, [session])

  // localStorage에서 사용자 정보 로드
  useEffect(() => {
    if (!session) {
      const storedUser = localStorage.getItem("currentUser")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error("Failed to parse stored user:", error)
          localStorage.removeItem("currentUser")
        }
      }
    }
  }, [session])

  const login = async (username: string, password: string): Promise<boolean> => {
    const users = getUsers()
    const foundUser = users.find((u) => u.username === username && u.password === password)

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))
      return true
    }

    return false
  }

  const socialLogin = async (provider: string): Promise<void> => {
    await signIn(provider, { callbackUrl: "/" })
  }

  const register = (name: string, email: string, username: string, password: string, phoneNumber: string): boolean => {
    const users = getUsers()

    // Check if email or username already exists
    if (users.some((u) => u.email === email || u.username === username)) {
      return false
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      username,
      password,
      phoneNumber,
      role: "user", // Default role
    }

    addUser(newUser)

    // Log in the new user
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword))

    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("currentUser")
    signOut({ callbackUrl: "/" })
  }

  const isAdmin = () => {
    return user?.role === "admin"
  }

  // 이메일과 휴대폰 번호로 사용자 찾기 (비밀번호 재설정용)
  const findUserByEmailAndPhone = (email: string, phoneNumber: string) => {
    const users = getUsers()
    const foundUser = users.find((u) => u.email === email && u.phoneNumber === phoneNumber)

    if (foundUser) {
      return { found: true, userId: foundUser.id }
    }

    return { found: false }
  }

  // 이름과 휴대폰 번호로 사용자 찾기 (아이디/이메일 찾기용)
  const findUserByNameAndPhone = (name: string, phoneNumber: string) => {
    const users = getUsers()
    const foundUser = users.find((u) => u.name === name && u.phoneNumber === phoneNumber)

    if (foundUser) {
      return { found: true, email: foundUser.email, username: foundUser.username }
    }

    return { found: false }
  }

  // 비밀번호 재설정
  const resetPassword = (userId: string, newPassword: string) => {
    const users = getUsers()
    const userIndex = users.findIndex((u) => u.id === userId)

    if (userIndex !== -1) {
      users[userIndex].password = newPassword
      localStorage.setItem("users", JSON.stringify(users))
      return true
    }

    return false
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAdmin,
        findUserByEmailAndPhone,
        resetPassword,
        findUserByNameAndPhone,
        socialLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}
