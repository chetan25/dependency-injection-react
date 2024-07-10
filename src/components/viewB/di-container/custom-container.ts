import { getCustomListData } from "../hooks/getListData";
import { DIType } from "../../viewA/di-container/AppDependencyContext";
import { DEFAULT_DI_CONTAINER } from "../../viewA/di-container/default-container";

export const CUSTOM_DI_CONTAINER: DIType = {
  registry: {
    // this makes sure we get all the default functionality and override or add new ones
    ...DEFAULT_DI_CONTAINER.registry,
    getListData: getCustomListData,
  },
  resolve() {
    return this.registry;
  },
};
