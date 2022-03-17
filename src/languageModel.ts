import { LanguageModel } from '@ditdot-dev/vue-flow-form'

export const germanLanguageModel = new LanguageModel({
    // Your language definitions here (optional).
    // You can leave out this prop if you want to use the default definitions.
    enterKey: 'Enter',
    shiftKey: 'Shift',
    ok: 'OK',
    continue: 'Fortsetzen',
    skip: 'Überspringen',
    pressEnter: ':enterKey drücken',
    multipleChoiceHelpText: 'Mehrfachauswahl möglich',
    multipleChoiceHelpTextSingle: 'Nur eine Antwort möglich',
    otherPrompt: 'Andere',
    placeholder: '',
    submitText: 'ok',
    longTextHelpText: ':shiftKey + :enterKey für Zeilenumbruch.',
    prev: 'Zurück',
    next: 'Weiter',
    percentCompleted: ':percent% abgeschlossen',
    invalidPrompt: 'Bitte das Feld korrekt ausfüllen',
    thankYouText: 'Fertig! Wir haben dich jetzt registriert.',
    successText: 'Aktiviere Warpantrieb...',
    ariaOk: 'Drücken zum Fortfahren',
    ariaRequired: 'Dieser Schritt ist zwingend nötig',
    ariaPrev: 'Zurück',
    ariaNext: 'Weiter',
    ariaSubmitText: 'ok',
    ariaMultipleChoice: 'Drücke :letter zum Auswählen',
    ariaTypeAnswer: 'Schreibe deine Antwort hierhin',
    errorAllowedFileTypes: 'Ungültiges Dateiformat. Erlaubte Formate: :fileTypes.',
    errorMaxFileSize: 'Datei(en) zu groß. Maximal erlaubte Dateigröße: :size.',
    errorMinFiles: 'Zu wenige Datein hinzugefügt. Mindestens benötigte Dateien: :min.',
    errorMaxFiles: 'Zu viele Dateine hinzugefügt. Maximale Anzahl Dateien: :max.',

})