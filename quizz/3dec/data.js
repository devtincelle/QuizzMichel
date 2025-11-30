const QUIZZ_DATA = {
    teams: ["A","B","C"],
    shuffle_answers: false,
    question_limit: 3,
    questions: [
        // QUESTIONS JULIE         
        {
            text: "Quel est le film le plus chère du cinéma d'animation français ?  ",
            correction: "Bient que la pratique du forfait soit très répendue, notament en storyboard, elle reste totalement illégale",
            answers: [
                {
                    text: "Lol, attends, Lady bug le long métrage ? ",
                    valid: true
                },
                {
                    text: "Puh facile... ça doit être un film fait à la main sur banc titre euh... La traversée de Florence Milhae",
                    valid: false
                },
                {
                    text: "Pff chais pas... Genre Arco, avec les américains ?",
                    valid: false
                }
            ]
        },
        {
            text: "Quels sont les noms des principaux syndicats de prod en France ? ",
            correction: "Eh oui c’était UPC, APU, SPI et Animfrance",
            answers: [
                {
                    text: "UPC, API, LA SPI et AnimFrance",
                    valid: true
                },
                {
                    text: " Anime land, Spirou et Astérix et Tintin",
                    valid: false
                },
                {
                    text: "Bah ils sont pas syndiqués les prod... n'importe quoi...",
                    valid: false
                }
            ]
        },
        {
            text: "Sur l'ensemble des producteur-ices en France, combien sont syndiqués ? (en pourcentage)",
            correction: "80 % ! la grande majorité des producteurs croient aux vertues du syndicalisme (partonal) ",
            answers: [
                {
                    text: "80 %",
                    valid: true
                },
                {
                    text: "5 %",
                    valid: false
                },
                {
                    text: "bah les syndicats c'est pour les salariés... Donc personne. 0%",
                    valid: false
                }
            ]
        },
        {
            text: "Tu travailles sur un projet de film depuis 3 ans, et une prod te dit : ' ah trop bien ! On veut signer! Ci-joint le contrat d'auteur', mais bon toi t'y connais rien donc quel est le nom de la société des auteur-ices pour la relecture de contrat :  ",
            correction: "Réponse : La SACD !",
            answers: [
                {
                    text: "LA SACD (la société des auteurs du cinéma d’animation)",
                    valid: true
                },
                {
                    text: "Les ACDC  (Les auteurs du cinéma et des directeurs du cinéma)",
                    valid: false
                },
                {
                    text: "LA SDDC (La société des directeurs et des directrices du cinéma)",
                    valid: false
                },
                {
                    text: "T'es tellement dans la joie, tu lis en diagonale et tu signes (euh...ça existe pas ce genre de société)",
                    valid: false
                }
            ]
        },
        {
            text: "En France combien de personnes intermittentes sont syndiqués (environs) ?",
            correction: "Réponse : La SACD !",
            answers: [
                {
                    text: "Entre 5-10 %",
                    valid: true
                },
                {
                    text: "100 % bien joué les intermittents ! ",
                    valid: false
                },
                {
                    text: "Euh 50 % ? pas moi en tout cas",
                    valid: false
                }
            ]
        },
        {
            text: "Facile.... Quand est été créee la convention collective ?",
            correction: "2004 ! Eh oui, la convention collective a été Le 6 juillet 2004 etc avec en fond musical Amel Bent!",
            answers: [
                {
                    text: "2004 l’année où Amel Bent sort «Ma philosophie»",
                    valid: true
                },
                {
                    text: "1956, la naissance de Claire Chazal",
                    valid: false
                },
                {
                    text: "2020, on est en guerre avec le covid",
                    valid: false
                },
                {
                    text: "1789, pendant le jeu de «Pomme»",
                    valid: false
                }
            ]
        },
        {
            text: "Dans l'animation française (série et long métrage), quels sont les types de personnages les plus représentés comme personnage principaux ? (Dans l’ordre croissant)",
            correction: "(C'était la 1, eh oui mes aïeules : Les personnages blancs (60%), Les objets (20%) et enfin les animaux (15%), les personnages afro descendant (en dessous des 4 pourcents, personnages asiatiques, arabes, ou autres (en dessous des 1 pourcent) d’après les chiffres des Intervalles.",
            answers: [
                {
                    text: "Les personnages blancs, Les animaux et les objets",
                    valid: true
                },
                {
                    text: "Les personnages blancs, puis les personnes afro descendantes puis les objets",
                    valid: false
                },
                {
                    text: "Bah tout est à égalité. L'animation française, c'est pas raciste.",
                    valid: false
                },
                {
                    text: "1789, pendant le jeu de «Pomme»",
                    valid: false
                }
            ]
        },
        {
            text: "En France combien de personnes intermittentes sont syndiqués (environs) ?",
            correction: "Réponse : La SACD!",
            answers: [
                {
                    text: "Entre 5-10 %",
                    valid: true
                },
                {
                    text: "100 % bien joué les intermittents ! ",
                    valid: false
                },
                {
                    text: "Euh 50 % ? pas moi en tout cas",
                    valid: false
                }
            ]
        }
    ]
}