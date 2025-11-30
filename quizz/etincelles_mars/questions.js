const QUESTIONS = {

    questions: [
        {
            text: "les élections TPE ont lieu tout les ...",
            correction: "Les elections TPE n'ont lieu que tous les quatres ans, les dernières étaient en 2020 !",
            answers: [
                {
                    text: "quatre ans",
                    valid: true
                },
                {
                    text: "deux ans",
                    valid: false
                }, {
                    text: "ans",
                    valid: false
                },
            ]
        },
        {
            text: "Le film 'Blanche-Neige et les Sept Nains' de Disney est sorti en ",
            correction: "",
            answers: [
                {
                    text: "1937",
                    valid: true
                },
                {
                    text: "1947",
                    valid: false
                }, {
                    text: "1945",
                    valid: false
                },
            ]
        },
        {
            text: "En 2018 les employés du studio Aardman ont été",
            correction: "",
            answers: [
                {
                    text: "Promus comme actionnaires du studio",
                    valid: true
                },
                {
                    text: "Augmentés de 50%",
                    valid: false
                }, {
                    text: "Au chomâge technique pour cause de rupture d'approvisionnement en plasticine",
                    valid: false
                },
            ]
        },
        {
            text: "Le personnage de Betty Boop a été crée en 1930 par le studio ...",
            correction: "",
            answers: [
                {
                    text: "Fleischer Studio",
                    valid: true
                },
                {
                    text: "Warner Bros",
                    valid: false
                }, {
                    text: "Disney",
                    valid: false
                }
            ]
        },
        {
            text: "En 1964, qui était secrétaire en chef du syndicat des travailleurs au studio japonais 'Toei' ? ",
            correction: "Quand des troubles syndicaux éclatent en 1964 au sein du studio, Miyazaki prend la tête des manifestants et devient secrétaire en chef du syndicat des travailleurs",
            answers: [
                {
                    text: "Hayao Miyazaki",
                    valid: true
                },
                {
                    text: "Yasuo Ōtsuka",
                    valid: false
                }, {
                    text: "Isao Takahata",
                    valid: false
                }
            ]
        },
        {
            text: "En animation japonaise le terme Genga désigne ",
            correction: "",
            answers: [
                {
                    text: "Une pause clef clean",
                    valid: true
                },
                {
                    text: "Une pause de breakdown",
                    valid: false
                }, {
                    text: "Un layout decor",
                    valid: false
                }
            ]
        },
        {
            text: "La couleur complémentaire du vert est le ",
            correction: "",
            answers: [
                {
                    text: "Violet",
                    valid: true
                },
                {
                    text: "Rouge",
                    valid: false
                }, {
                    text: "Jaune",
                    valid: false
                },
            ]
        },
        {
            text: "Qui a réalisé le court métrage 'L'Homme qui plantait des arbres' sorti en 1987 ? ",
            correction: "",
            answers: [
                {
                    text: "Frédéric Back",
                    valid: true
                },
                {
                    text: "Yuri Norstein",
                    valid: false
                }, {
                    text: "Paul grimaud",
                    valid: false
                },
            ]
        },
        {
            text: "Qui a réalisé le film 'Ghost in the shell' sortie en 1995 ? ",
            correction: "",
            answers: [
                {
                    text: "Mamoru Oshii ",
                    valid: true
                },
                {
                    text: "Satoshi Kon",
                    valid: false
                }, {
                    text: "Hiroyuki Okiura",
                    valid: false
                },
            ]
        },
        {
            text: "Qui a réalisé le film 'Tokyo Godfather' sortie en 2003 ? ",
            correction: "",
            answers: [
                {
                    text: "Satoshi Kon",
                    valid: true
                },
                {
                    text: "Mamoru Oshii ",
                    valid: false
                }, {
                    text: "Hiroyuki Okiura",
                    valid: false
                },
            ]
        },
        {
            text: "Qui a réalisé le film 'Mind Game' sortie en 2004 ? ",
            correction: "",
            answers: [
                {
                    text: "Masaaki Yuasa",
                    valid: true
                },
                {
                    text: "Mamoru Oshii ",
                    valid: false
                }, {
                    text: "Satoshi Kon",
                    valid: false
                },
            ]
        },
        {
            text: "Dans les simpsons comment s'appelle le patron d'homer ? ",
            correction: "",
            answers: [
                {
                    text: "Charles Montgomery Burns",
                    valid: true
                },
                {
                    text: "Edouard Wiston Burns ",
                    valid: false
                }, {
                    text: "Larry Burns ",
                    valid: false
                },
            ]
        },
        {
            text: "Dans les tortues ninja , Raphaelo a pour arme ",
            correction: "",
            answers: [
                {
                    text: "Deux saïs",
                    valid: true
                },
                {
                    text: "Un katana",
                    valid: false
                }, {
                    text: "Un baton",
                    valid: false
                },
            ]
        },
        {
            text: "Le theme du générique des zinzins de l'espace a été composée par",
            correction: "",
            answers: [
                {
                    text: "Iggy Pop",
                    valid: true
                },
                {
                    text: "Dany Elfman",
                    valid: false
                }, {
                    text: "Elton Jhon",
                    valid: false
                },
            ]
        },
        {
            text: "Le syndicat 'The Animation Guild' aux etats unis a été crée en",
            correction: "",
            answers: [
                {
                    text: "1952",
                    valid: true
                },
                {
                    text: "1947",
                    valid: false
                }, {
                    text: "1982",
                    valid: false
                },
            ]
        },
        {
            text: "Où se trouvait le mythique studio d'animation Disney en France ? ",
            correction: "",
            answers: [
                {
                    text: "à Monteuil",
                    valid: true
                },
                {
                    text: "à Angoulême",
                    valid: false
                }, {
                    text: "dans la scene Saint denis",
                    valid: false
                },
            ]
        },
        {
            text: "Mon studio me propose un avenant qui ecourte mon contrat , je suis dans l'obligation de le signer ",
            correction: "Le salarié n'a aucune obligation légale de signer un avenant",
            answers: [
                {
                    text: "à Monteuil",
                    valid: true
                },
                {
                    text: "à Angoulême",
                    valid: false
                }, {
                    text: "dans la scene Saint denis",
                    valid: false
                },
            ]
        },
        {
            text: "Lors d'un entretien d'embauche, on me dit que, compte tenu de ma grossesse, on ne pourra pas m'embaucher sur la production. Est ce lègal ? ",
            correction: "Totalement illégal ! cela constitu une discrimination grave à l'embauche",
            answers: [
                {
                    text: "Totalement illégal",
                    valid: true
                },
                {
                    text: "Malheursement légal",
                    valid: false
                }, {
                    text: "Légal si la date de l'accouchement intervient après la prod",
                    valid: false
                },
            ]
        },
        {
            text: " ",
            correction: "",
            answers: [
                {
                    text: "Monteuil",
                    valid: true
                },
                {
                    text: "Angoulême",
                    valid: false
                }, {
                    text: "Saint Denis",
                    valid: false
                },
            ]
        },
        {
            text: "Pour pouvoir voter aux elections TPE en 2024 il faut ...",
            correction: "Pour pouvoir voter aux elections TPE en 2024 il suffit d'avoir travaillé dans une TPE en décembre 2023",
            answers: [
                {
                    text: "avoir travaillé dans une TPE en décembre 2023",
                    valid: true
                },
                {
                    text: "s'être inscrit sur les listes electorales TPE",
                    valid: false
                }, {
                    text: "faire parti d'un syndicat",
                    valid: false
                },
            ]
        },
        {
            text: "Tous les studios d'animation doivent respecter La convention collective ...",
            correction: "Une convention collective est dite contraignante, elle doit être appliquée par toutes les parties signataires",
            answers: [
                {
                    text: "vrai ",
                    valid: true
                },
                {
                    text: "faux",
                    valid: false
                }
            ]
        },
        {
            text: "L'article 7 de la convetion concerne ",
            correction: "Titre : Exercice du droit syndical et liberté d'opinion",
            answers: [
                {
                    text: "l'exercice du droit syndical",
                    valid: true
                },
                {
                    text: "Les congés payés",
                    valid: false
                }, {
                    text: "Les congés maladie",
                    valid: false
                },
            ]
        },
        {
            text: "En 2022 le nombre de salairé du secteur était de",
            correction: "En 2022, le secteur franchit pour la première fois la barre symbolique des 10 000 salariés (10 172)",
            answers: [
                {
                    text: "10 172",
                    valid: true
                },
                {
                    text: "8 523",
                    valid: false
                }, {
                    text: "21 052",
                    valid: false
                },
            ]
        },
        {
            text: "Le SPIAC CGT , Le SNTPCT et la CNT sont des syndicats qui représentent",
            correction: "Le SPIAC CGT , Le SNTPCT et la CNT sont des syndicats de salariés ",
            answers: [
                {
                    text: "des salariés",
                    valid: true
                },
                {
                    text: "des employeurs",
                    valid: false
                }
            ]
        },
        {
            text: "Il est légal de recevoir un salaire brut en dessous de la convetion collective",
            correction: "On ne peut payer un salarié du cinéma d'animation en dessous du salaire minima lié à son poste",
            answers: [
                {
                    text: "faux",
                    valid: true
                },
                {
                    text: "vrai",
                    valid: false
                }
            ]
        },
        {
            text: "AnimFrance est un syndicat qui représente",
            correction: "AnimFrance est un syndicat de producteurs , à l'instar du SPI ",
            answers: [
                {
                    text: "des salariés ",
                    valid: false
                },
                {
                    text: "des employeurs",
                    valid: true
                }
            ]
        },
        {
            text: "Quel est l'IDCC de la Convention collective de la production de films d'animation ?",
            correction: "2412",
            answers: [
                {
                    text: "2412",
                    valid: true
                },
                {
                    text: "2411",
                    valid: false
                },
                {
                    text: " 2410",
                    valid: false
                }
            ]
        },
        {
            text: "La convention collective impose-t-elle une grille salariale minimum pour chaque catégorie de poste ?",
            correction: "Pour toutes les catégories ! ",
            answers: [
                {
                    text: "Oui, pour toutes les catégories",
                    valid: true
                },
                {
                    text: "Non, uniquement pour les postes de création",
                    valid: false
                },
                {
                    text: "Non, uniquement pour les postes techniques",
                    valid: false
                }
            ]
        },
        {
            text: "La convention collective s'applique ...",
            correction: "La convention collective s'applique à tout le territoire Français ,France métropolitaine et France d'outre-mer ",
            answers: [
                {
                    text: "À tout le territoire français",
                    valid: true
                },
                {
                    text: "À l'Union européenne uniquement",
                    valid: false
                },
                {
                    text: "À la France métropolitaine",
                    valid: false
                }
            ]
        },
        {
            text: "L'employeur, qui ne compte pas proposer de nouveau contrat à un salarié en CDDU, doit avertir le salarié de sa volonté sous ...",
            correction: "Selon l'article 18 de la Convetion, l'employeur doit avertir le salarié de sa volonté sous 1 mois de préavis",
            answers: [
                {
                    text: "1 mois de préavis",
                    valid: true
                },
                {
                    text: "3 mois de préavis",
                    valid: false
                },
                {
                    text: "2 mois de préavis",
                    valid: false
                }
            ]
        },
        {
            text: "Si l'employeur compte modifier un contrat en cour il doit obligatoirement ...",
            correction: "On ne peux modifier un contrat signé sans un avenant, que le salarié peut d'ailleurs refuser... ",
            answers: [
                {
                    text: "Proposer au salarié de signer un avenant",
                    valid: true
                },
                {
                    text: "Trouver un accord à l'amiable avec le salarié",
                    valid: false
                },
                {
                    text: "Proposer au salarié un nouveau contrat",
                    valid: false
                }
            ]
        },
        {
            text: "Selon la convention , proposer à un salarié un contrat 'au forfait' est ",
            correction: "Bient que la pratique du forfait soit très répendue, notament en storyboard, elle reste totalement illégale",
            answers: [
                {
                    text: "Illégal",
                    valid: true
                },
                {
                    text: "Légal",
                    valid: false
                }
            ]
        },
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
            text: "Selon la convention , proposer à un salarié un contrat 'au forfait' est ",
            correction: "Bient que la pratique du forfait soit très répendue, notament en storyboard, elle reste totalement illégale",
            answers: [
                {
                    text: "Illégal",
                    valid: true
                },
                {
                    text: "Légal",
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
        },
    ]
}