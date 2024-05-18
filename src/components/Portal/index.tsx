import { ReactPortal } from "react";
import { createPortal } from "react-dom";

type PortalProps = {
  children: React.ReactNode;
  containerId?: string;
};

export default function Portal({
  children,
  containerId = "portal-root",
}: PortalProps): ReactPortal {
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement("div");
    container.setAttribute("id", containerId);
    document.body.appendChild(container);
  }

  return createPortal(children, container);
}
