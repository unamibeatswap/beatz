'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: 'user' | 'producer' | 'admin'
  walletAddress?: string
  profileImage?: string
  isVerified: boolean
  createdAt: Date
}

interface AuthContextType {
  user: null
  userProfile: null
  loading: boolean
  signIn: () => Promise<void>
  signUp: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  updateProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false)

  const signIn = async () => {
    console.log('Use Web3 auth instead')
  }

  const signUp = async () => {
    console.log('Use Web3 auth instead')
  }

  const signInWithGoogle = async () => {
    // Google OAuth2 without Firebase
    if (typeof window !== 'undefined') {
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
      const redirectUri = `${window.location.origin}/auth/callback`
      const scope = 'openid email profile'
      
      const authUrl = `https://accounts.google.com/oauth/authorize?` +
        `client_id=${clientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `response_type=code&` +
        `scope=${encodeURIComponent(scope)}`
      
      window.location.href = authUrl
    }
  }

  const logout = async () => {
    console.log('Use Web3 auth instead')
  }

  const updateProfile = async () => {
    console.log('Use Web3 auth instead')
  }

  const value = {
    user: null,
    userProfile: null,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    return {
      user: null,
      userProfile: null,
      loading: false,
      signIn: async () => {},
      signUp: async () => {},
      signInWithGoogle: async () => {},
      logout: async () => {},
      updateProfile: async () => {}
    }
  }
  return context
}