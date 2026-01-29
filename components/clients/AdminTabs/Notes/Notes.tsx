import { RichTextEditor } from "@/components/reusable/Editor";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Info, Pin, PinOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import InformationIcon from "@/public/icon/InformationIcon";

interface Note {
    id: string;
    title: string;
    content: string;
    isPinned: boolean;
    isChecked: boolean;
    timestamp: string;
}

interface TermsConditionFormData {
    explanation: string;
}

export default function Notes() {
    const [editorKey] = useState(0);
    const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
    const [notes, setNotes] = useState<Note[]>([
        {
            id: "1",
            title: "Today we proved something big",
            content: "when we move together, nothing c...",
            isPinned: true,
            isChecked: false,
            timestamp: "Today",
        },
        {
            id: "2",
            title: "Untitled",
            content: "",
            isPinned: false,
            isChecked: false,
            timestamp: "a few minutes ago",
        },
        {
            id: "3",
            title: "Untitled",
            content: "",
            isPinned: false,
            isChecked: false,
            timestamp: "a few minutes ago",
        },
        {
            id: "4",
            title: "Untitled",
            content: "",
            isPinned: false,
            isChecked: false,
            timestamp: "a few minutes ago",
        },
    ]);

    const { watch, setValue, handleSubmit } = useForm<TermsConditionFormData>({
        defaultValues: {
            explanation: "",
        },
    });

    const onSubmit = async (data: TermsConditionFormData) => {
        console.log("Form submitted:", data);
        // Add your save logic here
    };

    const handleNoteClick = (noteId: string) => {
        setSelectedNoteId(noteId);
        const note = notes.find((n) => n.id === noteId);
        if (note) {
            setValue("explanation", note.content);
        }
    };

    const handleCheckboxChange = (noteId: string, checked: boolean) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === noteId ? { ...note, isChecked: checked } : note
            )
        );
    };

    const handlePinToggle = (noteId: string) => {
        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
            )
        );
    };

    const handleNewNote = () => {
        const newNote: Note = {
            id: Date.now().toString(),
            title: "Untitled",
            content: "",
            isPinned: false,
            isChecked: false,
            timestamp: "just now",
        };
        setNotes([newNote, ...notes]);
        setSelectedNoteId(newNote.id);
        setValue("explanation", "");
    };

    // Sort notes: pinned first, then by timestamp
    const sortedNotes = [...notes].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0;
    });

    const selectedNote = notes.find((n) => n.id === selectedNoteId);

    return (
        <div className="flex h-full gap-4 border border-[#E5E7EB] rounded-xl overflow-hidden">
            {/* Left Side - Notes List */}
            <div className="w-1/3 flex flex-col border-r border-[#E5E7EB]  bg-[#F3F4F6] ">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-[#E5E7EB]">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-gray-900">Notes</h2>
                        <InformationIcon />
                    </div>
                    <button
                        onClick={handleNewNote}
                        className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                {/* Today Section */}
                <div className="px-4 pt-4 pb-2">
                    <p className="text-sm text-gray-500 font-medium">Today</p>
                </div>

                {/* Notes List */}
                <div className="flex-1 overflow-y-auto">
                    {sortedNotes.map((note) => (
                        <div
                            key={note.id}
                            onClick={() => handleNoteClick(note.id)}
                            className={`flex items-start gap-3 p-3 mx-2 my-1 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors ${selectedNoteId === note.id ? "bg-gray-50" : ""
                                }`}
                        >
                            <Checkbox
                                checked={note.isChecked}
                                onCheckedChange={(checked) =>
                                    handleCheckboxChange(note.id, checked as boolean)
                                }
                                onClick={(e) => e.stopPropagation()}
                                className="mt-1"
                            />
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <h3 className="font-semibold text-gray-900 truncate">
                                        {note.title}
                                    </h3>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handlePinToggle(note.id);
                                        }}
                                        className="flex-shrink-0"
                                    >
                                        {note.isPinned ? (
                                            <Pin className="w-4 h-4 text-gray-900" fill="currentColor" />
                                        ) : (
                                            <PinOff className="w-4 h-4 text-gray-400" />
                                        )}
                                    </button>
                                </div>
                                {note.content && (
                                    <p className="text-sm text-gray-500 mt-1 truncate">
                                        {note.content}
                                    </p>
                                )}
                                {!note.content && (
                                    <p className="text-sm text-gray-400 mt-1">
                                        {note.timestamp}
                                    </p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Side - Text Editor */}
            <div className=" overflow-y-auto pr-3">
                <RichTextEditor
                    key={`explanation-${editorKey}`}
                    value={watch("explanation")}
                    onChange={(v) => setValue("explanation", v)}
                    onUpdate={handleSubmit(onSubmit)}
                />
            </div>
        </div>
    );
}
