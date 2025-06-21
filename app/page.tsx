"use client"

import { AuthProvider, useAuth } from "../contexts/auth-context"
import LoginScreen from "../components/login-screen"
import CierreOrdenInspeccion from "../cierre-orden-inspeccion"

function AppContent() {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginScreen />
  }

  return <CierreOrdenInspeccion />
}

export default function Page() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}
