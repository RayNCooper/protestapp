import { getApp } from "firebase/app";
import { connectFunctionsEmulator, getFunctions, httpsCallable } from "firebase/functions";
import { Registration } from "types/Registration";
import { ActionContext } from "vuex";
import { RootState } from "..";

type FunctionModuleState = {
}

const functionsModule = {
    state: (): FunctionModuleState => ({
    }),
    getters: {
    },
    actions: {
        async callGenerateForm(context: ActionContext<FunctionModuleState, RootState>, payload: { registration: Registration }) {
            const functions = getFunctions(getApp())
            connectFunctionsEmulator(functions, "localhost", 5001);
            const generateForm = httpsCallable(functions, 'generateForm');
            return generateForm(payload)
        },
    },
}

export { functionsModule }