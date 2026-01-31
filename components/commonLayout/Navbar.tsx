"use client";

import { Menu, X, LogOut } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useIsMobile } from "@/hooks/use-mobile";
import { PlaceholderLogo } from "@/components/ui/placeholder-logo";
import Link from "next/link";
import { userService } from "@/services/user.client";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null); // null if not logged in
  const navigationContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  useClickOutside(navigationContainerRef, () => {
    if (isMobile && isMenuOpen) setIsMenuOpen(false);
  });

  // Fetch session on mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const { data } = await userService.getSession(); // use your service
        setSession(data);
      } catch (err) {
        setSession(null);
      }
    };
    fetchSession();
  }, []);

  const handleLogout = async () => {
    const { success } = await userService.logout();
    if (success) {
      setSession(null);
      router.push("/login");
    }
  };

  return (
    <div
      className="w-full bg-background py-3.5 transition-all ease-in-out"
      role="navigation"
      aria-label="Website top navigation"
      ref={navigationContainerRef}
    >
      <div className="relative container mx-auto flex flex-col justify-between gap-x-5 px-5 md:flex-row lg:gap-x-9 lg:px-8">
        {/* Logo & Mobile Menu Button */}
        <div className="flex items-center justify-between">
          <Link href="/" aria-label="Go to home page">
            <PlaceholderLogo />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 justify-between gap-4 md:flex md:items-center">
          <nav className="mx-auto flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <ActionButtons
            session={session}
            handleLogout={handleLogout}
            router={router}
          />
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out md:hidden",
            isMenuOpen
              ? "grid-rows-[1fr] pt-5 opacity-100"
              : "pointer-events-none grid-rows-[0fr] opacity-0",
          )}
        >
          <div
            className={cn(isMenuOpen ? "overflow-visible" : "overflow-hidden")}
            inert={!isMenuOpen || undefined}
            aria-hidden={!isMenuOpen}
          >
            <div className="flex flex-col gap-9">
              <nav className="flex flex-col gap-2">
                {NAV_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-md px-2 py-3.5 text-base font-medium transition-colors hover:bg-accent/50 hover:text-accent-foreground"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <ActionButtons
                session={session}
                handleLogout={handleLogout}
                router={router}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionButtons({ session, handleLogout, router }: any) {

  
  if (!session) {
    return (
      <div className="flex flex-col gap-2 md:flex-row">
        <Button variant="outline" onClick={() => router.push("/login")}>
          Login
        </Button>
        <Button variant="outline" onClick={() => router.push("/register")}>
          Register
        </Button>
      </div>
    );
  }

  let dashboardLink = "/dashboard";
  if (session.user.role === "TUTOR") dashboardLink = "/tutor-dashboard";
  if (session.user.role === "ADMIN") dashboardLink = "/admin-dashboard";

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline">{session.user.name}</Button>
      <Button variant="outline" onClick={() => router.push(dashboardLink)}>
        Dashboard
      </Button>
      {session.user.role === "STUDENT" && (
        <Button variant="outline" onClick={() => router.push("/become-tutor")}>
          Become Tutor
        </Button>
      )}
      <Button variant="ghost" onClick={handleLogout} title="Logout">
        <LogOut />
      </Button>
    </div>
  );
}

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Tutors", href: "/tutors" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact", href: "/contact" },
];
