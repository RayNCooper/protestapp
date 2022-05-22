import { BerlinVersammlungRegistration } from "../types/Cities/Berlin";
const { degrees, PDFDocument, rgb, StandardFonts, FieldExistsAsNonTerminalError } = require('pdf-lib');
var fs = require('fs');

async function main() {
    // This should be a Uint8Array or ArrayBuffer
    // This data can be obtained in a number of different ways
    // If your running in a Node environment, you could use fs.readFile()
    // In the browser, you could make a fetch() call and use res.arrayBuffer()
    const existingPdfBytes = fs.readFileSync('test.pdf', "base64")

    const registration = new BerlinVersammlungRegistration(
        location: "berlin",
        { type: "Versammlung", topic: "Protest gegen Alles", date: "12.03.2022", startTime: "12:00", endTime: "16:00", location: "Zentralplatz", participantCount: 200, usingStewards: false, usingVehicles: false, usedUtilities: [{ name: "Megaphone", itemCount: 1 }], comments: "Das ist ein Kommentar - Dieses Formular wurde automatisch generiert mittels deinprotest.net" },
        { institutionName: "Greenpeace", firstName: "Peter", lastName: "Lustig", streetName: "Sesamstrasse", streetNumber: "12", zipCode: "12345", location: "Downtown", phone: "0123/4567", email: "peter.lustig@mail.de" },
        false,
        false
    )


    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes, { ignoreEncryption: true })
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
                    console.log("weder string, boolean noch number");
                }
            } catch (error) {
                console.log(error);
            }

        }
    })
    form.flatten()

    // Serialize the PDFDocument to bytes (a Uint8Array)
    const pdfBytes = await pdfDoc.save()

    // For example, `pdfBytes` can be:
    //   • Written to a file in Node
    //   • Downloaded from the browser
    //   • Rendered in an <iframe>
    fs.writeFile('test2.pdf', pdfBytes, function (err: any, data: any) {

        // Display the file conten
        if (err) {
            console.log(err);
        }
        console.log(data);
    })
}
main()