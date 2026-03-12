"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Today", icon: "◉" },
  { href: "/tasks", label: "Tasks", icon: "✓" },
  { href: "/planner", label: "Planner", icon: "◷" },
  { href: "/finances", label: "Finances", icon: "€" },
  { href: "/home", label: "Home", icon: "⌂" },
  { href: "/reviews", label: "Reviews", icon: "↺" },
  { href: "/notes", label: "Notes", icon: "✎" },
  { href: "/settings", label: "Settings", icon: "⚙" }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="logo">
        <p className="logo-title">Life OS</p>
        <p className="logo-subtitle">Private command center</p>
      </div>

      <nav className="nav-list" aria-label="Navigation principale">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${isActive ? "active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <span className="nav-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer card-soft">
        <p className="mini-label">Focus du jour</p>
        <p className="mini-value">1 grand objectif + 3 actions clés</p>
      </div>
    </aside>
  );
}
