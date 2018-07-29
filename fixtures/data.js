export const WORKSTART = 'workstart';
export const MOTIVATION = 'motivation';
export const PREPARATION = 'preparation';
export const METHOD = 'method';
export const REALISATION = 'realisation';
export const ENDURANCE = 'endurance';
export const CONSCIOUSNESS = 'conscience';
export const PERFORMANCE = 'performance';

export const MATHS = 'mathematiques';
export const FRANCAIS = 'français';
export const HISTOIRE = 'histoire';
export const GEOGRAPHIE = 'geographie';
export const ANGLAIS = 'anglais';
export const GREC = 'grec';

const DATA = {
  [WORKSTART] : {
    label: "Mise au travail",
    scale : {
      1 : "Je bloque totalement. C'est trop violent 😭!😭  On me torture !😫😫😫😫😫😫",
      2 : "😩 Je résiste beaucoup au début. Je suis submergée 🤯 par la colère et l'émotion. J'y peux rien. 😩",
      3 : "Au début, j'appréhende 😣. Puis ça passe.",
      4 : "Je ne résiste pas, mais il me faut une contrainte (🍕) extérieure pour me lancer 😌",
      5 : "Je me mets au travail... si quelqu'un me le rappelle",
      6 : "Hein, j'ai passé du temps sur Youtube ? Mais c'est trop mignoooon ! ",
      7 : "Je m'y mets seule... lorsque je m'aperçois que la limite approche",
      8 : "J'ai planifié mon travail, et je parviens à peu près à m'y tenir",
      9 : "J'ai planifié mon travail, et m'y tiens régulièrement",
      10 : "J'ai planifié mon travail, et m'y tiens entièrement",
      11 : "J'étudie avec entrain et plaisir. Ce n'est plus du travail, mais dans la continuité de ce que j'aime faire"
    },
    thresholds : [3, 6, 8]
  },
  [REALISATION] : {
    label: "Réalisation",
    scale : {
      1 : "Soyons clair : je n'ai rien fait.",
      2 : "Bon. Au moins, j'ai commencé un truc...",
      3 : "Disons que j'ai réalisé le tiers du travail que je devais accomplir",
      4 : "J'ai réalisé la moitié du travail que je devais accomplir. C'est toujours ça.",
      5 : "J'ai réalisé les 2/3 du travail je devais accomplir. Yes ! Je suis sur la bonne pente !",
      6 : "J'ai presque fini mais me suis arrêté juste avant la fin. La flemme, peut-être... On va pas en faire un plat",
      7 : "J'ai tout terminé. C'est pas que je suis trop forte, c'est juste que c'est trop facile...",
      8 : "les doigts dans le nez",
      9 : " je viens de travailler sans m'en rendre compte 😀",
      10 : "au secours, je m'ennuie, je n'ai plus de travail à faire."
    },
    thresholds : [4, 6, 8]
  },
  [METHOD] : {
    label : "Méthode",
    scale : {
      1 : "La... ? méthode ? C'est quoi ???",
      2 : "C'est ça la méthode ? Bof. Je préfère foncer direct, c'est mieux !",
      3 : "D'accord, la méthode, c'est bien, mais seulement quand je bloque. Sinon, c'est trop genre une perte de temps.",
      4 : "Mouais... C'est peut-être utile. Faut voir...",
      5 : "Mince, c'est vrai que c'est plus simple avec un peu de méthode !",
      6 : "T'as pas de méthode ?? Non mais allô quoi !",
      7 : "J'ai préparé mon travail à l'avance, et ai appliqué la méthode que je connais",
      8 : "Je réajuste ma méthode en fonction de mes résultats, de mes contraintes et de mes besoins. Trop fort !",
    },
    thresholds : [4, 5, 7]
  },
  [ENDURANCE]  :{
    label: "Endurance / concentration",
    min : 0,
    max: 8,
    unit: 'heure(s)',
    thresholds: [1, 3, 4]
  },
  [CONSCIOUSNESS] : {
    label: "Conscience de soi",
    scale: {
      1 : "Les profs, c'est tous des NULS !",
      2 : "J'veux pas savoir !",
      3 : "J'y arriverai jamais !!",
      4 : "Ah, c'est pas complètement impossible, en fin de compte. Mais c'est chaud !",
      5 : "Plutôt que de me mettre martel en tête, au boulot. On verra bien.",
      6 : "J'ai conscience de mes limites",
      7 : "Ayé, je connais ma capacité de travail.",
      8 : "Mieux encore : je sais identifier mes différents états mentaux : panique, stress, énervée, concentrée.",
      9 : "Je respecte mes états mentaux tout en étant capable de me rediriger"
    },
    thresholds: [3, 5, 7]
  },
  [MATHS] : {
    label: "Mathématiques",
    scale : {
      1 : "Plus JAMAIS !",
      2 : "C'est simple : j'y pige rien.",
      3 : "Pourquoi, au juste ?",
      4 : "Ok, je crois que j'ai compris. Mais j'ai pas franchement envie de vérifier.",
      5 : "Pigé en théorie, mais dans la pratique, c'est pas encore au point. Trop de temps, trop d'erreurs...",
      6 : "Les exercices sont grosso modo corrects, grosso modo dans les temps.",
      7 : "Les exercices sont bons, dans les temps",
      8 : "Je suis en avance, tout le temps de me relire",
      9 : "Top !"
    },
    thresholds : [4, 6, 7]
  },
  [FRANCAIS] : {
    label: "Français",
    scale : {
      1 : "c tro dur",
      2 : "Plus d'une erreur d'orthographe pour 30 mots",
      3 : "Moins d'une erreur d'orthographe pour 30 mots",
      4 : "Moins d'une erreur d'orthographe pour 60 mots",
      5 : "Quasi aucune erreur. La rédaction, les styles, je suis au point",
      6 : "J'écris pour le plaisir",
      7 : "Je viens de terminer Les Rougons-Maquards. Une petite fiche critique s'impose."
    },
    thresholds : [3, 4, 5]
  },
  [HISTOIRE] : {
    label : "Histoire",
    scale: {
      1 : "Je connais trop bien la guerre de 78 !",
      2 : "Je connais à peu près les dates obligatoires. Faudrait pas m'en demander plus.",
      3 : "Je sais répéter quelques morceaux de mon cours d'histoire, si on me pose des questions précises.",
      4 : "Je connais mon cours d'histoire. J'arrive à tisser quelques liens entre les leçons, mais c'est encore limité.",
      5 : "Ok, je maîtrise à correctement mon cours d'histoire : j'arrive sans trop de fatigue à associer mes connaissances en boucle.",
      6 : "Non, je ne connais pas mon cours d'histoire. Je connais l'Histoire.",
      7 : "Où que mon regard se promène, j'y reconnais les traces de notre civilisation et les marques de notre passé. Diantre ! Quelles merveilles !",
      10 : "Mes cours sont lacunaires. Je vais les compléter."
    },
    thresholds : [3, 5, 6]
  },
  [ANGLAIS] : {
    label : "Anglais",
    scale : {
      1 : "Heu... quoi ?",
      2 : "Ich liebe dich ?",
      3 : "Mai telor is riche",
      4 : "My taylor is rich.",
      5 : "All right, I know the very basics of english : verbs, sentence construction, pronouns, and maybe a few hundred words",
      6 : "I may also know the main tenses : past, present, future. Even conditional, and every irregular verbs. I'm able to read and understand a simple text",
      7 : "I'm fluent enough to order pancakes in a restaurant.",
      8 : "I understand and sing my favorite songs",
      9 : "I really don't need to be evaluated any more. It's natural.",
      10 : "Look, I do think we should practice our english on a regular basis. Let's start right now !"
    }
  }
}

export default DATA;