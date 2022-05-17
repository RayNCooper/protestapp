
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth"
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
import { legalEntitiesModule } from "./modules/legalEntities";
import { registrationsModule } from "./modules/registrations";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app);
const storage = getStorage(app)
const functions = getFunctions(app)
const auth = getAuth(app)

export class RootState {
  constructor(public firebaseApp: FirebaseApp, public firebaseAnalytics: Analytics, public firebaseFirestore: Firestore, public firebaseStorage: FirebaseStorage, public firebaseFunctions: Functions, public firebaseAuth: Auth) { }
}
const store = createStore({
  modules: {
    session: sessionModule,
    documents: documentsModule,
    files: filesModule,
    functions: functionsModule,
    registrations: registrationsModule,
    legalEntities: legalEntitiesModule,
  },
  state: new RootState(app, analytics, firestore, storage, functions, auth),
});
store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  if (mutation.type.includes("addDraftedRegistration")) {
    const jsonStorage = localStorage.getItem('draftedRegistration')

    if (jsonStorage) {
      const parsedStorage = JSON.parse(jsonStorage)

      if (mutation.type.includes("addDraftedRegistrationPeople") || mutation.type.includes("addDraftedRegistrationLocation")) {
        Object.keys(mutation.payload).forEach((key: string) => parsedStorage[key] = mutation.payload[key])
      } else {
        Object.keys(mutation.payload).forEach((key: string) => parsedStorage.assembly[key] = mutation.payload[key])
      }

      localStorage.setItem('draftedRegistration', JSON.stringify(parsedStorage))
    } else
      localStorage.setItem('draftedRegistration', JSON.stringify(store.getters.getDraftedRegistration))


  }
})
export default store