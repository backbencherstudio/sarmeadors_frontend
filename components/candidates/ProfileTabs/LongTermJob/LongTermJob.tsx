import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import JobPostingCard from "./JobPostingCard";

export default function LongTermJob() {
  return (
    <section>
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Long-Term Job</h2>
        <p className="text-[#778593] mt-1">
          Short-term job openings are now available for immediate start.
        </p>
      </div>
      <div className="mt-4 mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 items-center">
        {/* LEFT: Search + Location Filter (3 columns) */}
        {/* Search */}
        <div className="relative">
          <Input
            type="text"
            placeholder="Search by title, location or description. Press Enter to Search"
            className="w-full rounded-lg border border-border bg-card px-4 py-5 pr-12 text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
        </div>

        {/* Location Select */}
        <Select>
          <SelectTrigger className="w-full rounded-lg border border-gray-200 bg-white px-4 py-5 text-sm text-[#6B7280]">
            <SelectValue placeholder="Filter by Locations" />
          </SelectTrigger>

          <SelectContent className="rounded-lg">
            <SelectItem value="new-york">New York</SelectItem>
            <SelectItem value="california">California</SelectItem>
            <SelectItem value="texas">Texas</SelectItem>
            <SelectItem value="florida">Florida</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <JobPostingCard />
    </section>
  );
}
