import { LinkOption } from "@ditdot-dev/vue-flow-form"

export const peopleSelection = {
    applicant: [
        new LinkOption({
            url: 'https://www.gesetze-im-internet.de/versammlg/BJNR006840953.html',
            text: '📌   VersammlG (Versammlungsgesetz)', // optional, default is link url
            target: '_blank' // optional, default is '_blank'
        }),
        new LinkOption({
            url: 'https://www.google.com/',
            text: '🗑   Personen löschen', // optional, default is link url
            target: '_blank' // optional, default is '_blank'
        })
    ],
    organizer: [
        new LinkOption({
            url: 'https://www.gesetze-im-internet.de/versammlg/BJNR006840953.html',
            text: '📌 VersammlG (Versammlungsgesetz)', // optional, default is link url
            target: '_blank' // optional, default is '_blank'
        }),
        new LinkOption({
            url: 'https://www.gesetze-im-internet.de/versammlg/__7.html',
            text: '📌 §7 VersammlG', // optional, default is link url
            target: '_blank' // optional, default is '_blank'
        })
    ],
    manager: [
        new LinkOption({
            url: 'https://www.gesetze-im-internet.de/versammlg/BJNR006840953.html',
            text: 'VersammlG (Versammlungsgesetz)', // optional, default is link url
            target: '_blank' // optional, default is '_blank'
        })
    ]
}

export const general = [
    new LinkOption({
        url: 'https://www.gesetze-im-internet.de/versammlg/BJNR006840953.html',
        text: '📌 VersammlG (Versammlungsgesetz)', // optional, default is link url
        target: '_blank' // optional, default is '_blank'
    }),
]