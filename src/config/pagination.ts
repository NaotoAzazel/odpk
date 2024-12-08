export const paginationConfig = {
  mainPage: {
    newsCardsAmount: 6,
  },
  newsPage: {
    newsPerPage: 6,
  },
  newsItemPage: {
    anotherNewsAmount: 3,
  },
  dashboard: {
    news: {
      rowsPerPage: 10,
    },
    pages: {
      rowsPerPage: 10,
    },
    users: {
      rowsPerPage: 10,
    },
    files: {
      rowsPerPage: 10,
    },
  },
} as const;
