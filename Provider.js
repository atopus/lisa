
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
    }
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
    }
  },
  [METHOD] : {
    label : "Méthode",
    scale : {
      1 : "La... ? méthode ? C'est quoi ???",
      2 : "C'est ça la méthode ? Bof. Je préfère foncer direct, c'est mieux !",
      3 : "D'accord, la méthode, c'est bien, mais seulement quand je bloque. Sinon, c'est trop genre une perte de temps",
      4 : "Mouais... peut-être que la méthode n'est pas une perte de temps. En l'utilisant tous les jours, c'est pourrait aller plus vite",
      5 : "Oui, c'est vrai que sans méthode, ça devient vite compliqué.",
      6 : "T'as pas de méthode ? Non mais allô quoi !",
      7 : "J'ai préparé mon travail à l'avance, et ai appliqué la méthode que je connais",
      8 : "Je réajuste ma méthode en fonction de mes résultats, de mes contraintes et de mes besoins",
    }
  },
  // [MOTIVATION] : {
  //   label : MOTIVATION,
  //   scale: {
  //     1 : "C'est nul, ça sert à rien !!",
  //     2 : ""
  //   }
  // },
  [ENDURANCE]  :{
    label: "Endurance / concentration",
    min : 0,
    max: 8,
    unit: 'heure(s)'
  },
  [CONSCIOUSNESS] : {
    label: "Conscience",
    scale: {
      1 : "J'invente des excuses",
      2 : "Je préfère ne pas voir, ne pas savoir.",
      5 : "Je ne me juge pas",
      6 : "J'ai conscience de mes limites",
      7 : "J'ai connais ma capacité de travail",
      8 : "Je sais identifier mes différents états mentaux",
      9 : "Je respecte mes états mentaux tout en étant capable de me rediriger"
    }
  },
  // [PREPARATION] : {
  //   label: PREPARATION
  // },
  [MATHS] : {
    label: "Mathématiques",
    scale : {
      1 : "Plus JAMAIS !",
      2 : "J'y pige rien",
      3 : "Pourquoi, au juste ?",
      4 : "Ok, je crois que j'ai compris",
      5 : "En fait, c'est pas encore au point",
      7 : "Les exercices sont à peu près corrects, à peu près dans les temps ",
      8 : "Les exercices sont bons, dans les temps",
      9 : "Je suis en avance, tout le temps de me relire",
      10 : "Top !"
    }
  },
  [FRANCAIS] : {
    label: "Français",
    scale : {
      1 : "c tro dur",
      3 : "Moins d'une erreur d'orthographe pour 30 mots",
      4 : "Moins d'une erreur d'orthographe pour 30 mots",
      5 : "Moins d'une erreur d'orthographe pour 30 mots",
      6 : "Moins d'une erreur d'orthographe pour 30 mots",
      7 : "Moins d'une erreur d'orthographe pour 60 mots",
      8 : "Quasi aucune erreur. La rédaction, les styles, je suis au point",
      9 : "J'écris pour le plaisir",
      10 : "Je viens de terminer Les Rougons-Maquards. Une petite fiche critique s'impose."
    }
  },
  [HISTOIRE] : {
    label : "Histoire",
    scale: {
      1 : "Je connais trop bien la guerre de 78 !",
      2 : "Je sais répéter mon cours d'histoire",
      3 : "Je connais mon cours d'histoire",
      4 : "Je connais l'Histoire",
      9 : "Où que mon regard se promène, j'y reconnais les traces de notre civilisation et les marques de notre passé. Diantre ! Quelles merveilles !",
      10 : "Mes cours sont lacunaires. Je vais les compléter."
    }
  },
  [ANGLAIS] : {
    label : "Anglais",
    scale : {
      1 : "Heu...",
      2 : "Ich liebe dich ?",
      3 : "Mai telor is riche",
      4 : "My taylor is rich",
      5 : "All right, I know the very basics of english : verbs, sentence construction, pronouns, and maybe a few hundred of words",
      6 : "I may also know the main tenses : past, present, future. Even conditional, and every irregular verbs. I'm able to read and undestand a simple text",
      7 : "I'm fluent enough to order pancakes in a restaurant.",
      8 : "I undestand and sing my favorite songs",
      9 : "I really don't need to be evaluated any more. It's natural.",
      10 : "Look, I do think we should practice our english on a regular basis. Let's start right now !"
    }
  }
}

export const getData = key => DATA[key];
export const getDimensions = () => Object.keys(DATA);