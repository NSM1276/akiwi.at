// ─────────────────────────────────────────────────────────────────────────────
// AKIWI — Datenschutzerklärung (/datenschutz), German only
//
// Legal text, approved by the operator: do not change the substance without his
// sign-off. The controller's name, address and contact come from legal-copy.js
// (shown in components/DatenschutzContent.jsx), not from here.
//
// Keep it true to what the site does: no cookies, a cookieless visit counter
// (counted by the same namax script, see 'besuche'), fonts
// self-hosted (next/font), the language choice in localStorage ('akiwi.lang',
// components/LangProvider.jsx), the request form loaded from www.namax.at
// (app/layout.jsx). Retention 90 / 180 days is the namax side's rule.
// Section ids are anchors: the form links to /datenschutz#anfrage.
// ─────────────────────────────────────────────────────────────────────────────

export const DATENSCHUTZ = {
  title: 'Datenschutz',
  lead: 'Wie Akiwi.at mit Ihren Daten umgeht.',
  sections: [
    {
      id: 'kurz',
      title: 'Kurz gesagt',
      body: [
        'Akiwi.at setzt keine Cookies. Besuche zählen wir nur als Zahl pro Tag, ohne zu wissen, wer Sie sind (siehe unten). Schriftarten werden von unserem eigenen Server geladen, nicht von Dritten. Auf Ihrem Gerät speichern wir nur die gewählte Sprache (Deutsch oder Englisch), damit die Seite sie sich merkt.',
        'Personenbezogene Daten erhalten wir nur, wenn Sie uns selbst schreiben: über das Anfrageformular, per E-Mail, Telefon oder Instagram.',
      ],
    },
    {
      id: 'hosting',
      title: 'Hosting und Server-Logs',
      body: [
        'Die Website wird bei Vercel Inc. (USA) gehostet. Beim Aufruf verarbeitet der Hosting-Anbieter technisch notwendige Daten wie IP-Adresse, Zeitpunkt, aufgerufene Seite und Browser-Typ, um die Seite auszuliefern und den Betrieb abzusichern. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren und stabilen Betrieb (Art. 6 Abs. 1 lit. f DSGVO). Für die Übermittlung in die USA stützt sich der Anbieter auf das EU-US Data Privacy Framework bzw. Standardvertragsklauseln.',
      ],
    },
    {
      id: 'besuche',
      title: 'Besuchszähler',
      body: [
        'Um zu wissen, ob Akiwi genutzt wird, zählen wir Besuche. Ein Besuch zählt nur, wenn Sie eine Seite wirklich ansehen: nach 3 Sekunden mit Scrollen oder Tippen oder nach 15 Sekunden auf der Seite, einmal pro Laden der Seite. Wenn Sie innerhalb von Akiwi.at weiterklicken, zählt das nicht als neuer Besuch.',
        'Gespeichert werden nur der Tag, die Seite, auf der Sie angekommen sind (die Adresse ohne Zusätze), und grob, woher Sie kamen: Google, eine andere Suchmaschine, ein soziales Netzwerk, namax.at, direkt oder anderes. Wir setzen dafür keine Cookies, speichern keine IP-Adresse und nichts auf Ihrem Gerät; einzelne Personen lassen sich daraus nicht erkennen.',
        'Gezählt wird über dasselbe Skript von www.namax.at wie beim Anfrageformular. Die Zahlen liegen bei unserem Hosting-Anbieter Vercel Inc. (USA) und unserem Datenbankanbieter Neon (USA), und nur wir sehen sie. Rechtsgrundlage ist unser berechtigtes Interesse zu wissen, ob und wie die Website genutzt wird (Art. 6 Abs. 1 lit. f DSGVO).',
      ],
    },
    {
      id: 'sprache',
      title: 'Gespeicherte Sprache',
      body: [
        'Wenn Sie die Sprache umstellen, speichert Ihr Browser diese Wahl im lokalen Speicher (Eintrag „akiwi.lang“). Der Eintrag bleibt auf Ihrem Gerät, wird nicht an uns übertragen und enthält nichts außer der Sprache. Sie können ihn jederzeit in Ihrem Browser löschen.',
      ],
    },
    {
      id: 'anfrage',
      title: 'Anfrageformular',
      body: [
        'Über die Schaltflächen „Anfrage senden“ (zum Beispiel auf der Seite „Für Lokale“) und „Senden“ auf der Seite Ihres Eintrags können Sie uns eine Anfrage schicken. Das Formular wird von www.namax.at geladen, der Website unseres Unternehmens, und Ihre Anfrage wird dorthin übertragen. Beim Laden erhält der Server von www.namax.at, wie jeder Server, Ihre IP-Adresse; er setzt keine Cookies und speichert nichts in Ihrem Browser.',
        'Wir speichern, wer Sie sind (ob Sie ein Lokal führen, dort arbeiten oder Gast sind), was Sie möchten, um welches Lokal es geht, Ihre Telefonnummer, ob wir anrufen oder per WhatsApp schreiben sollen, Ihren Namen und Ihre Nachricht, falls Sie sie angeben, und den Zeitpunkt. Wenn Sie über die Seite Ihres Eintrags schreiben, kommen die Angaben hinzu, die Sie dort korrigiert haben.',
        'Wir verwenden diese Angaben nur, um Ihnen zu antworten und Ihre Anfrage zu bearbeiten. Rechtsgrundlage ist Ihre Einwilligung mit dem Absenden (Art. 6 Abs. 1 lit. a DSGVO) und die Bearbeitung Ihrer Anfrage (Art. 6 Abs. 1 lit. b DSGVO). Sie können die Einwilligung jederzeit widerrufen, zum Beispiel per E-Mail an die oben genannte Adresse.',
        'Erledigte Anfragen löschen wir 90 Tage nach der Bearbeitung, unbearbeitete spätestens nach 180 Tagen. Die Anfragen liegen bei unserem Hosting-Anbieter Vercel Inc. (USA) und unserem Datenbankanbieter Neon (USA) und werden nicht weitergegeben. Verantwortlich ist das oben genannte Unternehmen. Für die Übermittlung in die USA stützen sich die Anbieter auf das EU-US Data Privacy Framework bzw. Standardvertragsklauseln.',
        'Um das Formular zu verbessern, zählen wir pro Seite und Tag nur, über welche Schaltfläche es geöffnet wurde, welche Schritte und welche Auswahl erreicht wurden, bei welchem Schritt es geschlossen wurde und ob es gesendet wurde, ohne Namen, Telefonnummer oder Text. Rechtsgrundlage ist unser berechtigtes Interesse zu wissen, ob das Formular funktioniert (Art. 6 Abs. 1 lit. f DSGVO).',
        'Wenn Sie WhatsApp wählen, schreiben wir Ihnen dort; dann gelten zusätzlich die Datenschutzbestimmungen von WhatsApp.',
      ],
    },
    {
      id: 'kontakt',
      title: 'Kontakt per E-Mail, Telefon oder Instagram',
      body: [
        'Wenn Sie uns eine E-Mail schreiben, anrufen oder über Instagram eine Nachricht schicken, verwenden wir Ihre Angaben ebenfalls nur, um Ihre Anfrage zu bearbeiten. Bei Instagram gelten zusätzlich die Datenschutzbestimmungen von Meta.',
      ],
    },
    {
      id: 'links',
      title: 'Links zu anderen Diensten',
      body: [
        'Links zu Google Maps (Route), Instagram, TikTok, YouTube und zu den Websites der Lokale sind einfache Links. Erst wenn Sie darauf klicken, öffnet sich der jeweilige Dienst, und dann gelten dessen Datenschutzbestimmungen.',
      ],
    },
    {
      id: 'rechte',
      title: 'Ihre Rechte',
      body: [
        'Sie haben das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Schreiben Sie uns dazu an die oben genannte Adresse. Beschwerden können Sie bei der österreichischen Datenschutzbehörde einbringen: dsb.gv.at.',
      ],
    },
  ],
};
