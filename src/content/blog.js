export const blogPosts = [
  { slug:'how-to-calculate-fertilizer', category:'Formulation', title:'How to Calculate Fertilizer for Fertigation', titleFr:'Comment calculer les engrais pour la fertigation', description:'Follow the workflow from fertilizer inputs to ionic balance, tank distribution, and a shareable report.', descriptionFr:'Des quantités d’engrais à la balance ionique, aux bacs et au rapport partagé.', related:['fertigation-dilution-calculation','ec-in-greenhouse-crops','how-to-mix-a-b-c-tanks'] },
  { slug:'ec-in-greenhouse-crops', category:'Water & EC', title:'EC in Greenhouse Crops: A Practical Guide', titleFr:'EC en serre : guide pratique', description:'Read electrical conductivity alongside your crop stage, water source, and drainage.', descriptionFr:'Interprétez la conductivité avec le stade cultural, la source d’eau et le drainage.', related:['irrigation-water-test-checklist','tomato-fertigation-guide','how-to-calculate-fertilizer'] },
  { slug:'how-to-mix-a-b-c-tanks', category:'Tank management', title:'Understanding A/B/C Fertigation Tanks', titleFr:'Comprendre les bacs de fertigation A/B/C', description:'Understand fertilizer separation, compatibility, and the checks to make before mixing.', descriptionFr:'Comprenez la séparation des engrais, les compatibilités et les contrôles avant mélange.', related:['how-to-calculate-fertilizer','fertigation-dilution-calculation','fertigation-report-checklist'] },
  { slug:'tomato-fertigation-guide', category:'Crop nutrition', title:'Tomato Fertigation: NPK, EC, and Growth Stages', titleFr:'Fertigation tomate : NPK, EC et stades de culture', description:'Connect nutrient balance and conductivity with the changing needs of a tomato crop.', descriptionFr:'Reliez équilibre nutritif et conductivité aux besoins de la tomate.', related:['ec-in-greenhouse-crops','irrigation-water-test-checklist','how-to-mix-a-b-c-tanks'] },
  { slug:'irrigation-water-test-checklist', category:'Water & EC', title:'Irrigation Water Tests: What to Record Before Fertigation', titleFr:'Analyse de l’eau : que noter avant la fertigation ?', description:'A practical checklist for organizing water-test results, units, and sampling context before you formulate.', descriptionFr:'Une liste pratique pour organiser les résultats, unités et conditions de prélèvement avant la formulation.', related:['ec-in-greenhouse-crops','how-to-calculate-fertilizer','fertigation-report-checklist'], sections:[
    { title:'Start with the water you actually use', titleFr:'Commencez par l’eau réellement utilisée', en:['Before adjusting fertilizer quantities, put the current water report beside the formulation. Record the source, collection date, sampling point, and units. A result without that context is difficult to compare with the next test.','Give each sample a useful name, such as “north greenhouse source water” or “line outlet after injection.” Keep these records separate: a source-water sample and a finished irrigation solution answer different questions.'], fr:['Avant de modifier les quantités d’engrais, placez l’analyse actuelle de l’eau à côté de la formulation. Notez la source, la date, le point de prélèvement et les unités. Sans ce contexte, la comparaison avec le prochain test est difficile.','Nommez chaque échantillon, par exemple « eau source serre nord » ou « sortie après injection ». Séparez ces relevés : l’eau source et la solution finale répondent à des questions différentes.'] },
    { title:'Keep the measurements distinct', titleFr:'Distinguez les mesures', en:['Penn State Extension identifies pH, alkalinity, hardness, and electrical conductivity as useful water-quality measurements. EC describes dissolved salts; it does not identify each nutrient. Alkalinity and pH are separate measurements, so one should not stand in for the other.','Transcribe the laboratory’s exact labels and units. Keep alkalinity expressed as calcium carbonate separate from a calcium concentration. Do not copy a number into a differently named field just because the values look similar.'], fr:['Penn State Extension retient le pH, l’alcalinité, la dureté et la conductivité électrique parmi les mesures utiles. L’EC renseigne sur les sels dissous, sans identifier chaque nutriment. Alcalinité et pH sont distincts : l’un ne remplace pas l’autre.','Recopiez les intitulés et unités du laboratoire. Séparez l’alcalinité exprimée en carbonate de calcium d’une concentration de calcium. Ne transférez pas une valeur vers un autre champ sur la seule base de sa ressemblance.'], source:0 },
    { title:'Build a repeatable record', titleFr:'Créez un relevé comparable', en:['Use one worksheet with columns for sample name, date, collection point, EC and its unit, pH, laboratory report reference, and a short observation. Record whether irrigation was running and whether fertilizer was being injected.','For example, if a new reading differs from last month, first compare the sample locations and units. If the earlier sample was collected upstream and the new sample downstream of injection, the difference is not automatically a change in source-water quality.'], fr:['Utilisez une fiche avec le nom, la date, le point de prélèvement, l’EC et son unité, le pH, la référence du laboratoire et une observation. Notez si l’irrigation et l’injection étaient en fonctionnement.','Si une valeur diffère du mois précédent, comparez d’abord les points et les unités. Un ancien prélèvement en amont et un nouveau en aval de l’injection ne prouvent pas une variation de la qualité de l’eau source.'] },
    { title:'Bring the context into your formulation', titleFr:'Reliez le contexte à la formulation', en:['When entering the water EC in AgroCalc Pro, use the measurement that corresponds to the water feeding the formulation. Keep the original laboratory report with your calculation notes, and review the resulting EC and ionic analysis together.','A useful handover includes the sample reference, the formulation inputs, and the date of the calculation. If the source changes, start a new record rather than overwriting the old reference.'], fr:['Lors de la saisie de l’EC dans AgroCalc Pro, utilisez la mesure correspondant à l’eau de votre formulation. Conservez le rapport du laboratoire avec vos notes et examinez ensemble l’EC et l’analyse ionique.','Pour transmettre le dossier, indiquez l’échantillon, les données saisies et la date du calcul. Si la source change, créez un nouveau relevé plutôt que d’écraser la référence précédente.'] },
  ], sources:[{title:'Penn State Extension — A Water Quality Toolkit',url:'https://extension.psu.edu/a-water-quality-toolkit-for-greenhouse-and-nursery-production'}] },
  { slug:'fertigation-dilution-calculation', category:'Formulation', title:'Fertigation Dilution: Convert kg, g/L, and Injector Ratios', titleFr:'Dilution en fertigation : kg, g/L et ratios d’injection', description:'Work through a simple mass-and-volume example, distinguish stock from delivered solution, and check your units.', descriptionFr:'Un exemple de masse et volume pour distinguer solution mère et solution distribuée et vérifier les unités.', related:['how-to-calculate-fertilizer','how-to-mix-a-b-c-tanks','fertigation-report-checklist'], sections:[
    { title:'Name the concentration first', titleFr:'Nommez d’abord la concentration', en:['“Concentration” needs a label. It might refer to grams of commercial fertilizer per litre of stock, milligrams of a nutrient per litre of delivered water, or a nutrient total per hectare. These values are not interchangeable.','For a bookkeeping example, suppose 5 kg of a soluble product is present in a final stock volume of 100 L. This is an illustration of units, not a crop recipe. The product identity, solubility, water quality, and crop target still need separate decisions.'], fr:['Le mot « concentration » demande une précision : grammes de produit par litre de solution mère, milligrammes de nutriment par litre distribué ou total par hectare. Ces valeurs ne sont pas interchangeables.','Prenons 5 kg de produit soluble dans un volume final de 100 L. Cet exemple illustre les unités, pas une recette culturale. Le produit, sa solubilité, l’eau et la cible culturale restent à définir séparément.'] },
    { title:'Convert mass and divide by final volume', titleFr:'Convertissez la masse et divisez par le volume final', en:['5 kg × 1,000 = 5,000 g. Then 5,000 g ÷ 100 L = 50 g/L of commercial product in the stock solution. The denominator is the final solution volume, not an unrelated tank capacity.','A useful reverse check is 50 g/L × 100 L = 5,000 g. If that does not recover the original mass, check the kilogram-to-gram conversion and the entered volume before continuing.'], fr:['5 kg × 1 000 = 5 000 g. Puis 5 000 g ÷ 100 L = 50 g/L de produit commercial dans la solution mère. Le dénominateur est le volume final de solution, pas une capacité de cuve sans rapport.','Vérifiez à rebours : 50 g/L × 100 L = 5 000 g. Si la masse initiale n’est pas retrouvée, contrôlez la conversion et le volume saisi avant de poursuivre.'] },
    { title:'Apply the stated injector convention', titleFr:'Appliquez la convention de l’injecteur', en:['University of Georgia Extension describes 1:100 as one part stock in 100 parts of final solution. Under that convention, 50 g/L ÷ 100 = 0.5 g/L, or 500 mg/L, of commercial product in the delivered solution. Check the convention and setting in your injector manual.','This is still product concentration, not 500 mg/L of nitrogen. If the product label states 20% nitrogen by mass, the example delivers 500 × 0.20 = 100 mg/L of nitrogen from that product. Account separately for other inputs.'], fr:['L’University of Georgia Extension décrit 1:100 comme une part de solution mère dans 100 parts de solution finale. Ainsi, 50 g/L ÷ 100 = 0,5 g/L, soit 500 mg/L de produit distribué. Vérifiez la convention et le réglage du manuel.','Il s’agit du produit, et non de 500 mg/L d’azote. Si l’étiquette indique 20 % d’azote en masse, l’exemple apporte 500 × 0,20 = 100 mg/L d’azote par ce produit. Comptabilisez séparément les autres apports.'],source:0 },
    { title:'Separate the calculation from the equipment check', titleFr:'Séparez le calcul du contrôle matériel', en:['Write down the mass, final stock volume, dilution convention, nutrient percentage, and resulting concentration in one line. This makes a later change visible: doubling the mass at the same volume doubles the calculated stock concentration.','A correct worksheet does not establish what the equipment actually delivers. Follow the injector manufacturer’s calibration procedure. In AgroCalc Pro, check the entered quantities and volume, review the analysis, and export the report alongside your equipment notes.'], fr:['Notez sur une ligne la masse, le volume final, la convention de dilution, le pourcentage nutritif et la concentration. Un changement devient visible : doubler la masse à volume constant double la concentration calculée.','Une fiche correcte ne prouve pas ce que le matériel distribue. Suivez la procédure d’étalonnage du fabricant. Dans AgroCalc Pro, vérifiez quantités et volume, examinez l’analyse et exportez le rapport avec vos notes matérielles.'] },
  ], sources:[{title:'University of Georgia Extension — Fertilizer Injectors',url:'https://fieldreport.caes.uga.edu/publications/B1237/fertilizer-injectors-selection-maintenance-and-calibration/'}] },
  { slug:'fertigation-report-checklist', category:'Field workflow', title:'A Fertigation Report Checklist Before You Share the PDF', titleFr:'Rapport de fertigation : les vérifications avant le partage', description:'Review inputs, units, tank assignments, and version details before handing a formulation to your team.', descriptionFr:'Vérifiez saisies, unités, bacs et version avant de transmettre une formulation à votre équipe.', related:['how-to-calculate-fertilizer','how-to-mix-a-b-c-tanks','irrigation-water-test-checklist'],sections:[
    {title:'Make the report identifiable',titleFr:'Identifiez le rapport',en:['A PDF is most useful when the recipient can tell what it belongs to. Keep a field or greenhouse identifier, calculation date, and version reference with the exported report. If a field is not part of the app export, include it in the accompanying message or your filing system.','Use a consistent filename such as greenhouse-north-formulation-v02.pdf. Avoid sending several files called final.pdf: a readable version reference makes it easier to explain which calculation replaces the previous one.'],fr:['Le destinataire doit pouvoir identifier le PDF. Joignez la parcelle ou la serre, la date et la version au rapport exporté. Si une information ne figure pas dans l’export, indiquez-la dans le message ou votre classement.','Adoptez un nom comme serre-nord-formulation-v02.pdf. Évitez plusieurs fichiers final.pdf : une référence lisible permet de préciser quel calcul remplace le précédent.']},
    {title:'Check the inputs before the result',titleFr:'Contrôlez les entrées avant le résultat',en:['Compare every fertilizer quantity with your intended input list. Confirm the unit, the tank volume used in the calculation, the surface area, and the water EC. A plausible result is not proof that the original numbers were entered correctly.','Review the supported fertilizer list if a commercial name is unfamiliar. Do not silently substitute one product for another. Record any question about the product label before treating the report as the working formulation.'],fr:['Comparez chaque quantité avec la liste prévue. Vérifiez l’unité, le volume utilisé, la surface et l’EC de l’eau. Un résultat plausible ne prouve pas que les données initiales sont correctes.','Consultez les engrais pris en charge si un nom est inhabituel. Ne remplacez pas discrètement un produit par un autre. Notez les questions sur l’étiquette avant de retenir la formulation.']},
    {title:'Read the analysis and the tanks together',titleFr:'Lisez ensemble l’analyse et les bacs',en:['Review the ionic analysis, EC, and nutrient quantities per hectare, then compare the A/B/C distribution with the products entered. Check that the person receiving the report understands which figures describe the stock and which describe the calculated analysis.','Keep open questions visible. For example, a tank-volume correction requires a fresh calculation and a new export; changing the filename on an old report does not update its contents.'],fr:['Examinez l’analyse ionique, l’EC et les unités par hectare, puis comparez les bacs A/B/C aux produits saisis. Vérifiez que le destinataire distingue les valeurs de la solution mère et celles de l’analyse.','Gardez les questions visibles. Une correction du volume exige un nouveau calcul et un nouvel export : renommer un ancien fichier ne modifie pas son contenu.']},
    {title:'Send a clear handover',titleFr:'Transmettez un dossier clair',en:['Open the exported PDF before sharing it. Confirm that the pages display correctly and that the report matches the calculation you just reviewed. Share it using the phone’s available sharing options.','A short accompanying note can state the field, version, what changed, and who should review it. Retain the earlier version in your own records so that a later comparison has a clear starting point.'],fr:['Ouvrez le PDF avant de le partager. Vérifiez les pages et leur correspondance avec le calcul examiné. Utilisez ensuite les options de partage du téléphone.','Un message court peut préciser la parcelle, la version, les changements et la personne chargée de la relecture. Conservez l’ancienne version pour faciliter une comparaison ultérieure.']},
  ],sources:[] },
  {
    "slug": "cucumber-fertigation-guide",
    "category": "Crop nutrition",
    "title": "Cucumber Fertigation: Nutrient Schedule and EC by Stage",
    "titleFr": "Fertigation concombre : programme nutritif et EC par stade",
    "description": "Plan nitrogen, potassium, and phosphate for cucumber from transplant through harvest, with EC and pH targets at each stage.",
    "descriptionFr": "Planifiez N, K et P pour le concombre du repiquage à la récolte, avec les cibles EC et pH à chaque stade.",
    "related": [
      "tomato-fertigation-guide",
      "ec-in-greenhouse-crops",
      "how-to-mix-a-b-c-tanks"
    ],
    "sections": [
      {
        "title": "Nitrogen and potassium move together in cucumber",
        "titleFr": "L'azote et le potassium progressent ensemble chez le concombre",
        "en": [
          "Cucumber (Cucumis sativus) grown in substrate under protected conditions draws heavily on nitrogen and potassium from transplant through the end of harvest. The ratio between the two shifts as the plant moves from vegetative establishment to continuous fruiting. Early in the crop, a higher nitrogen proportion supports canopy development. From the first harvest onward, potassium demand rises relative to nitrogen as fruit fill becomes the dominant sink.",
          "Drip fertigation studies cited by the Haifa Group report that greenhouse cucumber on substrate may require nitrogen applied daily or on every other irrigation, with weekly totals in the range of 3.5 to 7 kg N per hectare once the crop is producing. These are planning references. The actual rate depends on plant size, temperature, substrate type, and the background mineral content of the irrigation water."
        ],
        "fr": [
          "Le concombre (Cucumis sativus) cultivé sur substrat sous abri prélève de grandes quantités d'azote et de potassium du repiquage à la fin de la récolte. Le rapport entre les deux évolue au cours du cycle : en début de culture, une proportion d'azote plus élevée soutient le développement du couvert végétal. Dès les premières récoltes, la demande en potassium augmente par rapport à l'azote.",
          "Des études de fertigation goutte-à-goutte rapportent que le concombre de serre sur substrat peut nécessiter un apport quotidien d'azote, avec des totaux hebdomadaires de l'ordre de 3,5 à 7 kg N par hectare en production. Ces valeurs sont des références de planification. Le taux réel dépend de la taille des plantes, de la température, du substrat et de la teneur minérale de l'eau d'irrigation."
        ],
        "source": 0
      },
      {
        "title": "EC targets and how to read them at different stages",
        "titleFr": "Objectifs EC et leur lecture selon les stades",
        "en": [
          "Cucumber EC and pH targets depend on cultivar, climate, water quality, substrate, and the measurement method. Measure the EC of the supplied solution and drainage separately; drainage EC is not directly comparable to a substrate extract. Use crop-specific local guidance to set a starting range, then adjust from plant response and root-zone measurements.",
          "Start new transplants with a solution appropriate to their limited root system and monitor drainage as demand increases during fruiting. Heat can change water uptake faster than nutrient uptake, so do not automatically raise EC in hot weather. In AgroCalc Pro, enter the source-water EC and review the estimated irrigation EC after setting fertilizer quantities; confirm the delivered solution with a meter."
        ],
        "fr": [
          "Les objectifs d’EC et de pH du concombre dépendent de la variété, du climat, de l’eau, du substrat et de la méthode de mesure. Mesurez séparément l’EC de la solution apportée et celle du drainage. Fixez une plage initiale avec des références locales, puis ajustez selon la plante et la zone racinaire.",
          "Au repiquage, choisissez une solution adaptée aux jeunes racines et suivez le drainage pendant la fructification. La chaleur peut modifier l’absorption d’eau plus vite que celle des nutriments : n’augmentez pas automatiquement l’EC. Dans AgroCalc Pro, examinez l’EC estimée après avoir fixé les doses et vérifiez la solution distribuée avec un conductimètre."
        ]
      },
      {
        "title": "Calcium and magnesium in a cucumber substrate solution",
        "titleFr": "Calcium et magnésium dans la solution nutritive du concombre",
        "en": [
          "Calcium supports cell-wall integrity in rapidly expanding fruit and helps prevent tip burn on young leaves. In substrate culture, calcium moves with the transpiration stream, so a reduced EC that also compresses calcium supply can appear first as fruit-quality problems rather than a visible leaf deficiency.",
          "Both calcium and magnesium matter in cucumber nutrition. Excess of either ion can affect uptake of the other, but there is no single Ca/Mg ratio that works for every water source and substrate. Check the individual Ca2+ and Mg2+ concentrations, drainage results, and crop symptoms together before changing the recipe."
        ],
        "fr": [
          "Le calcium soutient l'intégrité de la paroi cellulaire dans les fruits en expansion rapide et aide à prévenir la brûlure des jeunes feuilles. En substrat, le calcium se déplace avec le flux de transpiration, de sorte qu'une EC réduite comprimant l'apport en calcium peut d'abord se manifester comme des problèmes de qualité des fruits plutôt que comme une carence foliaire visible.",
          "Le calcium et le magnésium sont tous deux importants pour le concombre. Un excès de l’un peut modifier l’absorption de l’autre, mais aucun rapport Ca/Mg unique ne convient à toutes les eaux et tous les substrats. Examinez les concentrations individuelles, le drainage et les symptômes avant de changer la formule."
        ]
      },
      {
        "title": "Tank separation and the role of acid in cucumber fertigation",
        "titleFr": "Séparation des bacs et rôle de l'acide dans la fertigation du concombre",
        "en": [
          "Calcium nitrate goes into tank A and remains separated from sulfate- and phosphate-bearing fertilizers in tank B to prevent precipitation in the stock solution. Nitric acid, when used for pH adjustment, goes into tank C. This three-tank arrangement applies to cucumber as it does to other greenhouse crops.",
          "In AgroCalc Pro, after entering the fertilizer quantities for a cucumber formulation, use the Distribute Tanks function. The algorithm places calcium nitrate in Bac A and moves compatible nitrogen sources to balance the concentration between Bac A and Bac B. Review the result before mixing to confirm that no sulfate or phosphate source has been assigned to the same tank as calcium."
        ],
        "fr": [
          "Le nitrate de calcium va dans le bac A et reste séparé des engrais contenant des sulfates et des phosphates dans le bac B pour éviter la précipitation dans la solution mère. L'acide nitrique, utilisé pour l'ajustement du pH, va dans le bac C. Ce dispositif à trois bacs s'applique au concombre comme aux autres cultures de serre.",
          "Dans AgroCalc Pro, après avoir saisi les quantités d'engrais pour une formule concombre, utilisez la fonction Distribution des Bacs. L'algorithme place le nitrate de calcium dans le Bac A et déplace les sources d'azote compatibles pour équilibrer la concentration entre le Bac A et le Bac B. Examinez le résultat avant le mélange pour confirmer qu'aucune source de sulfate ou de phosphate n'a été assignée au même bac que le calcium."
        ]
      }
    ],
    "sources": [
      {
        "title": "Haifa Group — Cucumber Crop Guide: Fertigation Recommendations",
        "url": "https://www.haifa-group.com/cucumber-fertilizer/crop-guide-cucumber-fertilization-recommendations"
      }
    ]
  },
  {
    "slug": "pepper-fertigation-guide",
    "category": "Crop nutrition",
    "title": "Pepper Fertigation: Nutrient Targets and EC Management",
    "titleFr": "Fertigation poivron : cibles nutritives et gestion EC",
    "description": "Practical nutrient concentrations and EC targets for greenhouse pepper, with notes on calcium, potassium timing, and pH.",
    "descriptionFr": "Concentrations nutritives et cibles EC pour le poivron de serre, avec des notes sur le calcium, le potassium et le pH.",
    "related": [
      "tomato-fertigation-guide",
      "cucumber-fertigation-guide",
      "ec-in-greenhouse-crops"
    ],
    "sections": [
      {
        "title": "Pepper nutrient needs across the crop cycle",
        "titleFr": "Besoins nutritifs du poivron sur le cycle cultural",
        "en": [
          "Pepper (Capsicum annuum) in protected substrate culture shares some nutrient characteristics with tomato but generally operates at a somewhat lower EC. The crop has a long production cycle and shifts nutrient demand as it moves from vegetative establishment through fruit set and continuous harvest.",
          "Pepper nutrient targets should come from a validated program for the cultivar, growth stage, climate, substrate, and irrigation water. Compare the supplied and drainage EC, then use plant tissue or leaf analysis where available to refine the nitrogen, potassium, calcium, and magnesium supply. A single published solution is not a universal recipe."
        ],
        "fr": [
          "Le poivron (Capsicum annuum) en culture protégée sur substrat partage certaines caractéristiques nutritives avec la tomate, mais fonctionne généralement à une EC légèrement plus faible. La culture a un long cycle de production et fait évoluer la demande nutritive de l'installation végétative à la nouaison et à la récolte continue.",
          "Les objectifs nutritifs du poivron doivent provenir d’un programme validé pour la variété, le stade, le climat, le substrat et l’eau d’irrigation. Comparez l’EC de la solution fournie et du drainage ; utilisez une analyse foliaire si elle est disponible. Une formule publiée ne constitue pas une recette universelle."
        ],
        "source": 0
      },
      {
        "title": "Calcium and blossom-end rot in pepper",
        "titleFr": "Calcium et pourriture apicale chez le poivron",
        "en": [
          "Blossom-end rot in pepper is linked to localized calcium deficiency in developing fruit, even when soil or substrate calcium levels appear adequate. The condition reflects a delivery problem rather than a supply problem: calcium moves primarily with the transpiration stream, so fruit that transpire little during rapid expansion periods can develop symptoms.",
          "Maintaining consistent irrigation and avoiding large fluctuations in EC helps support steady calcium delivery. In the ionic analysis from AgroCalc Pro, Ca2+ appears as a separate line item. Compare it against the published target range for your crop stage and water source before adjusting the formulation."
        ],
        "fr": [
          "La pourriture apicale chez le poivron est liée à une carence localisée en calcium dans les fruits en développement, même lorsque les niveaux de calcium dans le sol ou le substrat semblent adéquats. Cette condition reflète un problème de livraison plutôt qu'un problème d'approvisionnement : le calcium se déplace principalement avec le flux de transpiration.",
          "Maintenir une irrigation régulière et éviter les grandes fluctuations d'EC aide à soutenir un apport stable en calcium. Dans l'analyse ionique d'AgroCalc Pro, le Ca2+ apparaît comme un élément distinct. Comparez-le avec la plage cible publiée pour votre stade cultural et votre source d'eau avant d'ajuster la formulation."
        ]
      },
      {
        "title": "Reading EC and adjusting for growth stage",
        "titleFr": "Lecture de l'EC et ajustement selon le stade cultural",
        "en": [
          "A supplied EC of 2.5 mS/cm at planting may need adjustment as the crop develops and fruit load increases. Consistent monitoring of the drainage EC gives an indication of whether the root zone is accumulating salts or whether the solution is being diluted by the plant. A drainage EC significantly above the supplied solution suggests salt accumulation; a drainage EC below the supplied solution suggests high water uptake relative to nutrients.",
          "In AgroCalc Pro, the EC irrigation field calculates the estimated EC of the delivered solution based on the fertilizer quantities and the tank EC entered. Use this alongside a field conductivity meter rather than as a substitute for it."
        ],
        "fr": [
          "Une EC fournie de 2,5 mS/cm à la plantation peut nécessiter un ajustement au fur et à mesure que la culture se développe et que la charge en fruits augmente. Un suivi régulier de l'EC du drainage indique si la zone racinaire accumule des sels ou si la solution est diluée par la plante.",
          "Dans AgroCalc Pro, le champ EC irrigation calcule l'EC estimée de la solution distribuée en fonction des quantités d'engrais et de l'EC de la cuve saisie. Utilisez-le avec un conductimètre de terrain plutôt que comme substitut à celui-ci."
        ]
      }
    ],
    "sources": [
      {
        "title": "UF/IFAS Extension — Fertilizer Management for Greenhouse Vegetables",
        "url": "https://ask.ifas.ufl.edu/publication/CV265"
      }
    ]
  },
  {
    "slug": "ionic-balance-fertigation-explained",
    "category": "Formulation",
    "title": "Ionic Balance in Fertigation: What meq/L Means and Why It Matters",
    "titleFr": "Équilibre ionique en fertigation : ce que signifie meq/L et pourquoi c'est important",
    "description": "Learn what milliequivalents per litre measure, how anion and cation totals should relate, and what a large imbalance indicates in practice.",
    "descriptionFr": "Comprenez ce que mesurent les milliéquivalents par litre, comment les totaux anions-cations doivent se rapporter et ce qu'un grand déséquilibre indique.",
    "related": [
      "how-to-calculate-fertilizer",
      "ec-in-greenhouse-crops",
      "tomato-fertigation-guide"
    ],
    "sections": [
      {
        "title": "Why fertigation uses meq/L instead of mg/L",
        "titleFr": "Pourquoi la fertigation utilise meq/L plutôt que mg/L",
        "en": [
          "A milligram per litre expresses mass concentration. A milliequivalent per litre expresses charge concentration: it accounts for both the mass and the ionic charge of each nutrient. Because ions interact in solution through their charges, the milliequivalent unit makes it possible to compare and balance cations and anions directly.",
          "A milliequivalent already includes ionic charge: one mmol/L of Ca2+ equals two meq/L, while one mmol/L of K+ equals one meq/L. Once both are expressed in meq/L, one unit represents the same amount of charge. The totals of measured cations and anions should approximately match when the full water and fertilizer composition is included."
        ],
        "fr": [
          "Un milligramme par litre exprime une concentration massique. Un milliéquivalent par litre exprime une concentration de charge : il tient compte à la fois de la masse et de la charge ionique de chaque nutriment. Parce que les ions interagissent en solution par leurs charges, l'unité milliéquivalent permet de comparer et d'équilibrer directement les cations et les anions.",
          "Le milliéquivalent tient déjà compte de la charge ionique : 1 mmol/L de Ca2+ correspond à 2 meq/L, tandis que 1 mmol/L de K+ correspond à 1 meq/L. Une fois exprimée en meq/L, chaque unité représente la même quantité de charge. Les totaux des cations et des anions doivent être proches lorsque la composition complète de l’eau et des engrais est incluse."
        ]
      },
      {
        "title": "Anions and cations in a nutrient solution",
        "titleFr": "Anions et cations dans une solution nutritive",
        "en": [
          "The main anions in a fertigation solution are nitrate (NO3-), dihydrogen phosphate (H2PO4-), sulfate (SO42-), and chloride (Cl-). The main cations are potassium (K+), calcium (Ca2+), magnesium (Mg2+), ammonium (NH4+), and in acidified solutions, proton (H+).",
          "AgroCalc Pro calculates the meq/L for each of these ions from the fertilizer quantities entered. The ionic balance section of the report shows each ion on a separate row. Reviewing the total anion and total cation figures gives an immediate indication of whether the formulation is approximately balanced or whether one group significantly exceeds the other."
        ],
        "fr": [
          "Les principaux anions dans une solution de fertigation sont le nitrate (NO3-), le dihydrogénophosphate (H2PO4-), le sulfate (SO42-) et le chlorure (Cl-). Les principaux cations sont le potassium (K+), le calcium (Ca2+), le magnésium (Mg2+), l'ammonium (NH4+) et, dans les solutions acidifiées, le proton (H+).",
          "AgroCalc Pro calcule le meq/L pour chacun de ces ions à partir des quantités d'engrais saisies. La section équilibre ionique du rapport affiche chaque ion sur une ligne distincte."
        ]
      },
      {
        "title": "What a large imbalance in the ionic analysis indicates",
        "titleFr": "Ce qu'un grand déséquilibre dans l'analyse ionique indique",
        "en": [
          "In practice, a nutrient solution does not need to be exactly balanced to the decimal. Acids used for pH correction contribute protons to the cation side. Small differences between anion and cation totals are normal. A difference of several meq/L, however, warrants a check of the fertilizer quantities entered.",
          "Common causes of large imbalances include entering a fertilizer quantity in a different unit than intended, selecting the wrong fertilizer for the required ion, or omitting one of the tank components from the calculation. In AgroCalc Pro, review the individual ion rows first. A zero where a value is expected is often the clearest signal that a fertilizer quantity was not entered."
        ],
        "fr": [
          "En pratique, une solution nutritive n'a pas besoin d'être exactement équilibrée à la décimale près. Les acides utilisés pour la correction du pH contribuent des protons du côté cationique. De petites différences entre les totaux anioniques et cationiques sont normales. Une différence de plusieurs meq/L, cependant, justifie une vérification des quantités d'engrais saisies.",
          "Les causes courantes de grands déséquilibres comprennent la saisie d'une quantité d'engrais dans une unité différente de celle prévue, la sélection du mauvais engrais pour l'ion requis, ou l'omission d'un des composants du bac dans le calcul. Dans AgroCalc Pro, examinez d'abord les lignes d'ions individuelles."
        ]
      },
      {
        "title": "Using the ionic analysis alongside the EC figure",
        "titleFr": "Utiliser l'analyse ionique avec la valeur EC",
        "en": [
          "Electrical conductivity measures the total dissolved salt load but does not identify which ions are present. A solution can have the target EC while being poorly balanced between anions and cations, or while missing a specific nutrient. The ionic analysis resolves what the EC measurement alone does not show.",
          "When reviewing the AgroCalc Pro report, check the EC irrigation figure first to see whether the total is in the expected range, then review the ionic balance to confirm that individual nutrients are present at appropriate concentrations. The two sections together give a more complete picture of the formulation than either one alone."
        ],
        "fr": [
          "La conductivité électrique mesure la charge totale en sels dissous mais n'identifie pas les ions présents. Une solution peut avoir l'EC cible tout en étant mal équilibrée entre anions et cations, ou en manquant d'un nutriment spécifique. L'analyse ionique résout ce que la mesure EC seule ne montre pas.",
          "Lors de l'examen du rapport AgroCalc Pro, vérifiez d'abord la valeur EC irrigation pour voir si le total se situe dans la plage attendue, puis examinez l'équilibre ionique pour confirmer que les nutriments individuels sont présents à des concentrations appropriées."
        ]
      }
    ],
    "sources": []
  },
  {
    "slug": "nh4-no3-ratio-fertigation",
    "category": "Formulation",
    "title": "NH4/NO3 Ratio in Fertigation: Choosing the Right Nitrogen Form",
    "titleFr": "Ratio NH4/NO3 en fertigation : choisir la bonne forme d'azote",
    "description": "Understand when to favour nitrate or ammonium nitrogen, how the ratio affects pH in the root zone, and typical targets by crop.",
    "descriptionFr": "Comprenez quand privilégier l'azote nitrique ou ammoniacal, comment le ratio affecte le pH rhizosphérique et les cibles typiques par culture.",
    "related": [
      "ionic-balance-fertigation-explained",
      "tomato-fertigation-guide",
      "how-to-calculate-fertilizer"
    ],
    "sections": [
      {
        "title": "How plants take up nitrate and ammonium differently",
        "titleFr": "Comment les plantes absorbent différemment le nitrate et l'ammonium",
        "en": [
          "Plants absorb nitrogen primarily as nitrate (NO3-) or ammonium (NH4+). When a root takes up nitrate, it releases a bicarbonate or hydroxyl ion that slightly raises pH in the immediate root zone. When a root takes up ammonium, it releases a proton that slightly lowers pH in the same zone. The proportion of each form in the supply solution therefore influences rhizosphere pH over time.",
          "Ammonium tolerance depends on crop, temperature, root-zone pH, aeration, and the share of nitrogen supplied as ammonium. In cool or poorly aerated conditions, monitor ammonium and root health closely and avoid assuming a universal safe concentration. Nitrification may also occur in biologically active substrates, but its rate varies with conditions."
        ],
        "fr": [
          "Les plantes absorbent l'azote principalement sous forme de nitrate (NO3-) ou d'ammonium (NH4+). Quand une racine absorbe du nitrate, elle libère un ion bicarbonate ou hydroxyle qui augmente légèrement le pH dans la zone racinaire immédiate. Quand une racine absorbe de l'ammonium, elle libère un proton qui abaisse légèrement le pH dans la même zone.",
          "La tolérance à l’ammonium dépend de la culture, de la température, du pH racinaire, de l’aération et de la part d’azote fournie sous cette forme. En conditions froides ou peu aérées, surveillez l’ammonium et la santé des racines sans supposer qu’une concentration universelle soit sûre. La nitrification peut aussi avoir lieu dans les substrats biologiquement actifs."
        ]
      },
      {
        "title": "Typical NH4/NO3 targets by crop group",
        "titleFr": "Cibles typiques NH4/NO3 par groupe de cultures",
        "en": [
          "Most greenhouse vegetable programs supply a larger share of nitrogen as nitrate than as ammonium. The suitable ammonium fraction changes with crop, medium, water alkalinity, and climate, so use a locally validated formulation instead of one ratio for every crop. Track root-zone pH and plant response when changing nitrogen form.",
          "In AgroCalc Pro, the nitrogen form section of the report displays the calculated NH4 and NO3 proportions. If the ammonium percentage exceeds the target range for the crop, review which fertilizers are contributing ammonium: urea, ammonium nitrate, MAP, and ammonium sulfate all provide NH4+ or convert to it. Replacing part of these with a nitrate source will shift the proportion."
        ],
        "fr": [
          "La plupart des programmes de légumes sous serre apportent davantage d’azote sous forme nitrique que sous forme ammoniacale. La fraction d’ammonium adaptée varie selon la culture, le substrat, l’alcalinité de l’eau et le climat : utilisez une formule validée localement. Suivez le pH racinaire et la réponse des plantes après tout changement.",
          "Dans AgroCalc Pro, la section forme de l'azote du rapport affiche les proportions NH4 et NO3 calculées. Si le pourcentage d'ammonium dépasse la plage cible pour la culture, examinez quels engrais contribuent à l'ammonium : l'urée, le nitrate d'ammonium, le MAP et le sulfate d'ammonium fournissent tous du NH4+ ou s'y convertissent."
        ]
      },
      {
        "title": "Adjusting the ratio without changing total nitrogen",
        "titleFr": "Ajuster le ratio sans modifier l'azote total",
        "en": [
          "If the ionic analysis shows that ammonium represents a higher percentage than intended, one option is to replace part of a NH4-bearing fertilizer with an additional nitrate source such as potassium nitrate or calcium nitrate. This increases NO3- while keeping total nitrogen approximately constant, provided the quantities are adjusted proportionally.",
          "Replacing ammonium with nitrate from potassium nitrate simultaneously increases K+. Replacing it with calcium nitrate simultaneously increases Ca2+. Both changes affect other parts of the ionic balance. Review the complete analysis after adjusting rather than checking only the nitrogen form percentage."
        ],
        "fr": [
          "Si l'analyse ionique montre que l'ammonium représente un pourcentage plus élevé que prévu, une option consiste à remplacer une partie d'un engrais contenant du NH4 par une source de nitrate supplémentaire comme le nitrate de potassium ou le nitrate de calcium.",
          "Remplacer l'ammonium par du nitrate provenant du nitrate de potassium augmente simultanément K+. Le remplacer par du nitrate de calcium augmente simultanément Ca2+. Les deux changements affectent d'autres parties de l'équilibre ionique. Examinez l'analyse complète après ajustement."
        ]
      }
    ],
    "sources": []
  },
  {
    "slug": "ph-management-fertigation",
    "category": "Water & EC",
    "title": "pH in Fertigation: Why It Changes and How to Stabilise It",
    "titleFr": "pH en fertigation : pourquoi il varie et comment le stabiliser",
    "description": "Trace the main causes of pH drift in fertigation systems, review typical crop targets, and understand the role of acid injection and bicarbonate management.",
    "descriptionFr": "Identifiez les causes du dérive du pH, les cibles typiques par culture et le rôle de l'injection d'acide et de la gestion des bicarbonates.",
    "related": [
      "irrigation-water-test-checklist",
      "ec-in-greenhouse-crops",
      "ionic-balance-fertigation-explained"
    ],
    "sections": [
      {
        "title": "Why pH matters for nutrient availability",
        "titleFr": "Pourquoi le pH compte pour la disponibilité des nutriments",
        "en": [
          "Nutrient availability in solution and in substrate is pH-dependent. Phosphate is most available between pH 5.5 and 7.0. Iron, manganese, zinc, and boron become less available as pH rises above 6.5. At pH below 5.5, aluminium and manganese may reach concentrations that reduce root function. The practical consequence is that maintaining the irrigation solution within a defined pH range supports consistent nutrient uptake across the crop cycle.",
          "Most greenhouse crops on substrate target a supplied solution pH between 5.5 and 6.5. Blueberry is an exception, requiring a lower range of 4.5 to 5.5 due to its specific soil chemistry requirements in field conditions, which are partially reflected in substrate management."
        ],
        "fr": [
          "La disponibilité des nutriments en solution et en substrat dépend du pH. Le phosphate est le plus disponible entre pH 5,5 et 7,0. Le fer, le manganèse, le zinc et le bore deviennent moins disponibles lorsque le pH dépasse 6,5. En dessous de pH 5,5, l'aluminium et le manganèse peuvent atteindre des concentrations qui réduisent la fonction racinaire.",
          "La plupart des cultures de serre sur substrat ciblent un pH de solution fournie entre 5,5 et 6,5. La myrtille est une exception, nécessitant une plage plus basse de 4,5 à 5,5."
        ]
      },
      {
        "title": "Bicarbonate as the main cause of pH rise",
        "titleFr": "Les bicarbonates comme principale cause d'augmentation du pH",
        "en": [
          "Irrigation water commonly contains bicarbonate (HCO3-) from dissolved limestone. When this water enters a fertigation system without treatment, the bicarbonate raises the pH of the final solution. The degree of effect depends on the bicarbonate concentration in the source water and the buffering capacity of the fertilizer solution.",
          "A water analysis report expresses bicarbonate concentration as alkalinity, often in meq/L or mg/L as calcium carbonate. When entering the water EC in AgroCalc Pro, also note the alkalinity from the most recent water test, since a high bicarbonate water may require acid injection before the formulated nutrients are applied."
        ],
        "fr": [
          "L'eau d'irrigation contient souvent des bicarbonates (HCO3-) provenant de calcaire dissous. Lorsque cette eau entre dans un système de fertigation sans traitement, le bicarbonate élève le pH de la solution finale.",
          "Un rapport d'analyse d'eau exprime la concentration en bicarbonates comme alcalinité, souvent en meq/L ou mg/L sous forme de carbonate de calcium."
        ]
      },
      {
        "title": "Acid injection for pH correction",
        "titleFr": "Injection d'acide pour la correction du pH",
        "en": [
          "Nitric acid (HNO3) and phosphoric acid (H3PO4) are the acids most commonly used to neutralize bicarbonate in greenhouse fertigation. Nitric acid contributes NO3- to the nitrogen supply of the solution. Phosphoric acid contributes H2PO4-. Both need to be entered in the fertigation formulation since they affect the ionic balance.",
          "AgroCalc Pro includes nitric and phosphoric acid as formulation inputs, so their nutrient contributions should be accounted for when reviewing the ionic analysis. Follow the tank assignment shown by the app and the chemical supplier’s handling instructions; acid and fertilizer compatibility must be checked before mixing. Verify the pH of the delivered solution with a calibrated meter."
        ],
        "fr": [
          "L'acide nitrique (HNO3) et l'acide phosphorique (H3PO4) sont les acides les plus couramment utilisés pour neutraliser les bicarbonates en fertigation de serre. L'acide nitrique contribue des NO3- à l'apport azoté de la solution. L'acide phosphorique contribue des H2PO4-.",
          "AgroCalc Pro inclut les acides nitrique et phosphorique parmi les intrants : leurs apports nutritifs doivent entrer dans l’analyse ionique. Suivez l’affectation des bacs affichée par l’application et les consignes du fournisseur ; vérifiez la compatibilité avant tout mélange. Contrôlez le pH de la solution distribuée avec un appareil étalonné."
        ]
      }
    ],
    "sources": []
  },
  {
    "slug": "strawberry-fertigation-guide",
    "category": "Crop nutrition",
    "title": "Strawberry Fertigation: Nutrient Solution for Vegetative and Fruiting Stages",
    "titleFr": "Fertigation fraisier : solution nutritive pour les stades végétatif et fructification",
    "description": "Review ionic targets for strawberry grown on substrate, differences between the vegetative and fruiting phases, and EC management.",
    "descriptionFr": "Examinez les cibles ioniques pour le fraisier sur substrat, les différences entre phases végétative et fructification, et la gestion de l'EC.",
    "related": [
      "cucumber-fertigation-guide",
      "tomato-fertigation-guide",
      "ec-in-greenhouse-crops"
    ],
    "sections": [
      {
        "title": "Two distinct nutrient phases in strawberry",
        "titleFr": "Deux phases nutritives distinctes chez le fraisier",
        "en": [
          "Strawberry (Fragaria × ananassa) on substrate in protected conditions moves through a vegetative establishment phase and a fruiting phase that differ in their nutrient demand. During vegetative growth, nitrogen and phosphate are prioritized to support root and canopy development. During fruiting, potassium demand rises as fruit fill and sugar accumulation become the dominant sinks.",
          "For substrate strawberry, start with a crop-stage program suited to the cultivar and water analysis. During fruiting, compare potassium and calcium supply with the observed fruit load and drainage results. Nutrient tables from soil-grown strawberry cannot be transferred directly to a closed or open substrate system."
        ],
        "fr": [
          "Le fraisier (Fragaria × ananassa) sur substrat en conditions protégées traverse une phase végétative et une phase de fructification qui diffèrent dans leur demande nutritive. En croissance végétative, l'azote et le phosphate sont prioritaires pour soutenir le développement racinaire et du couvert. En fructification, la demande en potassium augmente.",
          "Pour la fraise sur substrat, commencez par un programme adapté au stade, à la variété et à l’analyse de l’eau. Pendant la fructification, confrontez les apports de potassium et de calcium à la charge en fruits et au drainage. Les tableaux destinés à la culture en sol ne se transfèrent pas directement à un système sur substrat."
        ]
      },
      {
        "title": "EC and pH targets for strawberry substrate culture",
        "titleFr": "Cibles EC et pH pour le fraisier en culture sur substrat",
        "en": [
          "Strawberry is sensitive to high salinity. The supplied EC is commonly maintained between 1.5 and 2.5 mS/cm, with lower values in hot weather or when plants are under other stresses. A persistently high EC in the substrate can reduce fruit size and weight. The supplied pH is typically maintained between 5.5 and 6.5.",
          "Because strawberry EC targets are lower than those for tomato or cucumber, the fertilizer quantities per unit volume are also lower. When entering a strawberry formulation in AgroCalc Pro, review the calculated EC irrigation carefully. A formulation designed for tomato applied to strawberry at the same concentration would exceed the appropriate range."
        ],
        "fr": [
          "Le fraisier est sensible à la salinité élevée. L'EC fournie est généralement maintenue entre 1,5 et 2,5 mS/cm, avec des valeurs plus basses par temps chaud. Le pH fourni est typiquement maintenu entre 5,5 et 6,5.",
          "Parce que les cibles EC du fraisier sont plus basses que celles de la tomate ou du concombre, les quantités d'engrais par volume unitaire sont également plus faibles. Lors de la saisie d'une formulation fraisier dans AgroCalc Pro, examinez attentivement l'EC irrigation calculée."
        ]
      },
      {
        "title": "Check drainage and adjust the recipe",
        "titleFr": "Contr?ler le drainage et ajuster la formule",
        "en": [
          "Measure supplied and drainage EC and pH on a consistent schedule. A rising drainage EC can indicate salt accumulation, while a falling value may reflect a different balance of water and nutrient uptake. Record the sampling time and method so results are comparable.",
          "Use AgroCalc Pro to recalculate the fertilizer quantities after a change in water quality or crop stage. Confirm the delivered solution with a calibrated meter and review fruit quality, root health, and drainage before making another change."
        ],
        "fr": [
          "Mesurez régulièrement l’EC et le pH de la solution apportée et du drainage. Une EC de drainage en hausse peut signaler une accumulation de sels ; une baisse peut traduire une autre relation entre absorption d’eau et de nutriments. Notez l’heure et la méthode de prélèvement pour comparer les résultats.",
          "Utilisez AgroCalc Pro pour recalculer les doses après un changement d’eau ou de stade cultural. Vérifiez la solution distribuée avec un appareil étalonné et examinez la qualité des fruits, les racines et le drainage avant une nouvelle modification."
        ]
      }
    ],
    "sources": [
      {
        "title": "University of Minnesota Extension — Strawberry nutrient management",
        "url": "https://extension.umn.edu/agriculture/specialty-crops/commercial-fruit-production/strawberry-farming/strawberry-nutrient-management"
      }
    ]
  },
  {
    "slug": "fertigation-scheduling-drip-irrigation",
    "category": "Field workflow",
    "title": "Fertigation Scheduling with Drip Irrigation: Frequency and Timing",
    "titleFr": "Planification de la fertigation en irrigation goutte-à-goutte : fréquence et timing",
    "description": "Plan when and how often to fertigate, how to distribute applications across the irrigation cycle, and what to check before and after each event.",
    "descriptionFr": "Planifiez quand et à quelle fréquence fertiguer, comment répartir les apports sur le cycle d'irrigation et les contrôles avant et après chaque événement.",
    "related": [
      "how-to-calculate-fertilizer",
      "irrigation-water-test-checklist",
      "fertigation-report-checklist"
    ],
    "sections": [
      {
        "title": "Start and end clean, inject in the middle",
        "titleFr": "Commencer et finir propre, injecter au milieu",
        "en": [
          "A standard practice in drip fertigation is to begin each irrigation event with plain water, inject the nutrient solution during the main body of the event, and then flush with plain water at the end. The opening flush wets the substrate and establishes flow before nutrients enter the system. The closing flush pushes the nutrient solution down to the root zone and clears the lines of fertilizer residue.",
          "The University of Florida IFAS Extension notes that fertilizer must be completely flushed from the system after fertigation to keep drip lines clean and prevent emitter clogging. If the closing flush is skipped or shortened, residue dries in the laterals and at the emitters, reducing output uniformity over time."
        ],
        "fr": [
          "Une pratique standard en fertigation goutte-à-goutte consiste à commencer chaque événement d'irrigation avec de l'eau claire, injecter la solution nutritive pendant le corps principal de l'événement, puis rincer avec de l'eau claire à la fin.",
          "L'University of Florida IFAS Extension note que l'engrais doit être complètement rincé du système après la fertigation pour maintenir les lignes de goutte-à-goutte propres et prévenir le colmatage des émetteurs."
        ],
        "source": 0
      },
      {
        "title": "Frequency versus concentration: finding the right balance",
        "titleFr": "Fréquence versus concentration : trouver le bon équilibre",
        "en": [
          "In high-frequency drip systems, small volumes of solution are applied several times per day. The nutrient concentration per event can be lower because applications are more frequent. In less frequent systems, a higher concentration is used to deliver the same daily nutrient total. The choice between these approaches depends on the crop, substrate type, evapotranspiration rate, and equipment.",
          "University of Florida guidance suggests that if an injection system takes more than one to one and a half hours to complete a single weekly fertigation event, the grower should inject smaller amounts more than once per week to avoid leaching irrigation events that carry nutrients past the root zone. This is a practical criterion for deciding whether to split applications."
        ],
        "fr": [
          "Dans les systèmes goutte-à-goutte à haute fréquence, de petits volumes de solution sont appliqués plusieurs fois par jour. Dans les systèmes moins fréquents, une concentration plus élevée est utilisée pour fournir le même total nutritif journalier.",
          "Les recommandations de l'Université de Floride suggèrent que si un système d'injection prend plus d'une heure à une heure et demie pour compléter un événement de fertigation hebdomadaire, le producteur devrait injecter de plus petites quantités plus d'une fois par semaine pour éviter les événements d'irrigation lessivants."
        ],
        "source": 0
      },
      {
        "title": "What to record for each fertigation event",
        "titleFr": "Ce qu'il faut enregistrer pour chaque événement de fertigation",
        "en": [
          "For each event, note the date and time, the start and end of the nutrient injection, the EC and pH of the supplied solution measured at the outlet, the volume applied, and any observations about system performance. If a drainage sample is taken, add the drainage EC and volume.",
          "The AgroCalc Pro PDF report can serve as the formulation record for the event. A short handwritten or digital note referencing the report version, the application volume, and the measured outlet EC completes the documentation for that event. This makes a later review straightforward: the formulation is in the report, and the delivery detail is in the accompanying note."
        ],
        "fr": [
          "Pour chaque événement, notez la date et l'heure, le début et la fin de l'injection de nutriments, l'EC et le pH de la solution fournie mesurée à la sortie, le volume appliqué et toute observation sur les performances du système.",
          "Le rapport PDF d'AgroCalc Pro peut servir de relevé de formulation pour l'événement. Une courte note manuscrite ou numérique référençant la version du rapport, le volume d'application et l'EC de sortie mesurée complète la documentation pour cet événement."
        ]
      }
    ],
    "sources": [
      {
        "title": "University of Florida IFAS Extension — Fertigation for Vegetables: A Practical Guide",
        "url": "https://ask.ifas.ufl.edu/publication/HS1206"
      }
    ]
  },
  {
    "slug": "calcium-magnesium-ratio-fertigation",
    "category": "Formulation",
    "title": "Calcium to Magnesium Ratio in Fertigation: Targets and Adjustments",
    "titleFr": "Rapport calcium/magnésium en fertigation : cibles et ajustements",
    "description": "Understand why Ca/Mg balance matters, published ratio ranges by crop, and how to adjust individual ions without disrupting the overall formulation.",
    "descriptionFr": "Comprenez pourquoi l'équilibre Ca/Mg est important, les plages de ratio publiées par culture et comment ajuster les ions sans perturber la formulation globale.",
    "related": [
      "ionic-balance-fertigation-explained",
      "cucumber-fertigation-guide",
      "tomato-fertigation-guide"
    ],
    "sections": [
      {
        "title": "Why calcium and magnesium interact in the root zone",
        "titleFr": "Pourquoi calcium et magnésium interagissent dans la zone racinaire",
        "en": [
          "Calcium and magnesium are taken up by the same transport pathways in the root. High concentrations of one can competitively reduce uptake of the other. A solution with a very high Ca/Mg ratio tends to suppress magnesium uptake; a very low ratio, where magnesium is high relative to calcium, can reduce calcium delivery to rapidly growing tissue.",
          "A useful Ca/Mg assessment starts with the individual calcium and magnesium concentrations in both the water and the final solution. Their ratio is one diagnostic clue, not a universal target: substrate exchange capacity, potassium levels, crop stage, and drainage can all change uptake. Compare both nutrients with a locally appropriate crop program."
        ],
        "fr": [
          "Le calcium et le magnésium sont absorbés par les mêmes voies de transport dans la racine. Des concentrations élevées de l'un peuvent réduire de façon compétitive l'absorption de l'autre.",
          "L’évaluation Ca/Mg commence par les concentrations individuelles de calcium et de magnésium dans l’eau et la solution finale. Leur rapport est un indice, pas une cible universelle : le substrat, le potassium, le stade et le drainage modifient l’absorption. Comparez les deux nutriments à un programme local adapté."
        ]
      },
      {
        "title": "Fertilizer sources for each ion and their effect on the balance",
        "titleFr": "Sources d'engrais pour chaque ion et leur effet sur l'équilibre",
        "en": [
          "Calcium in fertigation is supplied mainly by calcium nitrate. Magnesium is supplied by magnesium nitrate (N MgO) or magnesium sulfate (S MgO). Changing the quantity of calcium nitrate affects Ca2+ and NO3- simultaneously. Changing magnesium sulfate affects Mg2+ and SO42- simultaneously. Neither adjustment is isolated to a single ion.",
          "In AgroCalc Pro, Ca2+ and Mg2+ appear separately in the ionic analysis. Review both values before dividing one by the other; a plausible ratio can hide a shortage of both nutrients. After changing a fertilizer source, recalculate the full formulation because nitrate, sulfate, and EC may change too."
        ],
        "fr": [
          "Le calcium en fertigation est principalement apporté par le nitrate de calcium. Le magnésium est apporté par le nitrate de magnésium (N MgO) ou le sulfate de magnésium (S MgO). Modifier la quantité de nitrate de calcium affecte simultanément Ca2+ et NO3-.",
          "Dans AgroCalc Pro, Ca2+ et Mg2+ figurent séparément dans l’analyse ionique. Examinez les deux valeurs avant de calculer leur rapport : un rapport plausible peut masquer une carence des deux éléments. Après un changement d’engrais, recalculez toute la formule, car le nitrate, le sulfate et l’EC peuvent aussi évoluer."
        ]
      },
      {
        "title": "When the ratio is misleading",
        "titleFr": "Quand le rapport induit en erreur",
        "en": [
          "A water source rich in calcium can create a high Ca/Mg ratio before fertilizer is added. Adding magnesium may help only if the crop actually needs more magnesium; first check water analysis, leaf or tissue results, and the root-zone measurements.",
          "Two recipes can have the same Ca/Mg ratio while supplying very different amounts of both ions. Use absolute concentrations and crop response as the main decision points, then use the ratio to identify possible competition."
        ],
        "fr": [
          "Une eau riche en calcium peut créer un rapport Ca/Mg élevé avant l’ajout d’engrais. Un apport de magnésium n’aide que si la culture en manque réellement ; vérifiez d’abord l’eau, les analyses foliaires et les mesures racinaires.",
          "Deux formules peuvent présenter le même rapport Ca/Mg tout en apportant des quantités très différentes des deux ions. Fondez la décision sur les concentrations absolues et la réponse de la culture, puis utilisez le rapport pour repérer une éventuelle compétition."
        ]
      }
    ],
    "sources": []
  },
  {
    "slug": "stock-solution-preparation-fertigation",
    "category": "Tank management",
    "title": "Preparing a Fertigation Stock Solution: Dissolution Order and Tank Volumes",
    "titleFr": "Préparer une solution mère de fertigation : ordre de dissolution et volumes de cuve",
    "description": "Follow the correct dissolution sequence, understand why tank volume affects concentration, and check the result before connecting to the irrigation system.",
    "descriptionFr": "Suivez la bonne séquence de dissolution, comprenez comment le volume de cuve affecte la concentration et vérifiez le résultat avant connexion au système.",
    "related": [
      "how-to-mix-a-b-c-tanks",
      "fertigation-dilution-calculation",
      "fertigation-report-checklist"
    ],
    "sections": [
      {
        "title": "Fill the tank partially before adding fertilizer",
        "titleFr": "Remplir partiellement la cuve avant d'ajouter l'engrais",
        "en": [
          "The standard procedure for preparing a stock solution is to add water to the tank first, then add fertilizer to the water. Adding fertilizer directly to an empty tank and then adding water can cause localized high-concentration zones that dissolve unevenly and, in some cases, can release heat or fumes. Filling the tank to about half the target volume before adding fertilizer reduces this risk.",
          "Once the fertilizer is added and dissolved, top up to the final volume. This approach ensures that the denominator in the concentration calculation corresponds to the actual volume of solution in the tank, not an estimated or intermediate volume."
        ],
        "fr": [
          "La procédure standard pour préparer une solution mère consiste à ajouter d'abord de l'eau dans la cuve, puis à ajouter l'engrais à l'eau. Remplir la cuve à environ la moitié du volume cible avant d'ajouter l'engrais réduit les risques.",
          "Une fois l'engrais ajouté et dissous, complétez jusqu'au volume final. Cette approche garantit que le dénominateur dans le calcul de concentration correspond au volume réel de solution dans la cuve."
        ]
      },
      {
        "title": "Never mix calcium with sulfate or phosphate in the same stock tank",
        "titleFr": "Ne jamais mélanger calcium avec sulfate ou phosphate dans la même cuve mère",
        "en": [
          "Calcium reacts with sulfate to form calcium sulfate (gypsum) and with phosphate to form calcium phosphate, both of which are sparingly soluble. In a concentrated stock solution, these reactions produce white precipitates that reduce the actual nutrient concentration in the solution and deposit scale in tanks, pipes, and emitters.",
          "The three-tank system prevents this by keeping calcium nitrate in tank A and sulfate- or phosphate-bearing fertilizers in tank B. These are only combined when diluted into the irrigation main, where concentrations are low enough to stay in solution. In AgroCalc Pro, the Distribute Tanks function assigns calcium nitrate to Bac A automatically. Verify the assignment before preparing the stock."
        ],
        "fr": [
          "Le calcium réagit avec le sulfate pour former du sulfate de calcium (gypse) et avec le phosphate pour former du phosphate de calcium, tous deux peu solubles. Dans une solution mère concentrée, ces réactions produisent des précipités blancs.",
          "Le système à trois bacs évite cela en gardant le nitrate de calcium dans le bac A et les engrais contenant des sulfates ou phosphates dans le bac B. Dans AgroCalc Pro, la fonction Distribution des Bacs assigne automatiquement le nitrate de calcium au Bac A."
        ]
      },
      {
        "title": "Measuring and confirming the prepared stock",
        "titleFr": "Mesurer et confirmer la solution mère préparée",
        "en": [
          "Measure the prepared stock and the delivered irrigation solution separately. The EC of a concentrated stock is not reliably 100 times the final EC at a 1:100 injection ratio: conductivity depends on ion interactions, temperature, water background, and dilution. Confirm injector settings by measuring EC at the outlet after mixing.",
          "Also measure and record the pH of the stock. Highly acidic or alkaline stocks may indicate a dissolution problem or a product that behaves differently than expected. Keep the AgroCalc Pro report and the stock measurements together so that any discrepancy has a clear reference point."
        ],
        "fr": [
          "Mesurez séparément la solution mère préparée et la solution d’irrigation distribuée. L’EC d’une solution mère concentrée n’est pas nécessairement 100 fois celle de la solution finale avec une injection à 1:100 : la conductivité dépend des ions, de la température, de l’eau initiale et de la dilution. Vérifiez le réglage de l’injecteur en mesurant l’EC en sortie.",
          "Mesurez et enregistrez également le pH de la solution mère. Gardez le rapport AgroCalc Pro et les mesures de la solution mère ensemble pour que tout écart ait un point de référence clair."
        ]
      }
    ],
    "sources": []
  },
  {
    "slug": "citrus-avocado-fertigation",
    "category": "Crop nutrition",
    "title": "Fertigation for Citrus and Avocado: Lower EC, Different Nutrient Priorities",
    "titleFr": "Fertigation agrumes et avocat : EC plus basse, priorités nutritives différentes",
    "description": "Understand why tree crop fertigation uses lower ionic concentrations than vegetables, and how to read published targets for citrus and avocado under drip.",
    "descriptionFr": "Comprenez pourquoi la fertigation arboricole utilise des concentrations ioniques plus basses que les légumes et comment lire les cibles pour agrumes et avocat.",
    "related": [
      "ec-in-greenhouse-crops",
      "ionic-balance-fertigation-explained",
      "ph-management-fertigation"
    ],
    "sections": [
      {
        "title": "Tree crops and their lower concentration requirements",
        "titleFr": "Cultures arboricoles et leurs exigences en concentration plus basses",
        "en": [
          "Citrus and avocado fertigation programs are based on soil, water, and tissue analysis plus expected yield and tree age. Unlike a soilless greenhouse recipe, orchard fertigation usually supplements nutrients already available in the soil. There is no single irrigation-solution concentration suitable for every orchard; calculate the seasonal nutrient budget first, then choose application timing and dilution.",
          "The reason for the lower concentrations is partly that tree crops have large root systems that explore a substantial soil volume, and partly that many orchard soils already contain background calcium, magnesium, and potassium from which the trees draw. The fertigation application tops up specific nutrients, particularly nitrogen and phosphate, rather than supplying the complete mineral nutrition as in a soilless substrate system."
        ],
        "fr": [
          "Les programmes de fertigation des agrumes et de l’avocat reposent sur l’analyse du sol, de l’eau et des tissus, ainsi que sur le rendement attendu et l’âge des arbres. Contrairement à une formule de serre hors-sol, la fertigation du verger complète souvent les nutriments du sol. Il n’existe pas de concentration unique valable pour tous les vergers.",
          "La raison des concentrations plus basses est en partie que les cultures arboricoles ont de grands systèmes racinaires qui explorent un volume de sol substantiel, et en partie que de nombreux sols vergers contiennent déjà du calcium, du magnésium et du potassium en arrière-plan."
        ]
      },
      {
        "title": "Citrus-specific nutrient notes",
        "titleFr": "Notes nutritives spécifiques aux agrumes",
        "en": [
          "Citrus can be sensitive to chloride and sodium in irrigation water. Ask for a complete water analysis and compare those values with local citrus guidance; an EC value alone does not identify the ions responsible. AgroCalc Pro can help calculate fertilizer-derived ions, but it should not be treated as a substitute for a laboratory report on sodium or chloride in the source water.",
          "Nitrogen management in citrus under drip uses split applications across the season rather than a constant rate. Spring applications coincide with flowering and fruit set. Summer applications support fruit development. Autumn applications prepare the tree for the following season. The total seasonal nitrogen budget divided by the number of applications gives the per-event quantity to enter in AgroCalc Pro."
        ],
        "fr": [
          "Les agrumes peuvent être sensibles au chlorure et au sodium présents dans l’eau d’irrigation. Faites analyser l’eau complètement et comparez les résultats aux recommandations locales ; une valeur d’EC seule n’identifie pas les ions en cause. AgroCalc Pro aide à calculer les ions issus des engrais, mais ne remplace pas un rapport de laboratoire sur l’eau.",
          "La gestion de l'azote chez les agrumes sous goutte-à-goutte utilise des apports fractionnés sur la saison plutôt qu'un taux constant. Les apports printaniers coïncident avec la floraison et la nouaison."
        ]
      },
      {
        "title": "Avocado and its sensitivity to salt and root damage",
        "titleFr": "L'avocat et sa sensibilité au sel et aux dommages racinaires",
        "en": [
          "Avocado (Persea americana) is particularly sensitive to root damage from waterlogging, high salt concentration, and Phytophthora root rot. Fertigation management must keep the soil or substrate neither too wet nor too saline. Supplied EC is typically kept at the lower end of the arboriculture range, and irrigation frequency is managed to maintain adequate aeration in the root zone.",
          "Avocado root health depends on drainage and aeration as well as water quality. If Phytophthora is a concern, follow a locally approved management plan and product label; plant-protection treatments should not be represented as fertilizer nutrients in AgroCalc Pro. Keep application records separate from the nutrient formulation."
        ],
        "fr": [
          "L'avocat (Persea americana) est particulièrement sensible aux dommages racinaires causés par l'engorgement, les concentrations élevées en sel et la pourriture racinaire à Phytophthora.",
          "La santé des racines d’avocat dépend du drainage, de l’aération et de la qualité de l’eau. Si Phytophthora pose problème, suivez un programme local autorisé et l’étiquette du produit ; les traitements phytosanitaires ne doivent pas être comptés comme nutriments dans AgroCalc Pro. Conservez leurs enregistrements séparément de la formule nutritive."
        ]
      }
    ],
    "sources": [
      {
        "title": "UF/IFAS Extension — Citrus Nutrition Management",
        "url": "https://ask.ifas.ufl.edu/publication/CG091"
      },
      {
        "title": "UC IPM — Phytophthora Root Rot of Avocado",
        "url": "https://ipm.ucanr.edu/agriculture/avocado/phytophthora-root-rot/"
      }
    ]
  }
]
export const blogPath = post => `/blog/${post.slug}`
