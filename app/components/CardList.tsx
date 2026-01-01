"use client";

import Link from "next/link";
import { Card } from "@/lib/types";
import { deleteCard } from "@/lib/actions/cards";
import { FoodCard } from "./FoodCard";
import { CardEditModal } from "./CardEditModal";
import { useState } from "react";

interface CardListProps {
    cards: Card[];
}

export function CardList({ cards }: CardListProps) {
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [editingCard, setEditingCard] = useState<Card | null>(null);

    const handleDelete = async (id: number) => {
        if (!confirm("Deseja realmente excluir este card?")) return;

        setDeletingId(id);
        try {
            await deleteCard(id);
        } catch (error) {
            console.error("Error deleting card:", error);
        } finally {
            setDeletingId(null);
        }
    };

    if (cards.length === 0) {
        return (
            <div className="card-list__empty">
                <span className="material-symbols-outlined" style={{ fontSize: "48px", opacity: 0.5 }}>
                    restaurant
                </span>
                <p>Nenhum card criado ainda.</p>
                <p>Use o formulário para criar seu primeiro card.</p>
            </div>
        );
    }

    return (
        <>
            <div className="card-list">
                <div className="card-list__header">
                    <h2 className="card-list__title">Cards Salvos ({cards.length})</h2>
                    <Link href="/print" className="card-list__print-btn">
                        <span className="material-symbols-outlined">print</span>
                        Preparar Impressão
                    </Link>
                </div>

                <div className="card-list__grid">
                    {cards.map((card) => (
                        <div key={card.id} className="card-list__item">
                            <FoodCard card={card} />
                            <div className="card-list__actions">
                                <button
                                    onClick={() => setEditingCard(card)}
                                    className="card-list__btn card-list__btn--edit"
                                >
                                    <span className="material-symbols-outlined">edit</span>
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDelete(card.id)}
                                    disabled={deletingId === card.id}
                                    className="card-list__btn card-list__btn--delete"
                                >
                                    <span className="material-symbols-outlined">delete</span>
                                    {deletingId === card.id ? "..." : "Excluir"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {editingCard && (
                <CardEditModal
                    card={editingCard}
                    onClose={() => setEditingCard(null)}
                />
            )}
        </>
    );
}
