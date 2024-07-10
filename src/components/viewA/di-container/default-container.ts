import { getDefaultListData } from "../hooks/getListData";
import { useLogger } from "../hooks/useLogger";
import { DIType } from "./AppDependencyContext";

export type Registry = {
  getListData: (
    ...args: Parameters<typeof getDefaultListData>
  ) => ReturnType<typeof getDefaultListData>;
  useLogger: (
    ...args: Parameters<typeof useLogger>
  ) => ReturnType<typeof useLogger>;
};

export const DEFAULT_DI_CONTAINER: DIType = {
  registry: {
    getListData: getDefaultListData,
    useLogger,
  },
  resolve() {
    return this.registry;
  },
};
