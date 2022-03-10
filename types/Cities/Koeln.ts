import { Aufzug, Mahnwache, Versammlung } from "../ProtestEvent";
import { Registration, LegalEntity } from "../Registration";

class KoelnVersammlungRegistration implements Registration {
    constructor(assembly: Aufzug | Mahnwache | Versammlung, applicant: LegalEntity, organizer: LegalEntity, manager: LegalEntity) { }
    get formMapping(): any {
        return
    }
    fillForm(): void {
        return
    }
    assembly: Aufzug | Mahnwache | Versammlung;
    applicant: LegalEntity;
    organizer: LegalEntity;
    manager: LegalEntity;
}