# Sito bilingue (IT/EN) — Percorsi ispirati

Struttura: Home / Chi sono / Servizi / Contatti — ciascuna pagina ha la versione italiana e inglese (es. `index.html` e `index_en.html`).

Tecnologie: HTML statico + Tailwind CSS (CDN) + Google Fonts. Modulo contatti pronto per Formspree.

Istruzioni rapide
1. Anteprima locale:
   - Apri `index.html` nel browser oppure avvia un semplice server:
     - Python 3: `python -m http.server 8000`
     - Poi apri: `http://localhost:8000`
2. Formspree:
   - Registrati su https://formspree.io e crea un form.
   - Copia l'endpoint (es. `https://formspree.io/f/abcd1234`) e incollalo nell'attributo `action` dei file `contact.html` e `contact_en.html` al posto di `https://formspree.io/f/yourFormID`.
3. Personalizzazione:
   - Sostituisci testi e immagini (le immagini attuali sono placeholder da Unsplash).
   - Puoi aggiungere la tua grafica/Logo sostituendo le immagini negli header.
4. Deploy:
   - GitHub Pages: crea un repo e fai push dei file; poi abilita Pages sulla branch `main` (root).
   - Netlify / Vercel: collega il repo o fai drag&drop della cartella del sito.
5. Vuoi che lo pubblichi io?
   - Posso creare il repo GitHub e fare il primo commit (dimmi nome repo e pubblico/privato) e/o collegare il deploy su Netlify/Vercel.

Note legali
- Il sito è "ispirato" ma i contenuti testuali e le immagini sono originali/stock. Fornisci testi e immagini se vuoi evitare placeholder.

Dimmi come procedere: vuoi che crei il repo e lo pubblichi, o preferisci che integri testi/immagini ora? Posso anche tradurre testi più approfonditi per EN/IT se vuoi.
