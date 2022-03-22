import { User } from "firebase/auth"

type SessionModuleState = {
    user: User | null
}

const sessionModule = {
    state: (): SessionModuleState => ({
        user: null
    }),
    getters: {
        getUser: (state: SessionModuleState) => {
            return state.user
        },
    },
    actions: {
    },
    mutations: {
    },
}

export { sessionModule }