import { Client, Databases, ID, Storage } from "appwrite";

class ConfigFn {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(import.meta.env.VITE_PROJECT_ID);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  postDB(postObj) {
    return this.databases.createDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTIONS_ID,
      ID.unique(),
      postObj
    );
  }

  updateDB(document_id, editedObj) {
    return this.databases.updateDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTIONS_ID,
      document_id,
      editedObj
    );
  }

  deleteDB(document_id) {
    return this.databases.deleteDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTIONS_ID,
      document_id
    );
  }

  getDB(document_id) {
    return this.databases.getDocument(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTIONS_ID,
      document_id
    );
  }

  getAllDBs() {
    return this.databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTIONS_ID
    );
  }

  getPageDBs(pageNo) {
    return this.databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTIONS_ID,
      [Query.limit(25), Query.offset((pageNo - 1) * 25)]
    );
  }

  getDateWiseDBs() {
    return this.databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTIONS_ID,
      [Query.orderAsc("date")]
    );
  }

  getActiveDBs() {
    return this.databases.listDocuments(
      import.meta.env.VITE_DATABASE_ID,
      import.meta.env.VITE_COLLECTIONS_ID,
      [Query.equal("status", "active")]
    );
  }
}

const configFn = new ConfigFn();
export default configFn;
