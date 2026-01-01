export type BadgeType =
    | "gluten"
    | "nuts"
    | "lactose"
    | "vegan"
    | "vegetarian"
    | "balanced"
    | "spicy"
    | "kids"
    | "no-gluten"
    | "no-lactose";

export interface Card {
    id: number;
    name_pt: string;
    name_en: string | null;
    badges: BadgeType[];
    created_at: string;
}

export interface CardFormData {
    name_pt: string;
    name_en?: string;
    badges: BadgeType[];
}

export const BADGE_INFO: Record<BadgeType, { label: string; icon: string; labelEn: string }> = {
    gluten: { label: "Glúten", labelEn: "Gluten", icon: "grain" },
    nuts: { label: "Nozes", labelEn: "Nuts", icon: "nutrition" },
    lactose: { label: "Lactose", labelEn: "Lactose", icon: "water_drop" },
    vegan: { label: "Vegano", labelEn: "Vegan", icon: "eco" },
    vegetarian: { label: "Vegetariano", labelEn: "Vegetarian", icon: "local_florist" },
    balanced: { label: "Equilibrado", labelEn: "Balanced", icon: "favorite" },
    spicy: { label: "Picante", labelEn: "Spicy", icon: "local_fire_department" },
    kids: { label: "Kids", labelEn: "Kids", icon: "child_care" },
    "no-gluten": { label: "Sem Glúten", labelEn: "No Gluten", icon: "grain" },
    "no-lactose": { label: "Sem Lactose", labelEn: "No Lactose", icon: "water_drop" },
};

export const ALL_BADGES: BadgeType[] = [
    "gluten",
    "nuts",
    "lactose",
    "vegan",
    "vegetarian",
    "balanced",
    "spicy",
    "kids",
    "no-gluten",
    "no-lactose",
];
