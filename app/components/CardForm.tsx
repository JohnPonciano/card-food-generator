"use client";

import { useState } from "react";
import { createCard } from "@/lib/actions/cards";
import { ALL_BADGES, BADGE_INFO, BadgeType } from "@/lib/types";

export function CardForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedBadges, setSelectedBadges] = useState<BadgeType[]>([]);

    const handleBadgeToggle = (badge: BadgeType) => {
        setSelectedBadges((prev) =>
            prev.includes(badge)
                ? prev.filter((b) => b !== badge)
                : [...prev, badge]
        );
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const name_pt = formData.get("name_pt") as string;
        const name_en = formData.get("name_en") as string;

        try {
            await createCard({
                name_pt,
                name_en: name_en || undefined,
                badges: selectedBadges,
            });

            // Reset form
            e.currentTarget.reset();
            setSelectedBadges([]);
        } catch (error) {
            console.error("Error creating card:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card-form">
            <h2 className="card-form__title">Criar Novo Card</h2>

            <div className="card-form__field">
                <label htmlFor="name_pt" className="card-form__label">
                    Nome do Alimento (PT-BR) *
                </label>
                <input
                    type="text"
                    id="name_pt"
                    name="name_pt"
                    required
                    className="card-form__input"
                    placeholder="Ex: Frango Grelhado"
                />
            </div>

            <div className="card-form__field">
                <label htmlFor="name_en" className="card-form__label">
                    Nome do Alimento (EN)
                </label>
                <input
                    type="text"
                    id="name_en"
                    name="name_en"
                    className="card-form__input"
                    placeholder="Ex: Grilled Chicken"
                />
            </div>

            <fieldset className="card-form__fieldset">
                <legend className="card-form__legend">Badges Alimentares</legend>
                <div className="card-form__badges">
                    {ALL_BADGES.map((badge) => (
                        <label key={badge} className="card-form__badge-option">
                            <input
                                type="checkbox"
                                checked={selectedBadges.includes(badge)}
                                onChange={() => handleBadgeToggle(badge)}
                                className="card-form__checkbox"
                            />
                            <span className="material-symbols-outlined card-form__badge-icon">
                                {BADGE_INFO[badge].icon}
                            </span>
                            <span className="card-form__badge-label">
                                {BADGE_INFO[badge].label}
                            </span>
                        </label>
                    ))}
                </div>
            </fieldset>

            <button
                type="submit"
                disabled={isSubmitting}
                className="card-form__submit"
            >
                {isSubmitting ? "Salvando..." : "Salvar Card"}
            </button>
        </form>
    );
}
