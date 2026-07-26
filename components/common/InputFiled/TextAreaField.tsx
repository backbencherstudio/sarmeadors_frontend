import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ReusableTextareaProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  error?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const ReusableTextarea = ({
  label,
  placeholder,
  className,
  error,
  ...props
}: ReusableTextareaProps) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <Label className="text-sm text-headerColor font-medium">
          {label} {props.required && <span className="text-redColor">*</span>}
        </Label>
      )}

      <Textarea
        placeholder={placeholder}
        className={`min-h-[80px] ${className || ""}`}
        {...props}
      />

      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};

export default ReusableTextarea;
