import { Aufzug, Versammlung } from "../ProtestEvent";
import { ProtestLocations, Registration } from "../Registration";
import { LegalEntity } from "../LegalEntity";

export class BerlinVersammlungRegistration implements Registration {
    id?: string | undefined;

    assembly: Aufzug | Versammlung;
    applicant: LegalEntity;
    organizer: LegalEntity;
    manager: LegalEntity;

    hasExtraOrganizer: boolean;
    hasExtraManager: boolean;
    location: ProtestLocations;

    constructor(location: ProtestLocations, assembly: Aufzug | Versammlung, applicant: LegalEntity, hasExtraOrganizer: boolean, hasExtraManager: boolean, organizer: LegalEntity, manager: LegalEntity) {
        this.assembly = assembly
        this.applicant = applicant
        this.organizer = organizer
        this.manager = manager
        this.location = location

        this.hasExtraOrganizer = hasExtraOrganizer
        this.hasExtraManager = hasExtraManager
    }

    get formMapping() {
        return {

            /* Anmelder */
            institutionName: this.applicant.institutionName ? this.applicant.institutionName : "",
            nameFirst: this.applicant.lastName + ", " + this.applicant.firstName,
            addressFirst: this.applicant.streetName + " " + this.applicant.streetNumber,
            locationFirst: this.applicant.zipCode + ", " + this.applicant.location,
            phoneFirst: this.applicant.phone,
            faxFirst: this.applicant.fax ? this.applicant.fax : "",
            emailFirst: this.applicant.email,

            /* Anmelder = Veranstalter */
            hasExtraOrganizer: !this.hasExtraOrganizer,

            /* Veranstalter & Leiter TODO: Möglichkeit zur Aufspaltung Veranstalter & Leiter und Notiz in beigefügter Seite */
            nameSecond: this.organizer ? this.organizer.lastName + ", " + this.organizer.firstName : "",
            addressSecond: this.organizer ? this.organizer.streetName + " " + this.organizer.streetNumber : "",
            locationSecond: this.organizer ? this.organizer.zipCode + ", " + this.organizer.location : "",
            phoneSecond: this.organizer ? this.organizer.phone : "",
            faxSecond: this.organizer ? this.organizer?.fax : "",
            emailSecond: this.organizer ? this.organizer?.email : "",

            /* Veranstaltung */
            topic: this.assembly.topic,
            date: this.assembly.date,
            startTime: this.assembly.startTime,
            endTime: this.assembly.endTime,
            locationRoute: this.assembly.type === "Aufzug" ? "Start: " + this.assembly.location + " danach " + this.assembly.route : this.assembly.location,
            participantCount: this.assembly.participantCount,
            usingStewardsPositive: this.assembly.usingStewards,
            usingStewardsNegative: !this.assembly.usingStewards,
            stewardCount: this.assembly.usingStewards ? this.assembly.stewardCount : "",

            /* Zubehör */
            usingLoudspeakerPositive: this.assembly.utilityKinds.includes({ name: "Lautsprecher" }) || this.assembly.utilityKinds.includes({ name: "Megaphone" }),
            usingLoudspeakerNegative: !(this.assembly.utilityKinds.includes({ name: "Lautsprecher" }) || this.assembly.utilityKinds.includes({ name: "Megaphone" })),
            setupKinds: this.assembly.utilityKinds ? this.assembly.utilityKinds.flatMap((u) => u.name + ", " + u.itemCount + " Stk.; ").toString() : "",

            /* Fahrzeuge */
            usingVehiclesPositive: this.assembly.usingVehicles,
            usingVehiclesNegative: !this.assembly.usingVehicles,
            vehicleCountKinds: this.assembly.vehicleKinds ? this.assembly.vehicleKinds : "",

            /* Sonstiges */
            comments: this.assembly.comments ? this.assembly.comments : "",
        }
    }
}