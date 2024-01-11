import { NavbarBrand } from "@nextui-org/navbar";
import { RunningManIcon } from "../../Icon/RunningManIcon";

export function Brand() {
  return (
    <NavbarBrand>
      <RunningManIcon size={40} />
      <p className="font-bold">PhysiCode</p>
    </NavbarBrand>
  );
}
