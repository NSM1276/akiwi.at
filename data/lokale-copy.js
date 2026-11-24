// ─────────────────────────────────────────────────────────────────────────────
// AKIWI — "Für Lokale" page (/lokale)
//
// The page a venue owner lands on after scanning the QR code on the business
// card, or from a link in our Instagram message. It says who we are (an
// independent guide that works for guests and collects proof), what the halal
// statuses mean, how a venue gets "Verifiziert" (send a photo of the
// certificate), and how to reach us: the request form (www.namax.at/js/contact.js, loaded in
// app/layout.jsx), Instagram Direct, email, phone.
//
// Never promise a visit here: whether we come by is agreed in a personal chat
// (owner, 2026-11-17). "plans" are plans, not promises: keep the wording that way.
// Turkish is offered here only (owners of many venues read it more easily);
// the rest of the site stays DE/EN.
// ─────────────────────────────────────────────────────────────────────────────

import { IMPRESSUM } from './legal-copy';

const digits = IMPRESSUM.phone.replace(/\D/g, '');

export const CONTACT = {
  name: 'Nasim',
  phone: IMPRESSUM.phone,
  tel: `tel:+${digits}`,
  instagram: 'https://ig.me/m/akiwi.at',
};

export const LOKALE_LANGS = ['de', 'tr', 'en'];

export const LOKALE_COPY = {
  de: {
    kicker: 'Für Lokale',
    title: 'Ihr Lokal auf Akiwi. Kostenlos.',
    lead: 'Akiwi ist ein unabhängiger Guide für Halal-Essen. Gäste finden bei uns Lokale in ihrer Nähe und sehen, worauf die Halal-Angabe beruht.',
    steps: [
      'Wir tragen Ihr Lokal ein, kostenlos.',
      'Sie prüfen Adresse, Öffnungszeiten und Speisekarte.',
      'Sie schicken uns ein Foto Ihres Halal-Zertifikats. Dann steht Ihr Lokal bei uns als „Verifiziert“.',
      'Fotos von Lokal und Speisen können Sie uns gern mitschicken.',
    ],
    write: 'Anfrage senden',
    reply: 'Nasim antwortet meist am selben Tag.',
    instagram: 'Instagram Direct',
    call: 'Anrufen',
    emailWrite: 'E-Mail schreiben',
    emailCopy: 'E-Mail-Adresse kopieren',
    emailCopied: 'Kopiert',
    emailSubject: 'Mein Lokal auf Akiwi',
    statusTitle: 'Halal-Status bei Akiwi',
    statusLead: 'Wir trennen klar, was ein Lokal über sich sagt, und was wir selbst gesehen haben.',
    statuses: [
      { label: 'Verifiziert', body: 'Wir haben ein Halal-Zertifikat gesehen: als Foto vom Lokal oder bei einem Besuch vor Ort.' },
      { label: 'Halal laut Lokal', body: 'Das Lokal schreibt selbst öffentlich, dass es halal ist, zum Beispiel auf seiner Website oder auf Instagram. Geprüft haben wir es noch nicht.' },
      { label: 'Nicht geprüft', body: 'Halal laut öffentlich zugänglichen Angaben, noch nicht von Akiwi geprüft.' },
    ],
    sections: [
      {
        title: 'Warum Akiwi?',
        body: 'Wer halal essen möchte, muss heute raten, nachfragen oder lange suchen. Und manchmal steht „halal“ dran, aber es ist nicht halal. Wir wollen, dass sich Gäste, aus Wien wie auf Reisen, auf einen Blick verlassen können.',
      },
      {
        title: 'Für Gäste, nicht für Werbung',
        body: 'Akiwi arbeitet für die Gäste. Wir übernehmen nicht einfach, was auf einem Schild steht, sondern sammeln Nachweise. Das schützt Ihre Gäste und alle Lokale, die es mit halal ernst meinen.',
      },
      {
        title: 'Wir stehen am Anfang',
        body: 'Akiwi ist neu und unabhängig. Wir starten in Wien, später folgen ganz Österreich und der deutschsprachige Raum. Wer jetzt dabei ist, gestaltet mit: Sagen Sie uns, was Ihnen als Gastronom fehlt.',
      },
    ],
    plansTitle: 'Was wir vorhaben',
    plans: [
      'Geprüfte Halal-Angaben für jedes Lokal',
      'Digitale Speisekarte mit QR-Code für Ihre Tische',
      'Fotos, Öffnungszeiten und Speisekarte immer aktuell',
      'Mehr Gäste, die gezielt nach Halal suchen',
    ],
    note: 'Daten falsch oder Eintrag löschen? Eine Nachricht genügt.',
  },

  tr: {
    kicker: 'İşletmeler için',
    title: 'İşletmeniz Akiwi’de. Ücretsiz.',
    lead: 'Akiwi, bağımsız bir helal yemek rehberidir. Misafirler yakınlarındaki işletmeleri bizde bulur ve helal bilgisinin neye dayandığını görür.',
    steps: [
      'İşletmenizi ücretsiz olarak ekliyoruz.',
      'Adresi, çalışma saatlerini ve menüyü siz kontrol edersiniz.',
      'Helal sertifikanızın fotoğrafını bize gönderirsiniz. İşletmeniz bizde „Verifiziert“ (doğrulandı) olarak görünür.',
      'İsterseniz işletmenizin ve yemeklerinizin fotoğraflarını da gönderebilirsiniz.',
    ],
    write: 'Talep gönderin',
    reply: 'Nasim genellikle aynı gün cevap verir.',
    instagram: 'Instagram Direct',
    call: 'Arayın',
    emailWrite: 'E-posta yazın',
    emailCopy: 'E-posta adresini kopyalayın',
    emailCopied: 'Kopyalandı',
    emailSubject: 'Akiwi’deki işletmem',
    statusTitle: 'Akiwi’de helal durumu',
    statusLead: 'Bir işletmenin kendisi hakkında söyledikleriyle bizim kendi gözümüzle gördüklerimizi açıkça ayırıyoruz.',
    statuses: [
      { label: 'Verifiziert (doğrulandı)', body: 'Helal sertifikasını gördük: işletmenin gönderdiği bir fotoğrafla ya da yerinde bir ziyaretle.' },
      { label: 'Halal laut Lokal (işletmeye göre helal)', body: 'İşletme helal olduğunu kendisi açıkça yazıyor, örneğin web sitesinde veya Instagram’da. Henüz kontrol etmedik.' },
      { label: 'Nicht geprüft (kontrol edilmedi)', body: 'Herkese açık bilgilere göre helal, Akiwi tarafından henüz kontrol edilmedi.' },
    ],
    sections: [
      {
        title: 'Neden Akiwi?',
        body: 'Helal yemek isteyen biri bugün tahmin etmek, sormak ya da uzun uzun aramak zorunda. Bazen de „helal“ yazıyor ama helal değil. Viyana’da yaşayanların da turistlerin de tek bakışta güvenebilmesini istiyoruz.',
      },
      {
        title: 'Reklam için değil, misafirler için',
        body: 'Akiwi misafirler için çalışır. Bir tabelada yazanı olduğu gibi almıyoruz, kanıt topluyoruz. Bu hem misafirlerinizi hem de helal konusunu ciddiye alan işletmeleri korur.',
      },
      {
        title: 'Yolun başındayız',
        body: 'Akiwi yeni ve bağımsız. Viyana’da başlıyoruz; ardından tüm Avusturya ve Almanca konuşulan bölge gelecek. Şimdi katılan, birlikte şekillendirir: Bir işletmeci olarak neye ihtiyacınız olduğunu bize söyleyin.',
      },
    ],
    plansTitle: 'Planlarımız',
    plans: [
      'Her işletme için kontrol edilmiş helal bilgisi',
      'Masalarınız için QR kodlu dijital menü',
      'Her zaman güncel fotoğraflar, çalışma saatleri ve menü',
      'Özellikle helal arayan daha fazla misafir',
    ],
    note: 'Bilgiler yanlış mı, kaydın silinmesini mi istiyorsunuz? Bir mesaj yeter.',
  },

  en: {
    kicker: 'For venues',
    title: 'Your venue on Akiwi. Free.',
    lead: 'Akiwi is an independent guide to halal food. Guests use it to find places near them and to see what each halal claim is based on.',
    steps: [
      'We list your venue, free of charge.',
      'You check the address, opening hours and menu.',
      'You send us a photo of your halal certificate. Your venue is then shown as “Verified”.',
      'You are welcome to send photos of your venue and food as well.',
    ],
    write: 'Send a request',
    reply: 'Nasim usually replies the same day.',
    instagram: 'Instagram Direct',
    call: 'Call',
    emailWrite: 'Write an email',
    emailCopy: 'Copy email address',
    emailCopied: 'Copied',
    emailSubject: 'My venue on Akiwi',
    statusTitle: 'Halal status on Akiwi',
    statusLead: 'We keep what a venue says about itself clearly apart from what we have seen ourselves.',
    statuses: [
      { label: 'Verified', body: 'We have seen a halal certificate: as a photo from the venue or during a visit.' },
      { label: 'Halal per venue', body: 'The venue itself states publicly that it is halal, for example on its website or Instagram. We have not checked it yet.' },
      { label: 'Not checked', body: 'Halal according to publicly available information, not yet checked by Akiwi.' },
    ],
    sections: [
      {
        title: 'Why Akiwi?',
        body: 'Anyone who wants to eat halal today has to guess, ask or search for a long time. And sometimes a place says “halal” and it isn’t. We want locals and travellers alike to be able to rely on one look.',
      },
      {
        title: 'For guests, not for advertising',
        body: 'Akiwi works for guests. We don’t simply repeat what a sign says, we collect proof. That protects your guests and every venue that takes halal seriously.',
      },
      {
        title: 'We are just starting',
        body: 'Akiwi is new and independent. We start in Vienna, then all of Austria and the German-speaking region. Those who join now help shape it: tell us what you are missing as a restaurant owner.',
      },
    ],
    plansTitle: 'What we are planning',
    plans: [
      'Checked halal information for every venue',
      'A digital menu with a QR code for your tables',
      'Photos, opening hours and menu always up to date',
      'More guests who search specifically for halal',
    ],
    note: 'Wrong data, or want your entry removed? One message is enough.',
  },
};
