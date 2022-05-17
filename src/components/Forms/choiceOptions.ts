import { ChoiceOption } from "@ditdot-dev/vue-flow-form"

export const participation = {
    usingStewards: [
        new ChoiceOption({
            label: 'Ja',
            value: true
        }),
        new ChoiceOption({
            label: 'Nein',
            value: false
        })
    ]
}

export const vehicle = {
    usingVehicles: [
        new ChoiceOption({ label: 'Ja', value: true }),
        new ChoiceOption({ label: 'Nein', value: false })
    ]
}