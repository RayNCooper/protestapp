import Dashboard from "../components/Dashboard/Dashboard.vue"
import History from "../components/History/History.vue"
import LegalEntityForm from "../components/Forms/EventPeopleForm.vue"
import LegalEntitySelection from "../components/Forms/EventPeopleSelection.vue"
import EventGeneralForm from "../components/Forms/EventGeneralForm.vue"
import EventParticipationForm from "../components/Forms/EventParticipationForm.vue"
import EventVehicleForm from "../components/Forms/EventVehicleForm.vue"
import EventUtilityForm from "../components/Forms/EventUtilityForm.vue"
import EventOtherForm from "../components/Forms/EventOtherForm.vue"
import GenerateForm from "../components/Forms/GenerateForm.vue"

const routes = [
    /* { path: "*", component: NotFoundComponent, name: "Not Found" }, */
    { path: "/", name: "Root", redirect: { name: "Dashboard" } },
    { path: "/login", component: History, name: "Login" },
    { path: "/dashboard", component: Dashboard, name: "Dashboard" },
    { path: "/verlauf", component: History, name: "History" },
    { path: "/einstellungen", component: History, name: "Settings" },
    { path: "/personen", component: LegalEntitySelection, name: "LegalEntitySelection" },
    { path: "/personen/registrieren", component: LegalEntityForm, name: "LegalEntityForm" },
    { path: "/veranstaltungen/anmelden/personen", component: LegalEntitySelection, name: "EventPeopleSelection" },
    { path: "/veranstaltungen/anmelden/allgemein", component: EventGeneralForm, name: "EventGeneralForm" },
    { path: "/veranstaltungen/anmelden/teilnahme", component: EventParticipationForm, name: "EventParticipationForm" },
    { path: "/veranstaltungen/anmelden/fahrzeuge", component: EventVehicleForm, name: "EventVehicleForm" },
    { path: "/veranstaltungen/anmelden/hilfsmittel", component: EventUtilityForm, name: "EventUtilityForm" },
    { path: "/veranstaltungen/anmelden/sonstiges", component: EventOtherForm, name: "EventOtherForm" },
    { path: "/formulare/generieren", component: GenerateForm, name: "GenerateForm" }
];

export default routes