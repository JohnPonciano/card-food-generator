"use client";

export function PrintButton() {
    return (
        <button
            onClick={() => window.print()}
            className="print-controls__btn"
        >
            <span className="material-symbols-outlined">print</span>
            Imprimir / Salvar PDF
        </button>
    );
}
