import { Navbar, NavbarContent, NavbarMenuToggle } from "@nextui-org/navbar";
import {
  Link,
  NavbarBrand,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
} from "@nextui-org/react";
import { PhotoCameraIcon } from "../Icon/PhotoCamera";
import { PlusIcon } from "../Icon/PlusIcon";
import { RunningManIcon } from "../Icon/RunningManIcon";

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
          <PhotoCameraIcon />
        </NavbarItem>
      </NavbarContent>

      <Menu />
    </Navbar>
  );
}

function Brand() {
  return (
    <NavbarBrand>
      <RunningManIcon size={40} />
      <p className="font-bold">PhysiCode</p>
    </NavbarBrand>
  );
}

function Menu() {
  return (
    <NavbarMenu>
      <NavbarMenuItem>
        <Link className="w-full" color="foreground" href="/" size="lg">
          ホーム
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem>
        <Link className="w-full" color="foreground" href="/free-play" size="lg">
          フリーモード
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem>
        <Link
          className="w-full"
          color="foreground"
          href="/challenge-play"
          size="lg"
        >
          チャレンジモード
        </Link>
      </NavbarMenuItem>
    </NavbarMenu>
  );
}

function NavLinks() {
  return (
    <>
      <NavbarItem>
        <Link color="foreground" href="/">
          ホーム
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="/free-play">
          フリーモード
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link color="foreground" href="/challenge-play">
          チャレンジモード
        </Link>
      </NavbarItem>
    </>
  );
}
