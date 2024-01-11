import { Link } from "@nextui-org/link";
import { NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";

export function Menu() {
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
