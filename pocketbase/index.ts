import Pocketbase from "pocketbase";

//const url = import.meta.env.VITE_DB_URL;
export const dbUrl = "https://alex-k.pockethost.io/";

export const pb = new Pocketbase(dbUrl);