// ─────────────────────────────────────────────────────────────────────────────
// AKIWI — "Für Lokale" page (/lokale)
//
// The page a venue owner lands on after scanning the QR code on the business
// card. One screen says what Akiwi is, what we ask for, and how to reach us;
// the sections below explain where the project is heading.
//
// "plans" are plans, not promises: keep the wording that way.
// Turkish is offered here only (owners of many venues read it more easily);
// the rest of the site stays DE/EN.
// ─────────────────────────────────────────────────────────────────────────────

import { IMPRESSUM } from './legal-copy';

const digits = IMPRESSUM.phone.replace(/\D/g, '');

export const CONTACT = {
  name: 'Nasim',
  phone: IMPRESSUM.phone,
  tel: `tel:+${digits}`,
  whatsapp: (text) => `https://wa.me/${digits}?text=${encodeURIComponent(text)}`,
};

export const LOKALE_LANGS = ['de', 'tr', 'en'];

export const LOKALE_COPY = {
  de: {
    kicker: 'Für Lokale',
    title: 'Ihr Lokal auf Akiwi. Kostenlos.',
    lead: 'Akiwi ist ein Guide für Halal-Essen in Österreich. Gäste finden bei uns Lokale in ihrer Nähe.',
    steps: [
      'Wir tragen Ihr Lokal ein, kostenlos.',
      'Sie prüfen Adresse, Öffnungszeiten und Speisekarte.',
      'Auf Wunsch ergänzen wir Fotos.',
    ],
    whatsapp: 'Auf WhatsApp schreiben',
    whatsappText: 'Hallo Akiwi! Ich melde mich wegen meines Lokals: ',
    reply: 'Nasim antwortet meist am selben Tag.',
    call: 'Anrufen',
    visit: 'Akiwi ansehen',
    sections: [
      {
        title: 'Warum Akiwi?',
        body: 'Wer halal essen möchte, muss heute raten, nachfragen oder lange suchen. Wir wollen, dass ein Blick genügt: Wo ist ein Lokal, was gibt es dort, und ist der Halal-Status geprüft.',
      },
      {
        title: 'Ehrlich statt geschönt',
        body: 'Bei uns steht nur „Verifiziert“, wenn wir ein Zertifikat gesehen haben oder selbst vor Ort waren. Das schützt Ihre Gäste und alle Lokale, die es ernst meinen.',
      },
      {
        title: 'Wir stehen am Anfang',
        body: 'Akiwi ist neu. Wir starten in Wien und wachsen Lokal für Lokal, in ganz Österreich. Wer jetzt dabei ist, gestaltet mit: Sagen Sie uns, was Ihnen als Gastronom fehlt.',
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
    lead: 'Akiwi, Avusturya’da helal yemek rehberidir. Misafirler yakınlarındaki işletmeleri bizde bulur.',
    steps: [
      'İşletmenizi ücretsiz olarak ekliyoruz.',
      'Adresi, çalışma saatlerini ve menüyü siz kontrol edersiniz.',
      'İsterseniz fotoğraf ekleriz.',
    ],
    whatsapp: 'WhatsApp’tan yazın',
    whatsappText: 'Merhaba Akiwi! İşletmem için yazıyorum: ',
    reply: 'Nasim genellikle aynı gün cevap verir.',
    call: 'Arayın',
    visit: 'Akiwi’ye göz atın',
    sections: [
      {
        title: 'Neden Akiwi?',
        body: 'Helal yemek isteyen biri bugün tahmin etmek, sormak ya da uzun uzun aramak zorunda. Biz tek bakışın yetmesini istiyoruz: İşletme nerede, ne sunuyor ve helal durumu kontrol edilmiş mi.',
      },
      {
        title: 'Süslemeden, dürüstçe',
        body: 'Bizde „Verifiziert“ (doğrulandı) yalnızca bir sertifika gördüğümüzde ya da işletmeyi bizzat ziyaret ettiğimizde yazar. Bu hem misafirlerinizi hem de işini ciddiye alan işletmeleri korur.',
      },
      {
        title: 'Yolun başındayız',
        body: 'Akiwi yeni. Viyana’da başlıyoruz ve işletme işletme, tüm Avusturya’ya büyüyoruz. Şimdi katılan, birlikte şekillendirir: Bir işletmeci olarak neye ihtiyacınız olduğunu bize söyleyin.',
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
    lead: 'Akiwi is a guide to halal food in Austria. Guests use it to find places near them.',
    steps: [
      'We list your venue, free of charge.',
      'You check the address, opening hours and menu.',
      'If you like, we add photos.',
    ],
    whatsapp: 'Message us on WhatsApp',
    whatsappText: 'Hello Akiwi! I’m writing about my venue: ',
    reply: 'Nasim usually replies the same day.',
    call: 'Call',
    visit: 'See Akiwi',
    sections: [
      {
        title: 'Why Akiwi?',
        body: 'Anyone who wants to eat halal today has to guess, ask or search for a long time. We want one look to be enough: where a place is, what it serves, and whether its halal status has been checked.',
      },
      {
        title: 'Honest, not polished',
        body: 'We only write “Verified” once we have seen a certificate or visited in person. That protects your guests and every venue that takes halal seriously.',
      },
      {
        title: 'We are just starting',
        body: 'Akiwi is new. We start in Vienna and grow venue by venue, across Austria. Those who join now help shape it: tell us what you are missing as a restaurant owner.',
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
