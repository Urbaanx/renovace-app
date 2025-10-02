import { Share2 } from "lucide-react";

interface BadgeSharedByProps {
  email: string;
}

function BadgeSharedBy({ email }: BadgeSharedByProps) {
  return (
    <div className="absolute top-[-14px] right-2 w-[50%] z-10 bg-mainColorText text-background flex items-center gap-2 px-3 py-2 rounded-xl shadow-md border border-background">
      <Share2 className="w-5 h-5 flex-shrink-0 mr-3" />
      <div className="text-[11px] leading-tight">
        <p className="text-center">Udostępnione przez:</p>
        <p className="font-semibold text-center break-all">{email}</p>
      </div>
    </div>
  );
}

export default BadgeSharedBy;
