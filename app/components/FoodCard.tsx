import Image from "next/image";
import { Card, BadgeType, BADGE_INFO } from "@/lib/types";
import { BadgeIcon } from "./BadgeIcon";

interface FoodCardProps {
    card: Card;
    forPrint?: boolean;
}

export function FoodCard({ card, forPrint = false }: FoodCardProps) {
    return (
        <div className={`food-card ${forPrint ? "food-card--print" : ""}`}>
            {/* Logo */}
            <div className="food-card__logo">
                <Image
                    src="/novotel-logo.png"
                    alt="Novotel"
                    width={80}
                    height={24}
                    priority
                />
            </div>

            {/* Food Names */}
            <div className="food-card__names">
                <h2 className="food-card__name-pt">{card.name_pt}</h2>
                {card.name_en && (
                    <p className="food-card__name-en">{card.name_en}</p>
                )}
            </div>

            {/* Badges */}
            {card.badges.length > 0 && (
                <div className="food-card__badges">
                    {card.badges.map((badge) => (
                        <BadgeIcon key={badge} badge={badge} size="sm" />
                    ))}
                </div>
            )}
        </div>
    );
}
