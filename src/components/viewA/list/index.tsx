import { useDIContainer } from "../di-container/AppDependencyContext";

const Lists = () => {
  const { getListData, useLogger } = useDIContainer();
  useLogger();
  const data = getListData();

  return (
    <ul>
      {data.map((item) => {
        return (
          <li key={item.id}>
            {item.name} --- {item.desc}
          </li>
        );
      })}
    </ul>
  );
};

export default Lists;
