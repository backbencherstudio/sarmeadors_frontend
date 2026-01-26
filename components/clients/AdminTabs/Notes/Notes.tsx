import { RichTextEditor } from "@/components/reusable/Editor";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface TermsConditionFormData {
    explanation: string;
}

export default function Notes() {
    const [editorKey] = useState(0);

    const { watch, setValue, handleSubmit } = useForm<TermsConditionFormData>({
        defaultValues: {
            explanation: "",
        },
    });

    const onSubmit = async (data: TermsConditionFormData) => {
        console.log("Form submitted:", data);
        // Add your save logic here
    };
    return (
        <div>
            <RichTextEditor
                key={`explanation-${editorKey}`}
                value={watch("explanation")}
                onChange={(v) => setValue("explanation", v)}
                onUpdate={handleSubmit(onSubmit)}
            />
        </div>
    )
}
