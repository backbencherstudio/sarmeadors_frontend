"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import {
    Pencil,
    Eye,
    Copy,
} from "lucide-react"
import { cn } from "@/lib/utils"
import ListGreenIcon from "@/public/icon/ListGreenIcon"
import ListBlackIcon from "@/public/icon/ListBlackIcon"
import Link from "next/link"
import DocumentDeleteModal from "./DocumentDeleteModal"
import { toast } from "react-toastify"
import ButtonReuseable from "@/components/reusable/CustomButton"

interface Document {
    id: string
    title: string
    addedDate: string
    signedDate?: string
    isSigned: boolean
}

export default function Documents() {
    const [documents, setDocuments] = useState<Document[]>([
        {
            id: "1",
            title: "Client - Agency Agreement Placement Fee & Refund Policy",
            addedDate: "Sat Nov 29 2025",
            isSigned: false
        },
        {
            id: "2",
            title: "Client - Agency Agreement Placement Fee & Refund Policy",
            addedDate: "Sat Nov 29 2025",
            signedDate: "Tue Dec 02 2025",
            isSigned: true
        }
    ])

    const toggleDocumentStatus = (id: string) => {
        setDocuments(prev =>
            prev.map(doc =>
                doc.id === id ? { ...doc, isSigned: !doc.isSigned } : doc
            )
        )
    }

    const handleAction = (id: string, action: string) => {
        console.log(`Action: ${action} for document ${id}`)
    }

    const handleCopyLink = async (documentId: string) => {
        try {
            const documentUrl = `${window.location.origin}/clients/document/document-details?id=${documentId}`
            await navigator.clipboard.writeText(documentUrl)
            toast.success("Link copied to clipboard!")
        } catch (error) {
            toast.error("Failed to copy link. Please try again.")
        }
    }

    return (
        <div className="w-full space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-4 md:items-end justify-between items-start">
                <div className="space-y-4 w-full">
                    <h1 className="text-2xl font-bold text-gray-900">Documents to Sign</h1>
                    <Select>
                        <SelectTrigger className="w-full md:w-1/2 h-12!">
                            <SelectValue placeholder="Select template to add" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="template1">Template 1</SelectItem>
                            <SelectItem value="template2">Template 2</SelectItem>
                            <SelectItem value="template3">Template 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <ButtonReuseable
                    title="Manage and edit Templates"
                    className=" px-4 py-2 cursor-pointer text-nowrap"
                />
            </div>

            {/* Document Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.map((document) => (
                    <Card
                        key={document.id}
                        className="relative p-6 bg-white border border-gray-200 shadow-sm"
                    >
                        {/* Toggle Switch */}
                        <div className="absolute top-6 right-6">
                            <button
                                onClick={() => toggleDocumentStatus(document.id)}
                                className={cn(
                                    "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
                                    document.isSigned
                                        ? "bg-gray-700"
                                        : "bg-gray-200"
                                )}
                                role="switch"
                                aria-checked={document.isSigned}
                            >
                                <span
                                    className={cn(
                                        "inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform shadow-sm",
                                        document.isSigned ? "translate-x-5" : "translate-x-0.5"
                                    )}
                                />
                            </button>
                        </div>

                        {/* Document Icon */}
                        <div className="flex justify-center mb-4 mt-2">
                            <div className="relative">
                                {/* Document Stack */}
                                {
                                    document.isSigned ? <ListGreenIcon /> : <ListBlackIcon />
                                }
                            </div>
                        </div>

                        {/* Document Title */}
                        <h3 className="text-base font-semibold text-gray-900 mb-3 text-center px-4">
                            {document.title}
                        </h3>

                        {/* Dates */}
                        <div className="space-y-1 mb-6 text-center">
                            <p className="text-sm text-gray-600">
                                Added: {document.addedDate}
                            </p>
                            {document.signedDate && (
                                <p className="text-sm text-gray-600">
                                    Signed: {document.signedDate}
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-2">
                            {!document.isSigned && (
                                <Link
                                    href={`/clients/document/edit-document?id=${document.id}`}
                                    className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-gray-100 hover:bg-gray-200 border-0 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                                    onClick={() => handleAction(document.id, "edit")}
                                >
                                    <Pencil className="w-4 h-4 text-gray-600" />
                                </Link>
                            )}
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 bg-gray-100 hover:bg-gray-200 border-0 cursor-pointer"
                                onClick={() => handleCopyLink(document.id)}
                            >
                                <Copy className="w-4 h-4 text-gray-600" />
                            </Button>
                            <Link
                                href={`/clients/document/document-details?id=${document.id}`}
                                className="inline-flex items-center justify-center h-9 w-9 rounded-md bg-gray-100 hover:bg-gray-200 border-0 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                                onClick={() => handleAction(document.id, "edit")}
                            >
                                <Eye className="w-4 h-4 text-gray-600" />
                            </Link>

                            {/* Delete Document Modal */}
                            <DocumentDeleteModal />

                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}
