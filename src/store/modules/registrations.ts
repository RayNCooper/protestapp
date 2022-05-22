import { addDoc, collection, getDocs, query, where } from "firebase/firestore"
import { LegalEntity } from "types/LegalEntity"
import { ProtestUtility } from "../../../types/ProtestEvent"
import { ActionContext } from "vuex"
import { RootState } from ".."
import { ProtestLocations, Registration } from "../../../types/Registration"

type RegistrationModuleState = {
    draftedRegistration?: Registration
    enableStepSkip: boolean
    registrations: Registration[]
}

const registrationsModule = {
    state: (): RegistrationModuleState => ({
        draftedRegistration: {
            location: "Berlin",
            assembly: {
                type: "Aufzug", topic: "", date: "", startTime: "", endTime: "", location: "", participantCount: 0, usingStewards: false, stewardCount: 0, usingVehicles: false, vehicleKinds: "", utilityKinds: [], covidPrecautions: "", comments: "", route: "",
            }, applicant: { email: "", firstName: "", lastName: "", location: "", phone: "", streetName: "", streetNumber: "", zipCode: "", fax: "", id: "", institutionName: "" }, hasExtraOrganizer: false, hasExtraManager: false,
        },
        enableStepSkip: false,
        registrations: []
    }),
    getters: {
        getRegistrations: (state: RegistrationModuleState) => {
            return state.registrations
        },
        getDraftedRegistration: (state: RegistrationModuleState) => {
            return state.draftedRegistration
        },
        getRegistration: (state: RegistrationModuleState) => (id: string) => {
            return state.registrations.find((registration) => registration.id === id);
        },
        getSkipStepState: (state: RegistrationModuleState) => { return state.enableStepSkip }
    },
    actions: {
        async setRegistrationsState(
            context: ActionContext<RegistrationModuleState, RootState>,
        ) {
            if (context.getters.getUser) {
                context.commit("clearRegistrations")
                const db = context.rootState.firebaseFirestore
                const uid = context.getters.getUser.uid

                const registrationsRef = collection(db, "registrations");
                const q = query(registrationsRef, where("read", "==", uid));
                const querySnapshot = await getDocs(q);

                const registrations = querySnapshot.docs.flatMap((event: any) => { return { id: event.id, ...event.data() } })
                context.commit("addRegistrations", registrations)
            }
        },
        async createRegistration(context: ActionContext<RegistrationModuleState, RootState>, payload: Registration) {
            const user = context.getters.getUser
            if (user) {
                const event = await addDoc(collection(context.rootState.firebaseFirestore, "registrations"), { ...payload, read: context.getters.getUser.uid });
                context.commit("addRegistration", event)
            } else context.commit("addRegistration", { ...payload, id: Date.now().toString() })

        },
    },
    mutations: {
        addRegistrations(state: RegistrationModuleState, payload: Registration[]) {
            state.registrations.push(...payload);
        },
        addRegistration(state: RegistrationModuleState, payload: Registration) {
            state.registrations.push(payload)
        },
        addDraftedRegistrationLocation(state: RegistrationModuleState, payload: {
            location: ProtestLocations
        }) {
            state.draftedRegistration!.location = payload.location
        },
        addDraftedRegistrationPeople(state: RegistrationModuleState, payload: { applicant: LegalEntity, organizer: LegalEntity, manager: LegalEntity }) {
            state.draftedRegistration!.applicant = payload.applicant
            state.draftedRegistration!.organizer = payload.organizer
            state.draftedRegistration!.manager = payload.manager
        },
        addDraftedRegistrationGeneral(state: RegistrationModuleState, payload: { type: "Aufzug" | "Versammlung", topic: string, date: string, startTime: string, endTime: string, location: string, route: string }) {
            state.draftedRegistration!.assembly.type = payload.type
            state.draftedRegistration!.assembly.topic = payload.topic
            state.draftedRegistration!.assembly.date = payload.date
            state.draftedRegistration!.assembly.startTime = payload.startTime
            state.draftedRegistration!.assembly.endTime = payload.endTime
            state.draftedRegistration!.assembly.location = payload.location
            state.draftedRegistration!.assembly.type == "Aufzug" ? state.draftedRegistration!.assembly.route = payload.route : ""
        },
        addDraftedRegistrationParticipation(state: RegistrationModuleState, payload: {
            participantCount: number
            usingStewards: boolean
            stewardCount?: number
        }) {
            state.draftedRegistration!.assembly.participantCount = payload.participantCount
            state.draftedRegistration!.assembly.usingStewards = payload.usingStewards
            state.draftedRegistration!.assembly.stewardCount = payload.stewardCount
        },
        addDraftedRegistrationVehicle(state: RegistrationModuleState, payload: {
            usingVehicles: boolean
            vehicleKinds?: string
        }) {
            state.draftedRegistration!.assembly.usingVehicles = payload.usingVehicles
            state.draftedRegistration!.assembly.vehicleKinds = payload.vehicleKinds
        },
        addDraftedRegistrationUtility(state: RegistrationModuleState, payload: {
            utilityKinds: Array<ProtestUtility>
        }) {
            state.draftedRegistration!.assembly.utilityKinds = payload.utilityKinds
        },
        addDraftedRegistrationOther(state: RegistrationModuleState, payload: {
            covidPrecautions: string
            comments?: string
        }) {
            state.draftedRegistration!.assembly.covidPrecautions = payload.covidPrecautions
            state.draftedRegistration!.assembly.comments = payload.comments
        },
        clearRegistrations(state: RegistrationModuleState) { state.registrations = [] },
        setSkipStepState(state: RegistrationModuleState, payload: boolean) { state.enableStepSkip = payload },
        setDraftedRegistration(state: RegistrationModuleState, payload: Registration) { state.draftedRegistration = payload }
    },
}

export { registrationsModule }