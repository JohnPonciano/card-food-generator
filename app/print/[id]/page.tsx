import { notFound } from "next/navigation";
import { getCard } from "@/lib/actions/cards";
import { FoodCard } from "@/app/components/FoodCard";
import { PrintButton } from "@/app/components/PrintButton";
import Link from "next/link";

interface PrintPageProps {
    params: Promise<{ id: string }>;
}

export default async function PrintPage({ params }: PrintPageProps) {
    const { id } = await params;
    const cardId = parseInt(id, 10);

    if (isNaN(cardId)) {
        notFound();
    }

    const card = await getCard(cardId);

    if (!card) {
        notFound();
    }

    // Create 10 copies of the card for A4 grid (2x5)
    const cards = Array(10).fill(card);

    return (
        <>
            {/* Print-only content */}
            <div className="print-page">
                <div className="print-grid">
                    {cards.map((c, index) => (
                        <FoodCard key={index} card={c} forPrint />
                    ))}
                </div>
            </div>

            {/* Screen-only controls */}
            <div className="print-controls no-print">
                <div className="print-controls__header">
                    <Link href="/" className="print-controls__back">
                        <span className="material-symbols-outlined">arrow_back</span>
                        Voltar
                    </Link>
                    <h1 className="print-controls__title">Visualização de Impressão</h1>
                </div>

                <div className="print-controls__info">
                    <p><strong>Card:</strong> {card.name_pt}</p>
                    <p><strong>Formato:</strong> A4 (210mm × 297mm)</p>
                    <p><strong>Cards por página:</strong> 10 (2×5)</p>
                    <p><strong>Tamanho do card:</strong> 85.6mm × 54mm (ISO 7810 ID-1 Horizontal)</p>
                </div>

                <div className="print-controls__actions">
                    <PrintButton />
                </div>

                <div className="print-controls__tips">
                    <h3>Dicas de Impressão:</h3>
                    <ul>
                        <li>Selecione &quot;Salvar como PDF&quot; para gerar o arquivo</li>
                        <li>Configure a escala para 100% (sem ajuste automático)</li>
                        <li>Desative cabeçalhos e rodapés</li>
                        <li>Use margens mínimas ou personalizadas</li>
                    </ul>
                </div>
            </div>
        </>
    );
}
