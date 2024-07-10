export type ListType = {
  name: string;
  id: number;
  desc: string;
};

export const getDefaultListData: () => ListType[] = () => {
  return [
    {
      id: 1,
      name: "First Default",
      desc: "First list item",
    },
    {
      id: 2,
      name: "Second Default",
      desc: "Second list item",
    },
    {
      id: 3,
      name: "Third Default",
      desc: "Third list item",
    },
  ];
};
