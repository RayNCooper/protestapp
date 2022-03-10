import { Aufzug, Mahnwache, Versammlung } from "./ProtestEvent";

export interface LegalEntity {
    institutionName?: string
    firstName: string
    lastName: string
    streetName: string
    streetNumber: string
    zipCode: string
    location: string
    phone: string
    fax?: string
    email: string
}

export interface Registration {
    get formMapping()

    assembly: Aufzug | Mahnwache | Versammlung

    /* 
        Aus Versammlungsgesetz §7 (https://www.gesetze-im-internet.de/versammlg/BJNR006840953.html)
        (1) Jede öffentliche Versammlung muß einen Leiter haben.
        (2) Leiter der Versammlung ist der Veranstalter. Wird die Versammlung von einer Vereinigung veranstaltet, so ist ihr Vorsitzender der Leiter.
        (3) Der Veranstalter kann die Leitung einer anderen Person übertragen.
        (4) Der Leiter übt das Hausrecht aus.
    */
    applicant: LegalEntity      // Anmelder
    organizer?: LegalEntity      // Veranstalter 
    manager?: LegalEntity        // Leiter

    /* Gibt es zusätzlich einen Veranstalter? */
    hasExtraOrganizer: boolean

    /* Gibt es einen delegierten Leiter? */
    hasExtraManager: boolean
}