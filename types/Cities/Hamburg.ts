import { Mahnwache, Versammlung, Aufzug } from "../ProtestEvent";
import { Registration, LegalEntity } from "../Registration";

class HamburgVersammlung implements Registration {
    constructor(assembly: Mahnwache | Versammlung, applicant: LegalEntity, organizer: LegalEntity, manager: LegalEntity) { }
    get formMapping(): any {
        return
    }
    fillForm(): void {
        return
    }
    assembly: Mahnwache | Versammlung;
    applicant: LegalEntity;
    organizer: LegalEntity;
    manager: LegalEntity;
}

class HamburgAufzug implements Registration {
    constructor(assembly: Aufzug, applicant: LegalEntity, organizer: LegalEntity, manager: LegalEntity) { }
    get formMapping(): any {
        return
    }
    fillForm(): void {
        return
    }
    assembly: Aufzug;
    applicant: LegalEntity;
    organizer: LegalEntity;
    manager: LegalEntity;
}