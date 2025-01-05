export const servers = [
  {
    id: "1",
    name: "Deidara",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://embed.su/embed/${type}/${id}${
        type == "tv" ? `/${ss || 1}/${ep || 1}` : ""
      }`,
  },
  {
    id: "2",
    name: "Hidan",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://vidbinge.dev/embed/${type}/${id}${
        type == "tv" ? `/${ss || 1}/${ep || 1}` : ""
      }`,
  },
  {
    id: "3",
    name: "Itachi",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://vidsrc.cc/v2/embed/${type}/${id}${
        type == "tv" ? `/${ss || 1}/${ep || 1}` : ""
      }`,
  },
  {
    id: "4",
    name: "Zetsu",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://vidsrc.in/embed/${type}?tmdb=${id}${
        type == "tv" ? `&season=${ss || 1}&episode=${ep || 1}` : ""
      }`,
  },
  {
    id: "5",
    name: "Kakuzu",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://vidlink.pro/${type}/${id}${
        type == "tv" ? `/${ss || 1}/${ep || 1}` : ""
      }`,
  },
  {
    id: "6",
    name: "Black Zetsu",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://www.2embed.stream/embed/${type}/${id}${
        type == "tv" ? `/${ss || 1}/${ep || 1}` : ""
      }`,
  },
  // {
  //   id: "7",
  //   name: "Konan",
  //   getter: (type: string, id: string, ss?: string, ep?: string) =>
  //     `https://vidsrc.top/embed/${type}/tmdb/${id}${
  //       type == "tv" ? `/${ss || 1}/${ep || 1}` : ""
  //     }`,
  // },
  {
    id: "8",
    name: "Pain",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://embed.rgshows.me/api/1/${type}/?id=${id}${
        type == "tv" ? `&s=${ss || 1}&e=${ep || 1}` : ""
      }`,
  },
  {
    id: "9",
    name: "Sasori",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://www.NontonGo.win/embed/${type}/${id}${
        type == "tv" ? `/${ss || 1}/${ep || 1}` : ""
      }`,
  },
  {
    id: "10",
    name: "Tobi",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://www.2embed.cc/embed/${type}/${id}${
        type == "tv" ? `/${ss || 1}/${ep || 1}` : ""
      }`,
  },
  {
    id: "11",
    name: "Kisame",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://2embed.cc/${type}/${id}${
        type == "tv" ? `/${ss || 1}/${ep || 1}` : ""
      }`,
  },
];
