import { Link } from "@nextui-org/link";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from "@nextui-org/navbar";
import React from "react";
import { RunningManIcon } from "../Icon/RunningManIcon";

export function NavigatioBar() {
  return (
    <Navbar>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <RunningManIcon size={40} />
          <p className="font-bold">PhisiCode</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <RunningManIcon size={40} />
          <p className="font-bold">PhisiCode</p>
        </NavbarBrand>
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
      </NavbarContent>

      <NavbarContent justify="end" />
      <NavbarMenu>
        <NavbarMenuItem>
          <Link className="w-full" color="foreground" href="/" size="lg">
            ホーム
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="w-full"
            color="foreground"
            href="/free-play"
            size="lg"
          >
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
    </Navbar>
  );
}
