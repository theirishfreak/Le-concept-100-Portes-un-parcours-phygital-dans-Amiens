/* ──────────────────────────────────────────
   100 PORTES — Portail QR · app.js
   Logique : années, animations, AR deep links
   ────────────────────────────────────────── */

'use strict';

/* ══════════════════════════════════════════
   BASE DE DONNÉES DES 100 PORTES (1926–2026)
   Clés représentatives, les autres sont
   générées automatiquement.
   ══════════════════════════════════════════ */
const PORTES_DATA = {
  1926: {
    titre: "La première Foire d'Amiens",
    desc: "Naissance de la grande Foire d'Amiens en plein essor économique de l'après-guerre. Les stands en bois et les manèges à vapeur accueillent des milliers de Picards pour la première fois.",
    temoignage: "C'était comme si toute la Picardie se retrouvait place Longueville. On n'avait jamais vu autant de monde !",
    auteur: "Marcelle D.",
    role: "Commerçante amiénoise, 1926",
    couleur: "#8b4513",
    gradient: "linear-gradient(135deg, #3d1a0a 0%, #1a0a05 100%)"
  },
  1939: {
    titre: "La dernière avant la tempête",
    desc: "Ultime édition avant l'entrée en guerre. La Foire se tient dans une atmosphère tendue, alors que les nouvelles d'Europe assombrissent les esprits. Les forains savent qu'ils ne se reverront pas avant longtemps.",
    temoignage: "On riait, on mangeait des gaufres, mais au fond tout le monde savait. C'était une dernière parenthèse.",
    auteur: "Henri M.",
    role: "Forain ambulant, Amiens",
    couleur: "#5c4a2a",
    gradient: "linear-gradient(135deg, #2a2010 0%, #0f0c06 100%)"
  },
  1946: {
    titre: "Le retour de la Foire — après la guerre",
    desc: "Première édition d'après-guerre, symbole de renaissance pour Amiens meurtrie. Les Amiénois retrouvent leurs manèges, leurs odeurs de barbe à papa, leur Foire. Un moment d'émotion collective inégalé.",
    temoignage: "Quand les lampions se sont allumés ce soir-là, ma mère a pleuré. On était en vie. La Foire était là.",
    auteur: "Roger L.",
    role: "Ancien combattant, Amiens",
    couleur: "#7a6a3a",
    gradient: "linear-gradient(135deg, #2d2515 0%, #0f0d07 100%)"
  },
  1955: {
    titre: "L'arrivée de l'électroménager",
    desc: "Stand après stand, les réfrigérateurs, machines à laver et téléviseurs font leur apparition à la Foire. Les Trente Glorieuses transforment les foyers picards. La modernité s'installe dans les cuisines d'Amiens.",
    temoignage: "Papa a acheté notre premier frigo à la Foire. On avait l'impression d'entrer dans le futur.",
    auteur: "Françoise B.",
    role: "Habitante d'Amiens-Nord",
    couleur: "#4a6a5a",
    gradient: "linear-gradient(135deg, #1a2820 0%, #080f0c 100%)"
  },
  1968: {
    titre: "La Foire malgré tout",
    desc: "Pendant que Paris brûle, Amiens maintient sa Foire. Un acte de résistance culturelle. Les forains, les étudiants, les ouvriers se côtoient dans une ambiance électrique, entre fête et contestation.",
    temoignage: "On discutait politique entre deux tours de manège. La Foire était le seul endroit où tout le monde se parlait.",
    auteur: "Jean-Pierre V.",
    role: "Étudiant UPJV, Amiens",
    couleur: "#6a3a2a",
    gradient: "linear-gradient(135deg, #28150e 0%, #0f0805 100%)"
  },
  1977: {
    titre: "L'âge d'or des manèges",
    desc: "La Foire atteint son apogée de fréquentation. Les grandes familles foraines — Stalars, Bos, Péron — rivalisent d'ingéniosité. Les attractions mécaniques géantes fascinent une jeunesse avide de sensations.",
    temoignage: "La grande roue était si haute qu'on voyait la cathédrale depuis le sommet. Je montais cinq fois de suite.",
    auteur: "Sylvie R.",
    role: "Amiénoise de la rive gauche",
    couleur: "#3a5a6a",
    gradient: "linear-gradient(135deg, #142028 0%, #080c0f 100%)"
  },
  1989: {
    titre: "L'an de la liberté",
    desc: "Chute du mur de Berlin, bicentenaire de la Révolution. La Foire s'habille de bleu-blanc-rouge. Une édition historique où la joie collective résonne jusque dans les allées du grand chapiteau.",
    temoignage: "Il y avait quelque chose de spécial dans l'air cette année-là. Une légèreté qu'on n'avait pas ressentie depuis longtemps.",
    auteur: "Alain T.",
    role: "Professeur d'histoire, Lycée Boucher",
    couleur: "#1a3a6a",
    gradient: "linear-gradient(135deg, #0a1428 0%, #040810 100%)"
  },
  2000: {
    titre: "L'an 2000 — Le tournant du siècle",
    desc: "Millénaire oblige, la Foire se pare de lumières et d'écrans. Internet fait une timide apparition sur quelques stands. Les visiteurs prennent leurs premières photos numériques devant leurs manèges préférés.",
    temoignage: "Mon fils voulait absolument prendre une photo avec le portable de son père. Un truc de la taille d'une brique !",
    auteur: "Nathalie P.",
    role: "Mère de famille, Longueau",
    couleur: "#2a2a5a",
    gradient: "linear-gradient(135deg, #10102a 0%, #060610 100%)"
  },
  2020: {
    titre: "La Foire suspendue — COVID-19",
    desc: "Pour la première fois depuis 1939, la Foire d'Amiens n'a pas lieu. Les allées restent désertes, les camions des forains immobiles. Un silence pesant remplace le brouhaha habituel. La ville retient son souffle.",
    temoignage: "J'ai passé devant l'emplacement habituel. Il n'y avait rien. Juste du vent. C'est là que j'ai réalisé ce que la Foire représentait vraiment.",
    auteur: "Karim B.",
    role: "Forain de père en fils, 3e génération",
    couleur: "#3a3a3a",
    gradient: "linear-gradient(135deg, #141414 0%, #070707 100%)"
  },
  2026: {
    titre: "Le centenaire — 100 ans de Foire",
    desc: "Un siècle de fête, de rencontres, de mémoire collective. La 100e édition de la Foire d'Amiens célèbre son histoire avec le parcours phygital \"100 Portes\". 100 ans de joies, de larmes, de saveurs et de lumières.",
    temoignage: "Et toi, qu'est-ce que la Foire représente pour toi ? Raconte-nous ton histoire.",
    auteur: "La Foire d'Amiens",
    role: "100e édition · 2026",
    couleur: "#c9a84c",
    gradient: "linear-gradient(135deg, #3d2e0f 0%, #1a1207 100%)"
  }
};

/* Génération des données manquantes pour toutes les années */
function getDonneesPourAnnee(annee) {
  if (PORTES_DATA[annee]) return PORTES_DATA[annee];

  const decades = {
    1920: { couleur: "#8b7355", gradient: "linear-gradient(135deg, #2a2010 0%, #0f0c06 100%)" },
    1930: { couleur: "#7a6a3a", gradient: "linear-gradient(135deg, #2d2515 0%, #0f0d07 100%)" },
    1940: { couleur: "#6a7a3a", gradient: "linear-gradient(135deg, #252d15 0%, #0c0f07 100%)" },
    1950: { couleur: "#4a6a5a", gradient: "linear-gradient(135deg, #1a2820 0%, #080f0c 100%)" },
    1960: { couleur: "#3a5a7a", gradient: "linear-gradient(135deg, #152028 0%, #070c0f 100%)" },
    1970: { couleur: "#5a3a7a", gradient: "linear-gradient(135deg, #201528 0%, #0c070f 100%)" },
    1980: { couleur: "#7a3a5a", gradient: "linear-gradient(135deg, #281520 0%, #0f070c 100%)" },
    1990: { couleur: "#3a7a5a", gradient: "linear-gradient(135deg, #152820 0%, #070f0c 100%)" },
    2000: { couleur: "#3a5a7a", gradient: "linear-gradient(135deg, #151e28 0%, #07090f 100%)" },
    2010: { couleur: "#5a6a2a", gradient: "linear-gradient(135deg, #202810 0%, #0c0f07 100%)" },
    2020: { couleur: "#6a5a3a", gradient: "linear-gradient(135deg, #282015 0%, #0f0c07 100%)" },
  };

  const decade = Math.floor(annee / 10) * 10;
  const style = decades[decade] || decades[1960];
  const numPorte = annee - 1925;

  return {
    titre: `La Foire d'Amiens — Édition ${annee}`,
    desc: `Une année de la grande histoire foraine amiénoise. La porte n°${numPorte} vous invite à revivre les moments forts de cette édition à travers archives, images et témoignages d'époque.`,
    temoignage: "Chaque année avait son caractère, ses odeurs, ses visages. C'est ce que cette porte vous raconte.",
    auteur: "Archives de la Foire",
    role: `Édition ${annee} · Amiens`,
    ...style
  };
}

/* ══════════════════════════════════════════
   ÉTAT DE L'APPLICATION
   ══════════════════════════════════════════ */
let anneeActive = 1926;
const PREMIERE_ANNEE = 1926;
const DERNIERE_ANNEE = 2026;

/* ══════════════════════════════════════════
   UTILITAIRES
   ══════════════════════════════════════════ */
function getParamURL(cle) {
  return new URLSearchParams(window.location.search).get(cle);
}

function numPorte(annee) {
  return annee - PREMIERE_ANNEE + 1;
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

/* ══════════════════════════════════════════
   DEEP LINKS RÉALITÉ AUGMENTÉE
   ══════════════════════════════════════════ */
function buildSnapLink(annee) {
  // Snapchat Lens deep link — remplacer LENS_UUID par l'UUID réel de la Lens
  const lensUUID = 'LENS_UUID_PORTE_' + annee;
  return `https://snapchat.com/unlock/?type=SNAPCODE&uuid=${lensUUID}&metadata=01`;
}

function buildInstaLink(annee) {
  // Instagram Effect deep link — remplacer EFFECT_ID par l'ID réel de l'effet
  const effectId = 'effet_100portes_' + annee;
  return `https://www.instagram.com/ar/${effectId}/`;
}

/* ══════════════════════════════════════════
   RENDU CONTENU
   ══════════════════════════════════════════ */
function renderAnnee(annee, animate = true) {
  anneeActive = annee;
  const data = getDonneesPourAnnee(annee);
  const n = numPorte(annee);

  // Héro
  document.getElementById('heroYear').textContent = annee;
  document.getElementById('doorTagNum').textContent = n;
  document.getElementById('heroBg').style.background = data.gradient;

  // Photo de porte (couleur d'ambiance)
  const photo = document.getElementById('archivePhoto');
  photo.style.background = data.gradient;
  document.getElementById('photoColorLayer').style.background = data.couleur;

  const panel = document.querySelector('.content-panel');

  function applyContent() {
    document.getElementById('eventYearChip').textContent = `Édition ${annee} · Porte n°${n}`;
    document.getElementById('eventTitle').textContent = data.titre;
    document.getElementById('eventDesc').textContent = data.desc;
    document.getElementById('sloganText').innerHTML =
      annee === 2026
        ? 'Et toi, tu fais quoi en&nbsp;2026&nbsp;?'
        : `Retourne en ${annee} — à travers la porte`;
    document.getElementById('testimonialQuote').textContent = `« ${data.temoignage} »`;
    document.getElementById('testimonialName').textContent = data.auteur;
    document.getElementById('testimonialRole').textContent = data.role;

    // AR Links
    document.getElementById('btnSnap').href = buildSnapLink(annee);
    document.getElementById('btnInsta').href = buildInstaLink(annee);

    // Mise à jour URL sans rechargement
    const url = new URL(window.location);
    url.searchParams.set('annee', annee);
    window.history.replaceState({}, '', url);

    // Timeline active
    document.querySelectorAll('.timeline-dot').forEach(dot => {
      dot.classList.toggle('active', parseInt(dot.dataset.annee) === annee);
    });
  }

  if (animate && panel) {
    panel.classList.add('transitioning');
    panel.classList.remove('entering');
    setTimeout(() => {
      applyContent();
      panel.classList.remove('transitioning');
      panel.classList.add('entering');
    }, 220);
  } else {
    applyContent();
  }
}

/* ══════════════════════════════════════════
   TIMELINE
   ══════════════════════════════════════════ */
const ANNEES_TIMELINE = [
  1926, 1930, 1935, 1939, 1946, 1950, 1955, 1960,
  1965, 1968, 1970, 1975, 1977, 1980, 1985, 1989,
  1990, 1995, 2000, 2005, 2010, 2015, 2018, 2020,
  2022, 2024, 2026
];

function buildTimeline() {
  const track = document.getElementById('timelineTrack');
  track.innerHTML = '';

  ANNEES_TIMELINE.forEach(annee => {
    const dot = document.createElement('button');
    dot.className = 'timeline-dot' + (annee === anneeActive ? ' active' : '');
    dot.dataset.annee = annee;
    dot.setAttribute('aria-label', `Porte ${annee}`);
    dot.innerHTML = `
      <span class="dot-year">${annee}</span>
      <span class="dot-num">N°${numPorte(annee)}</span>
    `;
    dot.addEventListener('click', () => {
      renderAnnee(annee);
      dot.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    });
    track.appendChild(dot);
  });
}

/* ══════════════════════════════════════════
   PARTAGE
   ══════════════════════════════════════════ */
document.getElementById('btnShare').addEventListener('click', async () => {
  const url = window.location.href;
  const data = getDonneesPourAnnee(anneeActive);
  const shareData = {
    title: `Porte ${anneeActive} — ${data.titre}`,
    text: `Découvre la porte n°${numPorte(anneeActive)} du parcours 100 Portes à Amiens ! ${data.temoignage.substring(0, 80)}…`,
    url
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(url);
      showToast('Lien copié !');
    }
  } catch {
    try {
      await navigator.clipboard.writeText(url);
      showToast('Lien copié !');
    } catch {
      showToast('Copiez le lien dans la barre d\'adresse');
    }
  }
});

/* ══════════════════════════════════════════
   SPLASH — ANIMATION D'OUVERTURE
   ══════════════════════════════════════════ */
function launchApp(annee) {
  renderAnnee(annee, false);
  buildTimeline();

  const splash = document.getElementById('splash');
  const app = document.getElementById('app');
  const doorOpen = document.querySelector('.door-open');

  // Phase 1 : ouvre les battants
  doorOpen.classList.add('opening');

  setTimeout(() => {
    // Phase 2 : fade out du splash
    splash.classList.add('fade-out');
    app.classList.remove('hidden');

    setTimeout(() => {
      splash.remove();
    }, 700);
  }, 1400);
}

/* ══════════════════════════════════════════
   DÉMARRAGE
   ══════════════════════════════════════════ */
(function init() {
  const anneeParam = parseInt(getParamURL('annee'), 10);
  const anneeInitiale =
    anneeParam >= PREMIERE_ANNEE && anneeParam <= DERNIERE_ANNEE
      ? anneeParam
      : PREMIERE_ANNEE;

  // Délai minimal pour voir l'animation du splash
  setTimeout(() => launchApp(anneeInitiale), 400);
})();
