"use server";

import { db } from "../db";
import { Card, CardFormData } from "../types";
import { revalidatePath } from "next/cache";

export async function createCard(data: CardFormData): Promise<Card> {
    const result = await db.execute({
        sql: `INSERT INTO cards (name_pt, name_en, badges) VALUES (?, ?, ?)`,
        args: [data.name_pt, data.name_en || null, JSON.stringify(data.badges)],
    });

    const newCard = await db.execute({
        sql: `SELECT * FROM cards WHERE id = ?`,
        args: [result.lastInsertRowid],
    });

    revalidatePath("/");

    const row = newCard.rows[0];
    return {
        id: row.id as number,
        name_pt: row.name_pt as string,
        name_en: row.name_en as string | null,
        badges: JSON.parse(row.badges as string),
        created_at: row.created_at as string,
    };
}

export async function getCards(): Promise<Card[]> {
    const result = await db.execute(`SELECT * FROM cards ORDER BY created_at DESC`);

    return result.rows.map((row) => ({
        id: row.id as number,
        name_pt: row.name_pt as string,
        name_en: row.name_en as string | null,
        badges: JSON.parse(row.badges as string),
        created_at: row.created_at as string,
    }));
}

export async function getCard(id: number): Promise<Card | null> {
    const result = await db.execute({
        sql: `SELECT * FROM cards WHERE id = ?`,
        args: [id],
    });

    if (result.rows.length === 0) {
        return null;
    }

    const row = result.rows[0];
    return {
        id: row.id as number,
        name_pt: row.name_pt as string,
        name_en: row.name_en as string | null,
        badges: JSON.parse(row.badges as string),
        created_at: row.created_at as string,
    };
}

export async function deleteCard(id: number): Promise<void> {
    await db.execute({
        sql: `DELETE FROM cards WHERE id = ?`,
        args: [id],
    });

    revalidatePath("/");
}

export async function updateCard(id: number, data: CardFormData): Promise<Card> {
    await db.execute({
        sql: `UPDATE cards SET name_pt = ?, name_en = ?, badges = ? WHERE id = ?`,
        args: [data.name_pt, data.name_en || null, JSON.stringify(data.badges), id],
    });

    const updatedCard = await db.execute({
        sql: `SELECT * FROM cards WHERE id = ?`,
        args: [id],
    });

    revalidatePath("/");

    const row = updatedCard.rows[0];
    return {
        id: row.id as number,
        name_pt: row.name_pt as string,
        name_en: row.name_en as string | null,
        badges: JSON.parse(row.badges as string),
        created_at: row.created_at as string,
    };
}
