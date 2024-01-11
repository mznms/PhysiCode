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

export function NavigatioBar() {
  const menuItems = ["ホーム", "フリーモード", "チャレンジモード"];

  return (
    <Navbar>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <p className="font-bold">PhisiCode</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <p className="font-bold">PhisiCode</p>
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="#">
            ホーム
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            フリーモード
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            チャレンジモード
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end" />
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" color="foreground" href="#" size="lg">
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
