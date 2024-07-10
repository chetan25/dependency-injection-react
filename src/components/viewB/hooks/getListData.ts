export type ListType = {
  name: string;
  id: number;
  desc: string;
};

export const getCustomListData: () => ListType[] = () => {
  return [
    {
      id: 1,
      name: "First Custom",
      desc: "First list item",
    },
    {
      id: 2,
      name: "Second Custom",
      desc: "Second list item",
    },
  ];
};
