import { Link } from "@nextui-org/link";
import { NavbarItem } from "@nextui-org/navbar";

export function NavLinks() {
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
