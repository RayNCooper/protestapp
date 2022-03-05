interface Person {
    firstName: string,
    lastName: string,
    streetName: string,
    streetNumber: string,
    zipCode: number,
    location: string,
    phone: string,
    fax: string,
    email: string,
}

interface Registration {
    /* People */
    firstOrganizer: Person,
    secondOrganizer?: Person,
    firstOrganizerEqualsSecond: boolean,
    participantCount: number,
    stewardsUsed: boolean,
    stewardCount?: number,

    /* Assembly */
    topic: string,
    date: string,
    startTime: string,
    endTime: string,
    location: string,
    route: string,

    /* Utilities: Vehicles */
    vehiclesUsed: boolean,
    vehicleCount?: number,
    vehicleKinds?: string,

    /* Utilities: Scaffolding */
    setupsUsed: boolean,
    setupKinds?: string

    /* Other */
    comments: string,
}