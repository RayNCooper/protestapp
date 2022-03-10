const { degrees, PDFDocument, rgb, StandardFonts, FieldExistsAsNonTerminalError } = require('pdf-lib');
var fs = require('fs');
const { registerRuntimeCompiler } = require('vue');

const registration = {
    assembly: {
        isMobile: true,
        topic: "Protest gegen Alle",
        date: "01/01/2021",
        startTime: "14:00",
        endTime: "16:00",
        location: "Alexanderplatz",
        route: "Von A nach B",
        participantCount: 100,
        usingStewards: true,
        stewardCount: 2,
        usingVehicles: false,
        vehicleCount: 0,
        vehicleKinds: "PKW",
        setupKinds: "Bühne, Pappaufsteller",
        usingLoudspeaker: false,
        comments: "Kein Kommentar",
        locationRouteCombined: "Start am Alexanderplatz, von A nach B"
    },
    isSingleOrganizer: true,
    firstOrganizer: {
        firstName: "Peter",
        lastName: "Jansen",
        streetName: "Straße",
        streetNumber: "1",
        zipCode: "12345",
        location: "Bielefeld",
        phone: "555-12345",
        email: "cool@hello.de",
        zipLocationCombined: "12345 Bielefeld",
        streetNameStreetNumberCombined: "Straße 1",
        lastNameFirstNameCombined: "Jansen, Peter"
    }
}

async function main() {
    // This should be a Uint8Array or ArrayBuffer
    // This data can be obtained in a number of different ways
    // If your running in a Node environment, you could use fs.readFile()
    // In the browser, you could make a fetch() call and use res.arrayBuffer()
    const existingPdfBytes = fs.readFileSync('test.pdf', "base64")

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
        for (const key in registration.assembly) {
            if (Object.hasOwnProperty.call(registration.assembly, key)) {
                const element = registration.assembly[key];
                try {
                    form.getTextField(key).setText(String(element))
                } catch (error) {
                    if (!String(error).includes("PDFDocument has no form field with the name"))
                        console.log(error);
                }
            }
        }

        for (const key in registration.firstOrganizer) {
            if (Object.hasOwnProperty.call(registration.firstOrganizer, key)) {
                const t = key + "First"
                const element = registration.firstOrganizer[key];
                try {
                    form.getTextField(t).setText(String(element))
                } catch (error) {
                    if (!String(error).includes("PDFDocument has no form field with the name")) console.log(error);
                }
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