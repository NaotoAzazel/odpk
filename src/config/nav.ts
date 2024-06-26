import { NavBarConfig } from "@/types";

// TODO: paste right href
export const navConfig: NavBarConfig = {
  mainNav: [
    {
      title: "Керівництво",
      items: [
        {
          title: "Директор",
          href: "director",
          description: "Інформація про директора коледжу"
        },
        {
          title: "Заступник директора",
          href: "*",
          description: "Інформація про заступника директора"
        },
        {
          title: "Механiка та транспорт",
          href: "*",
          description: "Інформація про відділення механіки та транспорту"
        },
        {
          title: "Комп’ютернi наук та електроніка",
          href: "*",
          description: "Інформація про відділення комп'ютерних наук та електроніки"
        },
        {
          title: "Загальноосвітня підготовка",
          href: "*",
          description: "Інформація про відділення загальноосвітньої підготовки"
        }
      ]
    },
    {
      title: "Спеціальності",
      items: [
        {
          title: "121/ Інженерія програмного забезпечення",
          href: "*",
          description: "Програмування, розробка програмного забезпечення та інші аспекти інформатики."
        },
        {
          title: "123/ Комп’ютерна інженерія",
          href: "*",
          description: "Проектування, розробка та тестування апаратного забезпечення комп'ютерів."
        },
        {
          title: "081/ Право",
          href: "*",
          description: "Вивчення законів, правових норм та процесів для захисту прав і свобод людини."
        },
        {
          title: "133/ Галузеве машинобудування",
          href: "*",
          description: "Розробка, виробництво та обслуговування машин і обладнання для різних галузей."
        },
        {
          title: "171/ Електроніка",
          href: "*",
          description: "Проектування та виробництво електронних пристроїв та систем."
        },
        {
          title: "274/ Автомобільний транспорт",
          href: "*",
          description: "Розробка, виробництво та обслуговування автомобілів та автотранспортних засобів."
        },
        {
          title: "275/ Транспортні технології",
          href: "*",
          description: "Вивчення технологій транспортування товарів та пасажирів."
        },
      ]
    },
    {
      title: "Абітурієнту",
      items: [
        {
          title: "Правила прийому 2024",
          href: "*",
          description: "Інформація про правила прийому в 2024 році"
        },
        {
          title: "Обсяг прийому та розмір плати за навчання",
          href: "*",
          description: "Інформація про обсяг прийому та розмір плати за навчання"
        },
        {
          title: "Положення про приймальну комісію",
          href: "*",
          description: "Положення про приймальну комісію"
        },
        {
          title: "Положення про співбесіду",
          href: "*",
          description: "Положення про співбесіду"
        },
        {
          title: "Положення про мотиваційний лист",
          href: "*",
          description: "Положення про мотиваційний лист"
        },
        {
          title: "Підготовчі курси",
          href: "*",
          description: "Інформація про підготовчі курси"
        },
        {
          title: "Програми співбесід",
          href: "*",
          description: "Програми співбесід"
        },
        {
          title: "Розклад співбесід і списки груп для вступників",
          href: "*",
          description: "Розклад співбесід і списки груп для вступників"
        },
        {
          title: "Накази приймальної комісії",
          href: "*",
          description: "Накази приймальної комісії"
        },
        {
          title: "Рейтингові списки",
          href: "*",
          description: "Рейтингові списки"
        },
      ]
    },
    {
      title: "Документи",
      items: [
        {
          title: "Документи",
          href: "*",
          description: "Інформація про документи"
        },
        {
          title: "Фінансова звітність",
          href: "*",
          description: "Фінансова звітність"
        },
        {
          title: "Проєкти (громадське обговорення)",
          href: "*",
          description: "Проєкти (громадське обговорення)"
        },
        {
          title: "ОСВІТНЬО-ПРОФЕСІЙНА ПРОГРАМА підготовки фахового молодшого бакалавра",
          href: "*",
          description: "Освітньо-професійна програма підготовки фахового молодшого бакалавра"
        },
        {
          title: "ОСВІТНІ ПРОГРАМИ ПРОФІЛЬНОЇ СЕРЕДНЬОЇ ОСВІТИ",
          href: "*",
          description: "Освітні програми профільної середньої освіти"
        },
        {
          title: "Вибіркові освітні компоненти",
          href: "*",
          description: "Вибіркові освітні компоненти"
        },
        {
          title: "Навчальні плани",
          href: "*",
          description: "Навчальні плани"
        },
      ]
    },
    {
      title: "Музей",
      items: [
        {
          title: "Історія",
          href: "*",
          description: "Історія коледжу"
        },
        {
          title: "Директори",
          href: "*",
          description: "Інформація про директорів коледжу"
        },
        {
          title: "Викладачi різних років",
          href: "*",
          description: "Інформація про викладачів різних років"
        },
        {
          title: "Почесні випускники",
          href: "*",
          description: "Інформація про почесних випускників"
        },
        {
          title: "Преса про навчальний заклад",
          href: "*",
          description: "Преса про навчальний заклад"
        },
        {
          title: "60-річчя коледжу",
          href: "*",
          description: "Інформація про 60-річчя коледжу"
        },
        {
          title: "65 річниця коледжу",
          href: "*",
          description: "Інформація про 65-річницю коледжу"
        },
      ]
    },
  ],
  dashboardNav: [
    {
      title: "Новини",
      href: "/dashboard/news",
      icon: "file"
    }
  ]
};