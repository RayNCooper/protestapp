export const utilityTypes = ["Plakate", "Flyer", "Pavillons", "Banner", "Megaphone", "Schirme", "Fahnen", "Lautsprecher", "Tische", "Bühnen"] as const
export interface ProtestUtility {
    name: typeof utilityTypes[number]
    itemCount?: number
}
export interface ProtestEvent {
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