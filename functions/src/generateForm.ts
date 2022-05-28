import * as functions from "firebase-functions";
import { getStorage } from "firebase-admin/storage"
import { Registration } from "../../types/Registration";
import { fillFormBerlin } from "../util/fillForm"
import { FormError, FormResult } from "../../types/Result";

const bucket = getStorage().bucket()

export const generateForm = functions.https.onCall(async (registration: Registration, context): Promise<FormError | FormResult | { error: boolean, message: string }> => {
    try {

        if (registration.location === "berlin") {
            try {
                const fileRef = bucket.file('documents/germany/berlin/versammlungsanmeldung.pdf')
                const fileGetResponse = await fileRef.get()

                const file = fileGetResponse[0]
                /* const apiResponse = fileGetResponse[1] */
                const base64File = Buffer.from((await file.download())[0]).toString('base64')

                return await fillFormBerlin(registration, base64File, context.auth!.uid)

            } catch (error) {
                return {
                    error: true,
                    message: "Something went wrong while filling out the form.",
                    trace: error as string
                };
            }
        } else if (registration.location === "hamburg") {
            return {
                error: true,
                message: "Hamburg derzeit nicht verfügbar",
            };
        } else if (registration.location === "koeln") {
            return {
                error: true,
                message: "Köln derzeit nicht verfügbar",
            };
        } else return {
            error: true,
            message: "Error: Unknown Assembly Location",
        };

    } catch (error) {
        return {
            error: true,
            message: "Something went wrong while trying to find User Objects associated with the given UIDs.",
            trace: error as string
        };
    }
});
