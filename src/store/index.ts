
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
import { LegalEntity } from "types/LegalEntity";

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
    const draftedRegJson = localStorage.getItem('draftedRegistration')
    if (draftedRegJson) {
      const parsedDraftRegJson = JSON.parse(draftedRegJson)

      if (mutation.type.includes("addDraftedRegistrationPeople") || mutation.type.includes("addDraftedRegistrationLocation")) {
        Object.keys(mutation.payload).forEach((key: string) => parsedDraftRegJson[key] = mutation.payload[key])
      } else {
        Object.keys(mutation.payload).forEach((key: string) => parsedDraftRegJson.assembly[key] = mutation.payload[key])
      }

      localStorage.setItem('draftedRegistration', JSON.stringify(parsedDraftRegJson))
    } else
      localStorage.setItem('draftedRegistration', JSON.stringify(store.getters.getDraftedRegistration))
  } else if (mutation.type.includes("addLegalEntity") && !store.getters.getUser) {
    const legalEntJson = localStorage.getItem("legalEntities")
    if (legalEntJson) {
      const parsedLegalEntJson = JSON.parse(legalEntJson) as LegalEntity[]
      parsedLegalEntJson.push(mutation.payload)
      localStorage.setItem('legalEntities', JSON.stringify(parsedLegalEntJson))
    } else
      localStorage.setItem('legalEntities', JSON.stringify(store.getters.getLegalEntities))
  }
})
export default store