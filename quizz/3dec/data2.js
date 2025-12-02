const QUIZZ_DATA = {
    teams: ["A","B","C"],
    shuffle_answers: false,
    question_limit: 20,
    questions: [
        // QUESTIONS JULIE         
  
            {
                text: "Pfiou...dur dur la vie d'intermittent... surtout en ce moment ! Mais que vois-tu ? Un collectif qui parle des droits dans le cinéma d’animation ! Ah mais je veux tout savoir sur ce collectif mais attend comment il s'appelle déjà :",
                correction: "",
                is_demo:true,
                answers: [
                    {
                        text: " Les feux de joies de l'animation",
                        valid: false
                    },
                    {
                        text: " Les stylets de la colère",
                        valid: false
                    },
                    {
                        text: "Les étincelles",
                        valid: true
                    }
                ]
            },
            {
            text: "Tu travailles sur un projet de film depuis 3 ans, et une prod te dit : ' ah trop bien ! On veut signer! Ci-joint le contrat d'auteur', mais bon toi t'y connais rien donc quel est le nom de la société des auteur-ices pour la relecture de contrat :  ",
            correction: "Réponse : La SACD !",
            answers: [
                {
                    text: "LA SDDC (La société des directeurs et des directrices du cinéma)",
                    valid: false
                },
                {
                    text: "LA SACD (la société des auteurs du cinéma d’animation)",
                    valid: true
                },
                {
                    text: "Les ACDC  (Les auteurs du cinéma et des directeurs du cinéma)",
                    valid: false
                },
                {
                    text: "T'es tellement dans la joie, tu lis en diagonale et tu signes (euh...ça existe pas ce genre de société)",
                    valid: false
                }
            ]
        },
            {
            text: "Quel est le film le plus chère du cinéma d'animation français ?  ",
            correction: " Lady bug, avec plus de 80 millions d'euros dépensé d’après Allociné",
            answers: [
                {
                    text: " uh facile... ça doit être un film fait à la main sur banc titre euh... La traversée de Florence Miailhe ",
                    valid: false
                },
                {
                    text: "Pff chais pas... Genre Arco, avec les américains ?",
                    valid: false
                },
                {
                    text: "Lol, attends, Lady bug le long métrage ? ",
                    valid: true
                },
            ]
        },      
        {
            text: "Quels sont les syndicats français de l'animation (les 3 plus representatifs) ? ",
            correction: " SNTPCT, LA SPIAC et La CNT",
            answers: [
                {
                    text: "Le SNTPCT, LA SPIAC CGT ET LA CNT",
                    valid: true
                },
                {
                    text: " La SPTNFT, LA SMACK CGT, ET LE CTT",
                    valid: false
                },
                {
                    text: "NTPSCT, LA SPIOC CGT et LE CIPT",
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
                    text: "5 %",
                    valid: false
                },
                {
                    text: "bah les syndicats c'est pour les salariés... Donc personne. 0%",
                    valid: false
                },
                {
                    text: "80 %",
                    valid: true
                }
            ]
        },

        {
            text: "En France combien de personnes intermittentes sont syndiqués (environs) ?",
            correction: " Entre 5-10 pourcent, eh oui.",
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
            text: "Quelle est le minima du salaire jour le plus bas dans les métiers du cinéma d’animation tout confondu selon la convention collective de 2019 ?",
            correction: "87,05 euros/jour ! ",
            answers: [
                {
                    text: "87,05 euros/jour (pff ça c'était en 2004)",
                    valid: true
                },
                {
                    text: "105,60 euros/jour (ah mais oui ça a été renégocié)",
                    valid: false
                },
                {
                    text: "117,56 euros/jour (ah voilà je pense avoir entendu quelqu’un avoir été payé minimum ça) ",
                    valid: false
                }
            ]
        },
        {
            text: "Dans l'animation française (série et long métrage), quels sont les types de personnages les plus représentés comme personnage principaux ? (Dans l’ordre décroissant)",
            correction: "Réponse 1, (C'était la 1, eh oui mes aïeuxl-es : Les personnages blancs (60%), Les objets (20%) et enfin les animaux (15%), les personnages afro descendant (en dessous des 4 pourcents, personnages asiatiques, arabes, ou autres (en dessous des 1 pour cent) d’après les chiffres des Intervalles.",
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
            text: "Quelle est l’association qui a permis de mettre en place des obligations de préventions sur les VMSS (Violences Morales  sexistes et sexuelles) au sein des productions (obligation de faire une formation sur les VSS pour toutes les producteur-ices françaises)?",
            correction: " Le collectif « 50/50 », eh oui, depuis le 1 er janvier 2025, les productions ont l’obligation de passer une formation sur les VSS pour pouvoir demander ensuite n’importe quelle aide du CNC.)",
            answers: [
                {
                    text: "L’ association « Egalité et diversité »",
                    valid: false
                },
                {
                    text: " Le collectif « 50/50 » ",
                    valid: true
                },
                {
                    text: "ça n’existe pas",
                    valid: false
                }
            ]
        },        
        {
            text: "En 2025, un collectif s’est créé sur Valence lors d’une rupture de contrat prématuré d’un studio qui a mis au carreau 76 salarié-es, quel est le nom du collectif  ",
            correction: "  La réponse est la 2/ La Barbe ! Iels ont manifesté durant le festival d’Annecy pour dénoncer la précarité de l’emploi dans l’animation et l’abus des studios dans les ruptures de contrats.)",
            answers: [
                {
                    text: " La Claque",
                    valid: false
                },
                {
                    text: "La Barbe ",
                    valid: true
                },
                {
                    text: " Stop anim !",
                    valid: false
                }
            ]
        }
    ]
}