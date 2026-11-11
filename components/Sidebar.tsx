"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/people", label: "People", icon: "people" },
  { href: "/publications", label: "Publications", icon: "publications" },
  { href: "/reference-library", label: "Reference Library", icon: "library" },
  { href: "/projects", label: "Projects", icon: "projects" },
  { href: "/artifacts", label: "Artifacts", icon: "artifacts" },
  { href: "/positions", label: "Open Positions", icon: "positions" },
  { href: "/contacts", label: "Contact Us", icon: "contact" },
] as const;

type NavIconName = (typeof nav)[number]["icon"];

function NavIcon({ name }: { name: NavIconName }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[19px] w-[19px] shrink-0"
    >
      {name === "home" && (
        <>
          <path d="m3 10 9-7 9 7" />
          <path d="M5.5 9v12h13V9" />
          <path d="M9.5 21v-7h5v7" />
        </>
      )}
      {name === "people" && (
        <>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20v-2a6 6 0 0 1 12 0v2" />
          <path d="M17 5.5a3 3 0 0 1 0 5.8" />
          <path d="M18 14a5 5 0 0 1 3 4.6V20" />
        </>
      )}
      {name === "publications" && (
        <>
          <path d="M12 6.5C9.7 5 6.5 4.6 3 5.5v14c3.5-.9 6.7-.5 9 1" />
          <path d="M12 6.5c2.3-1.5 5.5-1.9 9-1v14c-3.5-.9-6.7-.5-9 1" />
          <path d="M12 6.5v14" />
        </>
      )}
      {name === "library" && (
        <>
          <path d="m12 2.5 9 5-9 5-9-5 9-5Z" />
          <path d="m3 12 9 5 9-5" />
          <path d="m3 16.5 9 5 9-5" />
        </>
      )}
      {name === "projects" && (
        <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4H10l2 2.5h6.5A2.5 2.5 0 0 1 21 9v9.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 18.5v-12Z" />
      )}
      {name === "artifacts" && (
        <>
          <path d="m12 2 9 5v10l-9 5-9-5V7l9-5Z" />
          <path d="m3 7 9 5 9-5" />
          <path d="M12 12v10" />
        </>
      )}
      {name === "positions" && (
        <>
          <rect x="3" y="7" width="18" height="14" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <path d="M3 13h18" />
        </>
      )}
      {name === "contact" && (
        <>
          <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
          <path d="m3.5 6 8.5 7 8.5-7" />
        </>
      )}
    </svg>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    if (open && window.innerWidth < 768) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed left-0 top-0 z-[1100] flex h-14 w-full items-center justify-between border-b border-white/10 bg-[#4b0b20] px-4 text-white md:hidden">
        <span className="w-10" />
        <span className="text-lg font-extrabold tracking-widest">DIV</span>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="lab-sidebar"
          className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          ) : (
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[1150] bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="lab-sidebar"
        aria-label="DIV Lab sidebar"
        className={[
          "isolate fixed left-0 top-0 z-[1200] flex h-screen w-[220px] flex-col overflow-x-hidden overflow-y-auto border-r border-white/10 px-2.5 py-4 text-white shadow-xl transition-transform duration-300 md:w-[220px] md:translate-x-0 md:shadow-none",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "max-md:w-[70%] max-md:max-w-[300px]",
        ].join(" ")}
        style={{
          background:
            "linear-gradient(160deg, #43091e 0%, #62132f 55%, #470c23 100%)",
        }}
      >
        {/* Subtle decorative burgundy waves */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[170px] w-full"
          viewBox="0 0 220 170"
          preserveAspectRatio="none"
        >
          <path d="M0 115C90 108 135 33 220 23V170H0Z" fill="#a03d61" opacity="0.38" />
          <path d="M0 149C87 132 156 85 220 91V170H0Z" fill="#74213f" opacity="0.56" />
        </svg>

        {/* Preserve the original logo colors; no inverted image background */}
        <div className="relative z-10 mb-4 flex flex-col items-center border-b border-white/15 pb-5 pt-2">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            aria-label="DIV Lab home"
            className="rounded-xl bg-white px-2 py-2 shadow-[0_4px_18px_rgba(0,0,0,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <Image
              src="/images/logo.png"
              alt="DIV Lab Logo"
              width={170}
              height={170}
              priority
              className="h-auto w-[162px]"
            />
          </Link>
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
            className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-md text-white/75 hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:hidden"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav aria-label="Main navigation" className="relative z-10 flex-1">
          <ul className="space-y-1.5">
            {nav.map((item) => {
              const active = isActive(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={[
                      "group relative flex min-h-[44px] items-center gap-2.5 rounded-xl px-3 py-2.5 text-[14px] leading-5 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc2b1]",
                      active
                        ? "bg-white/20 font-semibold text-white shadow-[0_3px_12px_rgba(27,0,12,0.14)]"
                        : "font-medium text-white/85 hover:translate-x-[2px] hover:bg-white/10 hover:text-white",
                    ].join(" ")}
                  >
                    {active && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-1.5 left-0 top-1.5 w-[3px] rounded-r-full bg-[#ff957e]"
                      />
                    )}
                    <NavIcon name={item.icon} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Preserve the original sidebar footer */}
        <div className="relative z-10 mt-8 border-t border-white/15 px-2 pt-4 text-[10px] leading-relaxed text-white/65">
          <p>&copy; 2025 DIV Lab, OU</p>
          <p className="mt-1">
            Devon Energy Hall, 110 W. Boyd St., Norman, OK 73019
          </p>
        </div>
      </aside>
    </>
  );
}
