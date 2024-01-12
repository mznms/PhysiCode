import { Navbar, NavbarContent, NavbarMenuToggle } from "@nextui-org/navbar";
import { NavbarItem } from "@nextui-org/react";
import { PlusIcon } from "../Icon/PlusIcon";
import { Brand } from "./Brand/Brand";
import { Menu } from "./Menu/Menu";
import { NavLinks } from "./NavLinks/NavLinks";

export function NavigatioBar() {
  return (
    <Navbar>
      <NavbarContent className="sm:hidden" justify="center">
        <Brand />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Brand />
        <NavLinks />
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="sm:hidden">
          <NavbarMenuToggle />
        </NavbarItem>
        {/* TODO: このアイコンを押してカメラを起動するようにする */}
        <NavbarItem>
          <PlusIcon />
        </NavbarItem>
      </NavbarContent>

      <Menu />
    </Navbar>
  );
}
