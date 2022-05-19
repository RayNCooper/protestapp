import Landing from "../components/Landing.vue"
import Dashboard from "../components/Dashboard/Dashboard.vue"
import History from "../components/History/History.vue"
import LegalEntityForm from "../components/Forms/EventPeopleForm.vue"
import EventPeopleSelection from "../components/Forms/EventPeopleSelection.vue"
import EventLocationSelection from "../components/Forms/EventLocationSelection.vue"
import EventGeneralForm from "../components/Forms/EventGeneralForm.vue"
import EventParticipationForm from "../components/Forms/EventParticipationForm.vue"
import EventVehicleForm from "../components/Forms/EventVehicleForm.vue"
import EventUtilityForm from "../components/Forms/EventUtilityForm.vue"
import EventOtherForm from "../components/Forms/EventOtherForm.vue"
import GenerateForm from "../components/Forms/GenerateForm.vue"
import CheckForm from "../components/Forms/CheckForm.vue"
import Login from "../components/Login/Login.vue"
import ForgotPassword from "../components/Login/ForgotPassword.vue"
import ResetPassword from "../components/Login/ResetPassword.vue"

const routes = [
    /* { path: "*", component: NotFoundComponent, name: "Not Found" }, */
    { path: "/", component: Landing, name: "Landing" },
    { path: "/login", component: History, name: "Login" },
    { path: "/dashboard", component: Dashboard, name: "Dashboard" },
    { path: "/verlauf", component: History, name: "History" },
    { path: "/einstellungen", component: History, name: "Settings" },
    { path: "/login", component: Login, name: "Login", },
    { path: "/login/forgot", name: "ForgotPassword", component: ForgotPassword },
    { path: "/login/reset", name: "ResetPassword", component: ResetPassword },
    { path: "/personen", component: History, name: "LegalEntitySelection" },
    { path: "/personen/registrieren", component: LegalEntityForm, name: "LegalEntityForm" },
    { path: "/veranstaltungen/anmelden/personen", component: EventPeopleSelection, name: "EventPeopleSelection" },
    { path: "/veranstaltungen/anmelden/ort", component: EventLocationSelection, name: "EventLocationSelection" },
    { path: "/veranstaltungen/anmelden/allgemein", component: EventGeneralForm, name: "EventGeneralForm" },
    { path: "/veranstaltungen/anmelden/teilnahme", component: EventParticipationForm, name: "EventParticipationForm" },
    { path: "/veranstaltungen/anmelden/fahrzeuge", component: EventVehicleForm, name: "EventVehicleForm" },
    { path: "/veranstaltungen/anmelden/hilfsmittel", component: EventUtilityForm, name: "EventUtilityForm" },
    { path: "/veranstaltungen/anmelden/sonstiges", component: EventOtherForm, name: "EventOtherForm" },
    { path: "/formulare/check", component: CheckForm, name: "CheckForm" },
    { path: "/formulare/generieren", component: GenerateForm, name: "GenerateForm" }
];

export default routes