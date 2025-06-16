'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
  signUp: (
    phone: string,
    password: string,
    fullName: string
  ) => Promise<{ error: any | null }>
  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: any | null }>
  signOut: () => Promise<void>
  logout: () => Promise<void> // ✅ THÊM Ở ĐÂY
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error(error)
      }

      setSession(session)
      setUser(session?.user ?? null)
      setIsLoading(false)
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      router.refresh()
    })

    getSession()

    return () => subscription.unsubscribe()
  }, [router])

  const signUp = async (phone: string, password: string, fullName: string) => {
    const { error } = await supabase.auth.signUp({
      phone,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (!error) {
      await supabase.auth.signInWithPassword({ phone, password })
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        await supabase.from('user_profiles').insert({
          user_id: user.id,
          full_name: fullName,
        })
      }
    }

    return { error }
  }

  const signIn = async (phone: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      phone,
      password,
    })

    if (!error) {
      setUser(data.user ?? null)
      const sessionRes = await supabase.auth.getSession()
      setSession(sessionRes.data.session ?? null)
    }

    return { error }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
    router.push('/')
    router.refresh()
  }

  const logout = async () => {
    await supabase.auth.signOut()
    setSession(null)
    setUser(null)
  }

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    signUp,
    signIn,
    signOut,
    logout, // ✅ THÊM VÀO VALUE
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
