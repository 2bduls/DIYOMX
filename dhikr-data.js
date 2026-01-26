/*
 * Dhikr Data - All dhikr texts and protocols
 * Extracted from Android app ProtocolTextManager.kt and TasbihTextManager.kt
 * Supports Arabic, English, and French translations
 */

// Dhikr text structure: { text, name, benefit, translations: { en, fr } }
const dhikrTexts = {
    // Morning Dhikr (M001-M0012)
    "M001": {
        text: "أَصْـبَحْنا وَأَصْـبَحَ المُـلْكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذا اليوم وَخَـيرَ ما بَعْـدَه ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذا اليوم وَشَرِّ ما بَعْـدَه، رَبِّ أَعـوذُبِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْرٌ",
        name: "اذكر الصباح",
        benefit: "دعاء النبي صلى الله عليه وسلم في الصباح",
        translations: {
            en: {
                text: "We have reached the morning and the dominion belongs to Allah, and all praise is for Allah. There is no god but Allah, alone, without partner. To Him belongs sovereignty and to Him belongs praise, and He is over all things competent. My Lord, I ask You for the good of this day and the good of what is after it, and I seek refuge in You from the evil of this day and the evil of what is after it. My Lord, I seek refuge in You from laziness and the evil of old age. My Lord, I seek refuge in You from the punishment of Hell and the punishment of the grave.",
                name: "Morning Supplication",
                benefit: "Supplication of the Prophet (peace be upon him) in the morning"
            },
            fr: {
                text: "Nous avons atteint le matin et la souveraineté appartient à Allah, et toute louange est à Allah. Il n'y a de dieu qu'Allah, seul, sans associé. À Lui appartient la souveraineté et à Lui appartient la louange, et Il est sur toute chose capable. Mon Seigneur, je Te demande le bien de ce jour et le bien de ce qui vient après, et je cherche refuge auprès de Toi contre le mal de ce jour et le mal de ce qui vient après. Mon Seigneur, je cherche refuge auprès de Toi contre la paresse et le mal de la vieillesse. Mon Seigneur, je cherche refuge auprès de Toi contre le châtiment de l'Enfer et le châtiment de la tombe.",
                name: "Supplication du matin",
                benefit: "Supplication du Prophète (paix sur lui) le matin"
            }
        }
    },
    "M002": {
        text: "اللّهـمَّ أَنْتَ رَبِّـي لا إلهَ إلاّ أَنْتَ ، خَلَقْتَنـي وَأَنا عَبْـدُك ، وَأَنا عَلـى عَهْـدِكَ وَوَعْـدِكَ ما اسْتَـطَعْـت ، أَعـوذُبِكَ مِنْ شَـرِّ ما صَنَـعْت ، أَبـوءُ لَـكَ بِنِعْـمَتِـكَ عَلَـيَّ وَأَبـوءُ بِذَنْـبي فَاغْفـِرْ لي فَإِنَّـهُ لا يَغْـفِرُ الذُّنـوبَ إِلاّ أَنْتٌَ",
        name: "اذكر الصباح والمساء",
        benefit: "من قالها موقنا بها حين يمسى ومات من ليلته دخل الجنة وكذلك حين يصبح",
        translations: {
            en: {
                text: "O Allah, You are my Lord, there is no god but You. You created me and I am Your servant, and I am faithful to my covenant and my promise to You as much as I can. I seek refuge in You from the evil of what I have done. I acknowledge Your favor upon me and I acknowledge my sin, so forgive me, for none forgives sins except You.",
                name: "Morning and Evening Supplication",
                benefit: "Whoever says it with certainty in the evening and dies that night will enter Paradise, and likewise if he says it in the morning"
            },
            fr: {
                text: "Ô Allah, Tu es mon Seigneur, il n'y a de dieu que Toi. Tu m'as créé et je suis Ton serviteur, et je suis fidèle à mon alliance et à ma promesse envers Toi autant que je peux. Je cherche refuge auprès de Toi contre le mal de ce que j'ai fait. J'avoue Ta faveur envers moi et j'avoue mon péché, alors pardonne-moi, car nul ne pardonne les péchés sauf Toi.",
                name: "Supplication du matin et du soir",
                benefit: "Celui qui le dit avec certitude le soir et meurt cette nuit entrera au Paradis, et de même s'il le dit le matin"
            }
        }
    },
    "M003": {
        text: "اللّهُـمَّ إِنِّـي أَصْبَـحْتُ أُشْـهِدُك ، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك ، وَمَلَائِكَتَكَ ، وَجَمـيعَ خَلْـقِك ، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك ، وَأَنَّ ُ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك",
        name: "اذكر الصباح والمساء",
        benefit: "من قالها أعتقه الله من النار",
        translations: {
            en: {
                text: "O Allah, I have reached the morning and I bear witness to You, and I bear witness to the bearers of Your Throne, Your angels, and all Your creation, that You are Allah, there is no god but You, alone, without partner, and that Muhammad is Your servant and Your Messenger.",
                name: "Morning and Evening Supplication",
                benefit: "Whoever says it, Allah will free him from the Fire"
            },
            fr: {
                text: "Ô Allah, j'ai atteint le matin et je témoigne de Toi, et je témoigne aux porteurs de Ton Trône, Tes anges, et toute Ta création, que Tu es Allah, il n'y a de dieu que Toi, seul, sans associé, et que Muhammad est Ton serviteur et Ton Messager.",
                name: "Supplication du matin et du soir",
                benefit: "Celui qui le dit, Allah le libérera du Feu"
            }
        }
    },
    "M004": {
        text: "اللّهُـمَّ ما أَصْبَـَحَ بي مِـنْ نِعْـمَةٍ أَو بِأَحَـدٍ مِـنْ خَلْـقِك ، فَمِـنْكَ وَحْـدَكَ لا شريكَ لَـك ، فَلَـكَ الْحَمْـدُ وَلَـكَ الشُّكْـر",
        name: "اذكر الصباح",
        benefit: "من قالها حين يصبح أدى شكر يومه",
        translations: {
            en: {
                text: "O Allah, whatever blessing I have received this morning or any of Your creation has received, it is from You alone, without partner. To You belongs all praise and gratitude",
                name: "Morning Supplication",
                benefit: "Whoever says it in the morning has fulfilled the gratitude of his day"
            },
            fr: {
                text: "Ô Allah, quelle que soit la bénédiction que j'ai reçue ce matin ou que l'un de Ta création a reçue, elle vient de Toi seul, sans associé. À Toi appartient toute louange et gratitude",
                name: "Supplication du matin",
                benefit: "Celui qui le dit le matin a accompli la gratitude de sa journée"
            }
        }
    },
    "M005": {
        text: "اللهم بك أصبحنا، و بك أمسينا، و بك نحيا، و بك نموت، و اليك النشور",
        name: "اذكر الصباح",
        benefit: "",
        translations: {
            en: {
                text: "O Allah, by You we have reached the morning, and by You we have reached the evening, and by You we live, and by You we die, and to You is the resurrection",
                name: "Morning Supplication",
                benefit: ""
            },
            fr: {
                text: "Ô Allah, par Toi nous avons atteint le matin, et par Toi nous avons atteint le soir, et par Toi nous vivons, et par Toi nous mourons, et vers Toi est la résurrection",
                name: "Supplication du matin",
                benefit: ""
            }
        }
    },
    "M006": {
        text: "اللهم عافني في بدني، اللهم عافني في سمعي، اللهم عافني في بصري، لا إله إلا أنت . اللهم إني أعوذ بك من الكفر، و الفقر، و أعوذ بك من عذاب القبر، لا إله إلا أنت",
        name: "اذكر الصباح",
        benefit: "",
        translations: {
            en: {
                text: "O Allah, grant me well-being in my body. O Allah, grant me well-being in my hearing. O Allah, grant me well-being in my sight. There is no god but You. O Allah, I seek refuge in You from disbelief, poverty, and I seek refuge in You from the punishment of the grave. There is no god but You",
                name: "Morning Supplication",
                benefit: ""
            },
            fr: {
                text: "Ô Allah, accorde-moi le bien-être dans mon corps. Ô Allah, accorde-moi le bien-être dans mon ouïe. Ô Allah, accorde-moi le bien-être dans ma vue. Il n'y a de dieu que Toi. Ô Allah, je cherche refuge auprès de Toi contre la mécréance, la pauvreté, et je cherche refuge auprès de Toi contre le châtiment de la tombe. Il n'y a de dieu que Toi",
                name: "Supplication du matin",
                benefit: ""
            }
        }
    },
    "M007": {
        text: "حسبي الله لا إله إلا هو عليه توكلت و هو رب العرش العظيمٌَ",
        name: "اذكر الصباح",
        benefit: "",
        translations: {
            en: {
                text: "Allah is sufficient for me. There is no god but He. In Him I have placed my trust, and He is the Lord of the Mighty Throne",
                name: "Morning Supplication",
                benefit: ""
            },
            fr: {
                text: "Allah me suffit. Il n'y a de dieu que Lui. En Lui j'ai placé ma confiance, et Il est le Seigneur du Trône Puissant",
                name: "Supplication du matin",
                benefit: ""
            }
        }
    },
    "M008": {
        text: "اللّهُـمَّ إِنِّـي أسْـأَلُـكَ العَـفْوَ وَالعـافِـيةَ في الدُّنْـيا وَالآخِـرَة ، اللّهُـمَّ إِنِّـي أسْـأَلُـكَ العَـفْوَ وَالعـافِـيةَ في ديني وَدُنْـيايَ وَأهْـلي وَمالـي ، اللّهُـمَّ اسْتُـرْ عـوْراتي وَآمِـنْ رَوْعاتـي ، اللّهُـمَّ احْفَظْـني مِن بَـينِ يَدَيَّ وَمِن خَلْفـي وَعَن يَمـيني وَعَن شِمـالي ، وَمِن فَوْقـي ، وَأَعـوذُ بِعَظَمَـتِكَ أَن أُغْـتالَ مِن تَحْتـيٌ",
        name: "اذكر الصباح والمساء",
        benefit: "",
        translations: {
            en: {
                text: "O Allah, I ask You for pardon and well-being in this world and the next. O Allah, I ask You for pardon and well-being in my religion, my worldly affairs, my family, and my wealth. O Allah, conceal my faults and calm my fears. O Allah, protect me from before me and from behind me, from my right and from my left, and from above me, and I seek refuge in Your greatness from being taken from below me",
                name: "Morning and Evening Supplication",
                benefit: "Comprehensive supplication for protection and well-being"
            },
            fr: {
                text: "Ô Allah, je Te demande le pardon et le bien-être dans ce monde et dans l'au-delà. Ô Allah, je Te demande le pardon et le bien-être dans ma religion, mes affaires mondaines, ma famille et ma richesse. Ô Allah, cache mes défauts et apaise mes craintes. Ô Allah, protège-moi de devant moi et de derrière moi, de ma droite et de ma gauche, et d'au-dessus de moi, et je cherche refuge dans Ta grandeur contre d'être pris d'en dessous de moi",
                name: "Supplication du matin et du soir",
                benefit: "Supplication complète pour la protection et le bien-être"
            }
        }
    },
    "M009": {
        text: "اللّهُـمَّ عالِـمَ الغَـيْبِ وَالشّـهادَةِ فاطِـرَ السّماواتِ وَالأرْضِ رَبَّ كـلِّ شَـيءٍ وَمَليـكَه ، أَشْهَـدُ أَنْ لا إِلـهَ إِلاّ أَنْت ، أَعـوذُ بِكَ مِن شَـرِّ نَفْسـي وَمِن شَـرِّ الشَّيْـطانِ وَشِرْكِهِ ، وَأَنْ أَقْتَـرِفَ عَلـى نَفْسـي سوءاً أَوْ أَجُـرَّهُ إِلـى مُسْـلِمٌ",
        name: "اذكر الصباح والمساء",
        benefit: "",
        translations: {
            en: {
                text: "O Allah, Knower of the unseen and the seen, Creator of the heavens and the earth, Lord of everything and its Owner. I bear witness that there is no god but You. I seek refuge in You from the evil of myself and from the evil of Satan and his call to associate partners with You, and from committing evil against myself or bringing it upon a Muslim",
                name: "Morning and Evening Supplication",
                benefit: ""
            },
            fr: {
                text: "Ô Allah, Connaisseur de l'invisible et du visible, Créateur des cieux et de la terre, Seigneur de toute chose et son Propriétaire. J'atteste qu'il n'y a de dieu que Toi. Je cherche refuge auprès de Toi contre le mal de moi-même et contre le mal de Satan et son appel à associer des partenaires à Toi, et contre commettre le mal contre moi-même ou le faire subir à un musulman",
                name: "Supplication du matin et du soir",
                benefit: ""
            }
        }
    },
    "M0010": {
        text: "بسم الله الذي لا يضر مع اسمه شئ في الأرض و لا في السماء وهو السميع العليمٌٍ",
        name: "اذكر الصباح",
        benefit: "",
        translations: {
            en: {
                text: "In the name of Allah, with whose name nothing can harm on earth or in heaven, and He is the All-Hearing, the All-Knowing",
                name: "Morning Supplication",
                benefit: ""
            },
            fr: {
                text: "Au nom d'Allah, avec le nom duquel rien ne peut nuire sur terre ou au ciel, et Il est l'Audient, l'Omniscient",
                name: "Supplication du matin",
                benefit: ""
            }
        }
    },
    "M0011": {
        text: "رضيت بالله ربا، و بالإسلام دينا، و بمحمد صلى الله عليه و سلم نبيا",
        name: "اذكر الصباح",
        benefit: "",
        translations: {
            en: {
                text: "I am pleased with Allah as Lord, with Islam as religion, and with Muhammad (peace be upon him) as Prophet",
                name: "Morning Supplication",
                benefit: ""
            },
            fr: {
                text: "Je suis satisfait d'Allah comme Seigneur, de l'Islam comme religion, et de Muhammad (paix sur lui) comme Prophète",
                name: "Supplication du matin",
                benefit: ""
            }
        }
    },
    "M0012": {
        text: "يا حي يا قيوم برحمتك أستغيث أصلح لي شأني كله و لا تكلني إلى نفسي طرفة عينٌٍ",
        name: "اذكر الصباح",
        benefit: "",
        translations: {
            en: {
                text: "O Ever-Living, O Self-Sustaining, by Your mercy I seek help. Set right all my affairs and do not entrust me to myself for the blink of an eye",
                name: "Morning Supplication",
                benefit: ""
            },
            fr: {
                text: "Ô Vivant, Ô Subsistant, par Ta miséricorde je cherche de l'aide. Règle toutes mes affaires et ne me confie pas à moi-même pour le clignement d'un œil",
                name: "Supplication du matin",
                benefit: ""
            }
        }
    },
    
    // Evening Dhikr (E001-E003)
    "E001": {
        text: "أمسينا وأمسى المُـلْكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذا اليوم وَخَـيرَ ما بَعْـدَه ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذا اليوم وَشَرِّ ما بَعْـدَه، رَبِّ أَعـوذُبِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْرٌ",
        name: "اذكار المساء",
        benefit: "دعاء النبي صلى الله عليه وسلم في المساء",
        translations: {
            en: {
                text: "We have reached the evening and the dominion belongs to Allah, and all praise is for Allah. There is no god but Allah, alone, without partner. To Him belongs sovereignty and to Him belongs praise, and He is over all things competent. My Lord, I ask You for the good of this day and the good of what is after it, and I seek refuge in You from the evil of this day and the evil of what is after it. My Lord, I seek refuge in You from laziness and the evil of old age. My Lord, I seek refuge in You from the punishment of Hell and the punishment of the grave.",
                name: "Evening Supplication",
                benefit: "Supplication of the Prophet (peace be upon him) in the evening"
            },
            fr: {
                text: "Nous avons atteint le soir et la souveraineté appartient à Allah, et toute louange est à Allah. Il n'y a de dieu qu'Allah, seul, sans associé. À Lui appartient la souveraineté et à Lui appartient la louange, et Il est sur toute chose capable. Mon Seigneur, je Te demande le bien de ce jour et le bien de ce qui vient après, et je cherche refuge auprès de Toi contre le mal de ce jour et le mal de ce qui vient après. Mon Seigneur, je cherche refuge auprès de Toi contre la paresse et le mal de la vieillesse. Mon Seigneur, je cherche refuge auprès de Toi contre le châtiment de l'Enfer et le châtiment de la tombe.",
                name: "Supplication du soir",
                benefit: "Supplication du Prophète (paix sur lui) le soir"
            }
        }
    },
    "E002": {
        text: "اللّهُـمَّ إِنِّـي أمسيت أُشْـهِدُك ، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك ، وَمَلَائِكَتَكَ ، وَجَمـيعَ خَلْـقِك ، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك ، وَأَنَّ ُ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك",
        name: "اذكار المساء",
        benefit: "من قالها أعتقه الله من النار",
        translations: {
            en: {
                text: "O Allah, I have reached the evening and I bear witness to You, and I bear witness to the bearers of Your Throne, Your angels, and all Your creation, that You are Allah, there is no god but You, alone, without partner, and that Muhammad is Your servant and Your Messenger.",
                name: "Evening Supplication",
                benefit: "Whoever says it, Allah will free him from the Fire"
            },
            fr: {
                text: "Ô Allah, j'ai atteint le soir et je témoigne de Toi, et je témoigne aux porteurs de Ton Trône, Tes anges, et toute Ta création, que Tu es Allah, il n'y a de dieu que Toi, seul, sans associé, et que Muhammad est Ton serviteur et Ton Messager.",
                name: "Supplication du soir",
                benefit: "Celui qui le dit, Allah le libérera du Feu"
            }
        }
    },
    "E003": {
        text: "اللّهُـمَّ ما أمسى بي مِـنْ نِعْـمَةٍ أَو بِأَحَـدٍ مِـنْ خَلْـقِك ، فَمِـنْكَ وَحْـدَكَ لا شريكَ لَـك ، فَلَـكَ الْحَمْـدُ وَلَـكَ الشُّكْـر",
        name: "اذكار المساء",
        benefit: "من قالها حين يصبح أدى شكر يومه",
        translations: {
            en: {
                text: "O Allah, whatever blessing I have received this evening or any of Your creation has received, it is from You alone, without partner. To You belongs all praise and gratitude",
                name: "Supplication of Gratitude",
                benefit: "Whoever says it in the evening has fulfilled the gratitude of his day"
            },
            fr: {
                text: "Ô Allah, quelle que soit la bénédiction que j'ai reçue ce soir ou que l'un de Ta création a reçue, elle vient de Toi seul, sans associé. À Toi appartient toute louange et gratitude",
                name: "Supplication de gratitude",
                benefit: "Celui qui le dit le soir a accompli la gratitude de sa journée"
            }
        }
    },
    
    // Sleep Dhikr (S001-S004)
    "S001": {
        text: "بِاسْمِكَ رَبِّـي وَضَعْـتُ جَنْـبي ، وَبِكَ أَرْفَعُـه، فَإِن أَمْسَـكْتَ نَفْسـي فارْحَـمْها ، وَإِنْ أَرْسَلْتَـها فاحْفَظْـها بِمـا تَحْفَـظُ بِه عِبـادَكَ الصّـالِحـينٌ",
        name: "اذكار النوم",
        benefit: "",
        translations: {
            en: {
                text: "In Your name, my Lord, I lay my side, and by You I raise it. If You take my soul, have mercy upon it, and if You send it back, protect it as You protect Your righteous servants",
                name: "Sleep Supplication",
                benefit: ""
            },
            fr: {
                text: "En Ton nom, mon Seigneur, je pose mon côté, et par Toi je le relève. Si Tu prends mon âme, aie pitié d'elle, et si Tu la renvoies, protège-la comme Tu protèges Tes serviteurs vertueux",
                name: "Supplication du sommeil",
                benefit: ""
            }
        }
    },
    "S002": {
        text: "اللّهُـمَّ إِنَّـكَ خَلَـقْتَ نَفْسـي وَأَنْـتَ تَوَفّـاهـا لَكَ ممَـاتـها وَمَحْـياها ، إِنْ أَحْيَيْـتَها فاحْفَظْـها ، وَإِنْ أَمَتَّـها فَاغْفِـرْ لَـها . اللّهُـمَّ إِنَّـي أَسْـأَلُـكَ العـافِـيَة",
        name: "اذكار النوم",
        benefit: "",
        translations: {
            en: {
                text: "O Allah, You created my soul and You will take it. To You belongs its death and its life. If You give it life, protect it, and if You cause it to die, forgive it. O Allah, I ask You for well-being",
                name: "Sleep Supplication",
                benefit: ""
            },
            fr: {
                text: "Ô Allah, Tu as créé mon âme et Tu la prendras. À Toi appartient sa mort et sa vie. Si Tu lui donnes la vie, protège-la, et si Tu causes sa mort, pardonne-lui. Ô Allah, je Te demande le bien-être",
                name: "Supplication du sommeil",
                benefit: ""
            }
        }
    },
    "S003": {
        text: "اللّهُـمَّ قِنـي عَذابَـكَ يَـوْمَ تَبْـعَثُ عِبـادَكٌ",
        name: "اذكار النوم",
        benefit: "",
        translations: {
            en: {
                text: "O Allah, protect me from Your punishment on the day You resurrect Your servants",
                name: "Sleep Supplication",
                benefit: ""
            },
            fr: {
                text: "Ô Allah, protège-moi de Ton châtiment le jour où Tu ressuscites Tes serviteurs",
                name: "Supplication du sommeil",
                benefit: ""
            }
        }
    },
    "S004": {
        text: "اللّهُـمَّ أَسْـلَمْتُ نَفْـسي إِلَـيْكَ، وَفَوَّضْـتُ أَمْـري إِلَـيْكَ، وَوَجَّـهْتُ وَجْـهي إِلَـيْكَ، وَأَلْـجَـاْتُ ظَهـري إِلَـيْكَ، رَغْبَـةً وَرَهْـبَةً إِلَـيْكَ، لا مَلْجَـأَ وَلا مَنْـجـا مِنْـكَ إِلاّ إِلَـيْكَ، آمَنْـتُ بِكِتـابِكَ الّـذي أَنْزَلْـتَ وَبِنَبِـيِّـكَ الّـذي أَرْسَلْـت",
        name: "اذكار النوم",
        benefit: "",
        translations: {
            en: {
                text: "O Allah, I have submitted myself to You, and I have entrusted my affair to You, and I have turned my face to You, and I have relied upon You, out of hope and fear of You. There is no refuge and no escape from You except to You. I believe in Your Book which You have sent down and in Your Prophet whom You have sent",
                name: "Sleep Supplication",
                benefit: ""
            },
            fr: {
                text: "Ô Allah, je me suis soumis à Toi, et j'ai confié mon affaire à Toi, et j'ai tourné mon visage vers Toi, et je me suis appuyé sur Toi, par espoir et crainte de Toi. Il n'y a de refuge et d'échappatoire de Toi sauf vers Toi. Je crois en Ton Livre que Tu as fait descendre et en Ton Prophète que Tu as envoyé",
                name: "Supplication du sommeil",
                benefit: ""
            }
        }
    },
    
    // After Prayer Dhikr (P001-P005)
    "P001": {
        text: "اللّهُـمَّ أَنْـتَ السَّلامُ ، وَمِـنْكَ السَّلام ، تَبارَكْتَ يا ذا الجَـلالِ وَالإِكْـرام",
        name: "اذكار الصلاة",
        benefit: "",
        translations: {
            en: {
                text: "O Allah, You are Peace, and from You comes peace. Blessed are You, O Possessor of majesty and honor",
                name: "Post-Prayer Supplication",
                benefit: ""
            },
            fr: {
                text: "Ô Allah, Tu es la Paix, et de Toi vient la paix. Béni es-Tu, Ô Détenteur de majesté et d'honneur",
                name: "Supplication après la prière",
                benefit: ""
            }
        }
    },
    "P002": {
        text: "لا إلهَ إلاّ اللّهُ وحدَهُ لا شريكَ لهُ، لهُ المُـلْكُ ولهُ الحَمْد، وهوَ على كلّ شَيءٍ قَدير، اللّهُـمَّ لا مانِعَ لِما أَعْطَـيْت، وَلا مُعْطِـيَ لِما مَنَـعْت، وَلا يَنْفَـعُ ذا الجَـدِّ مِنْـكَ الجَـد",
        name: "اذكار الصلاة",
        benefit: "",
        translations: {
            en: {
                text: "There is no god but Allah, alone, without partner. To Him belongs sovereignty and to Him belongs praise, and He is over all things competent. O Allah, there is no preventer of what You have given, and no giver of what You have prevented, and no one of wealth or power can benefit from You",
                name: "Post-Prayer Supplication",
                benefit: ""
            },
            fr: {
                text: "Il n'y a de dieu qu'Allah, seul, sans associé. À Lui appartient la souveraineté et à Lui appartient la louange, et Il est sur toute chose capable. Ô Allah, il n'y a pas d'empêcheur de ce que Tu as donné, et pas de donneur de ce que Tu as empêché, et personne de richesse ou de pouvoir ne peut bénéficier de Toi",
                name: "Supplication après la prière",
                benefit: ""
            }
        }
    },
    "P003": {
        text: "لا إلهَ إلاّ اللّه, وحدَهُ لا شريكَ لهُ، لهُ الملكُ ولهُ الحَمد، وهوَ على كلّ شيءٍ قدير، لا حَـوْلَ وَلا قـوَّةَ إِلاّ بِاللهِ، لا إلهَ إلاّ اللّـه، وَلا نَعْـبُـدُ إِلاّ إيّـاه, لَهُ النِّعْـمَةُ وَلَهُ الفَضْل وَلَهُ الثَّـناءُ الحَـسَن، لا إلهَ إلاّ اللّهُ مخْلِصـينَ لَـهُ الدِّينَ وَلَوْ كَـرِهَ الكـافِرون",
        name: "اذكار الصلاة",
        benefit: "",
        translations: {
            en: {
                text: "There is no god but Allah, alone, without partner. To Him belongs the kingdom and to Him belongs praise, and He is over all things competent. There is no power or strength except with Allah. There is no god but Allah, and we do not worship except Him. To Him belongs favor and excellence and good praise. There is no god but Allah, making the religion sincerely for Him, even if the disbelievers dislike it",
                name: "Post-Prayer Supplication",
                benefit: ""
            },
            fr: {
                text: "Il n'y a de dieu qu'Allah, seul, sans associé. À Lui appartient le royaume et à Lui appartient la louange, et Il est sur toute chose capable. Il n'y a de pouvoir ou de force qu'avec Allah. Il n'y a de dieu qu'Allah, et nous n'adorons que Lui. À Lui appartient la faveur et l'excellence et la bonne louange. Il n'y a de dieu qu'Allah, rendant la religion sincèrement pour Lui, même si les mécréants le détestent",
                name: "Supplication après la prière",
                benefit: ""
            }
        }
    },
    "P004": {
        text: "لا إلهَ إلاّ اللّهُ وحْـدَهُ لا شريكَ لهُ، لهُ المُلكُ ولهُ الحَمْد، يُحيـي وَيُمـيتُ وهُوَ على كُلّ شيءٍ قديرٌ",
        name: "اذكار الصلاة",
        benefit: "",
        translations: {
            en: {
                text: "There is no god but Allah, alone, without partner. To Him belongs the kingdom and to Him belongs praise. He gives life and causes death, and He is over all things competent",
                name: "Post-Prayer Supplication",
                benefit: ""
            },
            fr: {
                text: "Il n'y a de dieu qu'Allah, seul, sans associé. À Lui appartient le royaume et à Lui appartient la louange. Il donne la vie et cause la mort, et Il est sur toute chose capable",
                name: "Supplication après la prière",
                benefit: ""
            }
        }
    },
    "P005": {
        text: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكٌَ",
        name: "اذكار الصلاة",
        benefit: "",
        translations: {
            en: {
                text: "O Allah, help me to remember You, to thank You, and to worship You well",
                name: "Post-Prayer Supplication",
                benefit: ""
            },
            fr: {
                text: "Ô Allah, aide-moi à Te mentionner, à Te remercier et à T'adorer bien",
                name: "Supplication après la prière",
                benefit: ""
            }
        }
    },
    
    // Tasbih (GE001-GE011)
    "GE001": {
        text: "سُبْحَانَ اللَّهِ",
        name: "التسبيح العام",
        benefit: "من قالها غفرت ذنوبه",
        translations: {
            en: {
                text: "Glory be to Allah",
                name: "General Tasbih",
                benefit: "Whoever says it, his sins will be forgiven"
            },
            fr: {
                text: "Gloire à Allah",
                name: "Tasbih général",
                benefit: "Celui qui le dit, ses péchés seront pardonnés"
            }
        }
    },
    "GE002": {
        text: "الْحَمْدُ لِلَّهِ",
        name: "الحمد العام",
        benefit: "من قالها غفرت ذنوبه",
        translations: {
            en: {
                text: "Praise be to Allah",
                name: "General Praise",
                benefit: "Whoever says it, his sins will be forgiven"
            },
            fr: {
                text: "Louange à Allah",
                name: "Louange générale",
                benefit: "Celui qui le dit, ses péchés seront pardonnés"
            }
        }
    },
    "GE003": {
        text: "اللَّهُ أَكْبَرُ",
        name: "التكبير العام",
        benefit: "من قالها غفرت ذنوبه",
        translations: {
            en: {
                text: "Allah is the Greatest",
                name: "General Takbir",
                benefit: "Whoever says it, his sins will be forgiven"
            },
            fr: {
                text: "Allah est le Plus Grand",
                name: "Takbir général",
                benefit: "Celui qui le dit, ses péchés seront pardonnés"
            }
        }
    },
    "GE004": {
        text: "لَا إِلَهَ إِلَّا اللَّهُ",
        name: "التوحيد العام",
        benefit: "من قالها مئة مرة غفرت ذنوبه",
        translations: {
            en: {
                text: "There is no god but Allah",
                name: "General Tawheed",
                benefit: "Whoever says it one hundred times, his sins will be forgiven"
            },
            fr: {
                text: "Il n'y a de dieu qu'Allah",
                name: "Tawhid général",
                benefit: "Celui qui le dit cent fois, ses péchés seront pardonnés"
            }
        }
    },
    "GE005": {
        text: "أَسْتَغْفِرُ اللَّهَ",
        name: "الاستغفار العام",
        benefit: "من قالها غفرت ذنوبه",
        translations: {
            en: {
                text: "I seek forgiveness from Allah",
                name: "General Istighfar",
                benefit: "Whoever says it, his sins will be forgiven"
            },
            fr: {
                text: "Je demande pardon à Allah",
                name: "Istighfar général",
                benefit: "Celui qui le dit, ses péchés seront pardonnés"
            }
        }
    },
    "GE006": {
        text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
        name: "التسبيح والحمد",
        benefit: "من قالها مئة مرة حُطت خطاياه وإن كانت مثل زبد البحر",
        translations: {
            en: {
                text: "Glory be to Allah and praise be to Him",
                name: "Tasbih and Praise",
                benefit: "Whoever says it one hundred times, his sins will be removed even if they are like the foam of the sea"
            },
            fr: {
                text: "Gloire à Allah et louange à Lui",
                name: "Tasbih et Louange",
                benefit: "Celui qui le dit cent fois, ses péchés seront effacés même s'ils sont comme l'écume de la mer"
            }
        }
    },
    "GE007": {
        text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        name: "التوحيد الكامل",
        benefit: "كانت له عدل عشر رقاب، وكتبت له مئة حسنة، ومحيت عنه مئة سيئة، وكانت له حرزا من الشيطان",
        translations: {
            en: {
                text: "There is no god but Allah, alone, without partner. To Him belongs sovereignty and to Him belongs praise, and He is over all things competent",
                name: "Complete Tawheed",
                benefit: "It is equal to freeing ten slaves, one hundred good deeds are written for him, one hundred bad deeds are erased from him, and it is a protection from Satan"
            },
            fr: {
                text: "Il n'y a de dieu qu'Allah, seul, sans associé. À Lui appartient la souveraineté et à Lui appartient la louange, et Il est sur toute chose capable",
                name: "Tawhid complet",
                benefit: "C'est équivalent à libérer dix esclaves, cent bonnes actions lui sont écrites, cent mauvaises actions lui sont effacées, et c'est une protection contre Satan"
            }
        }
    },
    "GE008": {
        text: "اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد",
        name: "الصلاة على النبي",
        benefit: "من صلى على حين يصبح وحين يمسى ادركته شفاعتى يوم القيامة",
        translations: {
            en: {
                text: "O Allah, send blessings and peace upon our Prophet Muhammad",
                name: "Prayer upon the Prophet",
                benefit: "Whoever sends blessings upon him in the morning and evening will attain my intercession on the Day of Resurrection"
            },
            fr: {
                text: "Ô Allah, envoie des bénédictions et la paix sur notre Prophète Muhammad",
                name: "Prière sur le Prophète",
                benefit: "Celui qui envoie des bénédictions sur lui le matin et le soir obtiendra mon intercession le Jour de la Résurrection"
            }
        }
    },
    "GE009": {
        text: "أسْتَغْفِرُ اللهَ العَظِيمَ الَّذِي لاَ إلَهَ إلاَّ هُوَ، الحَيُّ القَيُّومُ، وَأتُوبُ إلَيهٌِ",
        name: "الاستغفار العظيم",
        benefit: "من قالها غفرت ذنوبه",
        translations: {
            en: {
                text: "I seek forgiveness from Allah, the Most Great, there is no god but He, the Ever-Living, the Self-Sustaining, and I repent to Him",
                name: "Great Istighfar",
                benefit: "Whoever says it, his sins will be forgiven"
            },
            fr: {
                text: "Je demande pardon à Allah, le Très Grand, il n'y a de dieu que Lui, le Vivant, le Subsistant, et je me repens à Lui",
                name: "Grand Istighfar",
                benefit: "Celui qui le dit, ses péchés seront pardonnés"
            }
        }
    },
    "GE010": {
        text: "اللهم صلي على سيدنا محمد",
        name: "الصلاة على النبي",
        benefit: "من صلى على حين يصبح وحين يمسى ادركته شفاعتى يوم القيامة",
        translations: {
            en: {
                text: "O Allah, send blessings upon our Master Muhammad",
                name: "Prayer upon the Prophet",
                benefit: "Whoever sends blessings upon him in the morning and evening will attain my intercession on the Day of Resurrection"
            },
            fr: {
                text: "Ô Allah, envoie des bénédictions sur notre Maître Muhammad",
                name: "Prière sur le Prophète",
                benefit: "Celui qui envoie des bénédictions sur lui le matin et le soir obtiendra mon intercession le Jour de la Résurrection"
            }
        }
    },
    "GE011": {
        text: "سبحان الله العظيم",
        name: "التسبيح",
        benefit: "من قالها غفرت ذنوبه",
        translations: {
            en: {
                text: "Glory be to Allah, the Most Great",
                name: "Tasbih",
                benefit: "Whoever says it, his sins will be forgiven"
            },
            fr: {
                text: "Gloire à Allah, le Très Grand",
                name: "Tasbih",
                benefit: "Celui qui le dit, ses péchés seront pardonnés"
            }
        }
    }
};

// Protocols - List of dhikr IDs with their counts
const protocols = {
    "protocol_morning": {
        id: "protocol_morning",
        name: { ar: "أذكار الصباح", en: "Morning Dhikr", fr: "Dhikr du matin" },
        description: { ar: "أذكار الصباح الكاملة", en: "Complete morning dhikr", fr: "Dhikr complet du matin" },
        dhikrs: [
            { id: "Q2_255", count: 1 },
            { id: "Q112", count: 3 },
            { id: "Q113", count: 3 },
            { id: "Q114", count: 3 },
            { id: "M001", count: 1 },
            { id: "M002", count: 1 },
            { id: "M003", count: 4 },
            { id: "M004", count: 1 },
            { id: "M005", count: 1 },
            { id: "M006", count: 3 },
            { id: "M007", count: 7 },
            { id: "M008", count: 1 },
            { id: "M009", count: 1 },
            { id: "M0010", count: 3 },
            { id: "M0011", count: 3 },
            { id: "M0012", count: 1 },
            { id: "GE006", count: 100 },
            { id: "GE007", count: 100 }
        ]
    },
    "protocol_morning_simple": {
        id: "protocol_morning_simple",
        name: { ar: "أذكار الصباح - بسيط", en: "Morning Dhikr - Simple", fr: "Dhikr du matin - Simple" },
        description: { ar: "أذكار الصباح البسيطة", en: "Simple morning dhikr", fr: "Dhikr simple du matin" },
        dhikrs: [
            { id: "M001", count: 1 },
            { id: "M002", count: 1 },
            { id: "M003", count: 4 },
            { id: "M004", count: 1 },
            { id: "M005", count: 1 }
        ]
    },
    "protocol_evening": {
        id: "protocol_evening",
        name: { ar: "أذكار المساء", en: "Evening Dhikr", fr: "Dhikr du soir" },
        description: { ar: "أذكار المساء الكاملة", en: "Complete evening dhikr", fr: "Dhikr complet du soir" },
        dhikrs: [
            { id: "Q2_255", count: 1 },
            { id: "Q112", count: 3 },
            { id: "Q113", count: 3 },
            { id: "Q114", count: 3 },
            { id: "E001", count: 1 },
            { id: "E002", count: 4 },
            { id: "E003", count: 1 },
            { id: "M002", count: 1 },
            { id: "M005", count: 1 },
            { id: "M006", count: 3 },
            { id: "M007", count: 7 },
            { id: "M008", count: 1 },
            { id: "M009", count: 1 },
            { id: "M0010", count: 3 },
            { id: "M0011", count: 3 },
            { id: "M0012", count: 1 },
            { id: "GE006", count: 100 },
            { id: "GE007", count: 100 }
        ]
    },
    "protocol_sleep": {
        id: "protocol_sleep",
        name: { ar: "أذكار النوم", en: "Sleep Dhikr", fr: "Dhikr du sommeil" },
        description: { ar: "أذكار النوم الكاملة", en: "Complete sleep dhikr", fr: "Dhikr complet du sommeil" },
        dhikrs: [
            { id: "Q2_255", count: 1 },
            { id: "Q112", count: 3 },
            { id: "Q113", count: 3 },
            { id: "Q114", count: 3 },
            { id: "S001", count: 1 },
            { id: "S002", count: 1 },
            { id: "S003", count: 1 },
            { id: "S004", count: 1 },
            { id: "GE001", count: 33 },
            { id: "GE002", count: 33 },
            { id: "GE003", count: 34 }
        ]
    },
    "protocol_after_prayer": {
        id: "protocol_after_prayer",
        name: { ar: "أذكار بعد الصلاة", en: "After Prayer Dhikr", fr: "Dhikr après la prière" },
        description: { ar: "أذكار ما بعد الصلاة", en: "Post-prayer dhikr", fr: "Dhikr après la prière" },
        dhikrs: [
            { id: "Q2_255", count: 1 },
            { id: "Q112", count: 1 },
            { id: "Q113", count: 1 },
            { id: "Q114", count: 1 },
            { id: "GE005", count: 3 },
            { id: "P001", count: 1 },
            { id: "P002", count: 1 },
            { id: "P003", count: 1 },
            { id: "P004", count: 1 },
            { id: "P005", count: 1 },
            { id: "GE007", count: 1 },
            { id: "GE001", count: 33 },
            { id: "GE002", count: 33 },
            { id: "GE003", count: 33 }
        ]
    },
    "protocol_friday": {
        id: "protocol_friday",
        name: { ar: "أذكار الجمعة", en: "Friday Dhikr", fr: "Dhikr du vendredi" },
        description: { ar: "أذكار يوم الجمعة المبارك", en: "Friday blessed dhikr", fr: "Dhikr béni du vendredi" },
        dhikrs: [
            { id: "F001", count: 100 },
            { id: "F002", count: 100 },
            { id: "F003", count: 100 },
            { id: "F004", count: 3 },
            { id: "F005", count: 1 },
            { id: "F006", count: 1 },
            { id: "F007", count: 1 }
        ]
    },
    "protocol_wakeup": {
        id: "protocol_wakeup",
        name: { ar: "أذكار الاستيقاظ", en: "Wake-up Dhikr", fr: "Dhikr au réveil" },
        description: { ar: "أذكار الاستيقاظ من النوم", en: "Wake-up from sleep dhikr", fr: "Dhikr au réveil du sommeil" },
        dhikrs: [
            { id: "W001", count: 1 },
            { id: "W002", count: 1 },
            { id: "W003", count: 1 }
        ]
    }
};

// Quran texts (simplified - will need to add full texts)
const quranTexts = {
    "Q2_255": {
        text: "اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ",
        name: "آية الكرسي",
        benefit: "من قرأها بعد كل صلاة لم يمنعه من دخول الجنة إلا الموت",
        translations: {
            en: {
                text: "Allah - there is no deity except Him, the Ever-Living, the Sustainer of existence. Neither drowsiness overtakes Him nor sleep. To Him belongs whatever is in the heavens and whatever is on the earth. Who is it that can intercede with Him except by His permission? He knows what is before them and what will be after them, and they encompass not a thing of His knowledge except for what He wills. His Kursi extends over the heavens and the earth, and their preservation tires Him not. And He is the Most High, the Most Great.",
                name: "Ayat al-Kursi",
                benefit: "Whoever recites it after every prayer, nothing will prevent him from entering Paradise except death"
            },
            fr: {
                text: "Allah - il n'y a de divinité que Lui, le Vivant, le Subsistant. Ni somnolence ni sommeil ne Le saisissent. À Lui appartient ce qui est dans les cieux et ce qui est sur la terre. Qui peut intercéder auprès de Lui sans Sa permission? Il sait ce qui est devant eux et ce qui sera après eux, et ils n'embrassent rien de Sa science sauf ce qu'Il veut. Son Kursi s'étend sur les cieux et la terre, et leur préservation ne Le fatigue pas. Et Il est le Très Haut, le Très Grand.",
                name: "Ayat al-Kursi",
                benefit: "Celui qui la récite après chaque prière, rien ne l'empêchera d'entrer au Paradis sauf la mort"
            }
        }
    },
    "Q112": {
        text: "قُلْ هُوَ اللَّهُ أَحَدٌ (1) اللَّهُ الصَّمَدُ (2) لَمْ يَلِدْ وَلَمْ يُولَدْ (3) وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ (4)",
        name: "سورة الإخلاص",
        benefit: "من قرأها ثلاث مرات كأنما قرأ القرآن كله",
        translations: {
            en: {
                text: "Say, 'He is Allah, [who is] One, (1) Allah, the Eternal Refuge. (2) He neither begets nor is born, (3) Nor is there to Him any equivalent.' (4)",
                name: "Surah Al-Ikhlas",
                benefit: "Whoever recites it three times, it is as if he recited the entire Quran"
            },
            fr: {
                text: "Dis : 'Il est Allah, [qui est] Un, (1) Allah, le Refuge Éternel. (2) Il n'engendre pas et n'est pas engendré, (3) Et il n'y a rien qui Lui soit équivalent.' (4)",
                name: "Sourate Al-Ikhlas",
                benefit: "Celui qui la récite trois fois, c'est comme s'il récitait tout le Coran"
            }
        }
    },
    "Q113": {
        text: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ (1) مِن شَرِّ مَا خَلَقَ (2) وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ (3) وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ (4) وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ (5)",
        name: "سورة الفلق",
        benefit: "من قرأها مع سورة الناس ثلاث مرات بعد كل صلاة كفاه الله كل شيء",
        translations: {
            en: {
                text: "Say, 'I seek refuge in the Lord of daybreak (1) From the evil of that which He created (2) And from the evil of darkness when it settles (3) And from the evil of the blowers in knots (4) And from the evil of an envier when he envies.' (5)",
                name: "Surah Al-Falaq",
                benefit: "Whoever recites it with Surah An-Nas three times after every prayer, Allah will suffice him everything"
            },
            fr: {
                text: "Dis : 'Je cherche refuge auprès du Seigneur de l'aube (1) Du mal de ce qu'Il a créé (2) Et du mal de l'obscurité quand elle s'installe (3) Et du mal de celles qui soufflent dans les nœuds (4) Et du mal d'un envieux quand il envie.' (5)",
                name: "Sourate Al-Falaq",
                benefit: "Celui qui la récite avec la Sourate An-Nas trois fois après chaque prière, Allah lui suffira tout"
            }
        }
    },
    "Q114": {
        text: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ (1) مَلِكِ النَّاسِ (2) إِلَٰهِ النَّاسِ (3) مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ (4) الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ (5) مِنَ الْجِنَّةِ وَالنَّاسِ (6)",
        name: "سورة الناس",
        benefit: "من قرأها مع سورة الفلق ثلاث مرات بعد كل صلاة كفاه الله كل شيء",
        translations: {
            en: {
                text: "Say, 'I seek refuge in the Lord of mankind, (1) The Sovereign of mankind, (2) The God of mankind, (3) From the evil of the retreating whisperer (4) Who whispers [evil] into the breasts of mankind (5) From among the jinn and mankind.' (6)",
                name: "Surah An-Nas",
                benefit: "Whoever recites it with Surah Al-Falaq three times after every prayer, Allah will suffice him everything"
            },
            fr: {
                text: "Dis : 'Je cherche refuge auprès du Seigneur des hommes, (1) Le Souverain des hommes, (2) Le Dieu des hommes, (3) Du mal du chuchoteur qui se retire (4) Qui chuchote [le mal] dans les poitrines des hommes (5) Parmi les djinns et les hommes.' (6)",
                name: "Sourate An-Nas",
                benefit: "Celui qui la récite avec la Sourate Al-Falaq trois fois après chaque prière, Allah lui suffira tout"
            }
        }
    },
    
    // Friday Dhikr (F001-F007)
    "F001": {
        text: "اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ، اللَّهُمَّ بَارِكْ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ، كَمَا بَارَكْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ، إِنَّكَ حَمِيدٌ مَجِيدٌ",
        name: "أذكار الجمعة",
        benefit: "الصلاة على النبي صلى الله عليه وسلم يوم الجمعة - من صلى عليه مرة صلى الله عليه بها عشراً",
        translations: {
            en: {
                text: "O Allah, send blessings upon Muhammad and upon the family of Muhammad, as You sent blessings upon Ibrahim and upon the family of Ibrahim. Indeed, You are Praiseworthy and Glorious. O Allah, bless Muhammad and the family of Muhammad, as You blessed Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy and Glorious.",
                name: "Friday Supplication - Prayer upon the Prophet",
                benefit: "Whoever sends blessings upon him once, Allah will send blessings upon him ten times"
            },
            fr: {
                text: "Ô Allah, envoie des bénédictions sur Muhammad et sur la famille de Muhammad, comme Tu as envoyé des bénédictions sur Ibrahim et sur la famille d'Ibrahim. En vérité, Tu es Digne de louange et Glorieux. Ô Allah, bénis Muhammad et la famille de Muhammad, comme Tu as béni Ibrahim et la famille d'Ibrahim. En vérité, Tu es Digne de louange et Glorieux.",
                name: "Supplication du vendredi - Prière sur le Prophète",
                benefit: "Celui qui envoie des bénédictions sur lui une fois, Allah enverra des bénédictions sur lui dix fois"
            }
        }
    },
    "F002": {
        text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ العَظِيمِ",
        name: "أذكار الجمعة",
        benefit: "التسبيح يوم الجمعة - من قالها مئة مرة حُطت خطاياه وإن كانت مثل زبد البحر",
        translations: {
            en: {
                text: "Glory be to Allah and praise be to Him, Glory be to Allah, the Most Great",
                name: "Friday Supplication - Tasbih",
                benefit: "Whoever says it one hundred times on Friday, his sins will be removed even if they are like the foam of the sea"
            },
            fr: {
                text: "Gloire à Allah et louange à Lui, Gloire à Allah, le Très Grand",
                name: "Supplication du vendredi - Tasbih",
                benefit: "Celui qui le dit cent fois le vendredi, ses péchés seront effacés même s'ils sont comme l'écume de la mer"
            }
        }
    },
    "F003": {
        text: "لا إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لا شَرِيكَ لَهُ، لَهُ المُلْكُ وَلَهُ الحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ",
        name: "أذكار الجمعة",
        benefit: "التوحيد يوم الجمعة - كانت له عدل عشر رقاب، وكتبت له مئة حسنة، ومحيت عنه مئة سيئة",
        translations: {
            en: {
                text: "There is no god but Allah, alone, without partner. To Him belongs the kingdom and to Him belongs praise, and He is over all things competent",
                name: "Friday Supplication - Tawheed",
                benefit: "It is equal to freeing ten slaves, one hundred good deeds are written for him, and one hundred bad deeds are erased from him"
            },
            fr: {
                text: "Il n'y a de dieu qu'Allah, seul, sans associé. À Lui appartient le royaume et à Lui appartient la louange, et Il est sur toute chose capable",
                name: "Supplication du vendredi - Tawhid",
                benefit: "C'est équivalent à libérer dix esclaves, cent bonnes actions lui sont écrites, et cent mauvaises actions lui sont effacées"
            }
        }
    },
    "F004": {
        text: "أَسْتَغْفِرُ اللَّهَ العَظِيمَ الَّذِي لا إِلَهَ إِلاَّ هُوَ، الحَيُّ القَيُّومُ، وَأَتُوبُ إِلَيْهِ",
        name: "أذكار الجمعة",
        benefit: "الاستغفار يوم الجمعة - من قالها غفرت ذنوبه",
        translations: {
            en: {
                text: "I seek forgiveness from Allah, the Most Great, there is no god but He, the Ever-Living, the Self-Sustaining, and I repent to Him",
                name: "Friday Supplication - Istighfar",
                benefit: "Whoever says it on Friday, his sins will be forgiven"
            },
            fr: {
                text: "Je demande pardon à Allah, le Très Grand, il n'y a de dieu que Lui, le Vivant, le Subsistant, et je me repens à Lui",
                name: "Supplication du vendredi - Istighfar",
                benefit: "Celui qui le dit le vendredi, ses péchés seront pardonnés"
            }
        }
    },
    "F005": {
        text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ فِي هَذَا اليَوْمِ المُبَارَكِ الجُمُعَةِ، أَنْ تَغْفِرَ لِي ذُنُوبِي، وَتُطَهِّرَ قَلْبِي، وَتُنَوِّرَ بَصَرِي",
        name: "أذكار الجمعة",
        benefit: "دعاء يوم الجمعة - من دعا به استجاب الله له",
        translations: {
            en: {
                text: "O Allah, I ask You on this blessed Friday to forgive my sins, purify my heart, and enlighten my sight",
                name: "Friday Supplication",
                benefit: "Whoever supplicates with it, Allah will answer him"
            },
            fr: {
                text: "Ô Allah, je Te demande en ce vendredi béni de pardonner mes péchés, purifier mon cœur et éclairer ma vue",
                name: "Supplication du vendredi",
                benefit: "Celui qui supplie avec cela, Allah lui répondra"
            }
        }
    },
    "F006": {
        text: "اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ، وَاجْعَلْنِي مِنَ المُتَطَهِّرِينَ، وَاجْعَلْنِي مِنْ عِبَادِكَ الصَّالِحِينَ",
        name: "أذكار الجمعة",
        benefit: "دعاء يوم الجمعة - من دعا به قبل الجمعة استجاب الله له",
        translations: {
            en: {
                text: "O Allah, make me among those who repent, make me among those who purify themselves, and make me among Your righteous servants",
                name: "Friday Supplication",
                benefit: "Whoever supplicates with it before Friday, Allah will answer him"
            },
            fr: {
                text: "Ô Allah, fais-moi partie de ceux qui se repentent, fais-moi partie de ceux qui se purifient, et fais-moi partie de Tes serviteurs vertueux",
                name: "Supplication du vendredi",
                benefit: "Celui qui supplie avec cela avant le vendredi, Allah lui répondra"
            }
        }
    },
    "F007": {
        text: "اللَّهُمَّ بَارِكْ لَنَا فِي يَوْمِنَا هَذَا، وَاجْعَلْنَا مِنَ المُسْتَغْفِرِينَ، وَاجْعَلْنَا مِنَ الذَّاكِرِينَ",
        name: "أذكار الجمعة",
        benefit: "دعاء يوم الجمعة - من دعا به قبل الجمعة استجاب الله له",
        translations: {
            en: {
                text: "O Allah, bless us on this day, and make us among those who seek forgiveness, and make us among those who remember You",
                name: "Friday Supplication",
                benefit: "Whoever supplicates with it before Friday, Allah will answer him"
            },
            fr: {
                text: "Ô Allah, bénis-nous en ce jour, et fais-nous partie de ceux qui cherchent le pardon, et fais-nous partie de ceux qui Te mentionnent",
                name: "Supplication du vendredi",
                benefit: "Celui qui supplie avec cela avant le vendredi, Allah lui répondra"
            }
        }
    },
    
    // Wake-up Dhikr (W001-W003)
    "W001": {
        text: "الحَمْـدُ لِلّهِ الّذي أَحْـيانا بَعْـدَ ما أَماتَـنا وَإليه النُّـشور",
        name: "أذكار الاستيقاظ",
        benefit: "دعاء النبي صلى الله عليه وسلم عند الاستيقاظ",
        translations: {
            en: {
                text: "Praise be to Allah who has given us life after having taken it from us, and to Him is the resurrection",
                name: "Wake-up Supplication",
                benefit: "Supplication of the Prophet (peace be upon him) upon waking up"
            },
            fr: {
                text: "Louange à Allah qui nous a donné la vie après nous l'avoir prise, et vers Lui est la résurrection",
                name: "Supplication au réveil",
                benefit: "Supplication du Prophète (paix sur lui) au réveil"
            }
        }
    },
    "W002": {
        text: "لا إلهَ إلاّ اللّهُ وَحْـدَهُ لا شَـريكَ له، لهُ المُلـكُ ولهُ الحَمـد، وهوَ على كلّ شيءٍ قدير، سُـبْحانَ اللهِ، والحمْـدُ لله ، ولا إلهَ إلاّ اللهُ واللهُ أكبَر، وَلا حَولَ وَلا قوّة إلاّ باللّهِ العليّ العظيم. رَبِّ اغْفرْ لي",
        name: "أذكار الاستيقاظ",
        benefit: "دعاء النبي صلى الله عليه وسلم عند الاستيقاظ",
        translations: {
            en: {
                text: "There is no god but Allah, alone, without partner. To Him belongs the kingdom and to Him belongs praise, and He is over all things competent. Glory be to Allah, and praise be to Allah, and there is no god but Allah, and Allah is the Greatest. There is no power or strength except with Allah, the Most High, the Most Great. My Lord, forgive me",
                name: "Wake-up Supplication",
                benefit: "Comprehensive supplication of the Prophet (peace be upon him) upon waking up"
            },
            fr: {
                text: "Il n'y a de dieu qu'Allah, seul, sans associé. À Lui appartient le royaume et à Lui appartient la louange, et Il est sur toute chose capable. Gloire à Allah, et louange à Allah, et il n'y a de dieu qu'Allah, et Allah est le Plus Grand. Il n'y a de pouvoir ou de force qu'avec Allah, le Très Haut, le Très Grand. Mon Seigneur, pardonne-moi",
                name: "Supplication au réveil",
                benefit: "Supplication complète du Prophète (paix sur lui) au réveil"
            }
        }
    },
    "W003": {
        text: "الحمدُ للهِ الذي عافاني في جَسَدي وَرَدّ عَليّ روحي وَأَذِنَ لي بِذِكْرِه",
        name: "أذكار الاستيقاظ",
        benefit: "دعاء النبي صلى الله عليه وسلم عند الاستيقاظ",
        translations: {
            en: {
                text: "Praise be to Allah who has granted me well-being in my body, returned my soul to me, and permitted me to remember Him",
                name: "Wake-up Supplication",
                benefit: "Supplication of the Prophet (peace be upon him) upon waking up"
            },
            fr: {
                text: "Louange à Allah qui m'a accordé le bien-être dans mon corps, m'a rendu mon âme et m'a permis de Le mentionner",
                name: "Supplication au réveil",
                benefit: "Supplication du Prophète (paix sur lui) au réveil"
            }
        }
    }
};

// Get dhikr text by ID and language
function getDhikrText(dhikrId, lang = 'ar') {
    // Check if it's a Quran text
    if (dhikrId.startsWith('Q')) {
        const quran = quranTexts[dhikrId];
        if (!quran) return null;
        
        if (lang === 'ar') {
            return {
                text: quran.text,
                name: quran.name,
                benefit: quran.benefit
            };
        }
        
        const translation = quran.translations[lang];
        if (translation) {
            return {
                text: quran.text, // Keep Arabic text
                name: translation.name,
                benefit: translation.benefit,
                translation: translation.text
            };
        }
        return {
            text: quran.text,
            name: quran.name,
            benefit: quran.benefit
        };
    }
    
    // Regular dhikr text
    const dhikr = dhikrTexts[dhikrId];
    if (!dhikr) return null;
    
    if (lang === 'ar') {
        return {
            text: dhikr.text,
            name: dhikr.name,
            benefit: dhikr.benefit
        };
    }
    
    const translation = dhikr.translations[lang];
    if (translation) {
        return {
            text: dhikr.text, // Keep Arabic text
            name: translation.name,
            benefit: translation.benefit,
            translation: translation.text
        };
    }
    
    return {
        text: dhikr.text,
        name: dhikr.name,
        benefit: dhikr.benefit
    };
}

// Get protocol by ID
function getProtocol(protocolId) {
    return protocols[protocolId] || null;
}

// Get all protocols
function getAllProtocols() {
    return Object.values(protocols);
}

// Get all dhikr texts
function getAllDhikrTexts() {
    return Object.keys(dhikrTexts).map(id => ({
        id,
        ...dhikrTexts[id]
    }));
}

// Export
window.dhikrData = {
    dhikrTexts,
    protocols,
    quranTexts,
    getDhikrText,
    getProtocol,
    getAllProtocols,
    getAllDhikrTexts
};
