"use client"

import type React from "react"
import { useState } from "react"
import { Mail, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Header } from "@/components/ui/header"
import { authService, AuthError } from "@/lib/auth"

interface ForgotPasswordFormProps {
  onBack?: () => void
}

export default function ForgotPasswordForm({ onBack }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      console.log("🔐 Requesting password reset for:", email)
      const { error: resetError } = await authService.resetPassword(email)

      if (resetError) {
        console.error("❌ Password reset error:", resetError)
        setError(resetError.message)
        return
      }

      console.log("✅ Password reset email sent")
      setShowSuccess(true)
      setEmail("")
    } catch (e) {
      console.error("❌ Error in forgot password:", e)
      if (e instanceof AuthError) {
        setError(e.message)
      } else {
        setError("Failed to send reset email. Please try again.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (showSuccess) {
    return (
      <>
        <Header user={null} transparent={false} />
        <main className="flex-1 flex items-center justify-center px-4 pt-20 md:pt-24"> 
          <div className="w-full max-w-md">  
            <div className="text-center mb-8">  
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-4">  
                <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />  
              </div>
              <h1 className="text-4xl font-bold text-[#3E5641] dark:text-white">Check Your Email</h1>
              <p className="text-[#6F7F69] dark:text-gray-400 mt-2">
                We've sent a password reset link to your email address.
              </p>
            </div>

            <div className="bg-white dark:bg-[#2A352A] p-8 rounded-3xl shadow-lg border border-[#9FA791]/20 dark:border-[#4A4D45]/20">  
              <div className="text-center space-y-4">  
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">  
                  <CheckCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 mx-auto mb-2" />  
                  <p className="text-sm text-blue-800 dark:text-blue-200">  
                    <strong>Reset email sent to:</strong>  
                  </p>  
                  <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mt-1">{email}</p>
                </div>

                <div className="text-left space-y-2 text-sm text-[#6F7F69] dark:text-gray-400">  
                  <p>  
                    <strong>Next steps:</strong>  
                  </p>  
                  <ol className="list-decimal list-inside space-y-1 ml-2">  
                    <li>Check your email inbox (and spam folder)</li>  
                    <li>Click the password reset link in the email</li>  
                    <li>Enter your new password</li>  
                    <li>Return here to sign in with your new password</li>  
                  </ol>  
                </div>

                <div className="pt-4">  
                  <Button  
                    onClick={() => {  
                      setShowSuccess(false)  
                      if (onBack) onBack()  
                    }}  
                    className="w-full bg-[#FF6700] text-white hover:bg-[#FF6700]/90 dark:bg-[#FF7D33] dark:hover:bg-[#FF7D33]/90"  
                  >  
                    <>  
                      Back to Sign In  
                      <ArrowLeft className="ml-2 h-4 w-4" />  
                    </>  
                  </Button>  
                </div>  
              </div>  
            </div>  

            <div className="mt-6 text-center">  
              <div className="text-xs text-[#6F7F69] dark:text-gray-400 space-y-2">  
                <p>  
                  <strong>Troubleshooting:</strong>  
                </p>  
                <ul className="text-left space-y-1 max-w-sm mx-auto">  
                  <li>Check your spam/junk folder</li>  
                  <li>Wait a few minutes for email delivery</li>  
                  <li>Make sure you entered the correct email</li>  
                </ul>  
              </div>  
            </div>  
          </div>  
        </main>  
      </>
    )  
  }

  return (
    <>  
      <Header user={null} transparent={false} />  
      <main className="flex-1 flex items-center justify-center px-4 pt-20 md:pt-24">  
        <div className="w-full max-w-md">  
          <div className="text-center mb-8">  
            <h1 className="text-4xl font-bold text-[#3E5641] dark:text-white">Reset Password</h1>  
            <p className="text-[#6F7F69] dark:text-gray-400 mt-2">  
              Enter your email address and we\'ll send you a link to reset your password.  
            </p>  
          </div>  

          <div className="bg-white dark:bg-[#2A352A] p-8 rounded-3xl shadow-lg border border-[#9FA791]/20 dark:border-[#4A4D45]/20">  
            <form onSubmit={handleSubmit} className="space-y-6">  
              <div>  
                <Label htmlFor="email" className="text-sm font-medium text-[#3E5641] dark:text-gray-300">  
                  Email Address  
                </Label>  
                <Input  
                  id="email"  
                  type="email"  
                  value={email}  
                  onChange={(e) => setEmail(e.target.value)}  
                  placeholder="you@example.com"  
                  required  
                  className="mt-1"  
                  disabled={isLoading}  
                />  
              </div>  

              {error && (  
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 text-sm text-red-800 dark:text-red-200">  
                  <AlertCircle className="h-4 w-4 inline mr-2" />  
                  {error}  
                </div>  
              )}

              <Button  
                type="submit"  
                className="w-full bg-[#FF6700] text-white hover:bg-[#FF6700]/90 dark:bg-[#FF7D33] dark:hover:bg-[#FF7D33]/90"  
                disabled={isLoading}  
              >  
                <>  
                  {isLoading ? "Sending..." : "Send Reset Link"}  
                  <Mail className="ml-2 h-4 w-4" />  
                </>  
              </Button>  
            </form>

            <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">  
              <button  
                onClick={onBack}  
                className="w-full text-center text-sm text-[#FF6700] hover:underline dark:text-[#FF7D33]"  
              >  
                ← Back to Sign In  
              </button>  
            </div>  
          </div>  
        </div>  
      </main>  
    </>
  )
}