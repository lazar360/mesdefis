import * as SQLite from "expo-sqlite";

// Ouverte une seule fois, au premier import du fichier
export const db = SQLite.openDatabaseSync("mesdefis.db");

// La description de la table, exécutée au démarrage : rien ne se passe si elle existe déjà
db.execSync(
  "CREATE TABLE IF NOT EXISTS games (id INTEGER PRIMARY KEY NOT NULL, attempts INTEGER NOT NULL, played_at TEXT NOT NULL);"
);

// Une ligne de la table games : les mêmes noms que les colonnes
export type Game = {
  id: number;
  attempts: number;
  played_at: string;
};

// Enregistre une partie gagnée
export async function addGame(attempts: number) {
  // La date et l'heure de la partie, au format français
  const playedAt = new Date().toLocaleString("fr-FR");
  // Chaque ? reçoit une valeur, dans l'ordre : jamais de valeur collée dans le texte du SQL
  await db.runAsync("INSERT INTO games (attempts, played_at) VALUES (?, ?)", attempts, playedAt);
}

// Lit toutes les parties, la plus récente en premier : un tableau d'objets
export async function getGames() {
  const rows: Game[] = await db.getAllAsync("SELECT * FROM games ORDER BY id DESC");
  return rows;
}
