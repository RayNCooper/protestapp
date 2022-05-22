import * as functions from "firebase-functions";
import { getFirestore } from "firebase-admin/firestore";
import { Registration } from "../../types/Registration";
import { BerlinVersammlungRegistration } from "../../types/Cities/Berlin"
import { PDFDocument } from "pdf-lib";

var fs = require('fs');
const db = getFirestore();

exports.generateForm = functions.https.onCall(async (registration: Registration, context) => {
    try {
        const applicant = (await db.collection('legalEntities').doc(registration.applicant.id!).get()).data();
        const organizer = registration.hasExtraOrganizer ? (await db.collection('legalEntities').doc(registration.organizer!.id!).get()).data() : applicant;
        const manager = registration.hasExtraManager ? (await db.collection('legalEntities').doc(registration.manager!.id!).get()).data() : organizer;
        console.log(manager)
        if (registration.location === "Berlin") {
            try {
                /* Read Versammlungsdokument */
                const existingPdfBytes = fs.readFileSync('Berlin.pdf', "base64")

                /*  */
                const registration = new BerlinVersammlungRegistration()

                // Load a PDFDocument from the existing PDF bytes
                const pdfDoc = await PDFDocument.load(existingPdfBytes, { ignoreEncryption: true })
                const form = pdfDoc.getForm()
                return {
                    error: false,
                    message: form,
                };

            } catch (error) {
                return {
                    error: true,
                    message: "Something went wrong while inviting an existing Player.",
                };
            }
        } else if (registration.location === "Hamburg") {
            return {
                error: false,
                message: "Hamburg",
            };
        } else if (registration.location === "Köln") {
            return {
                error: false,
                message: "Köln",
            };
        } else return {
            error: true,
            message: "Error: Unknown Assembly Location",
        };

    } catch (error) {
        console.log(error);
        return {
            error: true,
            message: "Something went wrong while trying to find User Objects associated with the given UIDs.",
        };
    }
});
