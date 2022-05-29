
import { getStorage } from "firebase-admin/storage";
import { PDFDocument } from "pdf-lib";
import { BerlinVersammlungRegistration } from "../../types/Cities/Berlin"
import { Registration } from "../../types/Registration";
import { FormResult, FormError } from "../../types/Result"
import { getFirestore } from "firebase-admin/firestore"

const bucket = getStorage().bucket()
const store = getFirestore()

export const fillFormBerlin = async (r: Registration, base64File: string, uid: string | undefined): Promise<FormResult | FormError> => {
    try {
        const registration = new BerlinVersammlungRegistration(
            "berlin",
            r.assembly,
            r.applicant,
            r.organizer,
            r.manager,
        )

        // Load a PDFDocument from the existing PDF bytes
        const pdfDoc = await PDFDocument.load(base64File, { ignoreEncryption: true })
        const form = pdfDoc.getForm()

        /* Workaround for Problem at https://github.com/Hopding/pdf-lib/issues/814 */
        form.getFields().forEach((field: { getName: () => any; }) => {
            try {
                form.getTextField(field.getName()).setText('')
            } catch (error) { }
        });

        form.getFields().forEach((field: any) => {
            for (const key in registration.formMapping) {
                // @ts-ignore
                const element = registration.formMapping[key];
                try {
                    if (typeof element === "boolean") {
                        if (element) form.getCheckBox(key).check()
                    } else if (typeof element === "string") {
                        form.getTextField(key).setText(element)
                    } else if (typeof element === "number") {
                        form.getTextField(key).setText(String(element))
                    } else {
                        console.log("weder string, boolean noch number", key);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        })

        /* removes writability of form fields for secret sauce reasons */
        form.flatten()
        const pdfBytes = await pdfDoc.saveAsBase64()

        const date = Date.now()

        const fileRef = uid ? bucket.file(`documents/users/${uid}/${date}.pdf`) : bucket.file(`documents/users/anon/${date}-ber-${Math.random()}.pdf`)
        await fileRef.save(Buffer.from(pdfBytes, "base64"), { metadata: {}, })
        await fileRef.makePublic()

        try {
            if (uid)
                await store.doc(`registrations/${uid}/docs/${date}`).create({ publicUrl: fileRef.publicUrl(), read: uid, registration: r })

        } catch (error) {
            console.log(error)
        }

        /* return {
            error: false, message: {
                response: apiResponse,
                file: base64File
            }
        } */
        return { error: false, url: fileRef.publicUrl() }
    } catch (error) {
        return { error: true, message: "Fehler: Etwas lief schief beim Ausfüllen des Formulars", trace: error as string }
    }

}