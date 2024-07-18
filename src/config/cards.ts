import { InformatioCard, HelpCard, SpecialtieCard, Card } from "@/types";

export const informationCards: InformatioCard[] = [
  {
    title: "Абітурієнту",
    icon: "openBook",
    href: "*",
  },
  {
    title: "Атестація викладачів",
    icon: "suitCase",
    href: "*",
  },
  {
    title: "Акредитація",
    icon: "notebook",
    href: "*",
  },
  {
    title: "Анкетування",
    icon: "chart",
    href: "*",
  },
];

export const helpCards: HelpCard[] = [
  {
    title: "СТУДЕНТАМ",
    items: [
      {
        title: "Керівники навчальних груп",
        href: "*",
      },
      {
        title: "Розклад занять",
        href: "*",
      },
      {
        title: "Розклад дзвінків",
        href: "*",
      },
      {
        title: "Розклад консультацій",
        href: "*",
      },
      {
        title: "Кращі студенти",
        href: "*",
      },
      {
        title: "Студентська рада",
        href: "*",
      },
      {
        title: " Освітній процес ",
        href: "*",
      },
    ],
  },
  {
    title: "БАТЬКАМ",
    items: [
      {
        title: "Питання та відповіді",
        href: "*",
      },
      {
        title: "Групи",
        href: "*",
      },
      {
        title: "Рейтинг успішності груп ",
        href: "*",
      },
    ],
  },
  {
    title: "ВИКЛАДАЧАМ",
    items: [
      {
        title: "План роботи на місяць",
        href: "*",
      },
      {
        title: "Графік чергувань",
        href: "*",
      },
      {
        title: "Графік освітнього процесу",
        href: "*",
      },
      {
        title: "План виховної роботи",
        href: "*",
      },
    ],
  },
  {
    title: "ВИПУСКНИКАМ",
    items: [
      {
        title: "Звернення до випускників",
        href: "*",
      },
      {
        title: "Почесні випускники",
        href: "*",
      },
      {
        title: "Зустрічі випускників",
        href: "*",
      },
    ],
  },
];

export const aboutCollege: string[] = [
  "6 факультетів різних напрямів",
  "Наявність бюджетних місць",
  "Працевлаштування студентів і випускників",
  "Упор на практику і занурення в професію",
  "Старт навчання на будь-якому етапі",
];

export const specialties: SpecialtieCard[] = [
  {
    name: "Інженерія програмного забезпечення",
    href: "*",
    label: "Коледж / інформаційні технології",
  },
  {
    name: "Комп’ютерна інженерія",
    href: "*",
    label: "Коледж / інформаційні технології",
  },
  {
    name: "Право",
    href: "*",
    label: "Коледж / інформаційні технології",
  },
  {
    name: "Галузеве машинобудування",
    href: "*",
    label: "Коледж / інформаційні технології",
  },
  {
    name: "Електроніка",
    href: "*",
    label: "Коледж / інформаційні технології",
  },
  {
    name: "Автомобільний транспорт",
    href: "*",
    label: "Коледж / інформаційні технології",
  },
  {
    name: "Транспортні технології",
    href: "*",
    label: "Коледж / інформаційні технології",
  },
];

export const priorityCards: Card[] = [
  {
    title: "Пріоритет",
    description: "Вимоги найбільших компаній-роботодавців",
  },
  {
    title: "Актуальні знання",
    description: "Вимоги найбільших компаній-роботодавців",
  },
  {
    title: "Високий результат",
    description: "Випускники - нова професійна еліта",
  },
];

export const collegeInfoCards: Card[] = [
  {
    title: "1995",
    description: "рік заснування коледжу",
  },
  { title: "> 1000", description: "які навчаються в коледжі" },
  { title: "> 1000", description: "Задоволених студентів" },
  { title: "> 10000", description: "випускників" },
];
