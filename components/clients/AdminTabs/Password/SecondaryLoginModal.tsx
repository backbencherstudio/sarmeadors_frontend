"use client"

import { useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ButtonReuseable from '@/components/reusable/CustomButton'



export default function SecondaryLoginModal() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        console.log("Secondary Login:", { email, password })
        // Reset form and close modal
        setEmail("")
        setPassword("")
    }

    const handleCancel = () => {
        setEmail("")
        setPassword("")
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <ButtonReuseable
                    title="Add Secondary Logins"
                    className="bg-[#F3F4F6]! text-[#111927]! text-base! cursor-pointer! font-semibold px-6 py-3 rounded-lg"
                    type="button"
                />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">

                <DialogHeader>
                    <DialogTitle className="text-left text-xl font-semibold">
                        Secondary login
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">
                                Email <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="h-12"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">
                                Password <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="h-12"
                                required
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex-row justify-start gap-2 sm:justify-start">
                        <ButtonReuseable
                            title="Submit"
                            type="submit"
                            className="bg-[#111927] text-white"
                        />
                        <DialogClose asChild>
                            <ButtonReuseable
                                title="Cancel"
                                type="button"
                                onClick={handleCancel}
                                className="bg-[#F3F4F6]! text-[#111927]!"
                            />
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
