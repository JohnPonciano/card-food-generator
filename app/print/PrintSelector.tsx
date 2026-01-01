"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/lib/types";
import { FoodCard } from "@/app/components/FoodCard";
import { BadgeIcon } from "@/app/components/BadgeIcon";

interface PrintSelectorProps {
    cards: Card[];
}

const CARDS_PER_PAGE = 9;

export function PrintSelector({ cards }: PrintSelectorProps) {
    const [selectedCards, setSelectedCards] = useState<number[]>([]);
    const [isPrintMode, setIsPrintMode] = useState(false);

    const handleToggle = (id: number) => {
        setSelectedCards(prev =>
            prev.includes(id)
                ? prev.filter(cardId => cardId !== id)
                : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedCards.length === cards.length) {
            setSelectedCards([]);
        } else {
            setSelectedCards(cards.map(c => c.id));
        }
    };

    const selectedCardObjects = selectedCards
        .map(id => cards.find(c => c.id === id))
        .filter((c): c is Card => c !== undefined);

    // Split cards into pages of 9
    const pages: Card[][] = [];
    for (let i = 0; i < selectedCardObjects.length; i += CARDS_PER_PAGE) {
        pages.push(selectedCardObjects.slice(i, i + CARDS_PER_PAGE));
    }

    if (isPrintMode) {
        return (
            <>
                {/* Print content - multiple pages */}
                {pages.map((pageCards, pageIndex) => (
                    <div key={pageIndex} className="print-page">
                        <div className="print-grid">
                            {pageCards.map((card, cardIndex) => (
                                <FoodCard key={`${card.id}-${cardIndex}`} card={card} forPrint />
                            ))}
                        </div>
                    </div>
                ))}

                {/* Screen controls */}
                <div className="print-preview no-print">
                    <div className="print-preview__header">
                        <button onClick={() => setIsPrintMode(false)} className="print-preview__back">
                            <span className="material-symbols-outlined">arrow_back</span>
                            Voltar à Seleção
                        </button>
                        <h1>Pronto para Imprimir</h1>
                    </div>

                    <div className="print-preview__info">
                        <p><strong>{selectedCardObjects.length}</strong> card(s) em <strong>{pages.length}</strong> página(s)</p>
                        <p>Formato: A4 (210mm × 297mm)</p>
                        <p>Cards por página: 9 (3×3)</p>
                    </div>

                    <button onClick={() => window.print()} className="print-preview__btn">
                        <span className="material-symbols-outlined">print</span>
                        Imprimir / Salvar PDF
                    </button>

                    <div className="print-preview__tips">
                        <p><strong>Dicas:</strong> Escala 100%, sem cabeçalhos/rodapés, margens mínimas</p>
                    </div>
                </div>
            </>
        );
    }

    if (cards.length === 0) {
        return (
            <div className="print-empty">
                <span className="material-symbols-outlined">info</span>
                <h2>Nenhum card disponível</h2>
                <p>Crie cards na página inicial antes de imprimir.</p>
                <Link href="/" className="print-empty__link">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Voltar e criar cards
                </Link>
            </div>
        );
    }

    return (
        <div className="print-selector">
            {/* Header */}
            <header className="print-selector__header">
                <Link href="/" className="print-selector__back">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Voltar
                </Link>
                <div>
                    <h1>Preparar Impressão</h1>
                    <p>Selecione os cards para imprimir (9 cards por página A4)</p>
                </div>
            </header>

            <div className="print-selector__content">
                {/* Card selection grid */}
                <div className="print-selector__cards">
                    <div className="print-selector__cards-header">
                        <h2>Cards Disponíveis ({cards.length})</h2>
                        <button onClick={handleSelectAll} className="print-selector__select-all">
                            <span className="material-symbols-outlined">
                                {selectedCards.length === cards.length ? 'deselect' : 'select_all'}
                            </span>
                            {selectedCards.length === cards.length ? 'Desmarcar' : 'Selecionar Todos'}
                        </button>
                    </div>
                    <div className="print-selector__grid">
                        {cards.map((card) => {
                            const isSelected = selectedCards.includes(card.id);
                            const position = isSelected ? selectedCards.indexOf(card.id) + 1 : null;

                            return (
                                <button
                                    key={card.id}
                                    onClick={() => handleToggle(card.id)}
                                    className={`print-selector__card ${isSelected ? 'print-selector__card--selected' : ''}`}
                                >
                                    {isSelected && (
                                        <span className="print-selector__card-number">{position}</span>
                                    )}
                                    <div className="print-selector__card-content">
                                        <strong>{card.name_pt}</strong>
                                        {card.name_en && <span>{card.name_en}</span>}
                                        {card.badges.length > 0 && (
                                            <div className="print-selector__card-badges">
                                                {card.badges.slice(0, 4).map(badge => (
                                                    <BadgeIcon key={badge} badge={badge} size="sm" showLabel={false} />
                                                ))}
                                                {card.badges.length > 4 && <span>+{card.badges.length - 4}</span>}
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Selection summary */}
                <div className="print-selector__summary">
                    <h2>Seleção ({selectedCards.length})</h2>
                    <p className="print-selector__pages-info">
                        {selectedCards.length > 0
                            ? `${Math.ceil(selectedCards.length / CARDS_PER_PAGE)} página(s) A4`
                            : 'Nenhum card selecionado'
                        }
                    </p>

                    {selectedCards.length === 0 ? (
                        <div className="print-selector__empty">
                            <span className="material-symbols-outlined">touch_app</span>
                            <p>Clique nos cards ao lado para selecionar</p>
                        </div>
                    ) : (
                        <>
                            <ul className="print-selector__list">
                                {selectedCardObjects.map((card, index) => (
                                    <li key={card.id}>
                                        <span className="print-selector__list-num">{index + 1}</span>
                                        <span className="print-selector__list-name">{card.name_pt}</span>
                                        <button
                                            onClick={() => handleToggle(card.id)}
                                            className="print-selector__list-remove"
                                        >
                                            <span className="material-symbols-outlined">close</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => setIsPrintMode(true)}
                                className="print-selector__print-btn"
                            >
                                <span className="material-symbols-outlined">print</span>
                                Continuar para Impressão
                            </button>
                        </>
                    )}

                    {selectedCards.length > 0 && (
                        <button
                            onClick={() => setSelectedCards([])}
                            className="print-selector__clear"
                        >
                            Limpar Seleção
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
