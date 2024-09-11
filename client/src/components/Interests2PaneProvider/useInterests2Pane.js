import { createContext, useContext } from "react";

export const Interests2PaneContext = createContext();

export default function useInterests2Pane() {
  return useContext(Interests2PaneContext);
}
