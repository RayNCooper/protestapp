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
    actions: {
        async callGenerateForm(context: ActionContext<FunctionModuleState, RootState>, payload: { registration: Registration }) {
            const functions = getFunctions(getApp())
            process.env.NODE_ENV == "development" && connectFunctionsEmulator(functions, "localhost", 5001);
            const generateForm = httpsCallable(functions, 'generateForm');
            return generateForm(payload)
        },
    },
}

export { functionsModule }