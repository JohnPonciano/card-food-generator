import { getCards } from "@/lib/actions/cards";
import { PrintSelector } from "./PrintSelector";

export default async function PrintPage() {
    const cards = await getCards();

    return <PrintSelector cards={cards} />;
}
