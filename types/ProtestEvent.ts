interface ProtestUtility {
    name: "Plakate" | "Flyer" | "Pavillons" | "Banner" | "Megaphone" | "Schirme" | "Fahnen" | "Lautsprecher" | "Tische" | "Bühnen"
    itemCount: number
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
    vehicleCount?: number
    vehicleKinds?: string

    /* Utilities */
    usingUtilities: boolean
    usedUtilities?: Array<ProtestUtility>

    /* Other */
    comments?: string
}

export interface Versammlung extends ProtestEvent {
    route?: string
}

export interface Aufzug extends ProtestEvent { }

export interface Mahnwache extends ProtestEvent { }