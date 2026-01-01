import { getCards } from "@/lib/actions/cards";
import { CardForm } from "./components/CardForm";
import { CardList } from "./components/CardList";

export default async function Home() {
    const cards = await getCards();

    return (
        <main className="main">
            <header className="header">
                <h1 className="header__title">
                    <span className="material-symbols-outlined">restaurant_menu</span>
                    Sistema de Cards Alimentares
                </h1>
                <p className="header__subtitle">Novotel - Criação e Impressão de Cards</p>
            </header>

            <div className="content">
                <section className="section section--form">
                    <CardForm />
                </section>

                <section className="section section--list">
                    <CardList cards={cards} />
                </section>
            </div>
        </main>
    );
}
