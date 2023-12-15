import Image from "next/image";
import { MenuItem } from "../menu/MenuItem.js";
import SectionHeaders from "./SectionHeaders.js";

export default function HomeMenu() {
  return (
    <>
      <section>
        <div className="absolute left-0 right-0 w-full justify-start">
          <div className=" absolute left-0 text-left -top-[70px] -z-10">
            <Image src={"/sallad1.png"} alt="salad1" width={109} height={189} />
          </div>
          <div className=" absolute -top-[100px] right-0 -z-10">
            <Image src={"/sallad2.png"} alt="salad2" width={107} height={195} />
          </div>
        </div>
        <SectionHeaders subHeader={"checkOut"} mainHeader={"Menu"} />
        <div className="grid grid-cols-3 gap-4">
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
          <MenuItem />
        </div>
      </section>
    </>
  );
}
