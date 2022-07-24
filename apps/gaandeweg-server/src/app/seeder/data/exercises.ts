export const exercises = [
  {
    version: '1',
    categoryId: 'Pre-Treatment',
    name: 'Dagboekkaart',
    summary: 'Dagboekkaart en vaardighedenopvolging',

    publishedBy: 1,
    template: {
      fields: [
        {
          fieldId: 1,
          fieldName: 'date',
          fieldText: 'Datum',
          fieldType: 'DATE',
        },
        {
          fieldId: 2,
          fieldName: 'time',
          fieldText: 'Tijd',
          fieldType: 'TIME',
        },
        {
          fieldId: 3,
          fieldName: 'suicidalThoughts',
          fieldText: 'Suïcidegedachten',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 0,
            max: 5,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: false,
                value: '0',
              },
              {
                slot: 'end',
                icon: false,
                value: '5',
              },
            ],
          },
          fieldInfo: '0 = niet aanwezig, 5 = zeer sterk aanwezig',
        },
        {
          fieldId: 4,
          fieldName: 'selfHarm',
          fieldText: 'Zelfverwonding Drang',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 0,
            max: 5,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: false,
                value: '0',
              },
              {
                slot: 'end',
                icon: false,
                value: '5',
              },
            ],
          },
          fieldInfo: '0 = niet aanwezig, 5 = zeer sterk aanwezig',
          extraField: {
            fieldType: 'CHECKBOX',
            fieldName: 'selfHarmed',
            fieldText: 'Uitgevoerd',
          },
        },
        {
          fieldId: 5,
          fieldName: 'alcohol',
          fieldText: 'Alcohol',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 0,
            max: 5,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: false,
                value: '0',
              },
              {
                slot: 'end',
                icon: false,
                value: '5',
              },
            ],
          },
          fieldInfo: '0 = niet aanwezig, 5 = zeer sterk aanwezig',
        },
        {
          fieldId: 0,
          fieldName: '',
          fieldText: '',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 0,
            max: 5,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: false,
                value: '0',
              },
              {
                slot: 'end',
                icon: false,
                value: '5',
              },
            ],
          },
          fieldInfo: '0 = niet aanwezig, 5 = zeer sterk aanwezig',
        },
      ],
    },
  },
  {
    version: '1',
    categoryId: 'KOV',
    name: 'KOV',
    summary: 'Kernoplettendheidsvaardigheden',
    publishedBy: 1,
    template: {
      fields: [
        {
          fieldId: 1,
          fieldName: 'date',
          fieldText: 'Datum',
          fieldType: 'DATE',
        },

        {
          fieldId: 3,
          fieldName: 'cause',
          fieldText: 'Aanleiding',
          fieldInfo: 'Beschrijf de aanleiding tot de situatie',
          fieldType: 'TEXT',
        },
        {
          fieldId: 4,
          fieldName: 'emotions',
          fieldText: 'Emoties',
          fieldInfo:
            'Beschrijf de emoties die aanwezig waren in de situatie. Je kan één van de voorbeelden uit de lijst selecteren of zelf iets invullen. Wat je invult wordt daarna in de lijst opgenomen.',
          fieldType: 'SELECT',
          fieldRepeatable: true,
          fieldRepeat: 5,
          fieldValues: [
            {
              fieldLabel: 'Afschuw',
              fieldValue: 1,
            },
            {
              fieldLabel: 'Angst',
              fieldValue: 2,
            },
            {
              fieldLabel: 'Blijdschap',
              fieldValue: 3,
            },
            {
              fieldLabel: 'Irritatie',
              fieldValue: 4,
            },
            {
              fieldLabel: 'Kwaadheid',
              fieldValue: 5,
            },
            {
              fieldLabel: 'Neutraal',
              fieldValue: 6,
            },
            {
              fieldLabel: 'Schaamte',
              fieldValue: 7,
            },
            {
              fieldLabel: 'Verdriet',
              fieldValue: 8,
            },
            {
              fieldLabel: 'Verrassing',
              fieldValue: 9,
            },
            {
              fieldLabel: 'Verwondering',
              fieldValue: 10,
            },
          ],
        },
        {
          fieldId: 5,
          fieldName: 'thoughts',
          fieldText: 'Gedachten / Oordelen / Interpretaties',
          fieldInfo:
            'Welke gedachten / oordelen / interpretaties waren er in de situatie?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 6,
          fieldName: 'goal',
          fieldText: 'Doel',
          fieldInfo:
            'Welk doel hou je jezelf voor ogen in die situatie? Hoe zou je willen dat de situatie <strong>constructief</strong> verloopt? Wat zou je willen bereiken?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 7,
          fieldName: 'actions',
          fieldText: 'Acties',
          fieldInfo:
            'Wat heb je gedaan in die situatie? Wat heb je gezegd? Hoe was je houding?',
          fieldType: 'TEXT',
        },

        {
          fieldId: 9,
          fieldName: 'observe-external',
          fieldText: 'Observeren - extern',
          fieldInfo:
            'Ben ik mij bewust van de dingen en gebeurtenissen om mij heen? Gebruik ik bij het waarnemen van de dingen om mij heen bewust mijn zintuigen? Kan ik bij het observeren van de dingen en gebeurtenissen om mij heen stilstaan bij de details en deze aandachtig in mijzelf opnemen?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 10,
          fieldName: 'observe-internal',
          fieldText: 'Observeren - intern',
          fieldInfo:
            'Ben ik mij bewust van innerlijke ervaringen en kan ik er bij stilstaan? Emoties en gedachten: Ervaar ik die bewust op het moment zelf? Kan ik er mij voor openstellen? Lichamelijke sensaties: Zijn er lichamelijke gewaarwordingen? Merk ik op wat ik voel in mijn lichaam?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 11,
          fieldName: 'distance',
          fieldText: 'Kon ik hierdoor afstand nemen van de situatie?',
          fieldType: 'RADIO',
          fieldValues: [
            { fieldLabel: 'Ja', fieldValue: true },
            { fieldLabel: 'Neen', fieldValue: false },
          ],
        },
        {
          fieldId: 12,
          fieldName: 'describe',
          fieldText: 'Beschrijven - onder woorden brengen',
          fieldInfo:
            'Beschrijf je externe en interne observaties. Kan ik wat ik meemaak met woorden benoemen in gedachten? op papier? aan een ander?<strong>Zo objectief en zuiver mogelijk, zonder interpretaties</strong>',
          fieldType: 'TEXT',
        },
        {
          fieldId: 13,
          fieldName: 'participate',
          fieldText: 'Participeren',
          fieldInfo:
            'Kan ik mij ten volle in verbinding stellen met het moment? Verzet ik mij niet tegen wat ik nu ervaar? Ga ik er niet van vluchten? Onderga ik de situatie niet zomaar?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 14,
          fieldName: 'judgment-free',
          fieldText: 'Ben ik oordeelvrij?',
          fieldType: 'RADIO',
          fieldValues: [
            { fieldLabel: 'Ja', fieldValue: true },
            { fieldLabel: 'Neen', fieldValue: false },
          ],
        },
        {
          fieldId: 15,
          fieldName: 'non-judgmental-attitude',
          fieldText: 'Kan ik een oordeelvrije houding aannemen?',
          fieldInfo:
            'Kan ik mijn oordelen voor mij houden of spreek ik ze uit? Handel ik naar mijn oordelen?',
          fieldType: 'RADIO',
          fieldValues: [
            { fieldLabel: 'Ja', fieldValue: true },
            { fieldLabel: 'Neen', fieldValue: false },
          ],
        },
        {
          fieldId: 16,
          fieldName: 'one-thing',
          fieldText: 'Eén ding tegelijkertijd',
          fieldInfo:
            'Doe ik één ding tegelijk? Ben ik in mijn geest en gedachten ook met één iets bezig? Ben ik met mijn gedachten bij hetgeen ik doe of denk ik aan andere dingen?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 17,
          fieldName: 'effective',
          fieldText: 'Effectief zijn en handelen',
          fieldInfo:
            'Heb ik gedaan wat werkt om mijn doel te bereiken? Wou ik liever gelijk hebben dan doen wat nodig was? Wou ik liever koppig vasthouden aan iets? Wou ik enkel goed doen in de situatie?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 18,
          fieldName: 'minds-present',
          fieldText: 'Verhouding van de geesten',
          fieldInfo: 'Rangschik de volgorde van aanwezigheid van de geesten.',
          fieldRepeatable: true,
          fieldType: 'SELECT',
          fieldRepeat: 3,
          fieldValues: [
            { fieldLabel: 'Emotionele geest', fieldValue: 1 },
            { fieldLabel: 'Rationele geest', fieldValue: 2 },
            { fieldLabel: 'Wijze geest', fieldValue: 3 },
          ],
        },
        {
          fieldId: 19,
          fieldName: 'prefer-change',
          fieldText: 'Had ik iets anders gewild in deze situatie?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 20,
          fieldName: 'happy-about',
          fieldText: 'Waar ben je tevreden over?',
          fieldType: 'TEXT',
        },
      ],
    },
  },
  {
    version: '1',
    categoryId: 'Middelenmisbruik',
    name: 'Alcoholdagboek',
    summary: 'Alcoholdagboek',
    publishedBy: 1,
    template: {
      fields: [
        {
          fieldId: 1,
          fieldName: 'date',
          fieldText: 'Datum',
          fieldType: 'DATE',
        },
        {
          fieldId: 2,
          fieldName: 'time',
          fieldText: 'Tijd',
          fieldType: 'TIME',
        },
        {
          fieldId: 3,
          fieldName: 'usage',
          fieldText: 'Mijn alcoholgebruik',
          fieldInfo:
            'Hoe sterk was mijn zin om te drinken (1=een beetje of weinig zin, 5=heel sterke zin):',
          fieldType: 'RADIO',
          fieldValues: [
            {
              fieldLabel: 'Geen of weinig',
              fieldValue: 1,
            },
            {
              fieldLabel: 'Enigzins',
              fieldValue: 2,
            },
            {
              fieldLabel: 'Tamelijk',
              fieldValue: 3,
            },
            {
              fieldLabel: 'Veel',
              fieldValue: 4,
            },
            {
              fieldLabel: 'Heel veel',
              fieldValue: 5,
            },
          ],
        },
        {
          fieldId: 4,
          fieldName: 'quantity',
          fieldText: 'Standaardglazen',
          fieldInfo:
            'Hoeveel heb ik gedronken (noteer het aantal standaardglazen):',
          fieldType: 'TEXT',
        },
        {
          fieldId: 5,
          fieldName: 'replacement',
          fieldText: 'Vervanging',
          fieldInfo:
            'Als ik zin had maar niet dronk, wat deed ik dan in de plaats *Je kan één van de voorbeelden uit de lijst selecteren of zelf iets invullen. Wat je invult wordt daarna in de lijst opgenomen.',
          fieldType: 'TEXT',
        },
        {
          fieldId: 6,
          fieldName: 'location',
          fieldText: 'Waar was je',
          fieldInfo:
            'Waar was ik: *Je kan één van de voorbeelden uit de lijst selecteren of zelf iets invullen. Wat je invult wordt daarna in de lijst opgenomen.',
          fieldType: 'RADIO',
          fieldValues: [
            {
              fieldLabel: 'Bij Familie',
              fieldValue: 1,
            },
            {
              fieldLabel: 'Bij vrienden',
              fieldValue: 2,
            },
            {
              fieldLabel: 'In een dancing of op een fuif',
              fieldValue: 3,
            },
            {
              fieldLabel: 'Op café',
              fieldValue: 4,
            },
            {
              fieldLabel: 'Op het werk of op school',
              fieldValue: 5,
            },
            {
              fieldLabel: 'Thuis',
              fieldValue: 6,
            },
          ],
        },
        {
          fieldId: 7,
          fieldName: 'group',
          fieldText: 'Wie was er bij je',
          fieldInfo:
            'Was ik alleen of waren er nog anderen: *Je kan één van de voorbeelden uit de lijst selecteren of zelf iets invullen. Wat je invult wordt daarna in de lijst opgenomen.',
          fieldType: 'SELECT',
          fieldValues: [
            {
              fieldLabel: 'Alleen',
              fieldValue: 1,
            },
            {
              fieldLabel: "Collega's",
              fieldValue: 2,
            },
            {
              fieldLabel: 'Drinkvrienden',
              fieldValue: 3,
            },
            {
              fieldLabel: 'Familie',
              fieldValue: 4,
            },
            {
              fieldLabel: 'Onbekenden',
              fieldValue: 5,
            },
            {
              fieldLabel: 'Partner',
              fieldValue: 6,
            },
            {
              fieldLabel: 'Vrienden',
              fieldValue: 7,
            },
          ],
        },
        {
          fieldId: 8,
          fieldName: 'situation',
          fieldText: 'Situatie',
          fieldInfo:
            'Wat was de situatie of wat gebeurde er (vul in wanneer je dit belangrijk vindt): ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 9,
          fieldName: 'feelings',
          fieldText: 'Gevoelens',
          fieldInfo:
            'Hoe voelde ik me: *Je kan één van de voorbeelden uit de lijst selecteren of zelf iets invullen. Wat je invult wordt daarna in de lijst opgenomen.',
          fieldType: 'SELECT',
          fieldRepeatable: true,
          fieldRepeat: 5,
          fieldValues: [
            {
              fieldLabel: 'Angstig',
              fieldValue: 1,
            },
            {
              fieldLabel: 'Down, depressief',
              fieldValue: 2,
            },
            {
              fieldLabel: 'Gespannen, zenuwachtig',
              fieldValue: 3,
            },
            {
              fieldLabel: 'Kwaad',
              fieldValue: 4,
            },
            {
              fieldLabel: 'Moe',
              fieldValue: 5,
            },
            {
              fieldLabel: 'Opgewekt',
              fieldValue: 6,
            },
            {
              fieldLabel: 'Verveeld',
              fieldValue: 7,
            },
          ],
        },
        {
          fieldId: 10,
          fieldName: 'expectations',
          fieldText: 'Verwachtingen',
          fieldInfo:
            'Wat dacht of verwachtte ik: *Je kan één van de voorbeelden uit de lijst selecteren of zelf iets invullen. Wat je invult wordt daarna in de lijst opgenomen.',
          fieldType: 'SELECT',
          fieldRepeatable: true,
          fieldRepeat: 5,
          fieldValues: [
            {
              fieldLabel: 'Dit moet ik vieren',
              fieldValue: 1,
            },
            {
              fieldLabel: 'Eéntje kan geen kwaad',
              fieldValue: 2,
            },
            {
              fieldLabel: 'Het zal me kalmeren',
              fieldValue: 3,
            },
            {
              fieldLabel: 'Ik ben een mislukking',
              fieldValue: 4,
            },
            {
              fieldLabel: 'Ik heb het verdiend',
              fieldValue: 5,
            },
            {
              fieldLabel: 'Ik maak me belachelijk als ik niet mee drink',
              fieldValue: 6,
            },
            {
              fieldLabel: 'Ik voel me goed, ik hoef niet nog meer drinken',
              fieldValue: 7,
            },
            {
              fieldLabel: 'Ik wil niet drinken vandaag',
              fieldValue: 8,
            },
            {
              fieldLabel: 'Ze kunnen allemaal de pot op',
              fieldValue: 9,
            },
          ],
        },
        {
          fieldId: 12,
          fieldName: 'consequenses',
          fieldText: 'Gevolgen',
          fieldInfo:
            'Wat was het gevolg van mijn drinken of niet drinken: *Je kan één van de voorbeelden uit de lijst selecteren of zelf iets invullen. Wat je invult wordt daarna in de lijst opgenomen.',
          fieldType: 'SELECT',
          fieldRepeatable: true,
          fieldRepeat: 5,
          fieldValues: [
            {
              fieldLabel: 'Ik bleef heel gespannen',
              fieldValue: 1,
            },
            {
              fieldLabel: 'Ik kreeg ruzie met mijn partner',
              fieldValue: 2,
            },
            {
              fieldLabel: 'Ik stelde uit wat ik van plan was',
              fieldValue: 3,
            },
            {
              fieldLabel: 'Ik voelde me eerst vrolijk, maar daarna niet meer',
              fieldValue: 4,
            },
            {
              fieldLabel: 'Ik was tevreden over mezelf',
              fieldValue: 5,
            },
            {
              fieldLabel: 'Ik werd dronken terwijl ik dat niet wilde',
              fieldValue: 6,
            },
            {
              fieldLabel: 'Ik werd er geïrriteerd of agressief van',
              fieldValue: 7,
            },
            {
              fieldLabel: 'Ik werd er helemaal opgefokt van',
              fieldValue: 8,
            },
            {
              fieldLabel: 'Ik werd er ontspannen van',
              fieldValue: 9,
            },
          ],
        },
        {
          fieldId: 13,
          fieldName: 'satisfaction',
          fieldText: 'Tevredenheid',
          fieldInfo: 'Hoe tevreden ben ik over dit resultaat',
          fieldType: 'RADIO',
          fieldValues: [
            {
              fieldLabel: 'Ontevreden',
              fieldValue: 1,
            },
            {
              fieldLabel: 'Minder tevreden',
              fieldValue: 2,
            },
            {
              fieldLabel: 'Neutraal',
              fieldValue: 3,
            },
            {
              fieldLabel: 'Vrij tevreden',
              fieldValue: 4,
            },
            {
              fieldLabel: 'Heel tevreden',
              fieldValue: 5,
            },
          ],
        },
      ],
    },
  },
  {
    version: '1',
    categoryId: 'Middelenmisbruik',
    name: 'Alcoholdagboek Dagelijks',
    summary: 'Alcoholdagboek dagelijks',
    publishedBy: 1,
    template: {
      fields: [
        {
          fieldId: 1,
          fieldName: 'date',
          fieldText: 'Datum',
          fieldType: 'DATE',
        },
        {
          fieldId: 2,
          fieldName: 'time',
          fieldText: 'Tijd',
          fieldType: 'TIME',
        },
        {
          fieldId: 3,
          fieldName: 'alcohol-use',
          fieldText: 'Had je vandaag craving/zin om te drinken? ',
          fieldType: 'RADIO',
          fieldValues: [
            { fieldLabel: 'Ja', fieldValue: true },
            { fieldLabel: 'Neen', fieldValue: false },
          ],
        },
        {
          fieldId: 4,
          fieldName: 'feelings',
          fieldText: 'Gevoelens',
          fieldInfo:
            'Hoe voelde ik me: *Je kan één van de voorbeelden uit de lijst selecteren of zelf iets invullen. Wat je invult wordt daarna in de lijst opgenomen.',
          fieldType: 'SELECT',
          fieldRepeatable: true,
          fieldRepeat: 5,
          fieldValues: [
            {
              fieldLabel: 'Angstig',
              fieldValue: 1,
            },
            {
              fieldLabel: 'Verdrietig',
              fieldValue: 2,
            },
            {
              fieldLabel: 'Gespannen',
              fieldValue: 3,
            },
            {
              fieldLabel: 'Kwaad',
              fieldValue: 4,
            },
            {
              fieldLabel: 'Moe',
              fieldValue: 5,
            },
            {
              fieldLabel: 'Opgewekt',
              fieldValue: 6,
            },
            {
              fieldLabel: 'Verveeld',
              fieldValue: 7,
            },
            {
              fieldId: 5,
              fieldName: 'expectations',
              fieldText: 'Verwachtingen',
              fieldInfo:
                'Wat dacht of verwachtte ik: *Je kan één van de voorbeelden uit de lijst selecteren of zelf iets invullen. Wat je invult wordt daarna in de lijst opgenomen.',
              fieldType: 'SELECT',
              fieldRepeatable: true,
              fieldRepeat: 5,
              fieldValues: [
                {
                  fieldLabel: 'Dit moet ik vieren',
                  fieldValue: 1,
                },
                {
                  fieldLabel: 'Eéntje kan geen kwaad',
                  fieldValue: 2,
                },
                {
                  fieldLabel: 'Het zal me kalmeren',
                  fieldValue: 3,
                },
                {
                  fieldLabel: 'Ik ben een mislukking',
                  fieldValue: 4,
                },
                {
                  fieldLabel: 'Ik heb het verdiend',
                  fieldValue: 5,
                },
                {
                  fieldLabel: 'Ik maak me belachelijk als ik niet mee drink',
                  fieldValue: 6,
                },
                {
                  fieldLabel: 'Ik voel me goed, ik hoef niet nog meer drinken',
                  fieldValue: 7,
                },
                {
                  fieldLabel: 'Ik wil niet drinken vandaag',
                  fieldValue: 8,
                },
                {
                  fieldLabel: 'Ze kunnen allemaal de pot op',
                  fieldValue: 9,
                },
              ],
            },
            {
              fieldId: 6,
              fieldName: 'consequenses',
              fieldText: 'Gevolgen',
              fieldInfo:
                'Wat was het gevolg van mijn drinken of niet drinken: *Je kan één van de voorbeelden uit de lijst selecteren of zelf iets invullen. Wat je invult wordt daarna in de lijst opgenomen.',
              fieldType: 'SELECT',
              fieldRepeatable: true,
              fieldRepeat: 5,
              fieldValues: [
                {
                  fieldLabel: 'Ik bleef heel gespannen',
                  fieldValue: 1,
                },
                {
                  fieldLabel: 'Ik kreeg ruzie met mijn partner',
                  fieldValue: 2,
                },
                {
                  fieldLabel: 'Ik stelde uit wat ik van plan was',
                  fieldValue: 3,
                },
                {
                  fieldLabel:
                    'Ik voelde me eerst vrolijk, maar daarna niet meer',
                  fieldValue: 4,
                },
                {
                  fieldLabel: 'Ik was tevreden over mezelf',
                  fieldValue: 5,
                },
                {
                  fieldLabel: 'Ik werd dronken terwijl ik dat niet wilde',
                  fieldValue: 6,
                },
                {
                  fieldLabel: 'ik werd er geïrriteerd of agressief van',
                  fieldValue: 7,
                },
                {
                  fieldLabel: 'ik werd er helemaal opgefokt van',
                  fieldValue: 8,
                },
                {
                  fieldLabel: 'ik werd er ontspannen van',
                  fieldValue: 9,
                },
              ],
            },
            {
              fieldId: 7,
              fieldName: 'satisfaction',
              fieldText: 'Tevredenheid',
              fieldInfo:
                'Hoe tevreden ben ik over dit resultaat: * Klik op de slider om een score te bepalen.',
              fieldType: 'RANGE',
              fieldOptions: {
                min: 1,
                max: 5,
                step: 1,
                snaps: true,
                icons: [
                  {
                    slot: 'start',
                    icon: true,
                    value: 'sentiment-very-dissatisfied',
                  },
                  {
                    slot: 'end',
                    icon: true,
                    value: 'sentiment-very-satisfied',
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  },
  {
    version: '1',
    categoryId: 'ACT',
    name: 'Angstendagboek',
    summary: 'Angstendagboek (bij exposure)',
    publishedBy: 1,
    template: {
      fields: [
        {
          fieldId: 1,
          fieldName: 'date',
          fieldText: 'Datum',
          fieldType: 'DATE',
        },
        {
          fieldId: 2,
          fieldName: 'situation',
          fieldText: 'Situatie',
          fieldInfo:
            'Met welke situatie heb je vandaag geoefend om je bloot te stellen aan je angst? ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 3,
          fieldName: 'fear-before',
          fieldText: 'Angst voor oefening',
          fieldInfo:
            'Hoe angstig was je VOOR de oefening? * Klik op de slider om een score te bepalen.',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 0,
            max: 10,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: false,
                value: '0',
              },
              {
                slot: 'end',
                icon: false,
                value: '10',
              },
            ],
          },
        },
        {
          fieldId: 4,
          fieldName: 'fear-during',
          fieldText: 'Angst tijdens de oefening',
          fieldInfo:
            'Hoe angstig was je tijdens de oefening? * Klik op de slider om een score te bepalen.',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 0,
            max: 10,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: false,
                value: '0',
              },
              {
                slot: 'end',
                icon: false,
                value: '10',
              },
            ],
          },
        },
        {
          fieldId: 5,
          fieldName: 'thoughts-during',
          fieldText: 'Gedachten tijdens oefening',
          fieldInfo:
            'Welke gedachten gingen er door in je hoofd tijdens de oefening? ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 6,
          fieldName: 'fearafter',
          fieldText: 'Angst na de oefening',
          fieldInfo:
            'Hoe angstig was je na de oefening? * Klik op de slider om een score te bepalen.',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 0,
            max: 10,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: false,
                value: '0',
              },
              {
                slot: 'end',
                icon: false,
                value: '10',
              },
            ],
          },
        },
        {
          fieldId: 7,
          fieldName: 'exercise-number',
          fieldText: 'Oefeningnummer',
          fieldInfo: 'Voor de hoeveelste keer deed je deze oefening al? ',
          fieldType: 'NUMBER',
        },
        {
          fieldId: 8,
          fieldName: 'selfsatisfaction',
          fieldText: 'Tevredenheid over zelf',
          fieldInfo:
            'Hoe tevreden was ik na de oefening over mijzelf? * Klik op de slider om een score te bepalen.',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 0,
            max: 5,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: true,
                value: 'sentiment-very-dissatisfied',
              },
              {
                slot: 'end',
                icon: true,
                value: 'sentiment-very-satisfied',
              },
            ],
          },
        },
        {
          fieldId: 9,
          fieldName: 'negative-thoughts',
          fieldText: 'Negatieve gedachten',
          fieldInfo: 'Had je negatieve gedachten? Welke waren deze?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 14,
          fieldName: 'helpingthoughts',
          fieldText: 'Helende gedachten',
          fieldInfo:
            'Kan je een helende gedachte formuleren? Daag de negatieve gedachten uit en probeer ze te weerleggen.',
          fieldType: 'TEXT',
        },
        {
          fieldId: 19,
          fieldName: 'thoughts',
          fieldText: 'Wil je nog iets kwijt',
          fieldInfo:
            'Wat heb je geleerd uit deze oefening en wil je hier kwijt? ',
          fieldType: 'TEXT',
        },
      ],
    },
  },
  {
    version: '1',
    categoryId: 'Intermenselijke vaardigheden',
    name: 'BETOVER OOST',
    summary:
      'BETOVER OOST - Wanneer je doel het belangrijkst is in een interactie.',

    publishedBy: 1,
    template: {
      fields: [
        {
          fieldId: 1,
          fieldName: 'date',
          fieldText: 'Datum',
          fieldType: 'DATE',
        },
        {
          fieldId: 2,
          fieldName: 'situation',
          fieldText: 'Situatie',
          fieldInfo: 'Korte situatieschets',
          fieldType: 'TEXT',
        },
        {
          fieldId: 3,
          fieldName: 'goal',
          fieldText: 'Doel',
          fieldInfo: 'DOEL - wat wil ik bereiken? ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 4,
          fieldName: 'relation',
          fieldText: 'Relatie',
          fieldInfo:
            'RELATIE - Hoe wil ikdat de ander zich voelt over mij na de interactie? ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 5,
          fieldName: 'selfrespect',
          fieldText: 'Zelfrespect',
          fieldInfo: 'ZELFRESPECT - Hoe wil ik mij voelen na de interactie?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 6,
          fieldName: 'discribe',
          fieldText: 'BEschrijf',
          fieldInfo:
            'Beschrijf de situatie waarop je reageert. Beperk je tot de feiten. Spreek geen oordeel uit, wees objectief.',
          fieldType: 'TEXT',
        },
        {
          fieldId: 7,
          fieldName: 'show',
          fieldText: 'Toon',
          fieldInfo:
            'Beschrijf hoe je je voelt of hoe je over de situatie denkt. Verwacht niet dat een ander je gedachten kan lezen of je gevoelens kent. Geef kort een reden voor je verzoek of weigering.',
          fieldType: 'TEXT',
        },
        {
          fieldId: 8,
          fieldName: 'selfdefence',
          fieldText: 'Opkomen voor jezelf',
          fieldInfo:
            'Vraag om datgene wat je wil. Zeg duidelijk neen. Vertel niet wat ze zouden moeten doen. Draai er niet omheen.',
          fieldType: 'TEXT',
        },
        {
          fieldId: 9,
          fieldName: 'reinforce',
          fieldText: 'VERsterk',
          fieldInfo:
            'Beloon mensen die positief reageren wanneer je hen iets vraagt, nee zegt, een mening geeft. Soms belangrijk mensen te bekrachtigen voordat ze positief op je reageren door te vertellen welke positieve effecten het zal hebben als jij krijgt wat je wilt of nodig hebt.',
          fieldType: 'TEXT',
        },
        {
          fieldId: 10,
          fieldName: 'vigilant',
          fieldText: 'blijf Oplettend',
          fieldInfo:
            'Hou je aandacht gericht op je doelen in de situatie. Handhaaf je positie. Laat je niet afleiden door een ander onderwerp.',
          fieldType: 'TEXT',
        },
        {
          fieldId: 11,
          fieldName: 'negotiate',
          fieldText: 'Onderhandel',
          fieldInfo:
            'Wees bereid te onderhandelen. Geef of vraag alternatieve oplossingen voor het probleem. Maak het probleem tot een gemeenschappelijk probleem.',
          fieldType: 'TEXT',
        },
        {
          fieldId: 12,
          fieldName: 'trustinself',
          fieldText: 'STraal zelfvertrouwen uit',
          fieldInfo:
            'Spreek met zelfverzekerde stem. Neem een zelfzekere lichaamshouding aan. Ga voor passend oogcontact.',
          fieldType: 'TEXT',
        },
        {
          fieldId: 13,
          fieldName: 'feelingafter',
          fieldText: 'Gevoel nadien',
          fieldInfo: 'Hoe was je gevoel nadien?',
          fieldType: 'TEXT',
        },
      ],
    },
  },
  {
    version: '1',
    categoryId: 'ACT',
    name: 'Dagboek Gedragsactivatie',
    summary: 'Dagboek Gedragsactivatie',

    publishedBy: 1,
    template: {
      fields: [
        {
          fieldId: 1,
          fieldName: 'date',
          fieldText: 'Datum',
          fieldType: 'DATE',
        },
        {
          fieldId: 2,
          fieldName: 'currentmood',
          fieldText: 'Stemming momenteel',
          fieldInfo:
            'Hoe is je stemming op dit moment? * Klik op de slider om een score te bepalen.',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 0,
            max: 10,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: true,
                value: 'sentiment_very_dissatisfied',
              },
              {
                slot: 'end',
                icon: true,
                value: 'sentiment_very_satisfied',
              },
            ],
          },
        },
        {
          fieldId: 3,
          fieldName: 'activity',
          fieldText: 'Activiteit',
          fieldInfo: 'Omschrijf een activiteit die je vandaag hebt gedaan. ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 4,
          fieldName: 'activity-effect',
          fieldText: 'Stemming na activiteit',
          fieldInfo:
            'Wat is het effect van deze activiteit op je stemming? * Klik op de slider om een score te bepalen.',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 1,
            max: 5,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: false,
                value: '1',
              },
              {
                slot: 'end',
                icon: false,
                value: '5',
              },
            ],
          },
        },
        {
          fieldId: 5,
          fieldName: 'feelings-activity',
          fieldText: 'Gevoelens activiteit',
          fieldInfo: 'Omschrijf je gevoel(ens) bij deze activiteit',
          fieldType: 'TEXT',
        },
        {
          fieldId: 20,
          fieldName: 'strength-feeling',
          fieldText: 'Sterkte gevoel',
          fieldInfo:
            'Hoe sterk is dit gevoel? * Klik op de slider om een score te bepalen.',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 1,
            max: 5,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: false,
                value: '1',
              },
              {
                slot: 'end',
                icon: false,
                value: '5',
              },
            ],
          },
        },
        {
          fieldId: 21,
          fieldName: 'pleasure',
          fieldText: 'Activiteit plezier',
          fieldInfo:
            'Hoe aangenaam vond je de activiteit? * Klik op de slider om een score te bepalen.',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 1,
            max: 5,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: true,
                value: 'sentiment_very_dissatisfied',
              },
              {
                slot: 'end',
                icon: true,
                value: 'sentiment_very_satisfied',
              },
            ],
          },
        },
        {
          fieldId: 22,
          fieldName: 'activity-effort',
          fieldText: 'Inspanning activiteit',
          fieldInfo:
            'Hoeveel inspanning kostte de activiteit? * Klik op de slider om een score te bepalen.',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 1,
            max: 5,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: false,
                value: '1',
              },
              {
                slot: 'end',
                icon: false,
                value: '5',
              },
            ],
          },
        },
        {
          fieldId: 23,
          fieldName: 'satisfactionactivity',
          fieldText: 'Tevredenheid activiteit',
          fieldInfo:
            'Hoe tevreden ben ik over de activiteit: * Klik op de slider om een score te bepalen.',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 1,
            max: 5,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: true,
                value: 'sentiment_very_dissatisfied',
              },
              {
                slot: 'end',
                icon: true,
                value: 'sentiment_very_satisfied',
              },
            ],
          },
        },
        {
          fieldId: 24,
          fieldName: 'remember',
          fieldText: 'Onthouden activiteit',
          fieldInfo: 'Wat onthoud je uit deze ervaring ? ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 25,
          fieldName: 'activityfuture',
          fieldText: 'Activiteit in toekomst',
          fieldInfo: 'Wat doe je met deze activiteit in de toekomst ? ',
          fieldType: 'TEXT',
        },
      ],
    },
  },
  {
    version: '1',
    categoryId: 'Pre-Treatment',
    name: 'Dagboekkaart',
    summary: 'Dagboekkaart van ...',

    publishedBy: 1,
    template: {
      fields: [
        {
          fieldId: 1,
          fieldName: 'date',
          fieldText: 'Datum',
          fieldType: 'DATE',
        },
        {
          fieldId: 2,
          fieldName: 'time',
          fieldText: 'Tijd',
          fieldType: 'TIME',
        },
        {
          fieldId: 3,
          fieldName: 'suicidalthoughts',
          fieldText: 'Suïcidegedachten',
          fieldInfo:
            'Suïcidegedachten *Klik op de slider om een score te bepalen.',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 0,
            max: 5,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: false,
                value: '0',
              },
              {
                slot: 'end',
                icon: false,
                value: '5',
              },
            ],
          },
        },
        {
          fieldId: 4,
          fieldName: 'automutilation',
          fieldText: 'Automutilatie',
          fieldInfo:
            'Automututilatie * Klik op de slider om een score te bepalen.',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 0,
            max: 5,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: false,
                value: '0',
              },
              {
                slot: 'end',
                icon: false,
                value: '5',
              },
            ],
          },
        },
        {
          fieldId: 5,
          fieldName: 'dealingmethod',
          fieldText: 'Hoe opgevangen',
          fieldInfo: 'Hoe heb ik dit opgevangen ',
          fieldType: 'RADIO',
          fieldValues: [
            { fieldLabel: 'Constructief', fieldValue: true },
            { fieldLabel: 'Destructief', fieldValue: false },
          ],
        },
        {
          fieldId: 6,
          fieldName: 'acoholuse',
          fieldText: 'Alcoholgebruik',
          fieldInfo: 'Alcohol *Klik op de slider om een score te bepalen.',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 0,
            max: 5,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: false,
                value: '0',
              },
              {
                slot: 'end',
                icon: false,
                value: '5',
              },
            ],
          },
        },
      ],
    },
  },
  {
    version: '1',
    categoryId: 'Eetvaardigheden',
    name: 'Eetdagboek',
    summary: 'Eetdagboek',

    publishedBy: 1,
    template: {
      fields: [
        {
          fieldId: 1,
          fieldName: 'date',
          fieldText: 'Datum',
          fieldType: 'DATE',
        },
        {
          fieldId: 2,
          fieldName: 'time',
          fieldText: 'Tijd',
          fieldType: 'TIME',
        },
        {
          fieldId: 3,
          fieldName: 'where-am-i',
          fieldText: 'Waar ben ik',
          fieldInfo: 'Waar ben ik?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 4,
          fieldName: 'situationdescription',
          fieldText: 'Situatie beschrijving',
          fieldInfo: 'Wat gebeurt er? Beschrijf de situatie. ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 5,
          fieldName: 'thougthsbefore',
          fieldText: 'Wat denk ik vooraf',
          fieldInfo: 'Wat denk ik vooraf?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 6,
          fieldName: 'feelingsbefore',
          fieldText: 'Hoe voel ik me vooraf',
          fieldInfo: 'Hoe voel ik mij vooraf? ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 7,
          fieldName: 'urgetoeat',
          fieldText: 'Mijn neiging om te eten',
          fieldInfo:
            'Mijn neiging om te eten * Klik op de slider om een score te bepalen.',
          fieldType: 'RANGE',
          fieldOptions: {
            min: 0,
            max: 5,
            step: 1,
            snaps: true,
            icons: [
              {
                slot: 'start',
                icon: false,
                value: '0',
              },
              {
                slot: 'end',
                icon: false,
                value: '5',
              },
            ],
          },
        },
        {
          fieldId: 8,
          fieldName: 'did-i-eat',
          fieldText: 'Heb ik iets gegeten',
          fieldInfo: 'Heb ik iets gegeten? ',
          fieldType: 'RADIO',
          fieldValues: [
            { fieldLabel: 'Ja', fieldValue: true },
            { fieldLabel: 'Nee', fieldValue: false },
          ],
        },
        {
          fieldId: 9,
          fieldName: 'compensationfood',
          fieldText: 'Compensation food',
          fieldInfo: 'Compenseerde ik het eten op een andere manier? ',
          fieldType: 'RADIO',
          fieldValues: [
            { fieldLabel: 'Ja (Braken)', fieldValue: true },
            { fieldLabel: 'Nee', fieldValue: false },
          ],
        },
        {
          fieldId: 10,
          fieldName: 'feelingsafter',
          fieldText: 'Hoe voel ik me achteraf',
          fieldInfo: 'Hoe voel ik mij achteraf? ',
          fieldType: 'TEXT',
        },
      ],
    },
  },
  {
    version: '1',
    categoryId: 'Emotieregulatie',
    name: 'Emotiewerkblad',
    summary: 'Emotiewerkblad',

    publishedBy: 1,
    template: {
      fields: [
        {
          fieldId: 1,
          fieldName: 'date',
          fieldText: 'Datum',
          fieldType: 'DATE',
        },
        {
          fieldId: 2,
          fieldName: 'feelings',
          fieldText: 'Gevoelens',
          fieldInfo:
            'NAMEN VAN DE EMOTIES + weergeven intensiteit 0-100 *Je kan één van de voorbeelden uit de lijst selecteren of zelf iets invullen. Wat je invult wordt daarna in de lijst opgenomen.',
          fieldType: 'SELECT',
          fieldRepeatable: true,
          fieldRepeat: 5,
          fieldValues: [
            {
              fieldLabel: 'Blijdschap',
              fieldValue: 1,
            },
            {
              fieldLabel: 'Irritatie',
              fieldValue: 2,
            },
            {
              fieldLabel: 'Kwaadheid',
              fieldValue: 3,
            },
            {
              fieldLabel: 'Schaamte',
              fieldValue: 4,
            },
            {
              fieldLabel: 'Schuld',
              fieldValue: 5,
            },
            {
              fieldLabel: 'Verdriet',
              fieldValue: 6,
            },
            {
              fieldLabel: 'Verwondering',
              fieldValue: 7,
            },
            {
              fieldLabel: 'Vreugde',
              fieldValue: 8,
            },
          ],
        },
        {
          fieldId: 7,
          fieldName: 'origin-emotion',
          fieldText: 'Directe aanleiding emotie',
          fieldInfo:
            'DIRECTE AANLEIDING EMOTIE (wie, wat, waar, wanneer, ...)? Waardoor begon de emotie? ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 8,
          fieldName: 'interpretation-emotion',
          fieldText: 'Interpretatie bij emotie',
          fieldInfo:
            'INTERPRETATIE BIJ DE EMOTIE (Overtuigingen, veronderstellingen, waardering van de situatie?)',
          fieldType: 'TEXT',
        },
        {
          fieldId: 9,
          fieldName: 'body-changes',
          fieldText: 'Lichamelijke veranderingen',
          fieldInfo:
            'LICHAMELIJKE VERANDERINGEN EN WAARNEMINGEN (Wat voel ik in mijn lichaam?) ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 10,
          fieldName: 'body-language',
          fieldText: 'Lichaamstaal',
          fieldInfo:
            'LICHAAMSTAAL ( Hoe zijn mijn gelaatsuitdrukkingen, mijn houding, mijn gebaren, ...?)',
          fieldType: 'TEXT',
        },
        {
          fieldId: 11,
          fieldName: 'action-urges',
          fieldText: 'Drang tot handelen',
          fieldInfo:
            'DRANG TOT HANDELEN (Wat wil ik doen? Wat wil ik zeggen?) ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 12,
          fieldName: 'action-facts',
          fieldText: 'Gezegd / Gedaan?',
          fieldInfo: 'WAT HEB IK GEZEGD OF GEDAAN IN DEZE SITUATIE ? ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 13,
          fieldName: 'after-effects',
          fieldText: 'Nawerking emotie',
          fieldInfo:
            'NAWERKING VAN DE EMOTIE (Welke nawerking heeft de emotie op mijn gemoed, mijn geestesgesteldheid, emoties, gedrag, gedachten, ...) ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 14,
          fieldName: 'function-emotion',
          fieldText: 'Functie van emotie',
          fieldInfo:
            'FUNCTIE VAN DE EMOTIE *Je kan één van de voorbeelden uit de lijst selecteren of zelf iets invullen. Wat je invult wordt daarna in de lijst opgenomen.',
          fieldType: 'SELECT',
          fieldRepeatable: true,
          fieldRepeat: 5,
          fieldValues: [
            {
              fieldLabel: 'Anderen kunnen beïnvloeden',
              fieldValue: 'influence-others',
            },
            {
              fieldLabel: 'Motivatie van ons gedrag',
              fieldValue: 'motivate',
            },
            {
              fieldLabel: 'Rechtstreekse communicatie naar anderen',
              fieldValue: 'communicate',
            },
            {
              fieldLabel: 'Validatie/zelferkenning',
              fieldValue: 'validate',
            },
            {
              fieldLabel: 'Aanzetten tot actie',
              fieldValue: 'urge-to-act',
            },
          ],
        },
      ],
    },
  },
  {
    version: '1',
    categoryId: 'Stresstolerantie',
    name: 'Gedragsanalyse',
    summary: 'Gedragsanalyse',

    publishedBy: 1,
    template: {
      fields: [
        {
          fieldId: 1,
          fieldName: 'date',
          fieldText: 'Datum',
          fieldType: 'DATE',
        },
        {
          fieldId: 2,
          fieldName: 'before-what',
          fieldText: 'Wat is het probleemgedrag',
          fieldType: 'TEXT',
          fieldInfo:
            'Wat is het probleemgedrag dat ik wil analyseren? Wees specifiek, concreet en gedetailleerd. Stel exact vast wat je deed, zei, voelde of dacht. Beschrijf het probleemgedrag als een script voor een film of toneel. KOV kan je hierbij helpen.',
        },
        {
          fieldId: 3,
          fieldName: 'before-when',
          fieldText: 'Wanneer stelde ik het probleemgedrag',
          fieldType: 'TEXT',
        },
        {
          fieldId: 4,
          fieldName: 'before-who',
          fieldText: 'Waar was het? Wie was erbij? Hoelang duurde het?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 5,
          fieldName: 'before-urge',
          fieldText: 'Wanneer voelde je de aandrang?',
          fieldInfo:
            'Wanneer voelde je de aandrang voor het stellen van het probleemgedrag? Wat was de uitlokkende gebeurtenis? Wat triggerde je?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 6,
          fieldName: 'before-decision',
          fieldText: 'Wanneer besloot je het probleemgedrag te stellen?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 7,
          fieldName: 'before-emotion',
          fieldText: 'Wat gebeurde er vlak voor?',
          fieldInfo: 'Gedrag? Gevoel? Gedachten?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 8,
          fieldName: 'before-why-decide',
          fieldText: 'Waarom besloot je het probleemgedrag toch te stellen?',
          fieldInfo: 'Heb je getwijfeld?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 9,
          fieldName: 'before-vulnerability',
          fieldText: 'Welke factoren zorgden voor een verhoogde kwetsbaarheid?',
          fieldType: 'SELECT',
          fieldRepeatable: true,
          fieldRepeat: 5,
          fieldValues: [
            {
              fieldLabel: 'Drugs',
              fieldValue: 'drugs',
            },
            {
              fieldLabel: 'Lichamelijke problemen',
              fieldValue: 'physical-problems',
            },
            {
              fieldLabel: 'Medicatie',
              fieldValue: 'medication',
            },
            {
              fieldLabel: 'Slaap',
              fieldValue: 'sleep',
            },
            {
              fieldLabel: 'Stress',
              fieldValue: 'stress',
            },
            {
              fieldLabel: 'Voeding',
              fieldValue: 'food',
            },
          ],
        },
        {
          fieldId: 10,
          fieldName: 'during-feelings',
          fieldText: 'Wat voelde je?',
          fieldInfo: 'Wat voelde je toen je het probleemgedrag stelde?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 11,
          fieldName: 'during-thoughts',
          fieldText: 'Wat dacht je?',
          fieldInfo: 'Wat dacht je toen je het probleemgedrag stelde?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 12,
          fieldName: 'during-behaviour',
          fieldText: 'Wat deed je precies en waar leidde het toe?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 13,
          fieldName: 'effects-self-short-term',
          fieldText:
            'Wat was het effect van je gedrag voor jezelf op korte termijn?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 14,
          fieldName: 'effects-self-long-term',
          fieldText:
            'Wat was het effect van je gedrag voor jezelf op lange termijn?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 15,
          fieldName: 'effects-others-short-term',
          fieldText:
            'Wat was het effect van je gedrag voor anderen op korte termijn?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 16,
          fieldName: 'effects-others-long-term',
          fieldText:
            'Wat was het effect van je gedrag voor anderen op lange termijn?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 17,
          fieldName: 'during-reaction-others',
          fieldText: 'Hoe reageerden de anderen op je probleemgedrag?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 18,
          fieldName: 'after-why',
          fieldText: 'Wat maakt dat je dit gedrag stelt in deze situatie?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 19,
          fieldName: 'after-gains',
          fieldText: 'Wat levert het je op?',
          fieldInfo: 'Dit is mede wat je gedrag in stand houdt.',
          fieldType: 'TEXT',
        },
        {
          fieldId: 20,
          fieldName: 'after-losses',
          fieldText: 'Wat verlies je erbij?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 21,
          fieldName: 'after-why-prevent',
          fieldText: 'Wat tracht je te voorkomen door dit gedrag te stellen?',
          fieldInfo:
            'Zou er iets anders / erger gebeuren mocht je het niet doen?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 22,
          fieldName: 'lower-vulnerability',
          fieldText: 'Hoe verminder je je kwetsbaarheid in de toekomst?',
          fieldInfo:
            'Kijk naar de vraag bij "Voor het stellen van het probleemgedrag". Beschrijf preventieve aanpak die je zou helpen om de ketting niet te laten starten door de kwetsbaarheid van de ketting te verminderen.',
          fieldType: 'TEXT',
        },
        {
          fieldId: 23,
          fieldName: 'heal-consequences-self',
          fieldText:
            'Hoe kan je de schadelijke gevolgen van je gedrag corrigeren voor jezelf?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 24,
          fieldName: 'heal-consequences-others',
          fieldText:
            'Hoe kan je de schadelijke gevolgen van je gedrag corrigeren voor je omgeving?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 25,
          fieldName: 'wise-mind',
          fieldText:
            'WIJZE GEEST! Waar in de ketting kon je achteraf gezien anders handelen?',
          fieldInfo:
            'Denk aan het moment dat je nog kon kiezen. Heb je aan vaardigheden gedacht? Welke specifieke vaardigheden zou je kunnen gebruiken?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 26,
          fieldName: 'final-thoughts',
          fieldText:
            'Wat zijn je diepste gevoelens en gedachten over dit alles?',
          fieldInfo:
            'Wat houdt je nog bezig over deze gebeurtenis? Schrijf 5 minuten zonder stoppen.',
          fieldType: 'TEXT',
        },
      ],
    },
  },
  {
    version: '1',
    categoryId: 'Intermenselijke vaardigheden',
    name: 'OEWW',
    summary:
      'OEWW - Wanneer zelfrespect het belangrijkste is in de interactie.',

    publishedBy: 1,
    template: {
      fields: [
        {
          fieldId: 1,
          fieldName: 'date',
          fieldText: 'Datum',
          fieldType: 'DATE',
        },
        {
          fieldId: 2,
          fieldName: 'situation',
          fieldText: 'Situatie',
          fieldInfo: 'Korte situatieschets',
          fieldType: 'TEXT',
        },
        {
          fieldId: 3,
          fieldName: 'goal',
          fieldText: 'Doel',
          fieldInfo: 'DOEL - wat wil ik bereiken? ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 4,
          fieldName: 'relation',
          fieldText: 'Relatie',
          fieldInfo:
            'RELATIE - Hoe wil ikdat de ander zich voelt over mij na de interactie? ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 5,
          fieldName: 'selfrespect',
          fieldText: 'Zelfrespect',
          fieldInfo: 'ZELFRESPECT - Hoe wil ik mij voelen na de interactie?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 6,
          fieldName: 'be-honest',
          fieldText: 'wees OPRECHT',
          fieldInfo: 'Ga jezelf niet anders voordoen. Wees authentiek.',
          fieldType: 'TEXT',
        },
        {
          fieldId: 7,
          fieldName: 'no-excuses',
          fieldText: 'geen EXCUSES',
          fieldInfo:
            'Als verontschuldigingen op hun plaats zijn dan is dat zo. Vertoon echter geen overdreven verontschuldigend gedrag. Verontschuldig je niet voor het feit dat jeleeft, een verzoek doet, een mening hebt, ergens mee oneens bent, ...',
          fieldType: 'TEXT',
        },
        {
          fieldId: 8,
          fieldName: 'stick-to-values',
          fieldText: 'houd vast aan WAARDEN',
          fieldInfo:
            'Geef je waarden niet op om een doel te bereiken of omdat iemand je dan leuk zou vinden.',
          fieldType: 'TEXT',
        },
        {
          fieldId: 9,
          fieldName: 'be-truthful',
          fieldText: 'wees WAARHEIDSGETROUW',
          fieldInfo:
            'Lieg niet. Gedraag je niet hulpeloos als je dat niet bent. Overdrijf niet.',
          fieldType: 'TEXT',
        },
        {
          fieldId: 10,
          fieldName: 'after-feelings',
          fieldText: 'Hoe was je gevoel nadien?',
          fieldType: 'TEXT',
        },
      ],
    },
  },
  {
    version: '1',
    categoryId: 'Intermenselijke vaardigheden',
    name: 'VIVO',
    summary: 'VIVO - Wanneer je relatie het belangrijkste is in de interactie',

    publishedBy: 1,
    template: {
      fields: [
        {
          fieldId: 1,
          fieldName: 'date',
          fieldText: 'Datum',
          fieldType: 'DATE',
        },
        {
          fieldId: 2,
          fieldName: 'situation',
          fieldText: 'Situatie',
          fieldInfo: 'Korte situatieschets',
          fieldType: 'TEXT',
        },
        {
          fieldId: 3,
          fieldName: 'goal',
          fieldText: 'Doel',
          fieldInfo: 'DOEL - wat wil ik bereiken? ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 4,
          fieldName: 'relation',
          fieldText: 'Relatie',
          fieldInfo:
            'RELATIE - Hoe wil ikdat de ander zich voelt over mij na de interactie? ',
          fieldType: 'TEXT',
        },
        {
          fieldId: 5,
          fieldName: 'selfrespect',
          fieldText: 'Zelfrespect',
          fieldInfo: 'ZELFRESPECT - Hoe wil ik mij voelen na de interactie?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 6,
          fieldName: 'be-friendly',
          fieldText: 'wees VRIENDELIJK',
          fieldInfo:
            'Wees hoffelijk en bedaard. Vermijd aanvallen - dreigementen - oordelen.',
          fieldType: 'TEXT',
        },
        {
          fieldId: 7,
          fieldName: 'show-interest',
          fieldText: 'toon je INTERESSE',
          fieldInfo:
            'Wees geïnteresseerd in de ander. Luister naar de mening van de ander. Probeer de ander niet in de rede te vallen, om te praten, ...',
          fieldType: 'TEXT',
        },
        {
          fieldId: 8,
          fieldName: 'validate',
          fieldText: 'VALIDEER',
          fieldInfo:
            'Erken de gevoelens van de ander, zijn of haar behoeften, moeilijkheden en mening over de situatie. Laat duidelijk horen dat je NIET oordeelt.',
          fieldType: 'TEXT',
        },
        {
          fieldId: 9,
          fieldName: 'act-relaxed',
          fieldText: 'gedraag je ONTSPANNEN',
          fieldInfo:
            'Probeer opgewekt te zijn. Gebruik humor. Glimlach (aangepast aan de situatie). Stel de ander op hun gemak. Wees diplomatisch.',
          fieldType: 'TEXT',
        },
        {
          fieldId: 10,
          fieldName: 'mindful-listening',
          fieldType: 'RADIO',
          fieldText: 'Heb je mindful geluisterd?',
          fieldValues: [
            {
              fieldLabel: 'Ja',
              fieldValue: true,
            },
            {
              fieldLabel: 'Neen',
              fieldValue: false,
            },
          ],
        },
        {
          fieldId: 11,
          fieldName: 'after-feelings',
          fieldText: 'Hoe was je gevoel nadien?',
          fieldType: 'TEXT',
        },
      ],
    },
  },
  {
    version: '1',
    categoryId: 'Emotieregulatie',
    name: 'Tegengesteld handelen',
    summary: 'Tegengesteld handelen',

    publishedBy: 1,
    template: {
      fields: [
        {
          fieldId: 1,
          fieldName: 'date',
          fieldText: 'Datum',
          fieldType: 'DATE',
        },
        {
          fieldId: 2,
          fieldName: 'direct-cause',
          fieldText: 'Directe aanleiding',
          fieldType: 'TEXT',
        },
        {
          fieldId: 3,
          fieldName: 'emotion-name',
          fieldText: 'Naam van de emotie',
          fieldType: 'SELECT',
          fieldValues: [
            {
              fieldLabel: 'Blijdschap',
              fieldValue: 'happy',
            },
            {
              fieldLabel: 'Irritatie',
              fieldValue: 'irritation',
            },
            {
              fieldLabel: 'Kwaadheid',
              fieldValue: 'angry',
            },
            {
              fieldLabel: 'Schaamte',
              fieldValue: 'shame',
            },
            {
              fieldLabel: 'Schuld',
              fieldValue: 'guilt',
            },
            {
              fieldLabel: 'Verdriet',
              fieldValue: 'sad',
            },
            {
              fieldLabel: 'Verwondering',
              fieldValue: 'surprised',
            },
            {
              fieldLabel: 'Vreugde',
              fieldValue: 'joyful',
            },
          ],
        },
        {
          fieldId: 4,
          fieldName: 'emotion-intensity',
          fieldText: 'Intensiteit van de emotie',
          fieldType: 'NUMBER',
        },
        {
          fieldId: 5,
          fieldName: 'condition-want-change',
          fieldText: 'Voorwaarde 1 - Ik wil zelf de emotie veranderen',
          fieldType: 'RADIO',
          fieldValues: [
            {
              fieldLabel: 'Ja',
              fieldValue: true,
            },
            {
              fieldLabel: 'Nee',
              fieldValue: false,
            },
          ],
        },
        {
          fieldId: 6,
          fieldName: 'condition-change-100',
          fieldText: 'Voorwaarde 2 - Ik wil het voor de volle 100% veranderen?',
          fieldType: 'RADIO',
          fieldValues: [
            {
              fieldLabel: 'Ja',
              fieldValue: true,
            },
            {
              fieldLabel: 'Nee',
              fieldValue: false,
            },
          ],
        },
        {
          fieldId: 7,
          fieldName: 'condition-emotion-irrelevant',
          fieldText:
            'Voorwaarde 3 - De emotie is niet relevant, terecht, gerechtvaardigd in deze situatie?',
          fieldType: 'RADIO',
          fieldValues: [
            {
              fieldLabel: 'Ja',
              fieldValue: true,
            },
            {
              fieldLabel: 'Nee',
              fieldValue: false,
            },
          ],
        },
        {
          fieldId: 8,
          fieldName: 'urge-act',
          fieldText: 'Wat ben ik geneigd te doen?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 9,
          fieldName: 'emotion-body-feel',
          fieldText: 'Wat doet de emotie fysiek met me?',
          fieldInfo: 'Wat voel ik in mijn lichaam?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 10,
          fieldName: 'emotion-face',
          fieldText:
            'Wat is de invloed van de emotie op mijn gelaatsuitdrukking?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 11,
          fieldName: 'emotion-body',
          fieldText: 'Wat is de invloed van de emotie op mijn lichaamshouding?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 12,
          fieldName: 'emotion-thoughts',
          fieldText:
            'Wat is de invloed van deze emotie op mijn denken en gedrag?',
          fieldType: 'TEXT',
        },
        {
          fieldId: 13,
          fieldName: 'change-body',
          fieldText: 'Wijzigingen in mijn lichaamshouding',
          fieldType: 'TEXT',
        },
        {
          fieldId: 14,
          fieldName: 'change-face',
          fieldText: 'Wijzigingen in mijn gelaatsuitdrukking',
          fieldType: 'TEXT',
        },
        {
          fieldId: 15,
          fieldName: 'change-behavior',
          fieldText: 'Dit is het tegengesteld gedrag dat ik stel',
          fieldType: 'TEXT',
        },
        {
          fieldId: 16,
          fieldName: 'after-intensity',
          fieldText: 'Hoe intens was de emotie achteraf nog?',
          fieldType: 'NUMBER',
        },
        {
          fieldId: 17,
          fieldName: 'skill-effective',
          fieldText: 'Was de vaardigheid effectief?',
          fieldType: 'RADIO',
          fieldValues: [
            {
              fieldLabel: 'Ja',
              fieldValue: true,
            },
            {
              fieldLabel: 'Ja',
              fieldValue: false,
            },
          ],
        },
      ],
    },
  },
];
