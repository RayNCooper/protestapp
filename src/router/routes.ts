import Landing from "../components/Landing.vue"
import Dashboard from "../components/Dashboard/Dashboard.vue"
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
import NotFound from "../components/Misc/NotFound.vue"
import About from "../components/Misc/About.vue"
import Feedback from "../components/Misc/Feedback.vue"
import TOS from "../components/Misc/TOS.vue"
import Impressum from "../components/Misc/Impressum.vue"
import Join from "../components/Misc/Join.vue"
import FAQ from "../components/Misc/FAQ.vue"
import Kontakt from "../components/Misc/Kontakt.vue"

const routes = [
    { path: '/:pathMatch(.*)*', component: NotFound, name: "Not Found" },
    { path: "/", component: Landing, name: "Landing" },

    { path: "/dashboard", component: Dashboard, name: "Dashboard" },
    { path: "/einstellungen", component: History, name: "Settings" },

    { path: "/about", name: "About", component: About },
    { path: "/feedback", name: "Feedback", component: Feedback },
    { path: "/agb", name: "TOS", component: TOS },
    { path: "/impressum", name: "Impressum", component: Impressum },
    { path: "/positions", name: "Join", component: Join },
    { path: "/faq", name: "FAQ", component: FAQ },
    { path: "/kontakt", name: "Kontakt", component: Kontakt },

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