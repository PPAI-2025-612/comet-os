"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Usuario {
  id: string
  nombre: string
  email: string
  rol: string
}

interface AuthContextType {
  usuario: Usuario | null
  login: (usuario: Usuario) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null)

  // Cargar usuario desde localStorage al inicializar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario-inspeccion")
    if (usuarioGuardado) {
      try {
        const usuarioData = JSON.parse(usuarioGuardado)
        setUsuario(usuarioData)
      } catch (error) {
        console.error("Error al cargar usuario desde localStorage:", error)
        localStorage.removeItem("usuario-inspeccion")
      }
    }
  }, [])

  const login = (usuarioData: Usuario) => {
    setUsuario(usuarioData)
    localStorage.setItem("usuario-inspeccion", JSON.stringify(usuarioData))
  }

  const logout = () => {
    setUsuario(null)
    localStorage.removeItem("usuario-inspeccion")
  }

  const value = {
    usuario,
    login,
    logout,
    isAuthenticated: !!usuario,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
