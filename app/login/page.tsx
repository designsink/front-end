"use client"

import type React from "react"
import { useRef, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, ArrowLeft } from "lucide-react"

export default function AdminPage() {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log("handleSubmit 실행됨")
        setError(null)
        const email = emailRef.current?.value
        const password = passwordRef.current?.value
        if (!email || !password) {
            setError("이메일과 비밀번호를 입력하세요.")
            return
        }
        try {
            const response = await fetch("https://dsink.kr/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
                credentials: "include", // 필요시 쿠키도 함께 보냄
            })
            console.log("response status:", response.status)
            const text = await response.text()
            console.log("raw response text:", text)
            const data = JSON.parse(text)
            const token = data.accessToken
            if (token) {
                localStorage.setItem("accessToken", "Bearer " + token)
                localStorage.setItem("isLoggedIn", "true")
                window.location.href = "/"
            } else {
                setError("토큰이 응답에 없습니다. 관리자에게 문의하세요.")
            }
        } catch (err) {
            setError("로그인 중 오류가 발생했습니다.")
            console.error(err)
        }
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
        <Button
            variant="ghost"
            onClick={() => window.history.back()}
            className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-200"
            aria-label="뒤로가기"
        >
            <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="max-w-lg w-full space-y-8">
            {/* 관리자 전용 알림 */}
            <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <AlertDescription className="text-base text-amber-800">
                <strong>관리자 전용 페이지입니다.</strong>
                <br />
                일반 사용자는 접근할 수 없습니다. 관리자 권한이 있는 계정으로만<br/> 로그인 가능합니다.
            </AlertDescription>
            </Alert>

            <Card>
            <CardHeader className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-3xl font-bold text-gray-900">관리자 로그인</CardTitle>
                <CardDescription className="text-lg">관리자 계정으로 로그인하여 시스템에 접근하세요</CardDescription>
            </CardHeader>

            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">
                    관리자 이메일
                    </Label>
                    <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@example.com"
                    required
                    className="w-full h-12"
                    ref={emailRef}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="password" className="text-base font-medium">
                    비밀번호
                    </Label>
                    <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="관리자 비밀번호를 입력하세요"
                    required
                    className="w-full h-12"
                    ref={passwordRef}
                    />
                </div>

                <Button type="submit" className="w-full h-12 text-lg">
                    관리자 로그인
                </Button>
                {error && <div className="text-red-500 text-center mt-2">{error}</div>}
                </form>

                <div className="mt-6 text-center">
                <p className="text-base text-gray-600">
                    관리자 계정이 없으시거나 문제가 있으시면
                    <br />
                    시스템 관리자에게 문의하세요.
                </p>
                </div>
            </CardContent>
            </Card>

            {/* 추가 보안 안내 */}
            <div className="text-center text-sm text-gray-500">
            <p>이 페이지는 보안이 적용된 관리자 전용 영역입니다.</p>
            <p>무단 접근 시도는 기록되며 법적 조치를 받을 수 있습니다.</p>
            </div>
        </div>
        </div>
    )
}
