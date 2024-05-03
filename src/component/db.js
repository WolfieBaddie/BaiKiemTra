import Dexie from "dexie";

 
export const db = new Dexie('MyBookForm');
db.version(1).stores({
  book: '&id, title, author, year' // Primary key and indexed props
});