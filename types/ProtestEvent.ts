interface ProtestUtility {
    name: "Plakate" | "Flyer" | "Pavillons" | "Banner" | "Megaphone" | "Schirme" | "Fahnen" | "Lautsprecher" | "Tische" | "Bühnen"
    itemCount?: number
}

interface ProtestEvent {
    /* General Information */
    topic: string
    date: string
    startTime: string
    endTime: string
    location: string

    /* Participation */
    participantCount: number
    usingStewards: boolean
    stewardCount?: number

    /* Vehicles */
    usingVehicles: boolean
    vehicleKinds?: string

    /* Utilities */
    utilityKinds: Array<ProtestUtility>

    /* Other */
    covidPrecautions: string
    comments?: string
}

export interface Versammlung extends ProtestEvent {
    type: "Versammlung"
}

export interface Aufzug extends ProtestEvent {
    route: string
    type: "Aufzug"
}

export interface Mahnwache extends ProtestEvent {
    type: "Mahnwache"
}