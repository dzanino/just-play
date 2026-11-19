// Jednoduché prekladanie: texty s data-i18n, jazyk z ?lang=, potom z prehliadača, inak SK.
const I18N = (() => {
  const T = {
    sk: {
      tag: "Je to o hraní, nie o výhre.",
      lead: "Desať retro hier pre iPhone, iPad a Mac z čias Atari 800XL a Amigy, Workbench s disketami, 12 vajíčok a tri kľúče k skrytej Diskete 2. Bez reklám, bez háčikov.",
      soon: "Stiahnuť v App Store", m1h: "HRA", m1: "Úrovne, ktoré sa dajú vyhrať. Každá ďalšia je o kúsok ťažšia.",
      m2h: "PARADOX", m2: "Verzie, ktoré vyhrať nejde. Tlačidlo PREČO NIE ukáže matematický dôkaz.",
      gh: "Desať hier", f1: "Hrubé pixely alebo hladká 256-farebná grafika.", f2: "Skladby zo štvorkanálového čipu a jukebox s 27 nahranými skladbami z Amigy, PC aj Korgu, od roku 1994 po 2026. Pribúdajú hraním.",
      f3: "Hry sa ovplyvňujú navzájom ako úlohy na starom počítači.", f4h: "BEZ REKLÁM", f4: "Žiadne reklamy ani sledovanie. Jedna cena, v hrách nič nedokupuješ. Celý album hudby si môžeš kúpiť naraz alebo ho dostaneš hraním.",
      privacy: "Ochrana súkromia", support: "Podpora"
    },
    en: {
      tag: "Just play. Don't win.",
      lead: "Ten retro games for iPhone, iPad and Mac from the days of the Atari 800XL and the Amiga, a Workbench full of floppies, 12 Easter eggs and three keys to the hidden Disk 2. No ads, no hooks.",
      soon: "Download on the App Store", m1h: "PLAY", m1: "Levels you can win. Each one a little harder.",
      m2h: "PARADOX", m2: "Versions you can never win. The WHY NOT button shows the mathematical proof.",
      gh: "Ten games", f1: "Chunky pixels or smooth 256-colour art.", f2: "Tracks from a four-channel sound chip and a jukebox with 27 recorded songs, made on an Amiga, a PC and a Korg, from 1994 to 2026. They arrive as you play.",
      f3: "The games affect each other like tasks on an old computer.", f4h: "NO ADS", f4: "No ads, no tracking. One price, nothing to buy inside the games. Buy the full music album at once, or get it by playing.",
      privacy: "Privacy", support: "Support"
    },
    pl: {
      tag: "Liczy się gra, nie wygrana.",
      lead: "Dziesięć gier retro na iPhone'a, iPada i Maca z czasów Atari 800XL i Amigi, Workbench z dyskietkami, 12 jajek i trzy klucze do ukrytej Dyskietki 2. Bez reklam, bez haczyków.",
      soon: "Pobierz w App Store", m1h: "GRA", m1: "Poziomy, które da się wygrać. Każdy trochę trudniejszy.",
      m2h: "PARADOKS", m2: "Wersje nie do wygrania. Przycisk DLACZEGO NIE pokazuje dowód matematyczny.",
      gh: "Dziesięć gier", f1: "Grube piksele albo gładka grafika w 256 kolorach.", f2: "Utwory z czterokanałowego układu i szafa grająca z 27 nagranymi utworami, z Amigi, PC i Korga, od 1994 do 2026. Przybywają podczas gry.",
      f3: "Gry wpływają na siebie jak zadania na starym komputerze.", f4h: "BEZ REKLAM", f4: "Bez reklam i śledzenia. Jedna cena, w grach niczego nie dokupujesz. Cały album muzyczny kupisz od razu albo zdobędziesz grając.",
      privacy: "Prywatność", support: "Pomoc"
    },
    de: {
      tag: "Spielen statt gewinnen.",
      lead: "Zehn Retro-Spiele für iPhone, iPad und Mac aus der Zeit von Atari 800XL und Amiga, eine Workbench voller Disketten, 12 Easter Eggs und drei Schlüssel zur versteckten Disk 2. Keine Werbung, keine Haken.",
      soon: "Laden im App Store", m1h: "SPIEL", m1: "Level, die man gewinnen kann. Jedes etwas schwerer.",
      m2h: "PARADOX", m2: "Versionen, die man nie gewinnt. WARUM NICHT zeigt den mathematischen Beweis.",
      gh: "Zehn Spiele", f1: "Grobe Pixel oder glatte 256-Farben-Grafik.", f2: "Stücke aus einem Vierkanal-Soundchip und eine Jukebox mit 27 aufgenommenen Stücken, auf Amiga, PC und Korg, von 1994 bis 2026. Sie kommen beim Spielen dazu.",
      f3: "Die Spiele beeinflussen sich wie Tasks auf einem alten Computer.", f4h: "OHNE WERBUNG", f4: "Keine Werbung, kein Tracking. Ein Preis, in den Spielen gibt es nichts zu kaufen. Das ganze Musikalbum kaufst du auf einmal oder bekommst es beim Spielen.",
      privacy: "Datenschutz", support: "Hilfe"
    }
  };
  const pick = () => {
    const q = new URLSearchParams(location.search).get("lang");
    if (q && T[q]) return q;
    let saved = null; try { saved = localStorage.getItem("lang"); } catch (e) {}
    if (saved && T[saved]) return saved;
    for (const l of navigator.languages || [navigator.language]) { const b = (l || "").slice(0, 2).toLowerCase(); if (T[b]) return b; }
    return "sk";
  };
  function apply(lang, extra) {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => { const v = T[lang][el.dataset.i18n]; if (v) el.textContent = v; });
    document.querySelectorAll("[data-lang]").forEach(b => b.classList.toggle("on", b.dataset.lang === lang));
    document.querySelectorAll("[data-show]").forEach(el => { el.hidden = el.dataset.show !== lang; });
    if (extra) extra(lang);
  }
  return {
    init(extra) {
      let lang = pick(); apply(lang, extra);
      document.querySelectorAll("[data-lang]").forEach(b => b.addEventListener("click", () => {
        lang = b.dataset.lang; try { localStorage.setItem("lang", lang); } catch (e) {} apply(lang, extra);
      }));
    }
  };
})();
