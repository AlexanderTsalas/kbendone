import { Language, CategoryData, ProcedureDetail, ProcedureStep, BlogPost } from './types';

// Shared Images Constant to ensure consistency
const IMAGES = {
  facelift: { before: 'https://images.unsplash.com/photo-1551024601-562963525607?q=80&w=1000', after: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000' },
  blepharoplasty: { before: 'https://images.unsplash.com/photo-1557002665-c552e1832483?q=80&w=800', after: 'https://images.unsplash.com/photo-1570776949363-2f96e81f148e?q=80&w=800' },
  browlift: { before: 'https://images.unsplash.com/photo-1505151522812-32a188f54b67?q=80&w=800', after: 'https://images.unsplash.com/photo-1502517870377-175591901c34?q=80&w=800' },
  rhinoplasty: { before: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000', after: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000' },
  otoplasty: { before: 'https://images.unsplash.com/photo-1506087595305-64906f2e82b7?q=80&w=800', after: 'https://images.unsplash.com/photo-1621255554378-4db8a36d933e?q=80&w=800' },
  hyaluronic: { before: 'https://images.unsplash.com/photo-1579187702511-56975f3f758a?q=80&w=800', after: 'https://images.unsplash.com/photo-1512290923902-8a9a21635a91?q=80&w=800' },
  fat_grafting: { before: 'https://images.unsplash.com/photo-1616766098956-c81f12114571?q=80&w=800', after: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800' },
  botox: { before: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800', after: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800' },
  prp: { before: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800', after: 'https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=800' },
  threads: { before: 'https://images.unsplash.com/photo-1533596700770-888e22851f5c?q=80&w=800', after: 'https://images.unsplash.com/photo-1558237270-5b1219dc7795?q=80&w=800' },
  moles: { before: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=800', after: 'https://images.unsplash.com/photo-1559599238-30172eb30990?q=80&w=800' },
  scars: { before: 'https://images.unsplash.com/photo-1616166330003-8e104646188c?q=80&w=800', after: 'https://images.unsplash.com/photo-1512290923902-8a9a21635a91?q=80&w=800' },
  co2: { before: 'https://images.unsplash.com/photo-1559599238-30172eb30990?q=80&w=800', after: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=800' },
  hair_removal: { before: 'https://images.unsplash.com/photo-1571217623758-1f6356c5a083?q=80&w=800', after: 'https://images.unsplash.com/photo-1556066228-56eb9f310f84?q=80&w=800' },
  ipl: { before: 'https://images.unsplash.com/photo-1588647008139-36a8d675685a?q=80&w=800', after: 'https://images.unsplash.com/photo-1596704017254-9b1b1c97a5fa?q=80&w=800' },
  augmentation: { before: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=1000', after: 'https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1000' },
  reduction: { before: 'https://images.unsplash.com/photo-1545620803-a15eb37517c2?q=80&w=800', after: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=800' },
  mastopexy: { before: 'https://images.unsplash.com/photo-1506953823976-52e1fdc0149a?q=80&w=1000', after: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?q=80&w=1000' },
  lipo: { before: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000', after: 'https://images.unsplash.com/photo-1583445095369-9c651e7e5d34?q=80&w=1000' },
  tummy_tuck: { before: 'https://images.unsplash.com/photo-1550990392-f32df30d0758?q=80&w=1000', after: 'https://images.unsplash.com/photo-1579450381669-70335e69f8c6?q=80&w=1000' },
  arm_lift: { before: 'https://images.unsplash.com/photo-1524823769992-0b7348983226?q=80&w=1000', after: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000' },
  thigh_lift: { before: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000', after: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000' },
  bbl: { before: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000', after: 'https://images.unsplash.com/photo-1583445095369-9c651e7e5d34?q=80&w=1000' },
  mommy_makeover: { before: 'https://images.unsplash.com/photo-1550990392-f32df30d0758?q=80&w=1000', after: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000' },
  facial_makeover: { before: 'https://images.unsplash.com/photo-1551024601-562963525607?q=80&w=1000', after: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000' },
  massive_weight_loss: { before: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000', after: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1000' },
  gynecomastia: { before: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1000', after: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1000' },
  male_face: { before: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1000', after: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000' },
  male_body: { before: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1000', after: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1000' },
};

// --- DATA REPOSITORY ---

interface ServiceContent {
    description: string;
    benefits: string[];
    recovery: string;
    complications: string;
    steps: ProcedureStep[];
}

const getServiceDetails = (id: string, lang: Language): ServiceContent => {
    // Defines standard fallback text if a specific field is missing for a language
    const fallbacks: Record<Language, ServiceContent> = {
        el: {
            description: "Η διαδικασία πραγματοποιείται με βάση τα αυστηρότερα ιατρικά πρωτόκολλα για την επίτευξη ενός αρμονικού αποτελέσματος.",
            benefits: ["Βελτίωση εμφάνισης", "Αύξηση αυτοπεποίθησης", "Φυσικό αποτέλεσμα"],
            recovery: "Ο χρόνος ανάρρωσης ποικίλλει ανάλογα με την έκταση της θεραπείας.",
            complications: "Όλες οι επεμβάσεις έχουν μικρή πιθανότητα παροδικών επιπλοκών (οίδημα, εκχυμώσεις) που αντιμετωπίζονται πλήρως.",
            steps: [{ title: 'Σχεδιασμός', description: 'Ανάλυση αναγκών και πλάνο.' }, { title: 'Θεραπεία', description: 'Εφαρμογή με ασφάλεια.' }, { title: 'Αποτέλεσμα', description: 'Άμεση βελτίωση.' }]
        },
        en: {
            description: "The procedure is performed based on the strictest medical protocols to achieve a harmonious result.",
            benefits: ["Improved appearance", "Increased confidence", "Natural result"],
            recovery: "Recovery time varies depending on the extent of the treatment.",
            complications: "All procedures have a small probability of temporary complications (swelling, bruising) which are fully manageable.",
            steps: [{ title: 'Planning', description: 'Needs analysis and plan.' }, { title: 'Treatment', description: 'Performed with safety.' }, { title: 'Result', description: 'Immediate improvement.' }]
        },
        de: {
            description: "Das Verfahren wird nach strengsten medizinischen Protokollen durchgeführt, um ein harmonisches Ergebnis zu erzielen.",
            benefits: ["Verbessertes Aussehen", "Gesteigertes Selbstvertrauen", "Natürliches Ergebnis"],
            recovery: "Die Erholungszeit variiert je nach Umfang der Behandlung.",
            complications: "Alle Eingriffe haben eine geringe Wahrscheinlichkeit für vorübergehende Komplikationen (Schwellungen, Blutergüsse).",
            steps: [{ title: 'Planung', description: 'Bedarfsanalyse.' }, { title: 'Behandlung', description: 'Sichere Durchführung.' }, { title: 'Ergebnis', description: 'Sofortige Verbesserung.' }]
        },
        fr: {
            description: "La procédure est réalisée selon les protocoles médicaux les plus stricts pour obtenir un résultat harmonieux.",
            benefits: ["Apparence améliorée", "Confiance accrue", "Résultat naturel"],
            recovery: "Le temps de récupération varie selon l'étendue du traitement.",
            complications: "Toutes les procédures ont une faible probabilité de complications temporaires (gonflement, ecchymoses).",
            steps: [{ title: 'Planification', description: 'Analyse des besoins.' }, { title: 'Traitement', description: 'Réalisé en toute sécurité.' }, { title: 'Résultat', description: 'Amélioration immédiate.' }]
        },
        ru: {
            description: "Процедура проводится в соответствии со строжайшими медицинскими протоколами для достижения гармоничного результата.",
            benefits: ["Улучшение внешности", "Повышение уверенности", "Естественный результат"],
            recovery: "Время восстановления зависит от объема лечения.",
            complications: "Все процедуры имеют низкую вероятность временных осложнений (отек, синяки), которые полностью устранимы.",
            steps: [{ title: 'Планирование', description: 'Анализ потребностей.' }, { title: 'Лечение', description: 'Безопасное выполнение.' }, { title: 'Результат', description: 'Мгновенное улучшение.' }]
        }
    };

    // Specific Content Database
    const contentDB: Record<string, Record<Language, Partial<ServiceContent>>> = {
        'rhinoplasty': {
            el: {
                description: "Η ρινοπλαστική είναι μια επέμβαση που απαιτεί εξαιρετική ακρίβεια. Πέρα από την αισθητική βελτίωση του σχήματος, πρωταρχικός στόχος είναι η διασφάλιση της αναπνευστικής λειτουργίας. Χρησιμοποιούμε την τεχνική Ultrasonic Piezo για λιγότερο τραυματισμό.",
                benefits: ["Βελτίωση αναπνοής", "Αρμονικό προφίλ", "Μόνιμο αποτέλεσμα", "Αύξηση αυτοπεποίθησης"],
                recovery: "7-10 ημέρες για επιστροφή στην εργασία. Το οίδημα υποχωρεί σταδιακά σε 6-12 μήνες.",
                complications: "Πιθανότητα αιματώματος, λοίμωξης ή ανάγκης για μικρή διορθωτική επέμβαση (5%).",
                steps: [
                    { title: 'Τομή & Πρόσβαση', description: 'Μικροσκοπική τομή στη στυλίδα για αποκάλυψη του σκελετού.' },
                    { title: 'Γλυπτική Piezo', description: 'Χρήση υπερήχων για αναμόρφωση του οστού χωρίς τραυματισμούς.' },
                    { title: 'Στήριξη & Συρραφή', description: 'Ενίσχυση της αναπνοής και αόρατη συρραφή.' }
                ]
            },
            en: {
                description: "Rhinoplasty requires exceptional precision. Beyond aesthetic improvement, the primary goal is to ensure respiratory function. We use the Ultrasonic Piezo technique for less trauma.",
                benefits: ["Improved breathing", "Harmonious profile", "Permanent result", "Increased confidence"],
                recovery: "7-10 days to return to work. Swelling subsides gradually over 6-12 months.",
                complications: "Risk of hematoma, infection, or need for minor revision (5%).",
                steps: [
                    { title: 'Incision & Access', description: 'Microscopic incision on the columella to reveal the framework.' },
                    { title: 'Piezo Sculpting', description: 'Use of ultrasound to reshape the bone without trauma.' },
                    { title: 'Support & Suturing', description: 'Breathing reinforcement and invisible suturing.' }
                ]
            },
            ru: {
                description: "Ринопластика требует исключительной точности. Помимо эстетического улучшения формы, основной целью является обеспечение дыхательной функции. Мы используем технику Ultrasonic Piezo для снижения травматичности.",
                benefits: ["Улучшение дыхания", "Гармоничный профиль", "Постоянный результат", "Повышение уверенности"],
                recovery: "7-10 дней до возвращения к работе. Отек спадает постепенно в течение 6-12 месяцев.",
                complications: "Риск гематомы, инфекции или необходимости небольшой коррекции (5%).",
                steps: [
                    { title: 'Разрез и доступ', description: 'Микроскопический разрез на колумелле.' },
                    { title: 'Скульптурирование Piezo', description: 'Использование ультразвука для изменения формы кости.' },
                    { title: 'Поддержка и швы', description: 'Улучшение дыхания и невидимые швы.' }
                ]
            },
            de: {
                steps: [
                    { title: 'Schnitt & Zugang', description: 'Mikroskopischer Schnitt am Nasensteg.' },
                    { title: 'Piezo-Formung', description: 'Ultraschallformung des Knochens.' },
                    { title: 'Stützung', description: 'Atmungsverbesserung und unsichtbare Naht.' }
                ]
            },
            fr: {
                steps: [
                    { title: 'Incision', description: 'Incision microscopique sur la columelle.' },
                    { title: 'Sculpture Piezo', description: 'Utilisation d\'ultrasons pour remodeler l\'os.' },
                    { title: 'Soutien', description: 'Renforcement respiratoire et suture invisible.' }
                ]
            }
        },
        'facelift': {
            el: {
                description: "Το Deep Plane Facelift αποτελεί την εξέλιξη της ρυτιδεκτομής. Επεμβαίνοντας σε βαθύτερα επίπεδα, επιτυγχάνουμε ανόρθωση μυών και όχι απλά τέντωμα δέρματος, για απόλυτα φυσικό αποτέλεσμα.",
                benefits: ["Φυσικό αποτέλεσμα", "Διάρκεια 10+ ετών", "Αόρατες τομές", "Ανανέωση λαιμού"],
                recovery: "2 εβδομάδες για κοινωνική επανένταξη. Πλήρης επούλωση σε 3 μήνες.",
                complications: "Αιμάτωμα, προσωρινή υπαισθησία, καθυστερημένη επούλωση τραύματος.",
                steps: [
                    { title: 'Deep Plane', description: 'Απελευθέρωση των συνδέσμων κάτω από το μυϊκό σύστημα.' },
                    { title: 'Ανόρθωση', description: 'Κάθετη επανατοποθέτηση των ιστών στην αρχική τους θέση.' },
                    { title: 'Φυσικό Αποτέλεσμα', description: 'Αφαίρεση περίσσειας δέρματος χωρίς τράβηγμα.' }
                ]
            },
            en: {
                description: "Deep Plane Facelift is the evolution of rhytidectomy. By intervening at deeper levels, we lift muscles rather than just stretching skin, ensuring a completely natural result.",
                benefits: ["Natural result", "Lasts 10+ years", "Invisible incisions", "Neck rejuvenation"],
                recovery: "2 weeks for social reintegration. Full healing in 3 months.",
                complications: "Hematoma, temporary numbness, delayed wound healing.",
                steps: [
                    { title: 'Deep Plane', description: 'Release of ligaments under the muscular system.' },
                    { title: 'Lifting', description: 'Vertical repositioning of tissues to their original position.' },
                    { title: 'Natural Result', description: 'Removal of excess skin without pulling.' }
                ]
            },
            ru: {
                description: "Deep Plane Facelift — это эволюция подтяжки лица. Вмешиваясь на глубоких уровнях, мы подтягиваем мышцы, а не просто растягиваем кожу, обеспечивая абсолютно естественный результат.",
                benefits: ["Естественный результат", "Длительность 10+ лет", "Невидимые разрезы", "Омоложение шеи"],
                recovery: "2 недели для возвращения к социальной жизни. Полное заживление за 3 месяца.",
                complications: "Гематома, временное онемение, замедленное заживление ран.",
                steps: [
                    { title: 'Deep Plane', description: 'Освобождение связок под мышечной системой.' },
                    { title: 'Подтяжка', description: 'Вертикальное перемещение тканей.' },
                    { title: 'Результат', description: 'Удаление лишней кожи без натяжения.' }
                ]
            },
            de: {},
            fr: {}
        },
        'augmentation': {
            el: {
                description: "Η αυξητική στήθους εξατομικεύεται πλήρως. Η επιλογή του κατάλληλου ενθέματος και η τεχνική Dual Plane διασφαλίζει φυσική κίνηση και αφή, διατηρώντας την αισθητικότητα.",
                benefits: ["Αύξηση όγκου", "Βελτίωση σχήματος", "Συμμετρία", "Ενίσχυση θηλυκότητας"],
                recovery: "3-5 ημέρες ξεκούραση. Επιστροφή σε γυμναστήριο σε 4-6 εβδομάδες.",
                complications: "Ρίκνωση κάψας, μετατόπιση ενθέματος, αλλαγή αισθητικότητας θηλής.",
                steps: [
                    { title: 'Πρόσβαση', description: 'Διακριτική τομή στην υπομάστια πτυχή.' },
                    { title: 'Δημιουργία Θήκης', description: 'Τεχνική Dual Plane για κάλυψη του ενθέματος.' },
                    { title: 'Τοποθέτηση', description: 'Εισαγωγή ενθέματος με τεχνική No-Touch.' }
                ]
            },
            en: {
                description: "Breast augmentation is fully personalized. Choosing the right implant and Dual Plane technique ensures natural movement and feel, maintaining sensation.",
                benefits: ["Increased volume", "Improved shape", "Symmetry", "Enhanced femininity"],
                recovery: "3-5 days rest. Return to gym in 4-6 weeks.",
                complications: "Capsular contracture, implant displacement, nipple sensation changes.",
                steps: [
                    { title: 'Access', description: 'Discreet incision in the inframammary fold.' },
                    { title: 'Pocket Creation', description: 'Dual Plane technique to cover the implant.' },
                    { title: 'Placement', description: 'Implant insertion with No-Touch technique.' }
                ]
            },
            ru: {
                description: "Увеличение груди полностью персонализировано. Выбор правильного импланта и техники Dual Plane обеспечивает естественное движение и ощущение, сохраняя чувствительность.",
                benefits: ["Увеличение объема", "Улучшение формы", "Симметрия", "Женственность"],
                recovery: "3-5 дней отдыха. Возвращение в спортзал через 4-6 недель.",
                complications: "Капсулярная контрактура, смещение импланта, изменение чувствительности сосков.",
                steps: [
                    { title: 'Доступ', description: 'Скрытый разрез в подгрудной складке.' },
                    { title: 'Создание кармана', description: 'Техника Dual Plane для покрытия импланта.' },
                    { title: 'Размещение', description: 'Введение импланта техникой No-Touch.' }
                ]
            },
            de: {},
            fr: {}
        },
        'lipo': {
            el: {
                description: "Η λιπογλυπτική Vaser HD δεν είναι απλή μέθοδος αδυνατίσματος, αλλά σμίλευσης. Ρευστοποιούμε το λίπος πριν την αναρρόφηση, αναδεικνύοντας τις μυϊκές γραμμές.",
                benefits: ["Σμίλευση σώματος", "Μόνιμη αφαίρεση λίπους", "Γράμμωση μυών", "Σύσφιξη δέρματος"],
                recovery: "Φοράτε κορσέ για 4 εβδομάδες. Επιστροφή στην εργασία σε 3-5 ημέρες.",
                complications: "Οίδημα, μελανιές, ανωμαλίες περιγράμματος, συλλογή υγρού.",
                steps: [
                    { title: 'Προετοιμασία', description: 'Έγχυση ειδικού διαλύματος (Tumescent).' },
                    { title: 'Ρευστοποίηση', description: 'Χρήση Vaser για διάσπαση του λίπους.' },
                    { title: 'Σμίλευση', description: 'Αναρρόφηση και High Definition γλυπτική.' }
                ]
            },
            en: {
                description: "Vaser HD liposculpture is not just weight loss, but body sculpting. We liquefy fat before suction, defining muscle lines.",
                benefits: ["Body sculpting", "Permanent fat removal", "Muscle definition", "Skin tightening"],
                recovery: "Wear compression garment for 4 weeks. Return to work in 3-5 days.",
                complications: "Swelling, bruising, contour irregularities, fluid accumulation.",
                steps: [
                    { title: 'Preparation', description: 'Injection of special solution (Tumescent).' },
                    { title: 'Liquefaction', description: 'Use of Vaser to break down fat.' },
                    { title: 'Sculpting', description: 'Suction and High Definition sculpting.' }
                ]
            },
            ru: {
                description: "Липоскульптура Vaser HD — это не просто похудение, а моделирование тела. Мы разжижаем жир перед отсасыванием, выделяя мышечные линии.",
                benefits: ["Скульптурирование тела", "Удаление жира", "Рельеф мышц", "Подтяжка кожи"],
                recovery: "Компрессионное белье на 4 недели. Возврат к работе через 3-5 дней.",
                complications: "Отек, синяки, неровности контура, скопление жидкости.",
                steps: [
                    { title: 'Подготовка', description: 'Инъекция специального раствора.' },
                    { title: 'Разжижение', description: 'Использование Vaser для расщепления жира.' },
                    { title: 'Скульптурирование', description: 'Отсасывание и High Definition скульптурирование.' }
                ]
            },
            de: {},
            fr: {}
        },
        'blepharoplasty': {
            el: {
                description: "Η βλεφαροπλαστική αποκαθιστά τη νεανική όψη των ματιών, αφαιρώντας το πλεονάζον δέρμα και τις 'σακούλες'.",
                benefits: ["Ξεκούραστο βλέμμα", "Βελτίωση ορατότητας", "Μόνιμο αποτέλεσμα", "Ελάχιστες ουλές"],
                recovery: "Ράμματα αφαιρούνται σε 5 ημέρες. Επιστροφή σε 7 ημέρες.",
                complications: "Ξηροφθαλμία, δακρύρροια, εκχύμωση.",
                steps: [
                    { title: 'Σχεδιασμός', description: 'Ακριβής καθορισμός της ποσότητας δέρματος.' },
                    { title: 'Αφαίρεση', description: 'Εκτομή χαλαρού δέρματος και λίπους.' },
                    { title: 'Συρραφή', description: 'Λεπτή συρραφή για αόρατη ουλή.' }
                ]
            },
            en: {
                description: "Blepharoplasty restores the youthful appearance of the eyes by removing excess skin and bags.",
                benefits: ["Rested look", "Improved vision", "Permanent result", "Minimal scarring"],
                recovery: "Sutures removed in 5 days. Return in 7 days.",
                complications: "Dry eyes, tearing, bruising.",
                steps: [
                    { title: 'Planning', description: 'Precise marking of skin to be removed.' },
                    { title: 'Removal', description: 'Excision of loose skin and fat pads.' },
                    { title: 'Suturing', description: 'Fine suturing for invisible scar.' }
                ]
            },
            ru: {
                description: "Блефаропластика восстанавливает молодой вид глаз, удаляя лишнюю кожу и «мешки».",
                benefits: ["Отдохнувший взгляд", "Улучшение зрения", "Постоянный результат", "Минимальные шрамы"],
                recovery: "Швы снимаются через 5 дней. Возврат через 7 дней.",
                complications: "Сухость глаз, слезотечение, синяки.",
                steps: [
                    { title: 'Планирование', description: 'Точная разметка удаляемой кожи.' },
                    { title: 'Удаление', description: 'Иссечение дряблой кожи и жира.' },
                    { title: 'Швы', description: 'Тонкий шов для невидимого рубца.' }
                ]
            },
            de: {},
            fr: {}
        },
        'tummy-tuck': {
            el: {
                description: "Η κοιλιοπλαστική αφαιρεί την περίσσεια δέρματος και λίπους και συσφίγγει τους κοιλιακούς μύες.",
                benefits: ["Επίπεδη κοιλιά", "Διόρθωση διάστασης μυών", "Αφαίρεση ραγάδων", "Μέση δαχτυλίδι"],
                recovery: "3 εβδομάδες περιορισμένη δραστηριότητα. Ζώνη για 1 μήνα.",
                complications: "Συλλογή ορώδους υγρού, καθυστερημένη επούλωση, αλλαγή αισθητικότητας.",
                steps: [
                    { title: 'Τομή', description: 'Χαμηλή τομή που κρύβεται στο εσώρουχο.' },
                    { title: 'Σύσφιξη', description: 'Ραφή των ορθών κοιλιακών μυών.' },
                    { title: 'Αφαίρεση', description: 'Εκτομή της περίσσειας δέρματος.' }
                ]
            },
            en: {
                description: "Abdominoplasty removes excess skin and fat and tightens the abdominal muscles.",
                benefits: ["Flat stomach", "Muscle diastasis correction", "Stretch mark removal", "Defined waist"],
                recovery: "3 weeks limited activity. Binder for 1 month.",
                complications: "Seroma, delayed healing, sensation changes.",
                steps: [
                    { title: 'Incision', description: 'Low incision hidden by underwear.' },
                    { title: 'Tightening', description: 'Suturing of rectus abdominis muscles.' },
                    { title: 'Removal', description: 'Excision of excess skin.' }
                ]
            },
            ru: {
                description: "Абдоминопластика удаляет лишнюю кожу и жир, а также подтягивает мышцы живота.",
                benefits: ["Плоский живот", "Коррекция диастаза", "Удаление растяжек", "Тонкая талия"],
                recovery: "3 недели ограниченной активности. Бандаж на 1 месяц.",
                complications: "Серома, замедленное заживление, изменение чувствительности.",
                steps: [
                    { title: 'Разрез', description: 'Низкий разрез, скрытый бельем.' },
                    { title: 'Подтяжка', description: 'Ушивание прямых мышц живота.' },
                    { title: 'Удаление', description: 'Иссечение лишней кожи.' }
                ]
            },
            de: {},
            fr: {}
        },
        'mommy-makeover': {
            el: {
                description: "Συνδυασμός επεμβάσεων (στήθος, κοιλιά, λιποαναρρόφηση) για την επαναφορά του σώματος μετά την εγκυμοσύνη.",
                benefits: ["Ολική μεταμόρφωση", "Μία περίοδος ανάρρωσης", "Επαναφορά προ εγκυμοσύνης", "Τόνωση αυτοπεποίθησης"],
                recovery: "3-4 εβδομάδες για πλήρη ανάκαμψη.",
                complications: "Αυξημένος χειρουργικός χρόνος, συνδυασμός ρίσκων μεμονωμένων επεμβάσεων.",
                steps: [
                    { title: 'Στήθος', description: 'Ανόρθωση ή/και Αυξητική.' },
                    { title: 'Κοιλιά', description: 'Κοιλιοπλαστική και σύσφιξη.' },
                    { title: 'Σμίλευση', description: 'Λιπογλυπτική σε επίμαχα σημεία.' }
                ]
            },
            en: {
                description: "Combination of procedures (breast, tummy, lipo) to restore the body after pregnancy.",
                benefits: ["Total transformation", "Single recovery period", "Pre-pregnancy body", "Boosted confidence"],
                recovery: "3-4 weeks for full recovery.",
                complications: "Increased surgical time, combined risks of individual procedures.",
                steps: [
                    { title: 'Breast', description: 'Lift and/or Augmentation.' },
                    { title: 'Tummy', description: 'Abdominoplasty and tightening.' },
                    { title: 'Sculpting', description: 'Liposculpture in key areas.' }
                ]
            },
            ru: {
                description: "Сочетание процедур (грудь, живот, липосакция) для восстановления тела после беременности.",
                benefits: ["Полная трансформация", "Один период восстановления", "Тело до беременности", "Повышение уверенности"],
                recovery: "3-4 недели для полного восстановления.",
                complications: "Увеличенное время операции, комбинированные риски.",
                steps: [
                    { title: 'Грудь', description: 'Подтяжка и/или увеличение.' },
                    { title: 'Живот', description: 'Абдоминопластика и подтяжка.' },
                    { title: 'Скульптурирование', description: 'Липоскульптура проблемных зон.' }
                ]
            },
            de: {},
            fr: {}
        },
        'botox': {
            el: {
                description: "Η πιο δημοφιλής θεραπεία για την εξάλειψη των ρυτίδων έκφρασης στο άνω πρόσωπο.",
                benefits: ["Ξεκούραστο πρόσωπο", "Πρόληψη ρυτίδων", "Άμεσο αποτέλεσμα", "Μη επεμβατικό"],
                recovery: "Άμεση επιστροφή στις δραστηριότητες.",
                complications: "Μικρή εκχύμωση, πονοκέφαλος, πτώση βλεφάρου (σπάνια).",
                steps: [
                    { title: 'Αξιολόγηση', description: 'Μελέτη της κίνησης των μυών.' },
                    { title: 'Εφαρμογή', description: 'Μικρο-ενέσεις στα σημεία στόχους.' },
                    { title: 'Δράση', description: 'Το αποτέλεσμα φαίνεται σε 3-7 ημέρες.' }
                ]
            },
            en: {
                description: "The most popular treatment for eliminating expression lines in the upper face.",
                benefits: ["Rested face", "Wrinkle prevention", "Immediate result", "Non-invasive"],
                recovery: "Immediate return to activities.",
                complications: "Minor bruising, headache, eyelid droop (rare).",
                steps: [
                    { title: 'Evaluation', description: 'Study of muscle movement.' },
                    { title: 'Application', description: 'Micro-injections at target points.' },
                    { title: 'Action', description: 'Results visible in 3-7 days.' }
                ]
            },
            ru: {
                description: "Самая популярная процедура для устранения мимических морщин верхней части лица.",
                benefits: ["Отдохнувший лицо", "Профилактика морщин", "Мгновенный результат", "Неинвазивно"],
                recovery: "Мгновенное возвращение к делам.",
                complications: "Небольшие синяки, головная боль, опущение века (редко).",
                steps: [
                    { title: 'Оценка', description: 'Изучение движения мышц.' },
                    { title: 'Применение', description: 'Микроинъекции в целевые точки.' },
                    { title: 'Действие', description: 'Результат виден через 3-7 дней.' }
                ]
            },
            de: {},
            fr: {}
        }
    };

    // Generic Category Fallbacks if ID specific not found
    const categoryContent: Record<string, Record<Language, Partial<ServiceContent>>> = {
        'face': {
            el: { description: "Στόχος μας η φυσική ανανέωση των χαρακτηριστικών σας, αφαιρώντας τα σημάδια του χρόνου χωρίς να αλλοιώνουμε την ταυτότητά σας." },
            en: { description: "Our goal is the natural rejuvenation of your features, removing signs of aging without altering your identity." },
            ru: { description: "Наша цель — естественное омоложение ваших черт, устранение признаков старения без изменения вашей индивидуальности." },
            de: { description: "Unser Ziel ist die natürliche Verjüngung Ihrer Gesichtszüge, wobei Zeichen der Alterung entfernt werden, ohne Ihre Identität zu verändern." },
            fr: { description: "Notre objectif est le rajeunissement naturel de vos traits, en éliminant les signes de l'âge sans altérer votre identité." }
        },
        'body': {
            el: { description: "Αποκαταστήστε την αρμονία του σώματός σας με τις πιο σύγχρονες τεχνικές σμίλευσης και σύσφιξης." },
            en: { description: "Restore your body's harmony with the most modern sculpting and tightening techniques." },
            ru: { description: "Восстановите гармонию вашего тела с помощью самых современных методов скульптурирования и подтяжки." },
            de: { description: "Stellen Sie die Harmonie Ihres Körpers mit modernsten Formungs- und Straffungstechniken wieder her." },
            fr: { description: "Restaurez l'harmonie de votre corps avec les techniques de sculpture et de raffermissement les plus modernes." }
        },
        'breast': {
             el: { description: "Επαναφέρετε τη θηλυκότητα και την αυτοπεποίθησή σας με εξατομικευμένες λύσεις για το στήθος." },
             en: { description: "Restore your femininity and confidence with personalized breast solutions." },
             ru: { description: "Восстановите свою женственность и уверенность с помощью индивидуальных решений для груди." },
             de: { description: "Stellen Sie Ihre Weiblichkeit und Ihr Selbstvertrauen mit personalisierten Brustlösungen wieder her." },
             fr: { description: "Restaurez votre féminité et votre confiance avec des solutions mammaires personnalisées." }
        }
    };

    const specific = contentDB[id]?.[lang] || {};
    // Try to find category-based fallback description
    let catFallback = {};
    if (!specific.description) {
        if (['facelift', 'blepharoplasty', 'browlift', 'otoplasty', 'chin'].includes(id)) catFallback = categoryContent.face[lang];
        if (['lipo', 'tummy-tuck', 'bbl', 'arm-lift'].includes(id)) catFallback = categoryContent.body[lang];
        if (['augmentation', 'reduction', 'mastopexy'].includes(id)) catFallback = categoryContent.breast[lang];
    }

    const standard = fallbacks[lang];

    return {
        description: specific.description || (catFallback as any).description || standard.description,
        benefits: specific.benefits || standard.benefits,
        recovery: specific.recovery || standard.recovery,
        complications: specific.complications || standard.complications,
        steps: specific.steps || standard.steps
    };
};

// UI Translations
export const translations = {
  el: {
    nav: { doctor: 'Ο Γιατρός', services: 'Υπηρεσίες', contact: 'Επικοινωνία', faq: 'Συχνές Ερωτήσεις', blog: 'Άρθρα', book: 'Ραντεβου' },
    hero: { subtitle: 'Πλαστικη Χειρουργικη & Αισθητικη', title_start: 'Η Επιστήμη', title_mid: 'της', title_end: 'Αρμονίας.', desc: 'Ο Δρ. Κωνσταντίνος Μπενετάτος συνδυάζει την ιατρική ακρίβεια με την καλλιτεχνική ματιά, προσφέροντας αποτελέσματα που αναδεικνύουν τη φυσική σας ομορφιά.', cta_results: 'Αποτελεσματα Θεραπειων', cta_book: 'Κλειστε Ραντεβου', scroll: 'Scroll Down' },
    about: { philosophy: 'Φιλοσοφια', title_start: 'Η Τελειότητα κρύβεται στη', title_end: 'Λεπτομέρεια.', p1: 'Η πλαστική χειρουργική δεν αφορά απλώς την αλλαγή της εμφάνισης, αλλά την αποκατάσταση της αυτοπεποίθησης. Ο Δρ. Μπενετάτος πιστεύει σε αποτελέσματα που φαίνονται φυσικά, σεβόμενος την ανατομία και τη μοναδικότητα κάθε ασθενούς.', p2: 'Με πολυετή εμπειρία και εξειδίκευση στις πιο σύγχρονες τεχνικές, στόχος είναι η επίτευξη της απόλυτης αρμονίας. Κάθε πρόσωπο και σώμα είναι ένας καμβάς που απαιτεί εξειδικευμένη προσέγγιση.', safety: 'Ασφάλεια', safety_desc: 'Πιστοποιημένες διαδικασίες.', expertise: 'Εξειδίκευση', expertise_desc: 'Μέλος της ISAPS.', technology: 'Τεχνολογία', technology_desc: 'Χρήση εξοπλισμού αιχμής.' },
    doctor: { label: 'Ο Γιατρος', title_main: 'Επιστημονική Αρτιότητα &', title_sub: 'Διεθνής Αναγνώριση', p1: 'Ο Δρ. Κωνσταντίνος Μπενετάτος είναι απόφοιτος της Ιατρικής Σχολής του Πανεπιστημίου Αθηνών και ειδικευμένος Πλαστικός Χειρουργός.', p2: 'Διακρίνεται για την ανθρωποκεντρική του προσέγγιση και την εμμονή στη λεπτομέρεια.', years: 'Χρονια Εμπειριας', ops: 'Επεμβασεις', cta: 'Πληρες Βιογραφικο' },
    distinctions: { title: 'Πιστοποιησεις & Συμμετοχες', main_title: 'Ενεργό Μέλος της Ιατρικής Κοινότητας' },
    servicesSection: { title: 'Υπηρεσίες', subtitle: 'Μεταμορφώστε την Αυτοπεποίθηση σας', items: { face: { title: 'Πρόσωπο', desc: 'Ρινοπλαστική, Face Lift και Βλεφαροπλαστική για αρμονία και ανανέωση.' }, skin: { title: 'Δέρμα', desc: 'Χειρουργική δέρματος, αφαίρεση σπίλων και θεραπείες Laser.' }, breast: { title: 'Στήθος', desc: 'Αυξητική, Ανόρθωση και Αποκατάσταση με φυσικό αποτέλεσμα.' }, body: { title: 'Σώμα', desc: 'Λιπογλυπτική, Κοιλιοπλαστική και σμίλευση σιλουέτας.' }, combined: { title: 'Συνδυαστικές', desc: 'Mommy Makeover και ολική μεταμόρφωση προσώπου & σώματος.' }, men: { title: 'Άνδρες', desc: 'Εξειδικευμένες θεραπείες για τις ανάγκες του ανδρικού σώματος.' } }, more: 'Περισσοτερα' },
    testimonials: { 
        title: 'Μαρτυρίες', 
        subtitle: 'Ανθρώπινες', 
        items: [
            { text: "Δεν πίστευα ότι το αποτέλεσμα θα ήταν τόσο φυσικό...", name: "Μαρία Κ.", proc: "Ρινοπλαστική" },
            { text: "Η εμπειρία ήταν εξαιρετική από την αρχή μέχρι το τέλος. Ο γιατρός μου έλυσε κάθε απορία.", name: "Έλενα Π.", proc: "Αυξητική Στήθους" },
            { text: "Επαγγελματισμός και φροντίδα σε άλλο επίπεδο. Το αποτέλεσμα ξεπέρασε τις προσδοκίες μου.", name: "Δημήτρης Α.", proc: "Λιποαναρρόφηση" },
            { text: "Η εμπιστοσύνη που ένιωσα από την πρώτη στιγμή ήταν καταλυτική. Ευχαριστώ για όλα!", name: "Γεωργία Μ.", proc: "Face Lift" },
            { text: "Άριστος επιστήμονας και υπέροχος άνθρωπος.", name: "Νίκος Σ.", proc: "Γυναικομαστία" },
            { text: "Φυσική ανανέωση χωρίς αλλοίωση. Ακριβώς αυτό που ήθελα!", name: "Σοφία Λ.", proc: "Botox & Fillers" }
        ] 
    },
    contact: { title: 'Επικοινωνία', subtitle: 'Book Your Consultation', visit_title: 'Επισκεφθείτε μας', visit_desc: 'Κλείστε το ραντεβού σας και ξεκινήστε το ταξίδι της αλλαγής.', address_label: 'Διευθυνση', phone_label: 'Τηλεφωνο', email_label: 'Email', form: { name: 'Ονοματεπώνυμο', tel: 'Τηλέφωνο', email: 'Email', msg: 'Μήνυμα ή Θεραπεία που σας ενδιαφέρει', submit: 'Αποστολη Μηνυματος' } },
    footer: { rights: 'All Rights Reserved', faq: 'Συχνες Ερωτησεις' },
    servicesPage: { title: 'Επιλέξτε Θεραπεία', subtitle: 'Premium Services', all: 'Όλες', benefits: 'Οφέλη', recovery: 'Ανάρρωση', results: 'Αποτελέσματα', book: 'Ραντεβου', empty: 'Δεν βρέθηκαν υπηρεσίες.' },
    serviceDetails: { back: 'Πισω στις Υπηρεσιες', results_title: 'Τα Αποτελέσματα Μιλάνε από Μόνα τους', before: 'Πριν', after: 'Μετα', before_badge: 'Πριν τη θεραπεια', after_badge: 'Μετα τη θεραπεια', no_images: 'Φωτογραφικό υλικό θα είναι σύντομα διαθέσιμο.', process_title: 'Η Διαδικασια', expectations: 'Προσδοκιες', complications: 'Επιπλοκές', interested: 'Ενδιαφέρεστε;', interested_desc: 'Κλείστε το ραντεβού σας για μια προσωπική αξιολόγηση.', approach: 'Η προσέγγισή μας βασίζεται στην εξατομίκευση...' },
    doctorBio: { 
        back: 'Πισω στην Αρχικη', 
        title: 'ΚΩΝΣΤΑΝΤΙΝΟΣ', 
        surname: 'ΜΠΕΝΕΤΑΤΟΣ', 
        quote: '"Η πλαστική χειρουργική είναι η τέχνη της αποκατάστασης της μορφής και της λειτουργίας, με σεβασμό στην ανθρώπινη αξιοπρέπεια."', 
        intro_title: 'Εξειδικευμένος Πλαστικός Χειρουργός με διεθνή πορεία.', 
        edu_title: 'Εκπαίδευση', 
        edu_desc: 'ΣΣΑΣ, ΑΠΘ, Nottingham University', 
        exp_title: 'Διεθνής Εμπειρία', 
        exp_desc: 'UK (Nottingham, Queen Medical Centre)', 
        spec_title: 'Εξειδίκευση', 
        spec_desc: 'Μικροχειρουργική, Μαστός, Κεφαλή & Τράχηλος', 
        bio_paragraphs: [
          'Ο κος Κωνσταντίνος Μπενετάτος μετά από Πανελλήνιες εξετάσεις εισήχθη στην Στρατιωτική Ιατρική (Σ.Σ.Α.Σ.) του Αριστοτελείου Πανεπιστημίου Θεσσαλονίκης το Σεπτέμβριο του 1996. Ολοκλήρωσε τις σπουδές του το 2002 και στη συνέχεια εκπλήρωσε τις στρατιωτικές του υποχρεώσεις σαν Αξιωματικός Ιατρός, προσφέροντας πολύτιμες υπηρεσίες στη Ρόδο και στην Νατοϊκή δύναμη της Ελλάδος στο Αφγανιστάν, για 2 έτη.',
          'Το 2006 ξεκίνησε την ειδίκευσή του στην Πλαστική Χειρουργική στο 401 Γενικό Στρατιωτικό Νοσοκομείο Αθηνών και στη συνέχεια στο Αντικαρκινικό Ογκολογικό Νοσοκομείο «Ο Άγιος Σάββας». Μετά από επιτυχείς εξετάσεις στο Βασιλικό Κολέγιο Χειρουργών της Αγγλίας συνέχισε την ειδίκευσή του στο εξωτερικό.',
          'Από το 2008 έως και το 2012 μυήθηκε στην τέχνη της Επανορθωτικής και Αισθητικής Πλαστικής Χειρουργικής δίπλα σε επιφανείς χειρουργούς του τμήματος Πλαστικής Χειρουργικής του Πανεπιστημίου του Νότιγχαμ της Αγγλίας (Nottingham University Hospital/Queen Medical Centre) όπου αποκόμισε πολύτιμη γνώση και εμπειρία. Ειδικότερα, ειδικεύτηκε σε ένα ευρύ φάσμα της επανορθωτικής και αισθητικής πλαστικής χειρουργικής όπως χειρουργική μαστού, χειρουργική άκρας χείρας, αποκατάσταση συγγενών διαμαρτιών όπως σχιστίες χειλέων ή λαγόχειλα, υπεροιωσχιστίες και υποσπαδίες, χειρουργική τραύματος, διαχείριση εγκαυμάτων αλλά και την πλήρη αντιμετώπιση με εκτομή και αποκατάσταση μεγάλων ελλειμμάτων, σε ασθενείς με καρκίνο δέρματος, καρκίνο μαστού και διαφόρων τύπων σαρκωμάτων.',
          'Παρακολούθησε πολυάριθμα εκπαιδευτικά σεμινάρια Πλαστικής Χειρουργικής ανά τον κόσμο και υπήρξε προσκεκλημένος ομιλητής σε πολλαπλά Ευρωπαϊκά και Διεθνή συνέδρια Πλαστικής Χειρουργικής. Καθοδηγήθηκε και εμπνεύσθηκε ως μαθητευόμενος από τον διεθνούς φήμης Πλαστικό Χειρουργό και νυν Πρόεδρο των Πλαστικών Χειρουργών της Αγγλίας Mr G. Perks και συνεργάστηκε στενά στον ιδιωτικό τομέα με καταξιωμένους Αισθητικούς Πλαστικούς Χειρουργούς όπως ο Mr S.J. McCulley, Mr T. Rasheed και Mr M.Henley.',
          'Το 2011 του απονεμήθηκε ο Ευρωπαϊκός τίτλος Ειδικότητας Πλαστικής Χειρουργικής κατόπιν επιτυχών εξετάσεων στην αντίστοιχη Ευρωπαϊκή Επιτροπή και εν συνεχεία εργάστηκε στο Πανεπιστήμιο του Νότιγχαμ ως Senior MicroFellow (Fellowship Μικροχειρουργικής) για ενάμιση χρόνο έως το Μάιο του 2012 όπου και εξειδικεύτηκε στο Μαστό (Breast Institute of Nottigham University Hospital) και στις Παθήσεις Κεφαλής και Τραχήλου (Oral and Maxilofacial Department, ENT Department) υπό την καθοδήγηση των Μικροχειρουργών Mr P. Hollows και Mr I. McVicar.',
          'Στο διάστημα αυτό διεκπεραίωσε επιτυχώς πάνω από 120 μικροχειρουργικές επεμβάσεις (ελεύθερη μεταφορά ιστών-αυτομεταμοσχεύσεις στο πρόσωπο, στο κρανίο, στη στοματική κοιλότητα και στο μαστό). Το 2012 είχε την τιμή να γίνει μέλος της Παγκόσμιας Εταιρίας Μικροχειρουργικής που εδρεύει στην Αμερική, κατόπιν αναγνώρισης της επίπονης προσπάθειας και προσφοράς του στον τομέα της μικροχειρουργικής. Την ίδια χρονιά, 2012, κατόπιν επιτυχών εξετάσεων έλαβε και τον επίσημο Τίτλο της ειδικότητας της Πλαστικής Χειρουργικής στην Ελλάδα και έκτοτε εργάζεται ως Επιμελητής Πλαστικής Χειρουργικής στο 401 Γενικό Στρατιωτικό Νοσοκομείο Αθηνών.',
          'Είναι αναγνωρισμένο μέλος της Ελληνικής Εταιρίας Πλαστικής Χειρουργικής, της Ελληνικής Εταιρίας Μικροχειρουργικής και Χειρουργικής Άκρας Χείρας, της Ευρωπαϊκής Εταιρίας Πλαστικής Χειρουργικής και του Βασιλικού Κολεγίου Χειρουργών της Αγγλίας.'
        ],
        highlight: '"Καθοδηγήθηκε και εμπνεύσθηκε ως μαθητευόμενος από τον διεθνούς φήμης Πλαστικό Χειρουργό και νυν Πρόεδρο των Πλαστικών Χειρουργών της Αγγλίας Mr G. Perks..."', 
        cta_trust: 'Εμπιστευτείτε την εμφάνισή σας στα χέρια ενός ειδικού με διεθνή αναγνώριση.' 
    },
    faq: { title: 'Συχνές Ερωτήσεις', subtitle: 'Knowledge Base', search_placeholder: 'Αναζητήστε την ερώτησή σας...', no_results: 'Δεν βρέθηκαν αποτελέσματα', not_found_title: 'Δεν βρήκατε αυτό που ψάχνετε;', contact_us: 'Επικοινωνηστε μαζι μας', categories: { all: 'Όλα', general: 'Γενικά', face: 'Πρόσωπο', breast: 'Στήθος', body: 'Σώμα', non_invasive: 'Μη Επεμβατικά' } },
    blog: { title: 'Τελευταία Νέα & Άρθρα', subtitle: 'Ενημέρωση', read_more: 'Διαβάστε Περισσότερα', back: 'Πίσω στα Άρθρα', share: 'Κοινοποίηση', published: 'Δημοσιεύθηκε' },
    cats: { face: 'Πρόσωπο', skin: 'Δέρμα', breast: 'Στήθος', body: 'Σώμα', combined: 'Συνδυαστικές Επεμβάσεις', men: 'Άνδρες' },
    sub: { surgical: 'Χειρουργική', inject: 'Ενέσιμες Θεραπείες', laser: 'LASER', noninv: 'Μη Επεμβάσιμες' },
    items: {
        facelift: 'Facelift – Ρυτιδεκτομή Ανόρθωση Προσώπου και Λαιμού', bleph: 'Βλεφαροπλαστική', brow: 'Ανόρθωση Μετώπου - Ορφρύων', rhino: 'Ρινοπλαστική (Λειτουργική Ρινοπλαστική)', oto: 'Ωτοπλαστική',
        hyal: 'Υαλουρονικό Οξύ', fat_grafting: 'Μεταφορά Λίπους στο Πρόσωπο', botox: 'Ενέσιμη θεραπεία ρυτίδων', prp: 'Αυτόλογη Μεσοθεραπεία PRP', threads: 'Ανάπλαση Προσώπου',
        moles: 'Σπίλοι,Κύστεις, Λιπώματα και Θηλώματα Δέρματος', skin_cancer: 'Καρκίνος του Δέρματος', scars: 'Επιδιόρθωση Ουλών',
        co2: 'LASER Αναδόμησης Δέρματος', hair_removal: 'LASER Αποτρίχωση', ipl: 'Φωτοανάπλαση', antiaging: 'Αντιγύρανση',
        augmentation: 'Αυξητική Μαστών με Ένθεμα Σιλικόνης', reduction: 'Μειωτική Μαστών', mastopexy: 'Ανόρθωση Μαστών - Μαστοπηξία', asymmetry: 'Ανιστομαστία - Ασυμμετρία', implant_revision: 'Προβλήματα Ενθεμάτων Σιλικόνης', nipple_correction: 'Εισολκή Θηλών - Ανεστραμμένες Θηλές', fat_breast: 'Αυξητική Μαστού με Λίπος',
        cancer_therapy: 'Θεραπεία Καρκίνου', oncoplastic: 'Ογκοπλαστική', recon_implant: 'Ενθέματα Σιλικόνης', nipple_recon: 'Αποκατάσταση Θηλής', diep: 'Αποκατάσταση μέσω Κοιλείας', ld_flap: 'Αποκατάσταση μέσω Πλάτης', thigh_flap: 'Αποκατάσταση μέσω Μηρού & Γλουτού',
        lipo: 'Λιποαναρρόφηση', tummy_tuck: 'Κοιλιοπλαστική', arm_lift: 'Βραχιονοπλαστική', thigh_lift: 'Ανόρθωση Μηρών', labiaplasty: 'Αιδοιοπλαστική', bbl: 'Ανόρθωση Γλουτών με Λίπος',
        mommy_makeover: 'Μommy Μakeover', facial_makeover: 'Facial Makeover', massive_weight_loss: 'Πλαστική Μετά από Μαζική Απώλεια Βάρους',
        gynecomastia: 'Μειωτική Ανδρικών Μαστών – Γυναικομαστία', male_face: 'Αισθητική Χειρουργική Προσώπου για τον Άνδρα', male_body: 'Χειρουργικές Επεμβάσεις Σώματος για τον Άνδρα'
    },
    recovery: { default: 'Ανάλογα με την περίπτωση.' }
  },
  en: {
    nav: { doctor: 'The Doctor', services: 'Services', contact: 'Contact', faq: 'FAQ', blog: 'Blog', book: 'Book Now' },
    hero: { subtitle: 'Plastic Surgery & Aesthetics', title_start: 'The Science', title_mid: 'of', title_end: 'Harmony.', desc: 'Dr. Konstantinos Benetatos combines medical precision with an artistic eye, delivering results that enhance your natural beauty.', cta_results: 'Treatment Results', cta_book: 'Book Appointment', scroll: 'Scroll Down' },
    about: { philosophy: 'Philosophy', title_start: 'Perfection lies in the', title_end: 'Detail.', p1: 'Plastic surgery is not just about changing appearance, but about restoring confidence. Dr. Benetatos believes in results that look natural, respecting the anatomy and uniqueness of each patient.', p2: 'With years of experience and expertise in the most modern techniques, the goal is to achieve absolute harmony. Each face and body is a canvas requiring a specialized approach.', safety: 'Safety', safety_desc: 'Certified procedures.', expertise: 'Expertise', expertise_desc: 'Member of ISAPS.', technology: 'Technology', technology_desc: 'Cutting-edge equipment.' },
    doctor: { label: 'The Doctor', title_main: 'Scientific Excellence &', title_sub: 'International Recognition', p1: 'Dr. Konstantinos Benetatos is a graduate of the Medical School of the University of Athens and a qualified Plastic Surgeon.', p2: 'He is distinguished for his anthropocentric approach and obsession with detail.', years: 'Years of Experience', ops: 'Procedures', cta: 'Full Biography' },
    distinctions: { title: 'Certifications & Memberships', main_title: 'Active Member of the Medical Community' },
    servicesSection: { title: 'Services', subtitle: 'Transform Your Confidence', items: { face: { title: 'Face', desc: 'Rhinoplasty, Face Lift and Blepharoplasty for harmony and rejuvenation.' }, skin: { title: 'Skin', desc: 'Skin surgery, mole removal and Laser treatments.' }, breast: { title: 'Breast', desc: 'Augmentation, Lift and Reconstruction with natural results.' }, body: { title: 'Body', desc: 'Liposculpture, Abdominoplasty and silhouette sculpting.' }, combined: { title: 'Combined', desc: 'Mommy Makeover and total face & body transformation.' }, men: { title: 'Men', desc: 'Specialized treatments for the needs of the male body.' } }, more: 'More' },
    testimonials: { 
        title: 'Testimonials', 
        subtitle: 'Real Stories', 
        items: [
            { text: "I didn't believe the result would be so natural...", name: "Maria K.", proc: "Rhinoplasty" },
            { text: "The experience was excellent from start to finish. The doctor answered every question I had.", name: "Elena P.", proc: "Breast Augmentation" },
            { text: "Professionalism and care on another level. The result exceeded my expectations.", name: "Dimitris A.", proc: "Liposuction" },
            { text: "The trust I felt from the first moment was catalytic. Thank you for everything!", name: "Georgia M.", proc: "Face Lift" },
            { text: "Excellent scientist and wonderful person.", name: "Nikos S.", proc: "Gynecomastia" },
            { text: "Physical rejuvenation without alteration. Exactly what I wanted!", name: "Sofia L.", proc: "Botox & Fillers" }
        ]
    },
    contact: { title: 'Contact', subtitle: 'Book Your Consultation', visit_title: 'Visit Us', visit_desc: 'Book your appointment and start the journey of change.', address_label: 'Address', phone_label: 'Phone', email_label: 'Email', form: { name: 'Full Name', tel: 'Phone', email: 'Email', msg: 'Message', submit: 'Send Message' } },
    footer: { rights: 'All Rights Reserved', faq: 'FAQ' },
    servicesPage: { title: 'Select Treatment', subtitle: 'Premium Services', all: 'All', benefits: 'Benefits', recovery: 'Recovery', results: 'Results', book: 'Book Now', empty: 'No services found.' },
    serviceDetails: { back: 'Back to Services', results_title: 'The Results Speak for Themselves', before: 'Before', after: 'After', before_badge: 'Before Treatment', after_badge: 'After Treatment', no_images: 'Photographic material coming soon.', process_title: 'The Process', expectations: 'Expectations', complications: 'Complications', interested: 'Interested?', interested_desc: 'Book your appointment for a personal consultation.', approach: 'Our approach is based on personalization...' },
    doctorBio: { 
        back: 'Back to Home', 
        title: 'KONSTANTINOS', 
        surname: 'BENETATOS', 
        quote: '"Plastic surgery is the art of restoring form and function..."', 
        intro_title: 'Specialized Plastic Surgeon with an international career.', 
        edu_title: 'Education', 
        edu_desc: 'SSAS, AUTH, Nottingham University', 
        exp_title: 'International Experience', 
        exp_desc: 'UK (Nottingham, Queen Medical Centre)', 
        spec_title: 'Specialization', 
        spec_desc: 'Microsurgery, Breast, Head & Neck', 
        bio_paragraphs: [
            'Mr. Konstantinos Benetatos, after Panhellenic examinations, was admitted to the Military Medicine (SSAS) of the Aristotle University of Thessaloniki in September 1996. He completed his studies in 2002 and subsequently fulfilled his military obligations as a Medical Officer, offering valuable services in Rhodes and the Greek NATO force in Afghanistan for 2 years.',
            'In 2006, he began his specialization in Plastic Surgery at the 401 General Military Hospital of Athens and subsequently at the "Agios Savvas" Anticancer Oncology Hospital. After successful examinations at the Royal College of Surgeons of England, he continued his specialization abroad.',
            'From 2008 to 2012, he was initiated into the art of Reconstructive and Aesthetic Plastic Surgery alongside eminent surgeons of the Plastic Surgery department of the University of Nottingham, England (Nottingham University Hospital/Queen Medical Centre), where he gained valuable knowledge and experience. Specifically, he specialized in a wide range of reconstructive and aesthetic plastic surgery such as breast surgery, hand surgery, repair of congenital malformations such as cleft lips or palates, trauma surgery, burn management, and full management with excision and reconstruction of large defects in patients with skin cancer, breast cancer, and various types of sarcomas.',
            'He attended numerous Plastic Surgery educational seminars around the world and was an invited speaker at multiple European and International Plastic Surgery conferences. He was guided and inspired as an apprentice by the internationally renowned Plastic Surgeon and current President of Plastic Surgeons of England Mr. G. Perks and worked closely in the private sector with distinguished Aesthetic Plastic Surgeons such as Mr. S.J. McCulley, Mr. T. Rasheed, and Mr. M. Henley.',
            'In 2011, he was awarded the European Title of Plastic Surgery Specialization following successful examinations by the corresponding European Board and subsequently worked at the University of Nottingham as a Senior MicroFellow (Microsurgery Fellowship) for a year and a half until May 2012, where he specialized in Breast (Breast Institute of Nottingham University Hospital) and Head and Neck Diseases (Oral and Maxillofacial Department, ENT Department) under the guidance of Microsurgeons Mr. P. Hollows and Mr. I. McVicar.',
            'During this period, he successfully performed over 120 microsurgical operations (free tissue transfer-autotransplantations to the face, skull, oral cavity, and breast). In 2012, he had the honor of becoming a member of the World Society for Reconstructive Microsurgery based in America, in recognition of his arduous effort and contribution to the field of microsurgery. In the same year, 2012, after successful examinations, he received the official Title of Plastic Surgery specialization in Greece and has since been working as a Consultant Plastic Surgeon at the 401 General Military Hospital of Athens.',
            'He is a recognized member of the Hellenic Society of Plastic Surgery, the Hellenic Society for Microsurgery and Hand Surgery, the European Society of Plastic Surgery, and the Royal College of Surgeons of England.'
        ],
        highlight: '"He was guided and inspired as an apprentice by the internationally renowned Plastic Surgeon and current President of Plastic Surgeons of England Mr. G. Perks..."', 
        cta_trust: 'Trust your appearance to the hands of an internationally recognized expert.' 
    },
    faq: { title: 'Frequently Asked Questions', subtitle: 'Knowledge Base', search_placeholder: 'Search for your question...', no_results: 'No results found', not_found_title: 'Didn\'t find what you are looking for?', contact_us: 'Contact us', categories: { all: 'All', general: 'General', face: 'Face', breast: 'Breast', body: 'Body', non_invasive: 'Non-Invasive' } },
    blog: { title: 'Latest News & Articles', subtitle: 'Updates', read_more: 'Read More', back: 'Back to Articles', share: 'Share', published: 'Published' },
    cats: { face: 'Face', skin: 'Skin', breast: 'Breast', body: 'Body', combined: 'Combined Procedures', men: 'Men' },
    sub: { surgical: 'Surgical', inject: 'Injectables', laser: 'LASER', noninv: 'Non-Invasive' },
    items: {
        facelift: 'Facelift – Deep Plane Face & Neck Lift', bleph: 'Blepharoplasty', brow: 'Brow Lift', rhino: 'Rhinoplasty (Functional)', oto: 'Otoplasty',
        hyal: 'Hyaluronic Acid', fat_grafting: 'Facial Fat Transfer', botox: 'Injectable Wrinkle Treatment', prp: 'PRP Therapy', threads: 'Facial Rejuvenation',
        moles: 'Moles, Cysts, Lipomas', skin_cancer: 'Skin Cancer', scars: 'Scar Repair',
        co2: 'Skin Resurfacing LASER', hair_removal: 'LASER Hair Removal', ipl: 'Photorejuvenation', antiaging: 'Anti-aging',
        augmentation: 'Breast Augmentation (Silicone)', reduction: 'Breast Reduction', mastopexy: 'Breast Lift', asymmetry: 'Asymmetry Correction', implant_revision: 'Implant Problems', nipple_correction: 'Inverted Nipples', fat_breast: 'Fat Transfer Augmentation',
        cancer_therapy: 'Cancer Therapy', oncoplastic: 'Oncoplastic', recon_implant: 'Silicone Implants (Recon)', nipple_recon: 'Nipple Reconstruction', diep: 'Abdominal Flap', ld_flap: 'Back Flap', thigh_flap: 'Thigh/Gluteal Flap',
        lipo: 'Liposuction', tummy_tuck: 'Tummy Tuck', arm_lift: 'Arm Lift', thigh_lift: 'Thigh Lift', labiaplasty: 'Labiaplasty', bbl: 'BBL',
        mommy_makeover: 'Mommy Makeover', facial_makeover: 'Facial Makeover', massive_weight_loss: 'Post-Massive Weight Loss',
        gynecomastia: 'Gynecomastia', male_face: 'Male Face Surgery', male_body: 'Male Body Surgery'
    },
    recovery: { default: 'Depends on case.' }
  },
  de: {
    nav: { doctor: 'Der Arzt', services: 'Dienstleistungen', contact: 'Kontakt', faq: 'FAQ', blog: 'Blog', book: 'Buchen' },
    hero: { subtitle: 'Plastische Chirurgie', title_start: 'Die Wissenschaft', title_mid: 'der', title_end: 'Harmonie.', desc: 'Dr. Konstantinos Benetatos verbindet medizinische Präzision mit einem künstlerischen Auge.', cta_results: 'Ergebnisse', cta_book: 'Buchen', scroll: 'Scrollen' },
    about: { philosophy: 'Philosophie', title_start: 'Perfektion', title_end: 'Detail.', p1: 'Plastische Chirurgie stellt das Selbstvertrauen wieder her.', p2: 'Absolute Harmonie durch modernste Techniken.', safety: 'Sicherheit', safety_desc: 'Zertifizierte Verfahren.', expertise: 'Expertise', expertise_desc: 'ISAPS Mitglied.', technology: 'Technologie', technology_desc: 'Modernste Geräte.' },
    doctor: { label: 'Der Arzt', title_main: 'Exzellenz', title_sub: 'Anerkennung', p1: 'Qualifizierter plastischer Chirurg.', p2: 'Detailorientierter Ansatz.', years: 'Jahre', ops: 'OPs', cta: 'Bio' },
    distinctions: { title: 'Zertifikate', main_title: 'Aktives Mitglied der Medizinischen Gemeinschaft' },
    servicesSection: { title: 'Dienstleistungen', subtitle: 'Selbstvertrauen', items: { face: { title: 'Gesicht', desc: 'Rhinoplastik, Facelift...' }, skin: { title: 'Haut', desc: 'Muttermale, Laser...' }, breast: { title: 'Brust', desc: 'Vergrößerung, Straffung...' }, body: { title: 'Körper', desc: 'Fettabsaugung, Bauchdeckenstraffung...' }, combined: { title: 'Kombiniert', desc: 'Mommy Makeover...' }, men: { title: 'Männer', desc: 'Gynäkomastie...' } }, more: 'Mehr' },
    testimonials: { 
        title: 'Referenzen', 
        subtitle: 'Geschichten', 
        items: [
            { text: "Ich hätte nicht geglaubt, dass das Ergebnis so natürlich sein würde...", name: "Maria K.", proc: "Rhinoplastik" },
            { text: "Die Erfahrung war von Anfang bis Ende ausgezeichnet. Der Arzt hat jede meiner Fragen beantwortet.", name: "Elena P.", proc: "Brustvergrößerung" },
            { text: "Professionalität und Fürsorge auf einem anderen Niveau. Das Ergebnis hat meine Erwartungen übertroffen.", name: "Dimitris A.", proc: "Fettabsaugung" },
            { text: "Das Vertrauen, das ich vom ersten Moment an spürte, war entscheidend. Danke für alles!", name: "Georgia M.", proc: "Face Lift" },
            { text: "Ausgezeichneter Wissenschaftler und wunderbarer Mensch.", name: "Nikos S.", proc: "Gynäkomastie" },
            { text: "Natürliche Verjüngung ohne Veränderung. Genau das, was ich wollte!", name: "Sofia L.", proc: "Botox & Fillers" }
        ]
    },
    contact: { title: 'Kontakt', subtitle: 'Buchen', visit_title: 'Besuch', visit_desc: 'Buchen Sie jetzt.', address_label: 'Adresse', phone_label: 'Tel', email_label: 'Email', form: { name: 'Name', tel: 'Tel', email: 'Email', msg: 'Nachricht', submit: 'Senden' } },
    footer: { rights: 'Rechte vorbehalten', faq: 'FAQ' },
    servicesPage: { title: 'Wählen', subtitle: 'Premium', all: 'Alle', benefits: 'Vorteile', recovery: 'Erholung', results: 'Ergebnisse', book: 'Buchen', empty: 'Leer.' },
    serviceDetails: { back: 'Zurück', results_title: 'Ergebnisse', before: 'Vorher', after: 'Nachher', before_badge: 'Vorher', after_badge: 'Nachher', no_images: 'Bald', process_title: 'Prozess', expectations: 'Erwartungen', complications: 'Komplikationen', interested: 'Interessiert?', interested_desc: 'Buchen Sie jetzt.', approach: 'Personalisierter Ansatz.' },
    doctorBio: { 
        back: 'Zurück', 
        title: 'KONSTANTINOS', 
        surname: 'BENETATOS', 
        quote: '"Kunst der Wiederherstellung..."', 
        intro_title: 'Spezialisierter Chirurg.', 
        edu_title: 'Ausbildung', 
        edu_desc: 'SSAS, AUTH, Nottingham', 
        exp_title: 'Erfahrung', 
        exp_desc: 'UK (Nottingham)', 
        spec_title: 'Spezialisierung', 
        spec_desc: 'Mikrochirurgie, Brust', 
        bio_paragraphs: [
            'Herr Konstantinos Benetatos wurde im September 1996 nach panhellenischen Prüfungen an der Militärmedizin (SSAS) der Aristoteles-Universität Thessaloniki zugelassen. Er schloss sein Studium 2002 ab und erfüllte anschließend seine militärischen Verpflichtungen als Sanitätsoffizier, wobei er zwei Jahre lang wertvolle Dienste auf Rhodos und bei den griechischen NATO-Streitkräften in Afghanistan leistete.',
            'Im Jahr 2006 begann er seine Spezialisierung auf Plastische Chirurgie im 401 Allgemeinen Militärkrankenhaus von Athen und anschließend im Onkologischen Krankenhaus "Agios Savvas". Nach erfolgreichen Prüfungen am Royal College of Surgeons of England setzte er seine Spezialisierung im Ausland fort.',
            'Von 2008 bis 2012 wurde er in die Kunst der Rekonstruktiven und Ästhetischen Plastischen Chirurgie an der Seite bedeutender Chirurgen der Abteilung für Plastische Chirurgie der Universität Nottingham, England (Nottingham University Hospital/Queen Medical Centre), eingeführt. Insbesondere spezialisierte er sich auf ein breites Spektrum der rekonstruktiven und ästhetischen plastischen Chirurgie wie Brustchirurgie, Handchirurgie, Korrektur angeborener Fehlbildungen, Traumachirurgie, Verbrennungsmanagement sowie die vollständige Behandlung mit Exzision und Rekonstruktion großer Defekte bei Patienten mit Hautkrebs, Brustkrebs und verschiedenen Sarkomarten.',
            'Er besuchte zahlreiche Ausbildungsseminare für Plastische Chirurgie auf der ganzen Welt und war eingeladener Redner auf mehreren europäischen und internationalen Konferenzen. Er wurde als Lehrling von dem international renommierten Plastischen Chirurgen und derzeitigen Präsidenten der Plastischen Chirurgen Englands, Mr. G. Perks, geleitet und inspiriert und arbeitete im privaten Sektor eng mit angesehenen Ästhetischen Plastischen Chirurgen wie Mr. S.J. McCulley, Mr. T. Rasheed und Mr. M. Henley.',
            'Im Jahr 2011 wurde ihm der Europäische Titel für Plastische Chirurgie verliehen. Anschließend arbeitete er eineinhalb Jahre lang bis Mai 2012 an der Universität Nottingham als Senior MicroFellow, wo er sich unter der Leitung der Mikrochirurgen Mr. P. Hollows und Mr. I. McVicar auf Brust- sowie Kopf- und Halskerankungen spezialisierte.',
            'In diesem Zeitraum führte er erfolgreich über 120 mikrochirurgische Operationen durch. 2012 hatte er die Ehre, Mitglied der World Society for Reconstructive Microsurgery mit Sitz in Amerika zu werden. Im selben Jahr erhielt er nach erfolgreichen Prüfungen auch den offiziellen Titel der Facharztausbildung für Plastische Chirurgie in Griechenland und arbeitet seitdem als Oberarzt für Plastische Chirurgie im 401 Allgemeinen Militärkrankenhaus von Athen.',
            'Er ist anerkanntes Mitglied der Griechischen Gesellschaft für Plastische Chirurgie, der Griechischen Gesellschaft für Mikrochirurgie und Handchirurgie, der Europäischen Gesellschaft für Plastische Chirurgie und des Royal College of Surgeons of England.'
        ],
        highlight: '"Er wurde als Lehrling von dem international renommierten Plastischen Chirurgen und derzeitigen Präsidenten der Plastischen Chirurgen Englands, Mr. G. Perks, geleitet und inspiriert..."', 
        cta_trust: 'Vertrauen Sie uns...' 
    },
    faq: { title: 'FAQ', subtitle: 'Wissen', search_placeholder: 'Suchen...', no_results: 'Keine', not_found_title: 'Nicht gefunden?', contact_us: 'Kontakt', categories: { all: 'Alle', general: 'Allgemein', face: 'Gesicht', breast: 'Brust', body: 'Körper', non_invasive: 'Nicht-invasiv' } },
    blog: { title: 'Nachrichten & Artikel', subtitle: 'Updates', read_more: 'Mehr lesen', back: 'Zurück', share: 'Teilen', published: 'Veröffentlicht' },
    cats: { face: 'Gesicht', skin: 'Haut', breast: 'Brust', body: 'Körper', combined: 'Kombiniert', men: 'Männer' },
    sub: { surgical: 'Chirurgie', inject: 'Injektionen', laser: 'LASER', noninv: 'Nicht-Invasiv' },
    items: {
        facelift: 'Facelift – Deep Plane & Halsstraffung', bleph: 'Blepharoplastik (Lidstraffung)', brow: 'Stirnlift', rhino: 'Rhinoplastik', oto: 'Otoplastik (Ohrenkorrektur)',
        hyal: 'Hyaluronsäure', fat_grafting: 'Eigenfettunterspritzung', botox: 'Faltenbehandlung', prp: 'PRP Therapie', threads: 'Gesichtsverjüngung',
        moles: 'Muttermale & Zysten', skin_cancer: 'Hautkrebs', scars: 'Narbenkorrektur', co2: 'Laser Skin Resurfacing', hair_removal: 'Laser Haarentfernung', ipl: 'Photorejuvenation', antiaging: 'Anti-Aging',
        augmentation: 'Brustvergrößerung (Implantat)', reduction: 'Brustverkleinerung', mastopexy: 'Bruststraffung', asymmetry: 'Asymmetrie Korrektur', implant_revision: 'Implantat Probleme', nipple_correction: 'Schlupfwarzen', fat_breast: 'Brustvergrößerung (Eigenfett)',
        cancer_therapy: 'Krebstherapie', oncoplastic: 'Onkoplastik', recon_implant: 'Implantate (Rekonstruktion)', nipple_recon: 'Brustwarzenrekonstruktion', diep: 'DIEP Flap', ld_flap: 'Latissimus Flap', thigh_flap: 'Oberschenkel Flap',
        lipo: 'Fettabsaugung (Liposuktion)', tummy_tuck: 'Bauchdeckenstraffung', arm_lift: 'Oberarmstraffung', thigh_lift: 'Oberschenkelstraffung', labiaplasty: 'Schamlippenkorrektur', bbl: 'Brazilian Butt Lift',
        mommy_makeover: 'Mommy Makeover', facial_makeover: 'Facial Makeover', massive_weight_loss: 'Straffung nach Gewichtsverlust',
        gynecomastia: 'Gynäkomastie', male_face: 'Gesichtschirurgie Mann', male_body: 'Körperformung Mann'
    },
    recovery: { default: 'Fallabhängig.' }
  },
  fr: {
    nav: { doctor: 'Docteur', services: 'Services', contact: 'Contact', faq: 'FAQ', blog: 'Blog', book: 'Réserver' },
    hero: { subtitle: 'Chirurgie Plastique', title_start: 'La Science', title_mid: 'de', title_end: 'l\'Harmonie.', desc: 'Dr. Konstantinos Benetatos allie précision médicale et œil artistique.', cta_results: 'Résultats', cta_book: 'Réserver', scroll: 'Défiler' },
    about: { philosophy: 'Philosophie', title_start: 'Perfection', title_end: 'Détail.', p1: 'La chirurgie plastique restaure la confiance.', p2: 'Harmonie absolue par des techniques modernes.', safety: 'Sécurité', safety_desc: 'Procédures certifiées.', expertise: 'Expertise', expertise_desc: 'Membre ISAPS.', technology: 'Technologie', technology_desc: 'Équipement de pointe.' },
    doctor: { label: 'Le Docteur', title_main: 'Excellence', title_sub: 'Reconnaissance', p1: 'Chirurgien plastique qualifié.', p2: 'Approche anthropocentrique.', years: 'Années', ops: 'Procédures', cta: 'Bio' },
    distinctions: { title: 'Certificats', main_title: 'Membre Actif de la Communauté Médicale' },
    servicesSection: { title: 'Services', subtitle: 'Confiance', items: { face: { title: 'Visage', desc: 'Rhinoplastie, Lifting...' }, skin: { title: 'Peau', desc: 'Grains de beauté, Laser...' }, breast: { title: 'Poitrine', desc: 'Augmentation, Lifting...' }, body: { title: 'Corps', desc: 'Liposuccion, Abdominoplastie...' }, combined: { title: 'Combiné', desc: 'Mommy Makeover...' }, men: { title: 'Hommes', desc: 'Gynécomastie...' } }, more: 'Plus' },
    testimonials: { 
        title: 'Témoignages', 
        subtitle: 'Histoires', 
        items: [
            { text: "Je ne croyais pas que le résultat serait si naturel...", name: "Maria K.", proc: "Rhinoplastie" },
            { text: "L'expérience a été excellente du début à la fin. Le médecin a répondu à toutes mes questions.", name: "Elena P.", proc: "Augmentation Mammaire" },
            { text: "Professionnalisme et soins à un autre niveau. Le résultat a dépassé mes attentes.", name: "Dimitris A.", proc: "Liposuccion" },
            { text: "La confiance que j'ai ressentie dès le premier instant a été déterminante. Merci pour tout !", name: "Georgia M.", proc: "Face Lift" },
            { text: "Excellent scientifique et merveilleuse personne.", name: "Nikos S.", proc: "Gynécomastie" },
            { text: "Rajeunissement naturel sans altération. Exactement ce que je voulais !", name: "Sofia L.", proc: "Botox & Fillers" }
        ]
    },
    contact: { title: 'Contact', subtitle: 'Réserver', visit_title: 'Visite', visit_desc: 'Réservez maintenant.', address_label: 'Adresse', phone_label: 'Tél', email_label: 'Email', form: { name: 'Nom', tel: 'Tél', email: 'Email', msg: 'Message', submit: 'Envoyer' } },
    footer: { rights: 'Droits réservés', faq: 'FAQ' },
    servicesPage: { title: 'Choisir', subtitle: 'Premium', all: 'Tous', benefits: 'Avantages', recovery: 'Récupération', results: 'Résultats', book: 'Réserver', empty: 'Vide.' },
    serviceDetails: { back: 'Retour', results_title: 'Résultats', before: 'Avant', after: 'Après', before_badge: 'Avant', after_badge: 'Après', no_images: 'Bientôt', process_title: 'Processus', expectations: 'Attentes', complications: 'Complications', interested: 'Intéressé?', interested_desc: 'Réservez maintenant.', approach: 'Approche personnalisée.' },
    doctorBio: { 
        back: 'Retour', 
        title: 'KONSTANTINOS', 
        surname: 'BENETATOS', 
        quote: '"L\'art de la restauration..."', 
        intro_title: 'Chirurgien spécialisé.', 
        edu_title: 'Éducation', 
        edu_desc: 'SSAS, AUTH, Nottingham', 
        exp_title: 'Expérience', 
        exp_desc: 'Royaume-Uni', 
        spec_title: 'Spécialisation', 
        spec_desc: 'Microchirurgie, Sein', 
        bio_paragraphs: [
            'M. Konstantinos Benetatos a été admis à la Médecine Militaire (SSAS) de l\'Université Aristote de Thessalonique en septembre 1996. Il a terminé ses études en 2002 et a ensuite rempli ses obligations militaires en tant qu\'officier médecin, offrant des services précieux à Rhodes et au sein de la force grecque de l\'OTAN en Afghanistan pendant 2 ans.',
            'En 2006, il a commencé sa spécialisation en chirurgie plastique à l\'hôpital militaire général 401 d\'Athènes, puis à l\'hôpital oncologique "Agios Savvas". Après avoir réussi les examens du Royal College of Surgeons d\'Angleterre, il a poursuivi sa spécialisation à l\'étranger.',
            'De 2008 à 2012, il a été initié à l\'art de la chirurgie plastique reconstructive et esthétique aux côtés d\'éminents chirurgiens du département de chirurgie plastique de l\'Université de Nottingham, en Angleterre. Il s\'est spécialisé dans un large éventail de chirurgies, telles que la chirurgie mammaire, la chirurgie de la main, la réparation des malformations congénitales, la chirurgie traumatologique, la gestion des brûlures, ainsi que la reconstruction de grands défauts chez les patients atteints de cancer de la peau ou du sein.',
            'Il a assisté à de nombreux séminaires éducatifs sur la chirurgie plastique à travers le monde et a été conférencier invité lors de multiples conférences européennes et internationales. Il a été guidé et inspiré par le chirurgien plastique de renommée internationale Mr G. Perks, et a collaboré étroitement dans le secteur privé avec des chirurgiens esthétiques distingués tels que Mr S.J. McCulley, Mr T. Rasheed et Mr M. Henley.',
            'En 2011, il a obtenu le titre européen de spécialisation en chirurgie plastique. Il a ensuite travaillé à l\'Université de Nottingham en tant que Senior MicroFellow pendant un an et demi jusqu\'en mai 2012, se spécialisant dans les maladies du sein et de la tête et du cou sous la direction des microchirurgiens Mr P. Hollows et Mr I. McVicar.',
            'Au cours de cette période, il a réalisé avec succès plus de 120 opérations microchirurgicales. En 2012, il a eu l\'honneur de devenir membre de la World Society for Reconstructive Microsurgery basée en Amérique. La même année, il a reçu le titre officiel de spécialisation en chirurgie plastique en Grèce et travaille depuis comme chirurgien plastique consultant à l\'hôpital militaire général 401 d\'Athènes.',
            'Il est membre reconnu de la Société Hellénique de Chirurgie Plastique, de la Société Hellénique de Microchirurgie et de Chirurgie de la Main, de la Société Européenne de Chirurgie Plastique et du Royal College of Surgeons d\'Angleterre.'
        ],
        highlight: '"Il a été guidé et inspiré en tant qu\'apprenti par le chirurgien plasticien de renommée internationale et actuel président des chirurgiens plasticiens d\'Angleterre, M. G. Perks..."', 
        cta_trust: 'Faites confiance...' 
    },
    faq: { title: 'FAQ', subtitle: 'Savoir', search_placeholder: 'Chercher...', no_results: 'Aucun', not_found_title: 'Pas trouvé?', contact_us: 'Contact', categories: { all: 'Tous', general: 'Général', face: 'Visage', breast: 'Sein', body: 'Corps', non_invasive: 'Non-invasif' } },
    blog: { title: 'Actualités et Articles', subtitle: 'Mises à jour', read_more: 'Lire la suite', back: 'Retour', share: 'Partager', published: 'Publié' },
    cats: { face: 'Visage', skin: 'Peau', breast: 'Sein', body: 'Corps', combined: 'Combiné', men: 'Hommes' },
    sub: { surgical: 'Chirurgie', inject: 'Injectables', laser: 'LASER', noninv: 'Non-Invasiv' },
    items: {
        facelift: 'Facelift – Lifting Cervico-Facial', bleph: 'Blépharoplastie', brow: 'Lifting Frontal', rhino: 'Rhinoplastie', oto: 'Otoplastie',
        hyal: 'Acide Hyaluronique', fat_grafting: 'Lipofilling Visage', botox: 'Traitement Rides', prp: 'Thérapie PRP', threads: 'Rajeunissement Facial',
        moles: 'Grains de beauté & Kystes', skin_cancer: 'Cancer de la Peau', scars: 'Correction Cicatrices', co2: 'Laser Resurfacing', hair_removal: 'Épilation Laser', ipl: ' Photorajeunissement', antiaging: 'Anti-âge',
        augmentation: 'Augmentation Mammaire (Implant)', reduction: 'Réduction Mammaire', mastopexy: 'Lifting Mammaire', asymmetry: 'Correction Asymétrie', implant_revision: 'Problèmes Implants', nipple_correction: 'Mamelons Inversés', fat_breast: 'Augmentation (Graisse)',
        cancer_therapy: 'Thérapie Cancer', oncoplastic: 'Oncoplastie', recon_implant: 'Implants (Reconstruction)', nipple_recon: 'Reconstruction Mamelon', diep: 'Lambeau DIEP', ld_flap: 'Lambeau Dorsal', thigh_flap: 'Lambeau Cuisse',
        lipo: 'Liposuccion', tummy_tuck: 'Abdominoplastie', arm_lift: 'Lifting Bras', thigh_lift: 'Lifting Cuisses', labiaplasty: 'Labiaplastie', bbl: 'Brazilian Butt Lift',
        mommy_makeover: 'Mommy Makeover', facial_makeover: 'Facial Makeover', massive_weight_loss: 'Chirurgie Post-Perte de Poids',
        gynecomastia: 'Gynécomastie', male_face: 'Chirurgie Visage Homme', male_body: 'Chirurgie Corps Homme'
    },
    recovery: { default: 'Variable selon le cas.' }
  },
  ru: {
    nav: { doctor: 'Врач', services: 'Услуги', contact: 'Контакты', faq: 'Частые вопросы', blog: 'Блог', book: 'Записаться' },
    hero: { subtitle: 'Пластическая хирургия и эстетика', title_start: 'Наука', title_mid: 'о', title_end: 'Гармонии.', desc: 'Доктор Константинос Бенетатос сочетает медицинскую точность с художественным взглядом, обеспечивая результаты, подчеркивающие вашу естественную красоту.', cta_results: 'Результаты', cta_book: 'Записаться', scroll: 'Прокрутить вниз' },
    about: { philosophy: 'Философия', title_start: 'Совершенство', title_end: 'в деталях.', p1: 'Пластическая хирургия — это не просто изменение внешности, но и восстановление уверенности в себе.', p2: 'Благодаря многолетнему опыту и современным методам, цель — достижение абсолютной гармонии.', safety: 'Безопасность', safety_desc: 'Сертифицированные процедуры.', expertise: 'Экспертиза', expertise_desc: 'Член ISAPS.', technology: 'Технологии', technology_desc: 'Передовое оборудование.' },
    doctor: { label: 'Врач', title_main: 'Превосходство', title_sub: 'Признание', p1: 'Квалифицированный пластический хирург.', p2: 'Антропоцентрический подход.', years: 'Лет', ops: 'Операций', cta: 'Биография' },
    distinctions: { title: 'Сертификаты', main_title: 'Активный Член Медицинского Сообщества' },
    servicesSection: { title: 'Услуги', subtitle: 'Уверенность', items: { face: { title: 'Лицо', desc: 'Ринопластика, лифтинг...' }, skin: { title: 'Кожа', desc: 'Родинки, лазер...' }, breast: { title: 'Грудь', desc: 'Увеличение, подтяжка...' }, body: { title: 'Тело', desc: 'Липосакция, пластика живота...' }, combined: { title: 'Комбинированные', desc: 'Mommy Makeover...' }, men: { title: 'Мужчины', desc: 'Гинекомастия...' } }, more: 'Подробнее' },
    testimonials: { 
        title: 'Отзывы', 
        subtitle: 'Истории', 
        items: [
            { text: "Я не верила, что результат будет таким естественным...", name: "Мария К.", proc: "Ринопластика" },
            { text: "Опыт был превосходным от начала до конца. Врач ответил на все мои вопросы.", name: "Елена П.", proc: "Увеличение груди" },
            { text: "Профессионализм и забота на другом уровне. Результат превзошел мои ожидания.", name: "Дмитрий А.", proc: "Липосакция" },
            { text: "Доверие, которое я почувствовала с первого момента, было решающим. Спасибо за все!", name: "Джорджия М.", proc: "Фейслифтинг" },
            { text: "Отличный ученый и замечательный человек.", name: "Никос С.", proc: "Гинекомастия" },
            { text: "Естественное омоложение без изменений. Именно то, что я хотела!", name: "София Л.", proc: "Botox & Fillers" }
        ]
    },
    contact: { title: 'Контакты', subtitle: 'Записаться', visit_title: 'Посетите нас', visit_desc: 'Запишитесь сейчас.', address_label: 'Адрес', phone_label: 'Тел.', email_label: 'Email', form: { name: 'Имя', tel: 'Тел.', email: 'Email', msg: 'Сообщение', submit: 'Отправить' } },
    footer: { rights: 'Все права защищены', faq: 'Частые вопросы' },
    servicesPage: { title: 'Выбор', subtitle: 'Премиум', all: 'Все', benefits: 'Преимущества', recovery: 'Восстановление', results: 'Результаты', book: 'Записаться', empty: 'Пусто.' },
    serviceDetails: { back: 'Назад', results_title: 'Результаты', before: 'До', after: 'После', before_badge: 'До', after_badge: 'После', no_images: 'Скоро', process_title: 'Процесс', expectations: 'Ожидания', complications: 'Осложнения', interested: 'Интересно?', interested_desc: 'Запишитесь сейчас.', approach: 'Индивидуальный подход.' },
    doctorBio: { 
        back: 'Назад', 
        title: 'КОНСТАНТИНОС', 
        surname: 'БЕНЕТАТОС', 
        quote: '"Искусство восстановления..."', 
        intro_title: 'Специализированный хирург.', 
        edu_title: 'Образование', 
        edu_desc: 'SSAS, AUTH, Ноттингем', 
        exp_title: 'Опыт', 
        exp_desc: 'Великобритания', 
        spec_title: 'Специализация', 
        spec_desc: 'Микрохирургия, грудь', 
        bio_paragraphs: [
            'Г-н Константинос Бенетатос после всегреческих экзаменов поступил в Военно-медицинскую академию (SSAS) Университета Аристотеля в Салониках в сентябре 1996 года. Он завершил обучение в 2002 году, а затем выполнил свои военные обязанности в качестве медицинского офицера, предоставив ценные услуги на Родосе и в греческих силах НАТО в Афганистане в течение 2 лет.',
            'В 2006 году он начал специализацию по пластической хирургии в 401-м Генеральном военном госпитале Афин, а затем в онкологическом госпитале «Агиос Саввас». После успешных экзаменов в Королевском колледже хирургов Англии он продолжил специализацию за границей.',
            'С 2008 по 2012 год он постигал искусство реконструктивной и эстетической пластической хирургии рядом с выдающимися хирургами отделения пластической хирургии Университета Ноттингема, Англия (Nottingham University Hospital/Queen Medical Centre), где получил ценные знания и опыт. В частности, он специализировался на широком спектре реконструктивной и эстетической пластической хирургии, такой как хирургия груди, хирургия кисти, исправление врожденных пороков (расщелины губы и неба), травматология, лечение ожогов, а также полное лечение с иссечением и реконструкцией больших дефектов у пациентов с раком кожи, раком груди и различными типами сарком.',
            'Он посетил многочисленные образовательные семинары по пластической хирургии по всему миру и был приглашенным докладчиком на многих европейских и международных конференциях. Его наставником и вдохновителем был всемирно известный пластический хирург и нынешний президент пластических хирургов Англии г-н Г. Перкс (Mr G. Perks), а в частном секторе он тесно сотрудничал с признанными эстетическими пластическими хирургами, такими как г-н С.Дж. Маккалли (Mr S.J. McCulley), г-н Т. Рашид (Mr T. Rasheed) и г-н М. Хенли (Mr M. Henley).',
            'В 2011 году ему было присвоено звание специалиста по пластической хирургии Европейского образца после успешных экзаменов в соответствующей Европейской комиссии. Впоследствии он работал в Университете Ноттингема в качестве старшего микрохирурга (Senior MicroFellow) в течение полутора лет до мая 2012 года, специализируясь на груди (Институт груди Университетской больницы Ноттингема) и заболеваниях головы и шеи под руководством микрохирургов г-на П. Холлоуса и г-на И. Маквикара.',
            'За этот период он успешно выполнил более 120 микрохирургических операций (свободная пересадка тканей на лицо, череп, полость рта и грудь). В 2012 году он имел честь стать членом Всемирного общества реконструктивной микрохирургии, базирующегося в Америке, в знак признания его усилий и вклада в область микрохирургии. В том же 2012 году после успешных экзаменов он получил официальное звание специалиста по пластической хирургии в Греции и с тех пор работает консультантом по пластической хирургии в 401-м Генеральном военном госпитале Афин.',
            'Он является признанным членом Греческого общества пластической хирургии, Греческого общества микрохирургии и хирургии кисти, Европейского общества пластической хирургии и Королевского колледжа хирургов Англии.'
        ],
        highlight: '"Он был ведом и вдохновлен как ученик всемирно известным пластическим хирургом и нынешним президентом пластических хирургов Англии г-ном Г. Перксом..."', 
        cta_trust: 'Доверьтесь...' 
    },
    faq: { title: 'Частые вопросы', subtitle: 'Знания', search_placeholder: 'Поиск...', no_results: 'Нет', not_found_title: 'Не нашли?', contact_us: 'Связаться', categories: { all: 'Все', general: 'Общие', face: 'Лицо', breast: 'Грудь', body: 'Тело', non_invasive: 'Неинвазивные' } },
    blog: { title: 'Новости и Статьи', subtitle: 'Обновления', read_more: 'Читать далее', back: 'Назад', share: 'Поделиться', published: 'Опубликовано' },
    cats: { face: 'Лицо', skin: 'Кожа', breast: 'Грудь', body: 'Тело', combined: 'Комбинированные', men: 'Мужчины' },
    sub: { surgical: 'Хирургия', inject: 'Инъекции', laser: 'Лазер', noninv: 'Неинвазивные' },
    items: {
        facelift: 'Фейслифтинг', bleph: 'Блефаропластика', brow: 'Подтяжка бровей', rhino: 'Ринопластика', oto: 'Отопластика',
        hyal: 'Гиалуроновая кислота', fat_grafting: 'Липофилинг', botox: 'Ботокс', prp: 'PRP-терапия', threads: 'Нити',
        moles: 'Родинки', skin_cancer: 'Рак кожи', scars: 'Шрамы', co2: 'CO2 Лазер', hair_removal: 'Эпиляция', ipl: 'Фотоомоложение', antiaging: 'Антивозрастные',
        augmentation: 'Увеличение груди', reduction: 'Уменьшение груди', mastopexy: 'Подтяжка груди', asymmetry: 'Асимметрия', implant_revision: 'Замена имплантов', nipple_correction: 'Коррекция сосков', fat_breast: 'Увеличение жиром',
        cancer_therapy: 'Терапия рака', oncoplastic: 'Онкопластика', recon_implant: 'Реконструкция (импланты)', nipple_recon: 'Реконструкция соска', diep: 'DIEP лоскут', ld_flap: 'Лоскут спины', thigh_flap: 'Лоскут бедра',
        lipo: 'Липосакция', tummy_tuck: 'Абдоминопластика', arm_lift: 'Подтяжка рук', thigh_lift: 'Подтяжка бедер', labiaplasty: 'Лабиопластика', bbl: 'BBL',
        mommy_makeover: 'Mommy Makeover', facial_makeover: 'Омоложение лица', massive_weight_loss: 'После похудения',
        gynecomastia: 'Гинекомастия', male_face: 'Мужское лицо', male_body: 'Мужское тело'
    },
    recovery: { default: 'Зависит от случая.' }
  }
};

export const getServiceTree = (lang: Language): CategoryData[] => {
  // ... (existing code remains unchanged, omitted for brevity but part of the final export)
  const t = translations[lang] || translations['el'];
  
  // Helper to get image or default
  const getImg = (id: string) => IMAGES[id as keyof typeof IMAGES] || { before: '', after: '' };
  
  // Helper to construct detail object
  const getDetails = (id: string) => getServiceDetails(id, lang);

  return [
    {
      id: 'face',
      label: t.cats.face,
      subCategories: [
        {
          id: 'surgical',
          label: t.sub.surgical,
          items: [
            { id: 'facelift', name: t.items.facelift, ...getDetails('facelift'), images: [getImg('facelift')] },
            { id: 'blepharoplasty', name: t.items.bleph, ...getDetails('blepharoplasty'), images: [getImg('blepharoplasty')] },
            { id: 'browlift', name: t.items.brow, ...getDetails('browlift'), images: [getImg('browlift')] },
            { id: 'rhinoplasty', name: t.items.rhino, ...getDetails('rhinoplasty'), images: [getImg('rhinoplasty')] },
            { id: 'otoplasty', name: t.items.oto, ...getDetails('otoplasty'), images: [getImg('otoplasty')] }
          ]
        },
        {
          id: 'injectables',
          label: t.sub.inject,
          items: [
            { id: 'hyaluronic', name: t.items.hyal, ...getDetails('hyaluronic'), images: [getImg('hyaluronic')] },
            { id: 'fat-grafting', name: t.items.fat_grafting, ...getDetails('fat-grafting'), images: [getImg('fat_grafting')] },
            { id: 'botox', name: t.items.botox, ...getDetails('botox'), images: [getImg('botox')] },
            { id: 'prp', name: t.items.prp, ...getDetails('prp'), images: [getImg('prp')] },
            { id: 'threads', name: t.items.threads, ...getDetails('threads'), images: [getImg('threads')] }
          ]
        }
      ]
    },
    {
      id: 'skin',
      label: t.cats.skin,
      subCategories: [
        {
          id: 'surgical',
          label: t.sub.surgical,
          items: [
            { id: 'moles', name: t.items.moles, ...getDetails('moles'), images: [getImg('moles')] },
            { id: 'skin-cancer', name: t.items.skin_cancer, ...getDetails('skin-cancer') },
            { id: 'scars', name: t.items.scars, ...getDetails('scars'), images: [getImg('scars')] }
          ]
        },
        {
          id: 'laser',
          label: t.sub.laser,
          items: [
            { id: 'co2', name: t.items.co2, ...getDetails('co2'), images: [getImg('co2')] },
            { id: 'hair-removal', name: t.items.hair_removal, ...getDetails('hair-removal'), images: [getImg('hair_removal')] },
            { id: 'ipl', name: t.items.ipl, ...getDetails('ipl'), images: [getImg('ipl')] },
            { id: 'antiaging', name: t.items.antiaging, ...getDetails('antiaging') }
          ]
        }
      ]
    },
    {
      id: 'breast',
      label: t.cats.breast,
      subCategories: [
        {
          id: 'surgical',
          label: t.sub.surgical,
          items: [
            { id: 'augmentation', name: t.items.augmentation, ...getDetails('augmentation'), images: [getImg('augmentation')] },
            { id: 'reduction', name: t.items.reduction, ...getDetails('reduction'), images: [getImg('reduction')] },
            { id: 'mastopexy', name: t.items.mastopexy, ...getDetails('mastopexy'), images: [getImg('mastopexy')] },
            { id: 'asymmetry', name: t.items.asymmetry, ...getDetails('asymmetry') },
            { id: 'implant-revision', name: t.items.implant_revision, ...getDetails('implant-revision') },
            { id: 'nipple-correction', name: t.items.nipple_correction, ...getDetails('nipple-correction') },
            { id: 'fat-breast', name: t.items.fat_breast, ...getDetails('fat-breast') }
          ]
        },
        {
          id: 'non-invasive',
          label: t.sub.noninv,
          items: [
            { id: 'cancer-therapy', name: t.items.cancer_therapy, ...getDetails('cancer-therapy') },
            { id: 'oncoplastic', name: t.items.oncoplastic, ...getDetails('oncoplastic') },
            { id: 'recon-implant', name: t.items.recon_implant, ...getDetails('recon-implant') },
            { id: 'nipple-recon', name: t.items.nipple_recon, ...getDetails('nipple-recon') },
            { id: 'diep', name: t.items.diep, ...getDetails('diep') },
            { id: 'ld-flap', name: t.items.ld_flap, ...getDetails('ld-flap') },
            { id: 'thigh-flap', name: t.items.thigh_flap, ...getDetails('thigh-flap') }
          ]
        }
      ]
    },
    {
      id: 'body',
      label: t.cats.body,
      items: [
        { id: 'lipo', name: t.items.lipo, ...getDetails('lipo'), images: [getImg('lipo')] },
        { id: 'tummy-tuck', name: t.items.tummy_tuck, ...getDetails('tummy-tuck'), images: [getImg('tummy_tuck')] },
        { id: 'arm-lift', name: t.items.arm_lift, ...getDetails('arm-lift'), images: [getImg('arm_lift')] },
        { id: 'thigh-lift', name: t.items.thigh_lift, ...getDetails('thigh-lift'), images: [getImg('thigh_lift')] },
        { id: 'labiaplasty', name: t.items.labiaplasty, ...getDetails('labiaplasty') },
        { id: 'bbl', name: t.items.bbl, ...getDetails('bbl'), images: [getImg('bbl')] }
      ]
    },
    {
      id: 'combined',
      label: t.cats.combined,
      items: [
        { id: 'mommy-makeover', name: t.items.mommy_makeover, ...getDetails('mommy-makeover'), images: [getImg('mommy_makeover')] },
        { id: 'facial-makeover', name: t.items.facial_makeover, ...getDetails('facial-makeover'), images: [getImg('facial_makeover')] },
        { id: 'massive-weight-loss', name: t.items.massive_weight_loss, ...getDetails('massive-weight-loss'), images: [getImg('massive_weight_loss')] }
      ]
    },
    {
      id: 'men',
      label: t.cats.men,
      items: [
        { id: 'gynecomastia', name: t.items.gynecomastia, ...getDetails('gynecomastia'), images: [getImg('gynecomastia')] },
        { id: 'male-face', name: t.items.male_face, ...getDetails('male-face'), images: [getImg('male_face')] },
        { id: 'male-body', name: t.items.male_body, ...getDetails('male-body'), images: [getImg('male_body')] }
      ]
    }
  ];
};

export const getFaqData = (lang: Language) => {
    return [
      { id: 'g1', category: 'general', question: lang === 'el' ? 'Πόσο κοστίζει μια συμβουλευτική επίσκεψη;' : (lang === 'ru' ? 'Сколько стоит консультация?' : 'How much does a consultation cost?'), answer: '' },
      { id: 'g2', category: 'general', question: lang === 'el' ? 'Ποιος είναι ο χρόνος αποθεραπείας;' : (lang === 'ru' ? 'Каково время восстановления?' : 'What is the recovery time?'), answer: '' }
    ];
};

export const getBlogPosts = (lang: Language): BlogPost[] => {
    // We create a map of posts by ID, each containing language specific versions
    const posts: Record<string, Record<Language, BlogPost>> = {
        'ultrasonic-rhinoplasty': {
            el: {
                id: 'ultrasonic-rhinoplasty',
                slug: 'ultrasonic-rhinoplasty',
                title: 'Η Επανάσταση της Υπερηχητικής Ρινοπλαστικής (Piezo)',
                excerpt: 'Πώς η τεχνολογία υπερήχων αλλάζει τα δεδομένα στη ρινοπλαστική, προσφέροντας ακρίβεια χιλιοστού και ταχύτερη ανάρρωση.',
                content: [
                    'Η ρινοπλαστική είναι ίσως η πιο απαιτητική επέμβαση στην πλαστική χειρουργική. Ο στόχος δεν είναι μόνο η αισθητική βελτίωση, αλλά και η διατήρηση ή βελτίωση της αναπνευστικής λειτουργίας. Η παραδοσιακή μέθοδος, αν και αποτελεσματική, συχνά συνοδευόταν από έντονα οιδήματα και μελανιές. Εδώ έρχεται να αλλάξει τα δεδομένα η τεχνολογία Piezo.',
                    'Τι είναι το σύστημα Piezo; Πρόκειται για μια συσκευή που χρησιμοποιεί υπερήχους για τη γλυπτική των οστών της μύτης. Η βασική διαφορά σε σχέση με τα παραδοσιακά εργαλεία (ράσπες, οστεοτόμοι) είναι ότι οι υπέρηχοι δρουν επιλεκτικά στα σκληρά μόρια (οστά), αφήνοντας ανέπαφους τους μαλακούς ιστούς, τα αγγεία και τα νεύρα.',
                    'Αυτό μεταφράζεται σε σημαντικά πλεονεκτήματα για τον ασθενή. Πρώτον, η ακρίβεια είναι απόλυτη. Μπορούμε να σμιλεύσουμε το οστό χωρίς να προκαλέσουμε ανεπιθύμητα κατάγματα. Δεύτερον, το τραύμα στους γύρω ιστούς είναι ελάχιστο, που σημαίνει πολύ λιγότερο πρήξιμο και μελανιές μετεγχειρητικά.',
                    'Η ανάρρωση είναι ταχύτερη και πιο ανώδυνη. Οι περισσότεροι ασθενείς επιστρέφουν στις κοινωνικές τους δραστηριότητες σε 7-10 ημέρες, με ένα πολύ φυσικό αποτέλεσμα που δεν "φωνάζει" ότι έχει γίνει επέμβαση.',
                    'Στο ιατρείο μας, η χρήση της τεχνικής Ultrasonic Piezo αποτελεί τον κανόνα για κάθε ρινοπλαστική, διασφαλίζοντας το βέλτιστο αισθητικό και λειτουργικό αποτέλεσμα με τη μέγιστη ασφάλεια.'
                ],
                date: '20 Οκτ 2024',
                author: 'Δρ. Κωνσταντίνος Μπενετάτος',
                category: 'Πρόσωπο',
                image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000',
                readTime: '3 λεπτά'
            },
            en: {
                id: 'ultrasonic-rhinoplasty',
                slug: 'ultrasonic-rhinoplasty',
                title: 'The Revolution of Ultrasonic Rhinoplasty (Piezo)',
                excerpt: 'How ultrasound technology is changing the game in rhinoplasty, offering millimeter precision and faster recovery.',
                content: [
                    'Rhinoplasty is perhaps the most demanding procedure in plastic surgery. The goal is not only aesthetic improvement but also the maintenance or improvement of respiratory function. The traditional method, although effective, was often accompanied by intense swelling and bruising. Here comes Piezo technology to change the game.',
                    'What is the Piezo system? It is a device that uses ultrasound to sculpt the nasal bones. The main difference compared to traditional tools (rasps, osteotomes) is that ultrasound acts selectively on hard tissues (bones), leaving soft tissues, blood vessels, and nerves intact.',
                    'This translates into significant advantages for the patient. First, precision is absolute. We can sculpt the bone without causing unwanted fractures. Second, trauma to surrounding tissues is minimal, meaning much less swelling and bruising post-operatively.',
                    'Recovery is faster and more painless. Most patients return to their social activities in 7-10 days, with a very natural result that does not "shout" that surgery has been performed.',
                    'In our practice, the use of the Ultrasonic Piezo technique is the standard for every rhinoplasty, ensuring the optimal aesthetic and functional result with maximum safety.'
                ],
                date: 'Oct 20, 2024',
                author: 'Dr. Konstantinos Benetatos',
                category: 'Face',
                image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000',
                readTime: '3 min read'
            },
            de: {
                id: 'ultrasonic-rhinoplasty',
                slug: 'ultrasonic-rhinoplasty',
                title: 'Die Revolution der Ultraschall-Rhinoplastik (Piezo)',
                excerpt: 'Wie Ultraschalltechnologie die Rhinoplastik verändert und millimetergenaue Präzision sowie schnellere Erholung bietet.',
                content: [
                    'Die Rhinoplastik ist vielleicht der anspruchsvollste Eingriff in der plastischen Chirurgie. Ziel ist nicht nur die ästhetische Verbesserung, sondern auch der Erhalt oder die Verbesserung der Atemfunktion. Die traditionelle Methode war oft mit starken Schwellungen verbunden. Hier ändert die Piezo-Technologie alles.',
                    'Was ist das Piezo-System? Es ist ein Gerät, das Ultraschall verwendet, um die Nasenknochen zu formen. Der Hauptunterschied zu herkömmlichen Werkzeugen besteht darin, dass Ultraschall selektiv auf hartes Gewebe (Knochen) wirkt und Weichgewebe, Blutgefäße und Nerven intakt lässt.',
                    'Dies bedeutet erhebliche Vorteile für den Patienten. Erstens ist die Präzision absolut. Zweitens ist das Trauma für das umliegende Gewebe minimal, was postoperativ viel weniger Schwellungen und Blutergüsse bedeutet.',
                    'Die Genesung ist schneller und schmerzloser. Die meisten Patienten kehren in 7-10 Tagen zu ihren sozialen Aktivitäten zurück.',
                    'In unserer Praxis ist die Anwendung der Ultrasonic Piezo-Technik der Standard für jede Rhinoplastik, um das optimale ästhetische und funktionelle Ergebnis mit maximaler Sicherheit zu gewährleisten.'
                ],
                date: '20. Okt 2024',
                author: 'Dr. Konstantinos Benetatos',
                category: 'Gesicht',
                image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000',
                readTime: '3 Min. Lesezeit'
            },
            fr: {
                id: 'ultrasonic-rhinoplasty',
                slug: 'ultrasonic-rhinoplasty',
                title: 'La Révolution de la Rhinoplastie Ultrasonique (Piezo)',
                excerpt: 'Comment la technologie des ultrasons change la donne en rhinoplastie, offrant une précision millimétrique et une récupération plus rapide.',
                content: [
                    'La rhinoplastie est peut-être l\'intervention la plus exigeante en chirurgie plastique. L\'objectif n\'est pas seulement l\'amélioration esthétique mais aussi le maintien de la fonction respiratoire. La méthode traditionnelle était souvent accompagnée d\'un gonflement intense. La technologie Piezo change la donne.',
                    'Qu\'est-ce que le système Piezo ? C\'est un appareil qui utilise des ultrasons pour sculpter les os du nez. La principale différence par rapport aux outils traditionnels est que les ultrasons agissent sélectivement sur les tissus durs (os), laissant intacts les tissus mous, les vaisseaux sanguins et les nerfs.',
                    'Cela se traduit par des avantages significatifs pour le patient. Premièrement, la précision est absolue. Deuxièmement, le traumatisme des tissus environnants est minime, ce qui signifie beaucoup moins de gonflement et d\'ecchymoses après l\'opération.',
                    'La récupération est plus rapide et moins douloureuse. La plupart des patients reprennent leurs activités sociales en 7 à 10 jours.',
                    'Dans notre cabinet, l\'utilisation de la technique Ultrasonic Piezo est la norme pour chaque rhinoplastie, garantissant un résultat esthétique et fonctionnel optimal avec une sécurité maximale.'
                ],
                date: '20 Oct 2024',
                author: 'Dr. Konstantinos Benetatos',
                category: 'Visage',
                image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000',
                readTime: '3 min de lecture'
            },
            ru: {
                id: 'ultrasonic-rhinoplasty',
                slug: 'ultrasonic-rhinoplasty',
                title: 'Революция ультразвуковой ринопластики (Piezo)',
                excerpt: 'Как ультразвуковая технология меняет правила игры в ринопластике, предлагая миллиметровую точность и более быстрое восстановление.',
                content: [
                    'Ринопластика — пожалуй, самая сложная процедура в пластической хирургии. Цель — не только эстетическое улучшение, но и сохранение дыхательной функции. Традиционный метод часто сопровождался сильными отеками. Технология Piezo меняет правила игры.',
                    'Что такое система Piezo? Это устройство, использующее ультразвук для скульптурирования носовых костей. Основное отличие от традиционных инструментов заключается в том, что ультразвук избирательно воздействует на твердые ткани (кости), оставляя мягкие ткани, кровеносные сосуды и нервы нетронутыми.',
                    'Это дает значительные преимущества пациенту. Во-первых, точность абсолютна. Во-вторых, травма окружающих тканей минимальна, что означает гораздо меньший отек и синяки после операции.',
                    'Восстановление проходит быстрее и безболезненнее. Большинство пациентов возвращаются к социальной жизни через 7-10 дней.',
                    'В нашей практике использование техники Ultrasonic Piezo является стандартом для каждой ринопластики, обеспечивая оптимальный эстетический и функциональный результат с максимальной безопасностью.'
                ],
                date: '20 окт. 2024',
                author: 'Д-р Константинос Бенетатос',
                category: 'Лицо',
                image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000',
                readTime: '3 мин.'
            }
        }
    };

    // Return array of posts for current language
    return Object.values(posts).map(p => p[lang] || p['el']);
};