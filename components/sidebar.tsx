import Link from "next/link";

const navItems = [
  { href: "/", label: "Today" },
  { href: "/tasks", label: "Tasks" },
  { href: "/planner", label: "Planner" },
  { href: "/finances", label: "Finances" },
  { href: "/home", label: "Home" },
  { href: "/reviews", label: "Reviews" },
  { href: "/notes", label: "Notes" },
  { href: "/settings", label: "Settings" }
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        <p className="logo-title">Life OS</p>
        <p className="logo-subtitle">Control center</p>
      </div>
      <nav>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className="nav-link">
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
