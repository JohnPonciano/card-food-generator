import { BadgeType, BADGE_INFO } from "@/lib/types";

interface BadgeIconProps {
    badge: BadgeType;
    size?: "sm" | "md";
    showLabel?: boolean;
}

export function BadgeIcon({ badge, size = "md", showLabel = true }: BadgeIconProps) {
    const info = BADGE_INFO[badge];
    const isNegative = badge.startsWith("no-");

    const iconSize = size === "sm" ? "16px" : "20px";
    const fontSize = size === "sm" ? "8px" : "10px";

    return (
        <div className={`badge-icon badge-icon--${size} ${isNegative ? "badge-icon--negative" : ""}`}>
            <span
                className="material-symbols-outlined badge-icon__symbol"
                style={{ fontSize: iconSize }}
            >
                {info.icon}
            </span>
            {isNegative && <span className="badge-icon__slash" />}
            {showLabel && (
                <span className="badge-icon__label" style={{ fontSize }}>
                    {info.label}
                </span>
            )}
        </div>
    );
}
