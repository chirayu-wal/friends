export const servers = [
  {
    id: "1",
    name: "ITACHI",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://embed.su/embed/${type}/${id}${
        type == "tv" ? `/${ss || 1}/${ep || 1}` : ""
      }`,
  },
  {
    id: "2",
    name: "SASORI",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://vidbinge.dev/embed/${type}/${id}${
        type == "tv" ? `/${ss || 1}/${ep || 1}` : ""
      }`,
  },
  {
    id: "3",
    name: "OBITO",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://vidsrc.cc/v2/embed/${type}/${id}${
        type == "tv" ? `/${ss || 1}/${ep || 1}` : ""
      }`,
  },
  {
    id: "4",
    name: "PAIN",
    getter: (type: string, id: string, ss?: string, ep?: string) =>
      `https://vidsrc.in/embed/${type}?tmdb=${id}${
        type == "tv" ? `&season=${ss || 1}&episode=${ep || 1}` : ""
      }`,
  },
];
