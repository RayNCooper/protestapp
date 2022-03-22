
import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Analytics, getAnalytics } from "firebase/analytics";
import { FirebaseStorage, getStorage } from "firebase/storage";
import { Functions, getFunctions } from 'firebase/functions';
import firebaseConfig from "../../firebase.config.json"
import { createStore } from "vuex";
import { documentsModule } from "./modules/documents";
import { filesModule } from "./modules/files";
import { functionsModule } from "./modules/functions";
import { sessionModule } from "./modules/session";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app)
const functions = getFunctions(app)

class State {
  constructor(private firebaseApp: FirebaseApp, private firebaseAnalytics: Analytics, private firebaseFirestore: Firestore, private firebaseStorage: FirebaseStorage, private firebaseFunctions: Functions) { }
}

export default createStore({
  modules: {
    documents: documentsModule,
    files: filesModule,
    session: sessionModule,
    functions: functionsModule
  },
  state: new State(app, analytics, firestore, storage, functions),
});