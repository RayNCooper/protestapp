import Dashboard from "../components/Dashboard/Dashboard.vue"
import History from "../components/History/History.vue"
import LegalEntitySelection from "../components/Forms/LegalEntitySelection.vue"
import LegalEntityForm from "../components/Forms/LegalEntityForm.vue"
import EventGeneralForm from "../components/Forms/EventGeneralForm.vue"
import EventUtilityForm from "../components/Forms/EventUtilityForm.vue"


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
    { path: "/veranstaltungen/anmelden/teilnahme", component: EventUtilityForm, name: "EventParticipationForm" },
    { path: "/veranstaltungen/anmelden/fahrzeuge", component: EventUtilityForm, name: "EventVehicleForm" },
    { path: "/veranstaltungen/anmelden/hilfsmittel", component: EventUtilityForm, name: "EventUtilityForm" },
    { path: "/veranstaltungen/anmelden/sonstiges", component: EventUtilityForm, name: "EventOtherForm" },
];

export default routes