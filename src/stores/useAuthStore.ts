import { create } from 'zustand'
import type { User, Session, AuthChangeEvent, Subscription } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

// Module-level: keeps the listener outside React/Zustand state.
let authSubscription: Subscription | null = null

interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  initialized: boolean

  initialize: () => Promise<void>
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (
    email: string,
    password: string,
    fullName: string,
    phone: string,
  ) => Promise<{ error: string | null; needsEmailVerification?: boolean }>
  signOut: () => Promise<{ error: string | null }>
  signOutAll: () => Promise<{ error: string | null }>
  updateProfile: (data: {
    full_name?: string
    avatar_url?: string
    card_number?: string
  }) => Promise<{ error: string | null }>
  changePassword: (
    _currentPassword: string,
    newPassword: string,
  ) => Promise<{ error: string | null }>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  isLoading: false,
  initialized: false,

  initialize: async () => {
    // Prevent double-initialization
    if (get().initialized) return

    set({ isLoading: true })

    const { data } = await supabase.auth.getSession()
    set({
      user: data.session?.user ?? null,
      session: data.session,
      isLoading: false,
      initialized: true,
    })

    // Clean up previous listener if exists
    if (authSubscription) {
      authSubscription.unsubscribe()
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        set({
          user: session?.user ?? null,
          session,
        })
      }
    )

    authSubscription = subscription
  },

  signIn: async (email, password) => {
    set({ isLoading: true })

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      set({ isLoading: false })
      return { error: error.message }
    }

    set({
      user: data.user,
      session: data.session,
      isLoading: false,
    })
    return { error: null }
  },

  signUp: async (email, password, fullName, phone) => {
    set({ isLoading: true })

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          phone_number: phone,
        },
      },
    })

    if (error) {
      set({ isLoading: false })
      return { error: error.message }
    }

    if (data.session) {
      set({
        user: data.user,
        session: data.session,
        isLoading: false,
      })
      return { error: null, needsEmailVerification: false }
    } else {
      set({ isLoading: false })
      return { error: null, needsEmailVerification: true }
    }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      return { error: error.message }
    }

    set({ user: null, session: null })
    return { error: null }
  },

  signOutAll: async () => {
    const { error } = await supabase.auth.signOut({ scope: 'global' })

    if (error) {
      return { error: error.message }
    }

    set({ user: null, session: null })
    return { error: null }
  },

  updateProfile: async (data) => {
    const { data: res, error } = await supabase.auth.updateUser({ data })

    if (error) {
      return { error: error.message }
    }

    set({ user: res.user })
    return { error: null }
  },

  changePassword: async (_currentPassword, newPassword) => {
    const user = get().user
    if (!user?.email) {
      return { error: 'No user signed in' }
    }

    // Requires an active session. For a production app, guard this with a
    // re-authentication step or email confirmation.
    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      return { error: error.message }
    }

    return { error: null }
  },
}))