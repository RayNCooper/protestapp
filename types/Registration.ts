import { Aufzug, Versammlung } from "./ProtestEvent";
import { LegalEntity } from "./LegalEntity"
export type ProtestLocations = "berlin" | "koeln" | "hamburg"

export interface Registration {
    id?: string

    location: ProtestLocations

    assembly: Aufzug | Versammlung

    /* 
        Aus Versammlungsgesetz §7 (https://www.gesetze-im-internet.de/versammlg/BJNR006840953.html)
        (1) Jede öffentliche Versammlung muß einen Leiter haben.
        (2) Leiter der Versammlung ist der Veranstalter. Wird die Versammlung von einer Vereinigung veranstaltet, so ist ihr Vorsitzender der Leiter.
        (3) Der Veranstalter kann die Leitung einer anderen Person übertragen.
        (4) Der Leiter übt das Hausrecht aus.
    */
    applicant: LegalEntity       // Anmelder
    organizer: LegalEntity       // Veranstalter 
    manager: LegalEntity         // Leiter

    /* Gibt es zusätzlich einen Veranstalter? */
    hasExtraOrganizer: boolean

    /* Gibt es einen delegierten Leiter? */
    hasExtraManager: boolean
}