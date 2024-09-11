import React from "react";
import { Interests2PaneContext } from "./useInterests2Pane";

function Interests2PaneProvider({ children }) {
  const [paneRole, setPaneRole] = React.useState("list");

  return (
    <Interests2PaneContext.Provider value={{ paneRole, setPaneRole }}>
      {children}
    </Interests2PaneContext.Provider>
  );
}

export default Interests2PaneProvider;
