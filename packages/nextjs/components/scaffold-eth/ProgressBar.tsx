"use client";

import { useEffect } from "react";
import { useNav } from "@/context/nav-context";
import NProgress from "nprogress";

type PushStateInput = [data: any, unused: string, url?: string | URL | null | undefined];

export function ProgressBar() {
  const height = "4px";
  const color = "#b122dd";

  const { open, setOpen } = useNav();

  const styles = (
    <style>
      {`
        #nprogress {
          pointer-events: none;
        }
        #nprogress .bar {
          background: ${color};
		  border-radius: 10px;
          position: fixed;
          z-index: 99999;
          top: 0;
          left: 0;
          width: 100%;
          height: ${typeof height === `string` ? height : `${height}px`};
        }
        /* Fancy blur effect */
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: 0 0 10px ${color}, 0 0 5px ${color};
          opacity: 1.0;
          -webkit-transform: rotate(3deg) translate(0px, -4px);
              -ms-transform: rotate(3deg) translate(0px, -4px);
                  transform: rotate(3deg) translate(0px, -4px);
        }
    `}
    </style>
  );

  useEffect(() => {
    NProgress.configure({ showSpinner: false });

    const handleAnchorClick = (event: MouseEvent) => {
      const anchor = event.currentTarget as HTMLAnchorElement;
      const targetUrl = anchor.href;
      const currentUrl = location.href;
      const isTargetBlank = anchor?.target === "_blank";
      if (targetUrl === currentUrl || isTargetBlank) return;
      NProgress.start();
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll("a");
      anchorElements.forEach(anchor => anchor.addEventListener("click", handleAnchorClick));
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        NProgress.done();
        setOpen(false);
        return target.apply(thisArg, argArray);
      },
    });
  });

  return styles;
}
