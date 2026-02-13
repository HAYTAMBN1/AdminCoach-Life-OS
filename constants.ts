import { Lesson, StaticGermanContent, StaticTechContent, DictionaryEntry, Story, LibraryItem } from './types';

export const EXAM_DATE = new Date('2026-03-26T09:00:00');
export const PEXELS_API_KEY = "ksfXTTLo9mXC3BuhgfP2zKIQx4j0HwVh7ZRHzXp6Y2NW68BSqf5IYet1";

// --- SYSTEM PROMPTS ---
export const SYSTEM_PROMPT_GERMAN = `
You are an expert German B1 teacher. Create a structured lesson plan for the requested topic.
The output must be a valid JSON object matching the requested schema.
Ensure the content is suitable for B1 level, focusing on grammar, vocabulary, and practical usage.
Include Arabic translations for key vocabulary where helpful.
`;

export const SYSTEM_PROMPT_DISCIPLINE = `
You are a wise and disciplined Islamic life coach.
Your goal is to help the user maintain high discipline and spiritual connection.
Analyze the user's mood and day count (NoFap streak).
If the mood is negative or the streak is low, provide encouraging words from the Quran or Hadith.
If the mood is positive, encourage consistency and gratitude.
Keep the advice concise, powerful, and rooted in Islamic values.
`;

export const SYSTEM_PROMPT_TECH = `
You are a Senior DevOps Engineer and Technical Mentor.
Your task is to find the best free learning resources for specific technical topics (Cisco, Linux, Microsoft, etc.).
Prioritize official documentation, high-quality interactive labs (like TryHackMe, Katacoda), and reputable YouTube tutorials.
Provide direct URLs and brief descriptions.
`;

// --- LIBRARY CONTENT ---
export const LIBRARY_CONTENT: LibraryItem[] = [
  // --- Café in Berlin (A1/A2) ---
  {
    id: 'cafe-berlin-1',
    title: 'Café in Berlin: 1. Die Wohngemeinschaft',
    author: 'André Klein',
    level: 'A1',
    category: 'STORY',
    tags: ['Berlin', 'Wohnen', 'Alltag'],
    coverGradient: 'from-orange-500 to-yellow-600',
    duration: '5 min read',
    content: `
      <h3>1. Die Wohngemeinschaft</h3>
      <p>Mein Vater sagt, die Deutschen spielen gut Fußball. Aber mein Vater spielt nicht Fußball. Er schaut Sport nur im Fernsehen. Mein Onkel sagt, die Deutschen trinken viel Bier. Aber er trinkt auch viel Bier. Was ist deutsch und was ist normal? Ich weiß es nicht.</p>
      <p>Ich bin Dino. Ich komme aus Sizilien. Seit einem Monat wohne ich in Berlin. Das Wetter ist schlecht hier. Es regnet oft und es ist kalt. Ich vermisse die Sonne und das Meer. Aber es gibt Arbeit hier, sagen die Statistiken. Ich habe noch keine Arbeit gefunden, aber ich habe nicht wirklich gesucht. Zuerst muss ich Deutsch lernen. Und das ist gar nicht so einfach.</p>
      <p>Ich wohne in Kreuzberg. Das ist ein Stadtteil in Berlin. Hier leben Menschen aus der ganzen Welt. Ich wohne in einer WG, kurz für: Wohngemeinschaft. Das bedeutet, ich wohne gemeinsam mit anderen Leuten. Wir sind alle Ausländer. In meiner WG wohnt ein Mexikaner, ein Chinese, ein Amerikaner und ich. Wir sprechen meistens Englisch. Das ist nicht gut, sagt meine Lehrerin. Wir müssen Deutsch sprechen, den ganzen Tag, sagt sie.</p>
      <p>Meine Lehrerin kommt aus Potsdam. Jeden Tag gehe ich zum Deutsch-Unterricht. Drei Stunden, jeden Tag! Es ist oft langweilig. Wir lernen Grammatik und machen Übungen. Am Abend muss ich Hausaufgaben machen. Meine Mitbewohner lernen auch Deutsch. Chang, mein chinesischer Mitbewohner ist sehr fleißig. Er macht immer die Hausaufgaben. Ted, der Amerikaner, macht nie seine Hausaufgaben. Aber er hat ein iPad. Chang macht Teds Hausaufgaben, und Chang darf jeden Tag zwei Stunden das iPad benutzen. Ted sagt, das ist ein guter „Deal“.</p>
      <p>Ich versuche, meine Hausaufgaben selbst zu machen. Aber ich habe nicht viel Zeit. Es gibt in Berlin so viele Partys. Ich denke, Partys sind gut zum Deutsch lernen. Aber ich habe ein Problem. Die Deutschen sprechen immer Englisch mit mir! Ich spreche sehr viel Englisch in Berlin. Zu viel vielleicht?</p>
    `
  },
  {
    id: 'cafe-berlin-2',
    title: 'Café in Berlin: 2. Multikulti',
    author: 'André Klein',
    level: 'A1',
    category: 'STORY',
    tags: ['Essen', 'Kultur', 'Humor'],
    coverGradient: 'from-orange-500 to-red-600',
    duration: '6 min read',
    content: `
      <h3>2. Multikulti</h3>
      <p>Gestern habe ich Pizza gegessen. Die Pizzeria heißt O Sole Mio, aber niemand dort spricht Italienisch. In der Pizzeria arbeiten zwei palästinensische Brüder. Ich habe eine Thunfischpizza gegessen. Der Preis war super (zwei Euro fünfzig). Die Pizza war nicht so gut, aber die Pizzeria ist nur wenige Meter von meiner Wohnung entfernt.</p>
      <p>In unserer WG ist es schwierig mit dem Essen. Niemand kocht, aber wir haben immer Berge von Geschirr. Es ist ein Mysterium. Unser Kühlschrank ist wie ein Schwarzes Loch. Wenn ich etwas im Supermarkt kaufe und in den Kühlschrank lege, ist es nach zwei Stunden verschwunden.</p>
      <p>Wir haben vier Fächer in unserem Kühlschrank. Ganz oben ist Gustavos, darunter Changs, dann Teds und dann meins. Ted, Chang und Gustavo sagen, sie essen nur ihre eigenen Sachen. Ich sage das auch. Aber wenn mein Fach leer ist, esse ich manchmal einen Joghurt oder Käse aus Gustavos Fach.</p>
      <p>Es ist einfacher draußen zu essen – und billiger. Es gibt viele verschiedene Restaurants. Es gibt Döner aus der Türkei, gegrilltes Lamm aus Pakistan, Berliner Buletten, die palästinensische Pizza von nebenan und vieles mehr.</p>
      <p>Eine Berliner Spezialität ist die Currywurst. Die Currywurst hat eine interessante Geschichte. Im Jahr 1949 hatte eine Berliner Frau von britischen Soldaten Worcestershiresauce und indisches Curry bekommen. Sie hat die beiden Zutaten mit amerikanischem Ketchup vermischt und auf eine deutsche Wurst gegeben. Man sagt, die Currywurst ist typisch deutsch. Ist multikulti typisch deutsch?</p>
    `
  },
  {
    id: 'cafe-berlin-3',
    title: 'Café in Berlin: 3. Ingrid',
    author: 'André Klein',
    level: 'A1',
    category: 'STORY',
    tags: ['Liebe', 'Schule', 'Dialog'],
    coverGradient: 'from-yellow-500 to-orange-500',
    duration: '5 min read',
    content: `
      <h3>3. Ingrid</h3>
      <p>In meinem Deutschkurs sitzen Menschen aus der ganzen Welt. Ein paar haben einen deutschen Freund oder eine deutsche Freundin. Andere wollen in Deutschland arbeiten. Aber wir haben alle das gleiche Problem: die deutsche Sprache.</p>
      <p>Der Kurs ist sehr langweilig. Wir arbeiten mit einem Buch, Seite für Seite, und machen alle Übungen. Von einer CD hören wir kurze Gespräche. Die Lehrerin ist eine Schlaftablette. Das Beste an meinem Deutschkurs sind die Pausen. Dann können wir Kaffee trinken und mit den anderen Studenten reden.</p>
      <p>Wir haben seit ein paar Tagen eine neue Studentin aus Schweden. Sie ist sehr hübsch. Sie hat blonde Haare, blaue Augen und ein süßes Lächeln. Sie heißt Ingrid. Ihr Deutsch ist sehr gut. Ich weiß nicht, warum sie in unserem Kurs ist. Aber es ist gut, dass sie hier ist.</p>
      <p>Unsere Sprachlernschule hat eine kleine Küche mit einem Wasserkocher. Es ist eine sehr kleine Küche, nur einen Quadratmeter groß. In der Pause habe ich dort mit Ingrid einen Kaffee getrunken.</p>
      <p>„Und du, was machst du in Berlin?“, fragte ich.</p>
      <p>Ingrid lächelte und sagte: „Ich will in Berlin Film studieren.“</p>
      <p>„Ah, du willst eine Schauspielerin werden, so wie Angelina Jolie!“, sagte ich.</p>
      <p>Ingrid schüttelte ihren Kopf. „Nein“, sagte sie. „Ich will nicht vor die Kamera, sondern hinter die Kamera.“</p>
    `
  },

  // --- Ferien in Frankfurt (A2/B1) ---
  {
    id: 'ferien-frankfurt-1',
    title: 'Ferien in Frankfurt: 1. Willkommen',
    author: 'André Klein',
    level: 'A2',
    category: 'STORY',
    tags: ['Reisen', 'Flughafen', 'Probleme'],
    coverGradient: 'from-blue-600 to-cyan-500',
    duration: '7 min read',
    content: `
      <h3>1. Willkommen in Frankfurt</h3>
      <p>Der Frankfurter Flughafen ist wie Deutschland: modern, sauber, ordentlich. Aber mein Gepäck ist trotzdem verschwunden. „Palermo IA3537“, stand auf dem Bildschirm. Nach fünf Minuten startete das Gepäckband. Die anderen Passagiere nahmen ihre Koffer und Taschen. Ich habe eine halbe Stunde gewartet. Aber das Gepäckband war leer.</p>
      <p>„Singapore SA1428“, stand jetzt auf dem Bildschirm. Fünf Minuten später startete das Gepäckband und die Passagiere aus Singapur nahmen ihre Koffer und Taschen. Ich ging zu einem Schalter mit der Aufschrift „Verlorenes Gepäck“.</p>
      <p>Der Mann hinter dem Schalter sagte: „Ja?“</p>
      <p>„Mein Gepäck“, sagte ich. „Es ist nicht angekommen.“</p>
      <p>„Gepäckabschnitt“, sagte der Mann.</p>
      <p>Ich suchte in meiner Hosentasche und gab dem Mann die zerknitterte Bordkarte. Er tippte etwas in seinen Computer. „Palermo?“, sagte er. Ich nickte. Dann gab er mir ein Formular.</p>
      <p>„Name, Adresse, Telefon“, sagte er.</p>
      <p>„Adresse?“, fragte ich. „Ihre Adresse in Deutschland“, sagte der Mann.</p>
      <p>„Ich ... wohne in Sizilien“, sagte ich. „Ja, aber wo werden Sie in Deutschland wohnen?“, fragte der Mann.</p>
      <p>„Bei meinem Bruder“, sagte ich. „In Frankfurt.“</p>
    `
  },
  {
    id: 'ferien-frankfurt-2',
    title: 'Ferien in Frankfurt: 2. Ein Name, zwei Städte',
    author: 'André Klein',
    level: 'A2',
    category: 'STORY',
    tags: ['Stadt', 'Geografie', 'Familie'],
    coverGradient: 'from-blue-500 to-indigo-600',
    duration: '6 min read',
    content: `
      <h3>2. Ein Name, zwei Städte</h3>
      <p>Mein Bruder Alfredo hat mich vom Flughafen abgeholt. Er fährt einen silbernen BMW Cabrio. Der Kofferraum ist sehr klein. Aber ich habe glücklicherweise kein Gepäck. Glück im Unglück?</p>
      <p>Von der Autobahn kann man Wolkenkratzer sehen. „Die Skyline von Frankfurt“, sagt Alfredo. Es dämmert langsam.</p>
      <p>„Wohnst du in einem Wolkenkratzer?“, frage ich.</p>
      <p>Alfredo lacht und sagt: „Nein. Die meisten Türme sind Banken. Frankfurt ist Deutschlands finanzielles Herz.“</p>
      <p>Mein Bruder arbeitet für eine amerikanische Bank. „In Frankfurt gibt es mehr als 240 Banken aus aller Welt“, sagt er. „Hier ist die Börse. Hier liegt das Geld in der Luft!“</p>
      <p>Alfredo wohnt jetzt in Frankfurt, weil sein Chef in New York gesagt hat, er soll ein Jahr in Frankfurt wohnen. Wir fahren eine Weile durch die Dämmerung. Die Wolkenkratzer glitzern in der Dunkelheit. Dann parkt Alfredo den BMW, und wir gehen in seine Wohnung.</p>
      <p>Alfredos Wohnung ist ein Loft mit Ausblick auf den Main, Frankfurts Fluss. „Schön, oder?“, sagt Alfredo und zeigt durch die Fenster auf die Lichter der Stadt.</p>
      <p>„Wusstest du, dass es zwei Städte mit dem Namen Frankfurt gibt?“, sagt Alfredo. „Es gibt Frankfurt am Main, und Frankfurt an der Oder.“</p>
    `
  },

  // --- External Resources (Nicos Weg etc.) ---
  {
    id: 'nicos-weg-a1',
    title: 'Nicos Weg - A1 Complete Course',
    author: 'Deutsche Welle',
    level: 'A1',
    category: 'VIDEO',
    tags: ['Video Course', 'Story', 'Full A1'],
    coverGradient: 'from-green-500 to-emerald-700',
    duration: 'Movie',
    url: 'https://www.youtube.com/watch?v=4-eDoThe6qo'
  },
  {
    id: 'nicos-weg-a2',
    title: 'Nicos Weg - A2 Complete Course',
    author: 'Deutsche Welle',
    level: 'A2',
    category: 'VIDEO',
    tags: ['Video Course', 'Story', 'Full A2'],
    coverGradient: 'from-emerald-500 to-teal-700',
    duration: 'Movie',
    url: 'https://www.youtube.com/watch?v=Lg58bXb9Fhs'
  },
  {
    id: 'nicos-weg-b1',
    title: 'Nicos Weg - B1 Complete Course',
    author: 'Deutsche Welle',
    level: 'B1',
    category: 'VIDEO',
    tags: ['Video Course', 'Story', 'Full B1'],
    coverGradient: 'from-teal-500 to-cyan-700',
    duration: 'Movie',
    url: 'https://www.youtube.com/watch?v=2K832f22hDc'
  },
  {
    id: 'easy-german-streets',
    title: 'Easy German: Street Interviews',
    author: 'Easy German',
    level: 'B1',
    category: 'VIDEO',
    tags: ['Real Life', 'Interviews', 'Listening'],
    coverGradient: 'from-gray-600 to-gray-800',
    duration: 'Channel',
    url: 'https://www.youtube.com/@EasyGerman'
  },

  // --- Exam Prep Scenarios ---
  {
    id: 'exam-plan-event',
    title: 'Goethe B1 Sprechen: Gemeinsam etwas planen',
    author: 'Exam Coach',
    level: 'B1',
    category: 'EXAM_SCENARIO',
    tags: ['Sprechen', 'Teil 3', 'Planung'],
    coverGradient: 'from-purple-600 to-pink-600',
    duration: 'Practice',
    content: `
      <h3>Szenario: Ein Abschiedsgeschenk für eine Kollegin</h3>
      <p><strong>Situation:</strong> Eine Kollegin verlässt die Firma. Sie und Ihr Gesprächspartner wollen ein Geschenk kaufen und eine kleine Party organisieren.</p>
      
      <h4>Nützliche Redemittel (Vorschläge machen):</h4>
      <ul>
        <li>Ich schlage vor, dass wir... (I suggest that we...)</li>
        <li>Wie wäre es, wenn wir... (How about if we...)</li>
        <li>Wir könnten vielleicht... (We could perhaps...)</li>
        <li>Was hältst du davon, wenn wir... (What do you think about if we...)</li>
      </ul>

      <h4>Nützliche Redemittel (Zustimmen):</h4>
      <ul>
        <li>Das ist eine tolle Idee! (That's a great idea!)</li>
        <li>Das gefällt mir gut. (I like that.)</li>
        <li>Einverstanden. (Agreed.)</li>
        <li>Genau, so machen wir es. (Exactly, let's do it that way.)</li>
      </ul>

      <h4>Nützliche Redemittel (Widersprechen/Alternativen):</h4>
      <ul>
        <li>Ich weiß nicht, ob das eine gute Idee ist. (I don't know if that's a good idea.)</li>
        <li>Das finde ich nicht so gut, weil... (I don't find that so good because...)</li>
        <li>Vielleicht sollten wir lieber... (Maybe we should rather...)</li>
        <li>Wäre es nicht besser, wenn... (Wouldn't it be better if...)</li>
      </ul>
    `
  },
  {
    id: 'exam-pic-desc',
    title: 'Goethe B1 Sprechen: Bildbeschreibung',
    author: 'Exam Coach',
    level: 'B1',
    category: 'EXAM_SCENARIO',
    tags: ['Sprechen', 'Teil 2', 'Bild'],
    coverGradient: 'from-purple-600 to-indigo-600',
    duration: 'Practice',
    content: `
      <h3>Struktur einer Bildbeschreibung</h3>
      
      <h4>1. Einleitung</h4>
      <ul>
        <li>Auf dem Bild sehe ich... (In the picture I see...)</li>
        <li>Das Bild zeigt... (The picture shows...)</li>
        <li>Im Vordergrund / Im Hintergrund gibt es... (In the foreground/background there is...)</li>
      </ul>

      <h4>2. Details beschreiben</h4>
      <ul>
        <li>Die Person trägt... (The person is wearing...)</li>
        <li>Er/Sie sieht ... aus. (He/She looks...)</li>
        <li>Links / Rechts / In der Mitte befindet sich... (Left/Right/In the middle is located...)</li>
      </ul>

      <h4>3. Vermutungen</h4>
      <ul>
        <li>Ich glaube, dass... (I believe that...)</li>
        <li>Es könnte sein, dass... (It could be that...)</li>
        <li>Vielleicht sind sie... (Maybe they are...)</li>
      </ul>

      <h4>4. Persönliche Erfahrung</h4>
      <ul>
        <li>Das Bild erinnert mich an... (The picture reminds me of...)</li>
        <li>Ich habe eine ähnliche Situation erlebt, als... (I experienced a similar situation when...)</li>
      </ul>
    `
  }
];

// --- ISLAMIC CONTENT ---
export const ISLAMIC_CONTENT = {
  emergency: {
    title: "بروتوكول الطوارئ",
    steps: [
      "قم وتوضأ فوراً (Wudu)",
      "صل ركعتين بنية التوبة (Prayer)",
      "اقرأ صفحة من القرآن الكريم",
      "ابتعد عن الأجهزة الإلكترونية لمدة 15 دقيقة",
      "استغفر الله 100 مرة"
    ],
    verse: "إِنَّ الَّذِينَ اتَّقَوْا إِذَا مَسَّهُمْ طَائِفٌ مِّنَ الشَّيْطَانِ تَذَكَّرُوا فَإِذَا هُم مُّبْصِرُونَ"
  }
};

// --- API ENDPOINTS ---
export const ALADHAN_API_URL = "https://api.aladhan.com/v1/timingsByCity?city=Martil&country=Morocco&method=3"; // Method 3: Muslim World League (standard)

// --- INTERACTIVE STORY ---
export const HAITHAM_ADVENTURE: Story = {
  id: "server_adventure_1",
  title: "Haitham's Adventure in the German Server",
  startStageId: "interview",
  stages: {
    "interview": {
      id: "interview",
      title: "Das Vorstellungsgespräch",
      text: "Du bist bei 'TechCorp Berlin'. Der Manager fragt: 'Warum möchten Sie hier arbeiten?'",
      translation: "أنت في مقابلة عمل في برلين. يسألك المدير: لماذا تريد العمل هنا؟",
      choices: [
        { text: "Weil ich Geld brauche.", nextStageId: "failed_rude" },
        { text: "Weil ich mich für Technik interessiere und Erfahrung habe.", nextStageId: "server_room" }
      ]
    },
    "failed_rude": {
      id: "failed_rude",
      title: "Absage",
      text: "Der Manager sieht unzufrieden aus. 'Das ist nicht die richtige Einstellung.'",
      translation: "المدير يبدو غير راضٍ. 'هذا ليس الموقف الصحيح'.",
      choices: [
        { text: "Versuche es noch einmal (Try Again)", nextStageId: "interview" }
      ]
    },
    "server_room": {
      id: "server_room",
      title: "Der Serverraum",
      text: "Gut! Du hast den Job. Plötzlich gibt es einen Alarm im Serverraum. 'Fehler 404: Permissions Denied'. Was machst du?",
      translation: "جيد! حصلت على الوظيفة. فجأة انطلق إنذار. خطأ في الصلاحيات. ماذا تفعل؟",
      choices: [
        { text: "Ich benutze 'chmod 777'.", nextStageId: "failed_security" },
        { text: "Ich prüfe die Gruppenrechte mit 'ls -l' und ändere sie vorsichtig.", nextStageId: "resolution" }
      ]
    },
    "failed_security": {
      id: "failed_security",
      title: "Sicherheitsrisiko!",
      text: "Oh nein! Hacker haben jetzt Zugriff. Du bist gefeuert.",
      translation: "يا إلهي! الهاكرز لديهم وصول الآن. لقد طُردت.",
      choices: [
        { text: "Neustart (Restart)", nextStageId: "interview" }
      ]
    },
    "resolution": {
      id: "resolution",
      title: "Erfolg!",
      text: "Das System läuft wieder stabil. Der Chef sagt: 'Hervorragende Arbeit, Haitham!'",
      translation: "النظام يعمل باستقرار. المدير يقول: عمل رائع يا هيثم!",
      choices: [
        { text: "Feiern (Ende)", nextStageId: "interview" } // Loop for now
      ]
    }
  }
};

// --- DATA GENERATOR FOR 6000 WORDS ---
const generateLargeLexicon = (): DictionaryEntry[] => {
  const manualEntries: DictionaryEntry[] = [
    // Tech
    { id: '1', word: "der Server", translation: "الخادم", context: "TECH", example: "Der Server ist down." },
    { id: '2', word: "die Schnittstelle", translation: "Interface / الواجهة", context: "TECH", example: "Wir brauchen eine neue Schnittstelle." },
    { id: '3', word: "die Datenbank", translation: "قاعدة البيانات", context: "TECH", example: "Die Datenbank muss gesichert werden." },
    { id: '4', word: "hochfahren", translation: "Boot up / إقلاع", context: "TECH", example: "Der PC fährt hoch." },
    { id: '5', word: "herunterfahren", translation: "Shut down / إيقاف", context: "TECH", example: "Bitte fahren Sie das System herunter." },
    { id: '6', word: "der Zugriff", translation: "Access / وصول", context: "TECH", example: "Zugriff verweigert." },
    { id: '7', word: "die Berechtigung", translation: "Permission / صلاحية", context: "TECH", example: "Fehlende Berechtigung." },
    { id: '8', word: "das Netzwerk", translation: "Network / شبكة", context: "TECH", example: "Das Netzwerk ist langsam." },
    { id: '9', word: "der Benutzer", translation: "User / مستخدم", context: "TECH", example: "Benutzer anlegen." },
    { id: '10', word: "das Passwort", translation: "Password / كلمة سر", context: "TECH", example: "Passwort vergessen." },
    { id: '11', word: "speichern", translation: "Save / حفظ", context: "TECH", example: "Datei speichern." },
    { id: '12', word: "löschen", translation: "Delete / حذف", context: "TECH", example: "Datei löschen." },
    { id: '13', word: "die Datei", translation: "File / ملف", context: "TECH", example: "Die Datei ist groß." },
    { id: '14', word: "der Ordner", translation: "Folder / مجلد", context: "TECH", example: "Neuer Ordner." },
    { id: '15', word: "drucken", translation: "Print / طباعة", context: "TECH", example: "Dokument drucken." },
    { id: '16', word: "der Bildschirm", translation: "Screen / شاشة", context: "TECH", example: "Der Bildschirm ist schwarz." },
    { id: '17', word: "die Tastatur", translation: "Keyboard / لوحة مفاتيح", context: "TECH", example: "Tastatur reinigen." },
    { id: '18', word: "die Maus", translation: "Mouse / فأرة", context: "TECH", example: "Klicke mit der Maus." },
    { id: '19', word: "installieren", translation: "Install / تثبيت", context: "TECH", example: "Software installieren." },
    { id: '20', word: "aktualisieren", translation: "Update / تحديث", context: "TECH", example: "Treiber aktualisieren." },
    // German B1
    { id: '21', word: "die Erfahrung", translation: "Experience / خبرة", context: "GERMAN", example: "Ich habe viel Erfahrung." },
    { id: '22', word: "die Bewerbung", translation: "Application / طلب توظيف", context: "GERMAN", example: "Ich schreibe eine Bewerbung." },
    { id: '23', word: "der Lebenslauf", translation: "CV / سيرة ذاتية", context: "GERMAN", example: "Mein Lebenslauf ist aktuell." },
    { id: '24', word: "das Vorstellungsgespräch", translation: "Interview / مقابلة", context: "GERMAN", example: "Ich habe morgen ein Gespräch." },
    { id: '25', word: "zuverlässig", translation: "Reliable / موثوق", context: "GERMAN", example: "Er ist sehr zuverlässig." },
    { id: '26', word: "pünktlich", translation: "Punctual / دقيق", context: "GERMAN", example: "Sei bitte pünktlich." },
    { id: '27', word: "verantwortlich", translation: "Responsible / مسؤول", context: "GERMAN", example: "Wer ist verantwortlich?" },
    { id: '28', word: "die Aufgabe", translation: "Task / مهمة", context: "GERMAN", example: "Das ist meine Aufgabe." },
    { id: '29', word: "das Ziel", translation: "Goal / هدف", context: "GERMAN", example: "Mein Ziel ist B1." },
    { id: '30', word: "der Erfolg", translation: "Success / نجاح", context: "GERMAN", example: "Viel Erfolg!" },
    { id: '31', word: "entscheiden", translation: "Decide / يقرر", context: "GERMAN", example: "Ich muss mich entscheiden." },
    { id: '32', word: "die Zukunft", translation: "Future / مستقبل", context: "GERMAN", example: "In der Zukunft..." },
    { id: '33', word: "die Ausbildung", translation: "Training/Apprenticeship / تدريب مهني", context: "GERMAN", example: "Ich mache eine Ausbildung." },
    { id: '34', word: "der Arbeitgeber", translation: "Employer / صاحب العمل", context: "GERMAN", example: "Mein Arbeitgeber ist nett." },
    { id: '35', word: "der Arbeitnehmer", translation: "Employee / موظف", context: "GERMAN", example: "Die Arbeitnehmer streiken." },
    { id: '36', word: "der Vertrag", translation: "Contract / عقد", context: "GERMAN", example: "Ich unterschreibe den Vertrag." },
    { id: '37', word: "das Gehalt", translation: "Salary / راتب", context: "GERMAN", example: "Das Gehalt ist gut." },
    { id: '38', word: "die Überstunden", translation: "Overtime / ساعات إضافية", context: "GERMAN", example: "Ich mache keine Überstunden." },
    { id: '39', word: "der Urlaub", translation: "Vacation / عطلة", context: "GERMAN", example: "Ich brauche Urlaub." },
    { id: '40', word: "krankgeschrieben", translation: "Sick leave / إجازة مرضية", context: "GERMAN", example: "Er ist krankgeschrieben." }
  ];

  const generatedEntries: DictionaryEntry[] = [];
  const techPrefixes = ["System", "Daten", "Netzwerk", "Server", "Client", "User", "Admin", "Root", "Kernel", "Process", "Thread", "Memory", "Disk", "File", "Folder", "Access", "Security", "Firewall", "Router", "Switch", "Port", "Protocol", "Interface", "Code", "Script", "Cloud", "Cyber", "Logic", "Array", "Class"];
  const techSuffixes = ["fehler", "analyse", "schutz", "verwaltung", "steuerung", "optimierung", "integration", "entwicklung", "architektur", "design", "test", "wartung", "support", "dokumentation", "konfiguration", "installation", "migration", "virtualisierung", "automatisierung", "überwachung"];
  const germanNouns = ["Tisch", "Stuhl", "Fenster", "Tür", "Buch", "Stift", "Haus", "Auto", "Zug", "Bus", "Apfel", "Birne", "Brot", "Wasser", "Kaffee", "Tee", "Mann", "Frau", "Kind", "Eltern"];
  
  for (let i = 0; i < 6000; i++) {
    const isTech = Math.random() > 0.4; // 60% Tech terms
    let word, translation, example;

    if (isTech) {
        const prefix = techPrefixes[Math.floor(Math.random() * techPrefixes.length)];
        const suffix = techSuffixes[Math.floor(Math.random() * techSuffixes.length)];
        word = `Der ${prefix}${suffix}`;
        translation = `${prefix} ${suffix.charAt(0).toUpperCase() + suffix.slice(1)} (Auto-Generated)`;
        example = `Der ${prefix}${suffix} wurde erfolgreich gestartet.`;
    } else {
        const noun = germanNouns[Math.floor(Math.random() * germanNouns.length)];
        const adjective = ["große", "kleine", "schnelle", "neue", "alte", "gute", "schlechte", "wichtige"][Math.floor(Math.random() * 8)];
        word = `Das ${adjective} ${noun}`;
        translation = `The ${adjective} ${noun}`;
        example = `Ich sehe das ${adjective} ${noun} dort.`;
    }

    generatedEntries.push({
        id: `gen-${i}`,
        word: word,
        translation: translation,
        context: isTech ? 'TECH' : 'GERMAN',
        example: example
    });
  }

  return [...manualEntries, ...generatedEntries];
};

export const LEXICON_INITIAL_DATA: DictionaryEntry[] = generateLargeLexicon();

// --- GERMAN CONTENT ---
export const STATIC_GERMAN_CONTENT: Record<string, StaticGermanContent> = {
  "Wortstellung - ترتيب الجملة الأساسي والمتقدم": {
    blocks: [
      { type: "GRAMMAR_CORE", title: "Verb Position 2 (Hauptsatz)", content: "Das konjugierte Verb steht im Hauptsatz <b>immer</b> an Position 2.<br/><br/>Position 1 kann das Subjekt, eine Zeitangabe oder ein Ort sein." },
      { type: "VOCAB_CLUSTER", title: "Wortstellung Vocabulary", content: "Key Terms", vocabData: [{ german: "der Satz", arabic: "الجملة" }, { german: "das Subjekt", arabic: "الفاعل" }, { german: "das Verb", arabic: "الفعل" }] },
      { type: "VIDEO_HUB", title: "Deutsch mit Mira", content: "<a href='https://www.youtube.com/results?search_query=Deutsch+mit+Mira+Wortstellung' target='_blank' class='text-cyan-400 hover:underline'>▶ Watch on YouTube</a>" }
    ]
  },
  "Nebensätze: weil, dass, wenn - الجمل الثانوية": {
    blocks: [
      { type: "GRAMMAR_CORE", title: "Verb am Ende", content: "Bei weil, dass, wenn wandert das Verb ans Ende." },
      { type: "VOCAB_CLUSTER", title: "Konjunktionen", content: "Connectors", vocabData: [{ german: "weil", arabic: "لأن" }, { german: "dass", arabic: "أن" }, { german: "wenn", arabic: "لو/عندما" }] },
      { type: "VIDEO_HUB", title: "Deutsch mit Mira", content: "<a href='https://www.youtube.com/results?search_query=Deutsch+mit+Mira+Nebensätze' target='_blank' class='text-cyan-400 hover:underline'>▶ Watch on YouTube</a>" }
    ]
  },
  "Passiv - المبني للمجهول (Vorgangspassiv)": {
    blocks: [
      { type: "GRAMMAR_CORE", title: "werden + Partizip II", content: "Das Subjekt ist unwichtig, die Handlung zählt. <br>Beispiel: Das Auto <b>wird</b> repariert." },
      { type: "VOCAB_CLUSTER", title: "Passive Vocab", content: "Actions", vocabData: [{ german: "werden", arabic: "يصبح (للبناء للمجهول)" }, { german: "repariert", arabic: "مُصلح" }] },
      { type: "VIDEO_HUB", title: "Deutsch mit Mira", content: "<a href='https://www.youtube.com/results?search_query=Deutsch+mit+Mira+Passiv' target='_blank' class='text-cyan-400 hover:underline'>▶ Watch on YouTube</a>" }
    ]
  },
  "Passiv mit Modalverben - المبني للمجهول مع الأفعال الناقصة": {
    blocks: [
      { type: "GRAMMAR_CORE", title: "Modalverb + Partizip II + werden", content: "Struktur: Modalverb (Pos 2) ... Partizip II + werden (Ende).<br>Beispiel: Das Problem <b>muss</b> gelöst <b>werden</b>." },
      { type: "VOCAB_CLUSTER", title: "Modals in Passive", content: "Key Verbs", vocabData: [{ german: "muss gemacht werden", arabic: "يجب أن يُعمل" }, { german: "kann gelöst werden", arabic: "يمكن حله" }] },
      { type: "VIDEO_HUB", title: "Deutsch mit Mira", content: "<a href='https://www.youtube.com/results?search_query=Deutsch+mit+Mira+Passiv+mit+Modalverben' target='_blank' class='text-cyan-400 hover:underline'>▶ Watch on YouTube</a>" }
    ]
  },
  "Infinitiv mit zu - المصدر مع zu": {
    blocks: [
      { type: "GRAMMAR_CORE", title: "zu + Infinitiv", content: "Man benutzt es nach bestimmten Verben (planen, versuchen, vergessen) und Adjektiven (wichtig, schön).<br>Beispiel: Ich habe vor, Deutsch <b>zu lernen</b>." },
      { type: "VOCAB_CLUSTER", title: "Signalwörter", content: "Triggers", vocabData: [{ german: "versuchen", arabic: "يحاول" }, { german: "vorhaben", arabic: "ينوي" }, { german: "Es ist wichtig", arabic: "من المهم" }] },
      { type: "VIDEO_HUB", title: "Deutsch mit Mira", content: "<a href='https://www.youtube.com/results?search_query=Deutsch+mit+Mira+Infinitiv+mit+zu' target='_blank' class='text-cyan-400 hover:underline'>▶ Watch on YouTube</a>" }
    ]
  },
  "Adjektivdeklination - تصريف الصفات": {
    blocks: [
      { type: "GRAMMAR_CORE", title: "Definite vs Indefinite", content: "Nach 'der/die/das': Meistens -e oder -en.<br>Nach 'ein/eine': Adjektiv übernimmt oft das Signal des Genus." },
      { type: "VOCAB_CLUSTER", title: "Beispiele", content: "Adjectives", vocabData: [{ german: "der gute Mann", arabic: "الرجل الصالح (Nom)" }, { german: "ein guter Mann", arabic: "رجل صالح (Nom)" }, { german: "mit dem guten Mann", arabic: "مع الرجل الصالح (Dat)" }] },
      { type: "VIDEO_HUB", title: "Deutsch mit Mira", content: "<a href='https://www.youtube.com/results?search_query=Deutsch+mit+Mira+Adjektivdeklination' target='_blank' class='text-cyan-400 hover:underline'>▶ Watch on YouTube</a>" }
    ]
  },
  "Wechselpräpositionen - حروف الجر المتغيرة": {
    blocks: [
      { type: "GRAMMAR_CORE", title: "Wohin (Akk) vs Wo (Dat)", content: "Bewegung (Aktion) = Akkusativ.<br>Position (Stillstand) = Dativ.<br>Präpositionen: in, an, auf, neben, zwischen, über, unter, vor, hinter." },
      { type: "VOCAB_CLUSTER", title: "Positions", content: "Locations", vocabData: [{ german: "Ich lege das Buch auf den Tisch", arabic: "أضع الكتاب على الطاولة (Akk)" }, { german: "Das Buch liegt auf dem Tisch", arabic: "الكتاب موضوع على الطاولة (Dat)" }] },
      { type: "VIDEO_HUB", title: "Deutsch mit Mira", content: "<a href='https://www.youtube.com/results?search_query=Deutsch+mit+Mira+Wechselpräpositionen' target='_blank' class='text-cyan-400 hover:underline'>▶ Watch on YouTube</a>" }
    ]
  }
  // Further lessons fallback to generic if not explicitly defined here, 
  // but logic in GermanSection handles missing content gracefully.
};

// --- TECH CONTENT ---
export const STATIC_TECH_CONTENT: Record<string, StaticTechContent> = {
  "Hardware Basics + PC Part Picker": {
    summary: "Verstehe die Hardware-Komponenten und ihre Kompatibilität.",
    labTitle: "PCPartPicker Simulation",
    labSteps: [
      { desc: "Öffne pcpartpicker.com." },
      { desc: "Wähle eine CPU (z.B. AMD Ryzen 5)." },
      { desc: "Wähle ein kompatibles Mainboard (Sockel beachten!)." },
      { desc: "Füge RAM (DDR4/DDR5) und SSD hinzu." }
    ],
    portfolioTask: "Erstelle eine Liste für einen 800€ Gaming-PC und erkläre deine Wahl auf Deutsch.",
    resources: [{ title: "Linus Tech Tips", url: "https://www.youtube.com/results?search_query=linus+tech+tips+pc+build", type: "VIDEO" }]
  },
  "Dateisysteme: NTFS, ext4 - أنظمة الملفات": {
    summary: "Verwaltung von Dateisystemen in Windows und Linux.",
    labTitle: "Filesystem Operations",
    labSteps: [
      { cmd: "df -Th", desc: "Check mounted filesystems and types." },
      { cmd: "sudo mkfs.ext4 /dev/sdb1", desc: "Format partition to EXT4." },
      { cmd: "mount /dev/sdb1 /mnt/data", desc: "Mount the new partition." }
    ],
    portfolioTask: "Compare NTFS and EXT4 features in a markdown table.",
    resources: [{ title: "Linux Filesystems", url: "https://www.youtube.com/results?search_query=linux+file+systems+explained", type: "VIDEO" }]
  },
  "Linux Fundamentals: Terminal - أساسيات Linux": {
    summary: "Beherrsche die Kommandozeile.",
    labTitle: "Terminal Survival",
    labSteps: [
      { cmd: "ls -la", desc: "List all files including hidden ones." },
      { cmd: "cd /var/log && pwd", desc: "Navigate and print working directory." },
      { cmd: "top", desc: "Monitor system processes." }
    ],
    portfolioTask: "Create a cheat sheet of top 20 Linux commands.",
    resources: [{ title: "NetworkChuck Linux", url: "https://www.youtube.com/results?search_query=networkchuck+linux+basics", type: "VIDEO" }]
  },
  "Netzwerkgrundlagen: LAN, WAN + OSI-Modell": {
    summary: "Grundlagen der Netzwerktechnik und Datenübertragung.",
    labTitle: "Network Diagnostics",
    labSteps: [
      { cmd: "ping google.com", desc: "Check connectivity." },
      { cmd: "tracert google.com", desc: "Trace the route (Windows) or traceroute (Linux)." },
      { cmd: "ipconfig /all", desc: "View full IP configuration." }
    ],
    portfolioTask: "Draw the OSI model and explain the function of each layer.",
    resources: [{ title: "OSI Model Explained", url: "https://www.youtube.com/results?search_query=osi+model+explained", type: "VIDEO" }]
  }
};

// --- FULL CURRICULUM ---
export const CURRICULUM: Lesson[] = [
  // Grammatik B1
  { title: "Wortstellung - ترتيب الجملة الأساسي والمتقدم", track: "Grammatik B1", order: 1, notes: "A2 → B1 | أساسي لبناء الجمل الصحيحة", examWeight: "High", completed: true },
  { title: "Nebensätze: weil, dass, wenn - الجمل الثانوية", track: "Grammatik B1", order: 2, notes: "A2 → B1 | استخدامات weil للسبب، dass للتوضيح، wenn للشرط", examWeight: "High", completed: false },
  { title: "Relativsätze (Nom., Akk., Dat.) - الجمل الموصولة", track: "Grammatik B1", order: 3, notes: "B1 أساسي | der/die/das بحالاتها الثلاث", examWeight: "High", completed: false },
  { title: "Konjunktiv II - صيغة الاحتمال", track: "Grammatik B1", order: 4, notes: "würde/könnte/hätte/möchte للتعبير عن الرغبات والافتراضات", examWeight: "High", completed: false },
  { title: "Passiv - المبني للمجهول (Vorgangspassiv)", track: "Grammatik B1", order: 5, notes: "استخدام werden + Partizip II", examWeight: "High", completed: false },
  { title: "Passiv mit Modalverben - المبني للمجهول مع الأفعال الناقصة", track: "Grammatik B1", order: 6, notes: "مثل: muss gemacht werden", examWeight: "High", completed: false },
  { title: "Infinitiv mit zu - المصدر مع zu", track: "Grammatik B1", order: 7, notes: "أساسي في B1، مثل: Es ist wichtig, zu lernen", examWeight: "High", completed: false },
  { title: "Futur I - المستقبل البسيط", track: "Grammatik B1", order: 8, notes: "werden + Infinitiv للتعبير عن المستقبل", examWeight: "Medium", completed: false },
  { title: "Perfekt / Präteritum / Plusquamperfekt - الأزمنة الماضية", track: "Grammatik B1", order: 9, notes: "المقارنة والاستخدام الصحيح لكل زمن", examWeight: "Medium", completed: false },
  { title: "Modalverben im Präteritum - الأفعال الناقصة في الماضي", track: "Grammatik B1", order: 10, notes: "A2+ → B1 | wollte, konnte, musste, etc.", examWeight: "High", completed: false },
  { title: "Adjektivdeklination - تصريف الصفات", track: "Grammatik B1", order: 11, notes: "A2+ → B1 | بعد أدوات التعريف والتنكير", examWeight: "Medium", completed: false },
  { title: "Genitiv-Grundformen - حالة الإضافة الأساسية", track: "Grammatik B1", order: 12, notes: "استخدامات Genitiv الأساسية في B1", examWeight: "Low", completed: false },
  { title: "Dativ / Akkusativ - تبعية الأفعال", track: "Grammatik B1", order: 13, notes: "A2+ → B1 | الأفعال التي تأخذ Dativ أو Akkusativ", examWeight: "Medium", completed: false },
  { title: "Präpositionen mit Dativ / Akkusativ - حروف الجر", track: "Grammatik B1", order: 14, notes: "حروف الجر الثابتة مع كل حالة", examWeight: "Medium", completed: false },
  { title: "Wechselpräpositionen - حروف الجر المتغيرة", track: "Grammatik B1", order: 15, notes: "in, an, auf, über, unter, vor, hinter, neben, zwischen", examWeight: "Medium", completed: false },
  { title: "Verben mit Präpositionen - الأفعال مع حروف الجر", track: "Grammatik B1", order: 16, notes: "مثل: abhängen von, sich beschäftigen mit", examWeight: "High", completed: false },
  { title: "Indirekte Fragesätze - الأسئلة غير المباشرة", track: "Grammatik B1", order: 17, notes: "Fragesätze eingebettet في الجمل", examWeight: "Medium", completed: false },
  { title: "Konjunktionen + Nebensatzmarkierer - الروابط", track: "Grammatik B1", order: 18, notes: "الروابط التي تبني جملاً ثانوية", examWeight: "Medium", completed: false },
  { title: "Zahlen / Mengen / Komparativ / Superlativ - الأرقام والمقارنة", track: "Grammatik B1", order: 19, notes: "كل أشكال المقارنة والتفضيل", examWeight: "Low", completed: false },
  { title: "Partizipien - اسم المفعول واسم الفاعل", track: "Grammatik B1", order: 20, notes: "Partizip I و II واستعمالاتها", examWeight: "Medium", completed: false },
  { title: "Temporale Nebensätze - الجمل الزمنية", track: "Grammatik B1", order: 21, notes: "als, bevor, nachdem, während", examWeight: "High", completed: false },
  { title: "Kausale + finale Nebensätze - جمل السبب والهدف", track: "Grammatik B1", order: 22, notes: "weil, da, damit, um...zu", examWeight: "High", completed: false },
  { title: "Adverbiale Bestimmungen - الظروف والتوابع", track: "Grammatik B1", order: 23, notes: "تحديد الزمان والمكان والطريقة", examWeight: "Low", completed: false },
  { title: "Reflexive Verben - الأفعال الانعكاسية", track: "Grammatik B1", order: 24, notes: "A2+ → B1 | sich waschen, sich freuen, etc.", examWeight: "Medium", completed: false },
  { title: "n-Deklination - تصريف الأسماء الضعيفة", track: "Grammatik B1", order: 25, notes: "der Student, den Studenten, dem Studenten, des Studenten", examWeight: "Low", completed: false },

  // Hören & Lesen
  { title: "Wortschatz: Arbeitswelt - عالم العمل", track: "Hören & Lesen", order: 1, notes: "المفردات الأساسية لـ Schreiben + Sprechen | السير الذاتية والمقابلات", examWeight: "High", completed: false },
  { title: "Wortschatz: Gesundheit & Ernährung - الصحة والتغذية", track: "Hören & Lesen", order: 2, notes: "مهم في Lesen + Hören | العادات الصحية والطعام", examWeight: "High", completed: false },
  { title: "Wortschatz: Bildung & Ausbildung - التعليم والتدريب", track: "Hören & Lesen", order: 3, notes: "النظام التعليمي الألماني والدراسة", examWeight: "High", completed: false },
  { title: "Wortschatz: Umwelt & Natur - البيئة والطبيعة", track: "Hören & Lesen", order: 4, notes: "موضوع مهم في Lesen + إبداء الرأي", examWeight: "High", completed: false },
  { title: "Wortschatz: Familie & Beziehungen - العائلة والعلاقات", track: "Hören & Lesen", order: 5, notes: "أساسي في Sprechen | الحياة الاجتماعية", examWeight: "Medium", completed: false },
  { title: "Wortschatz: Freizeit & Hobbys - الوقت الحر والهوايات", track: "Hören & Lesen", order: 6, notes: "موضوع شائع في Sprechen | الأنشطة والاهتمامات", examWeight: "Medium", completed: false },
  { title: "Wortschatz: Wohnen & Alltag - السكن والحياة اليومية", track: "Hören & Lesen", order: 7, notes: "Schreiben + Sprechen | البحث عن شقة والروتين اليومي", examWeight: "Medium", completed: false },
  { title: "Wortschatz: Medien & Technologie - الإعلام والتكنولوجيا", track: "Hören & Lesen", order: 8, notes: "Hören + Lesen | يمكن ربطه بدروس IT الأساسية", examWeight: "Low", completed: false },
  { title: "Wortschatz: Reisen & Mobilität - السفر والتنقل", track: "Hören & Lesen", order: 9, notes: "Hören + Sprechen | حجز التذاكر والرحلات", examWeight: "Medium", completed: false },
  { title: "Wortschatz: Migration & Integration - الهجرة والاندماج", track: "Hören & Lesen", order: 10, notes: "Lesen + Diskussion | تجربة شخصية مهمة", examWeight: "Low", completed: false },
  { title: "Lesen: Textsorten & Strategien - أنواع النصوص واستراتيجيات القراءة", track: "Hören & Lesen", order: 11, notes: "كيفية التعامل مع النصوص المختلفة في الامتحان", examWeight: "High", completed: false },
  { title: "Lesen: Signalwörter & Redemittel - الكلمات المفتاحية", track: "Hören & Lesen", order: 12, notes: "عبارات مثل: Laut dem Text, Der Autor meint", examWeight: "High", completed: false },
  { title: "Hören: Hörverstehen Strategien - استراتيجيات الاستماع", track: "Hören & Lesen", order: 13, notes: "التركيز على الكلمات المفتاحية وعدم التشتت", examWeight: "High", completed: false },
  { title: "Hören: Alltagsdialoge - حوارات يومية", track: "Hören & Lesen", order: 14, notes: "تدريب على فهم المحادثات العادية", examWeight: "Medium", completed: false },
  { title: "Hören: Durchsagen & Ansagen - الإعلانات والتنبيهات", track: "Hören & Lesen", order: 15, notes: "في المحطات والأماكن العامة", examWeight: "Medium", completed: false },

  // Sprechen & Schreiben
  { title: "Redemittel: Sich vorstellen - تقديم النفس", track: "Sprechen & Schreiben", order: 1, notes: "~12 عبارة أساسية | Ich heiße..., ich komme aus...", examWeight: "High", completed: false },
  { title: "Redemittel: Bilder beschreiben - وصف الصور", track: "Sprechen & Schreiben", order: 2, notes: "~15 عبارة | Auf dem Bild sieht man..., Im Vordergrund...", examWeight: "High", completed: false },
  { title: "Redemittel: Meinung äußern - إبداء الرأي", track: "Sprechen & Schreiben", order: 3, notes: "~20 عبارة | Meiner Meinung nach..., Ich bin der Ansicht...", examWeight: "High", completed: false },
  { title: "Redemittel: Zustimmen & Widersprechen - الموافقة والاعتراض", track: "Sprechen & Schreiben", order: 4, notes: "Das stimmt, Da bin ich anderer Meinung", examWeight: "High", completed: false },
  { title: "Redemittel: Vorschläge machen - تقديم الاقتراحات", track: "Sprechen & Schreiben", order: 5, notes: "Ich schlage vor..., Wie wäre es, wenn...", examWeight: "High", completed: false },
  { title: "Schreiben: Formeller Brief - الرسالة الرسمية", track: "Sprechen & Schreiben", order: 6, notes: "15+ عبارة | الافتتاح + الجسد + الخاتمة", examWeight: "High", completed: false },
  { title: "Schreiben: Beschwerde schreiben - كتابة شكوى", track: "Sprechen & Schreiben", order: 7, notes: "البنية والعبارات المناسبة", examWeight: "Medium", completed: false },
  { title: "Schreiben: Anfrage & Bewerbung - الاستفسار والتقديم", track: "Sprechen & Schreiben", order: 8, notes: "طلب معلومات أو التقدم لوظيفة", examWeight: "Medium", completed: false },
  { title: "Schreiben: Entschuldigung - الاعتذار", track: "Sprechen & Schreiben", order: 9, notes: "Es tut mir leid, Ich möchte mich entschuldigen", examWeight: "Low", completed: false },
  { title: "Schreiben: Einladung & Zusage/Absage - الدعوة والقبول/الرفض", track: "Sprechen & Schreiben", order: 10, notes: "دعوة شخص وكيفية الرد", examWeight: "Low", completed: false },
  { title: "Sprechen: Diskussion führen - إدارة نقاش", track: "Sprechen & Schreiben", order: 11, notes: "كيفية المشاركة في نقاش جماعي", examWeight: "Medium", completed: false },
  { title: "Sprechen: Erfahrungen berichten - سرد التجارب", track: "Sprechen & Schreiben", order: 12, notes: "Ich habe die Erfahrung gemacht, dass...", examWeight: "Medium", completed: false },
  { title: "Sprechen: Pläne & Wünsche ausdrücken - التعبير عن الخطط", track: "Sprechen & Schreiben", order: 13, notes: "Ich habe vor..., Mein Ziel ist es...", examWeight: "Medium", completed: false },

  // Fachinformatik
  { title: "Hardware Basics + PC Part Picker", track: "Fachinformatik", order: 1, notes: "يجب ربطه بجدول Tech Lab | تطبيق عملي على VMware", examWeight: "Medium", completed: true, certification: "GOOGLE" },
  { title: "BIOS/UEFI + Bootprozess", track: "Fachinformatik", order: 2, notes: "يجب ربطه بجدول Tech Lab | تطبيق على VMware + توثيق GitHub", examWeight: "Medium", completed: false },
  { title: "Speicher: HDD, SSD, NVMe", track: "Fachinformatik", order: 3, notes: "يجب ربطه بجدول Tech Lab | تقسيم الأقراص عملياً", examWeight: "Medium", completed: false },
  { title: "Dateisysteme: NTFS, ext4 - أنظمة الملفات", track: "Fachinformatik", order: 4, notes: "يجب ربطه بجدول Tech Lab | ربط مع Google IT Support", examWeight: "Medium", completed: false },
  { title: "Windows 10/11 Verwaltung - إدارة Windows", track: "Fachinformatik", order: 5, notes: "يجب ربطه بجدول Tech Lab | الإدارة المتقدمة للنظام", examWeight: "Medium", completed: false },
  { title: "Linux Fundamentals: Terminal - أساسيات Linux", track: "Fachinformatik", order: 6, notes: "يجب ربطه بجدول Tech Lab | Ubuntu/Kali + أوامر cd, ls, sudo", examWeight: "High", completed: false },
  { title: "Linux: Berechtigungen & Benutzer - الصلاحيات", track: "Fachinformatik", order: 7, notes: "يجب ربطه بجدول Tech Lab | إدارة المستخدمين والأذونات", examWeight: "Medium", completed: false },
  { title: "Prozesse & Dienste - العمليات والخدمات", track: "Fachinformatik", order: 8, notes: "يجب ربطه بجدول Tech Lab | أول توثيق Lab على GitHub", examWeight: "Medium", completed: false },
  { title: "Netzwerkgrundlagen: LAN, WAN + OSI-Modell", track: "Fachinformatik", order: 9, notes: "يجب ربطه بجدول Tech Lab | أساسيات الشبكات ونموذج OSI", examWeight: "High", completed: false },
  { title: "IP-Adressen & Subnetting - العنونة والتقسيم", track: "Fachinformatik", order: 10, notes: "يجب ربطه بجدول Tech Lab | بدء كورس Cisco Basics", examWeight: "High", completed: false },
  { title: "DHCP & DNS Protokolle - بروتوكولات الشبكة", track: "Fachinformatik", order: 11, notes: "يجب ربطه بجدول Tech Lab | تطبيق عملي + Wireshark", examWeight: "High", completed: false },
  { title: "Router, Switch & Firewall - أجهزة الشبكة", track: "Fachinformatik", order: 12, notes: "يجب ربطه بجدول Tech Lab | تجربة Wireshark عملياً", examWeight: "High", completed: false },
  { title: "VMware Vertiefung - التعمق في الافتراضية", track: "Fachinformatik", order: 13, notes: "يجب ربطه بجدول Tech Lab | إنشاء شبكة وهمية بين جهازين", examWeight: "Medium", completed: false },
  { title: "Client-Server Modell - نموذج العميل والخادم", track: "Fachinformatik", order: 14, notes: "يجب ربطه بجدول Tech Lab | إعداد أول Server بسيط", examWeight: "High", completed: false },
  { title: "Cloud Computing Basics - أساسيات السحابة", track: "Fachinformatik", order: 15, notes: "يجب ربطه بجدول Tech Lab | التحضير لشهادة Microsoft AZ-900", examWeight: "Medium", completed: false },
  { title: "IT-Sicherheit & Cybersecurity - أمن المعلومات", track: "Fachinformatik", order: 16, notes: "يجب ربطه بجدول Tech Lab | تحديات من TryHackMe", examWeight: "High", completed: false },
  { title: "Abschlussprojekt: Firmennetzwerk - مشروع التخرج", track: "Fachinformatik", order: 17, notes: "يجب ربطه بجدول Tech Lab | شبكة شركة وهمية كاملة على VMware", examWeight: "Medium", completed: false },
  { title: "Technische Dokumentation auf Deutsch - التوثيق التقني", track: "Fachinformatik", order: 18, notes: "يجب ربطه بجدول Tech Lab | كتابة التقارير بالألمانية", examWeight: "Low", completed: false },
  { title: "LinkedIn-Profil für IT-Profis - ملف LinkedIn احترافي", track: "Fachinformatik", order: 19, notes: "يجب ربطه بجدول Tech Lab | نشر الشهادات والإنجازات", examWeight: "Low", completed: false },
  { title: "Vorstellungsgespräch-Simulation - محاكاة المقابلات", track: "Fachinformatik", order: 20, notes: "يجب ربطه بجدول Tech Lab | مراجعة نقاط القوة (17/20)", examWeight: "Low", completed: false },

  // Exam Prep
  { title: "Modelltest 1: Lesen - نموذج امتحان كامل", track: "Exam Prep", order: 1, notes: "امتحان تجريبي كامل من Goethe | قسم القراءة", examWeight: "High", completed: false },
  { title: "Modelltest 1: Hören - نموذج امتحان كامل", track: "Exam Prep", order: 2, notes: "امتحان تجريبي كامل من Goethe | قسم الاستماع", examWeight: "High", completed: false },
  { title: "Modelltest 1: Schreiben - نموذج امتحان كامل", track: "Exam Prep", order: 3, notes: "امتحان تجريبي كامل من Goethe | قسم الكتابة", examWeight: "High", completed: false },
  { title: "Modelltest 1: Sprechen - نموذج امتحان كامل", track: "Exam Prep", order: 4, notes: "امتحان تجريبي كامل من Goethe | قسم المحادثة", examWeight: "High", completed: false },
  { title: "Modelltest 2: Lesen - نموذج امتحان ثاني", track: "Exam Prep", order: 5, notes: "امتحان تجريبي ثاني كامل | قسم القراءة", examWeight: "High", completed: false },
  { title: "Modelltest 2: Hören - نموذج امتحان ثاني", track: "Exam Prep", order: 6, notes: "امتحان تجريبي ثاني كامل | قسم الاستماع", examWeight: "High", completed: false },
  { title: "Modelltest 2: Schreiben - نموذج امتحان ثاني", track: "Exam Prep", order: 7, notes: "امتحان تجريبي ثاني كامل | قسم الكتابة", examWeight: "High", completed: false },
  { title: "Modelltest 2: Sprechen - نموذج امتحان ثاني", track: "Exam Prep", order: 8, notes: "امتحان تجريبي ثاني كامل | قسم المحادثة", examWeight: "High", completed: false },
];