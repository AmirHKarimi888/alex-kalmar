import Pocketbase from "pocketbase";

const url = import.meta.env.VITE_DB_URL;

export const pb = new Pocketbase(url);