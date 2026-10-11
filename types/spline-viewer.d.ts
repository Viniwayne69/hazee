import type { DetailedHTMLProps, HTMLAttributes } from "react";

/** Web component do Spline (carregado via script externo em RoboSpline). */
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        url?: string;
      };
    }
  }
}
