import { Navbar, NavbarContent, NavbarMenuToggle } from "@nextui-org/navbar";
import {
  Link,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { RunningManIcon } from "../Icon/RunningManIcon";
import { PhotoCameraButton } from "./PhotoCameraButton";

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
        <NavbarItem className="sm:hidden h-full">
          <NavbarMenuToggle />
        </NavbarItem>
        <NavbarItem>
          <PhotoCameraButton />
        </NavbarItem>
      </NavbarContent>

      <Menu />
    </Navbar>
  );
}

function Brand() {
  return (
    <NavbarBrand>
      <Link color="foreground" href="/">
        <RunningManIcon size={40} />
        <p className="font-bold">PhysiCode</p>
      </Link>
    </NavbarBrand>
  );
}

function Menu() {
  return (
    <NavbarMenu>
      <NavbarMenuItem>
        <Link className="w-full" color="foreground" href="/challenge" size="lg">
          チャレンジ
        </Link>
      </NavbarMenuItem>
    </NavbarMenu>
  );
}

function NavLinks() {
  return (
    <>
      <NavbarItem>
        <Link color="foreground" href="/challenge">
          チャレンジ
        </Link>
      </NavbarItem>
    </>
  );
}
