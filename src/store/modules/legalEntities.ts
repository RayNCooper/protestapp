import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { ActionContext } from "vuex"
import { LegalEntity } from "../../../types/LegalEntity"
import { RootState } from "../index"

type LegalEntitiesModuleState = {
    legalEntities: LegalEntity[],
}

const legalEntitiesModule = {
    state: (): LegalEntitiesModuleState => ({
        legalEntities: []
        /* legalEntities: [{ institutionName: "Greenpeace Deutschland", email: "peter@p.de", firstName: "Peter", lastName: "Enis", location: "Berlin", phone: "1234", streetName: "Sesamstrasse", streetNumber: "2", zipCode: "1234" }] */
    }),
    getters: {
        getLegalEntities: (state: LegalEntitiesModuleState) => {
            return state.legalEntities
        },
        getLegalEntity: (state: LegalEntitiesModuleState) => (id: string) => {
            return state.legalEntities.find((entity) => entity.id === id);
        },
    },
    actions: {
        async setLegalEntititiesState(
            context: ActionContext<LegalEntitiesModuleState, RootState>,
        ) {
            if (context.getters.getUser) {
                context.commit("clearLegalEntities")
                const db = context.rootState.firebaseFirestore
                const uid = context.getters.getUser.uid

                const entitiesRef = collection(db, "legalEntities");
                const q = query(entitiesRef, where("read", "==", uid));
                const querySnapshot = await getDocs(q);

                const legalEntities = querySnapshot.docs.flatMap((entity: any) => { return { id: entity.id, ...entity.data() } })
                context.commit("addLegalEntities", legalEntities)
            }
        },
        async createLegalEntity(context: ActionContext<LegalEntitiesModuleState, RootState>, payload: LegalEntity) {
            if (context.getters.getUser) {
                const entity = await addDoc(collection(context.rootState.firebaseFirestore, "legalEntities"), { ...payload, read: context.getters.getUser.uid });
                context.commit("addLegalEntity", entity)
            } else {
                context.commit("addLegalEntity", { ...payload, id: Date.now().toString() })
            }
        }
    },
    mutations: {
        addLegalEntities(state: LegalEntitiesModuleState, payload: LegalEntity[]) {
            state.legalEntities.push(...payload);
        },
        addLegalEntity(state: LegalEntitiesModuleState, payload: LegalEntity) {
            state.legalEntities.push(payload)
        },
        clearLegalEntities(state: LegalEntitiesModuleState) { state.legalEntities = [] }
    },
}

export { legalEntitiesModule }