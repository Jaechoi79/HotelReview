import NextAuth from "next-auth"
import GoogleProvider from "@auth/google-provider"
import NaverProvider from "@auth/naver-provider"
import KakaoProvider from "@auth/kakao-provider"
import { addUser, getUsers } from "@/lib/users"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID || "",
      clientSecret: process.env.NAVER_CLIENT_SECRET || "",
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID || "",
      clientSecret: process.env.KAKAO_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false

      // 사용자가 이미 존재하는지 확인
      const users = getUsers()
      const existingUser = users.find((u) => u.email === user.email)

      // 사용자가 존재하지 않으면 새로 생성
      if (!existingUser) {
        const newUser = {
          id: user.id || Date.now().toString(),
          name: user.name || "",
          email: user.email,
          username: user.email.split("@")[0] + Date.now().toString().slice(-4), // 이메일에서 유저네임 생성
          password: "", // 소셜 로그인은 비밀번호 없음
          role: "user",
          phoneNumber: "",
        }
        addUser(newUser)
      }

      return true
    },
    async session({ session, token }) {
      // 세션에 사용자 정보 추가
      if (session.user && token.sub) {
        const users = getUsers()
        const user = users.find((u) => u.email === session.user.email)

        if (user) {
          session.user.id = user.id
          session.user.role = user.role
          session.user.username = user.username
        }
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
