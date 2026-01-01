"use client";

import { useState } from "react";
import { Card, BadgeType, ALL_BADGES, BADGE_INFO } from "@/lib/types";
import { updateCard } from "@/lib/actions/cards";

interface CardEditModalProps {
    card: Card;
    onClose: () => void;
}

export function CardEditModal({ card, onClose }: CardEditModalProps) {
    const [namePt, setNamePt] = useState(card.name_pt);
    const [nameEn, setNameEn] = useState(card.name_en || "");
    const [badges, setBadges] = useState<BadgeType[]>(card.badges);
    const [isSaving, setIsSaving] = useState(false);

    const handleToggleBadge = (badge: BadgeType) => {
        setBadges(prev =>
            prev.includes(badge)
                ? prev.filter(b => b !== badge)
                : [...prev, badge]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            await updateCard(card.id, {
                name_pt: namePt,
                name_en: nameEn || undefined,
                badges,
            });
            onClose();
        } catch (error) {
            console.error("Error updating card:", error);
            alert("Erro ao atualizar card");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Editar Card</h2>
                    <button onClick={onClose} className="modal-close">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="modal-field">
                        <label htmlFor="edit-name-pt">Nome em Português *</label>
                        <input
                            id="edit-name-pt"
                            type="text"
                            value={namePt}
                            onChange={e => setNamePt(e.target.value)}
                            required
                            maxLength={100}
                        />
                    </div>

                    <div className="modal-field">
                        <label htmlFor="edit-name-en">Nome em Inglês</label>
                        <input
                            id="edit-name-en"
                            type="text"
                            value={nameEn}
                            onChange={e => setNameEn(e.target.value)}
                            maxLength={100}
                        />
                    </div>

                    <div className="modal-field">
                        <label>Badges</label>
                        <div className="modal-badges">
                            {ALL_BADGES.map(badge => {
                                const info = BADGE_INFO[badge];
                                const isSelected = badges.includes(badge);

                                return (
                                    <button
                                        key={badge}
                                        type="button"
                                        onClick={() => handleToggleBadge(badge)}
                                        className={`modal-badge ${isSelected ? 'modal-badge--selected' : ''}`}
                                    >
                                        <span className="material-symbols-outlined">{info.icon}</span>
                                        <span>{info.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="modal-actions">
                        <button type="button" onClick={onClose} className="modal-btn modal-btn--cancel">
                            Cancelar
                        </button>
                        <button type="submit" disabled={isSaving} className="modal-btn modal-btn--save">
                            {isSaving ? "Salvando..." : "Salvar Alterações"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
