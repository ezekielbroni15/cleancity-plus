"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, Nav, Navbar as BsNavbar } from "react-bootstrap";
import { BarChart3, Home, Layers3, Leaf, MessageSquareHeart } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/waste-categories", label: "Waste Categories", icon: Layers3 },
  { href: "/recycling-tracker", label: "Recycling Tracker", icon: BarChart3 },
  { href: "/pledge", label: "Pledge", icon: MessageSquareHeart }
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <BsNavbar expand="lg" sticky="top" className="app-navbar">
      <Container fluid="xxl">
        <Link href="/" className="brand-lockup">
          <span className="brand-mark">
            <Leaf aria-hidden="true" size={19} />
          </span>
          <span>CleanCity+</span>
        </Link>
        <BsNavbar.Toggle aria-controls="main-navigation" />
        <BsNavbar.Collapse id="main-navigation">
          <Nav className="ms-auto nav-links">
            {links.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className={`nav-link ${pathname === href ? "active" : ""}`}>
                <Icon aria-hidden="true" size={16} />
                {label}
              </Link>
            ))}
            <ThemeToggle />
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
