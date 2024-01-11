import { Navbar, NavbarContent, NavbarMenuToggle } from "@nextui-org/navbar";
import React from "react";
import { Brand } from "./Brand/Brand";
import { Menu } from "./Menu/Menu";
import { NavLinks } from "./NavLinks/NavLinks";

export function NavigatioBar() {
  return (
    <Navbar>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <Brand />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Brand />
        <NavLinks />
      </NavbarContent>

      <NavbarContent justify="end" />

      <Menu />
    </Navbar>
  );
}
