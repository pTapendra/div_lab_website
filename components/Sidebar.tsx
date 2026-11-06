"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/people", label: "People" },
  { href: "/publications", label: "Publications" },
  { href: "/reference-library", label: "Reference Library" },
  { href: "/projects", label: "Projects" },
  { href: "/artifacts", label: "Artifacts" },
  { href: "/positions", label: "Open Positions" },
  { href: "/contacts", label: "Contact Us" },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
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
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <>
      <div className="fixed left-0 top-0 z-[1100] flex h-14 w-full items-center justify-between border-b border-neutral-200 bg-white/95 px-4 backdrop-blur md:hidden">
        <span className="w-10" />
        <span className="text-lg font-extrabold tracking-wide">DIV</span>
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="lab-sidebar"
          className="flex h-10 w-10 items-center justify-center"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                d="M6 6l12 12M18 6l-12 12"
              />
            </svg>
          ) : (
            <span className="relative block h-4 w-5">
              <span className="absolute left-0 top-0 block h-[2px] w-5 bg-black" />
              <span className="absolute left-0 top-1/2 block h-[2px] w-5 -translate-y-1/2 bg-black" />
              <span className="absolute bottom-0 left-0 block h-[2px] w-5 bg-black" />
            </span>
          )}
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[1150] bg-black/40 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="lab-sidebar"
        className={[
          "fixed left-0 top-0 z-[1200] flex h-screen w-[220px] flex-col border-r border-neutral-200 bg-white px-2 py-2 transition-transform",
          "md:translate-x-0 md:w-[220px]",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
          "max-md:w-[70%] max-md:max-w-[300px]",
        ].join(" ")}
      >
        <div className="mb-6 flex items-center md:hidden">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2"
          >
            <Image
              src="/images/logo.png"
              alt="DivLab Logo"
              width={120}
              height={60}
              className="h-auto w-auto"
              priority
            />
          </Link>
        </div>

        <div className="mb-10 hidden text-center md:block">
          <Link href="/" onClick={() => setOpen(false)}>
            <Image
              src="/images/logo.png"
              alt="DivLab Logo"
              width={140}
              height={140}
              className="mx-auto h-auto w-auto mt-2"
              priority
            />
          </Link>
        </div>

        <nav className="flex-1">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "block rounded-md px-3 py-2 text-lg transition",
                    isActive(item.href)
                      ? "border-l-4 border-[#841617] bg-neutral-200 font-bold text-neutral-900"
                      : "text-neutral-700 hover:bg-neutral-100",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto border-t border-neutral-200 bg-white/90 p-2 text-xs text-neutral-600">
          <p>&copy; 2025 DIV Lab, OU</p>
          <p className="mt-1">
            Devon Energy Hall, 110 W. Boyd St., Norman, OK 73019
          </p>
        </div>
      </aside>
    </>
  );
}
