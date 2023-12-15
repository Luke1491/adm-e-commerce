import Image from "next/legacy/image";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <>
      <section className="hero">
        <div className="py-12">
          <h1 className="text-4xl font-semibold">
            {" "}
            Everything
            <br />
            is better
            <br />
            with a <span className="text-primary">pizza</span>
          </h1>
          <p className="my-6 text-gray-500 text-sm">
            {" "}
            Pizza is the missing piece that makes every day complete, a simple
            yet delicious joy in life
          </p>
          <div className="flex gap-4 text-sm">
            <button className="bg-primary uppercase flex items-center text-white px-4 py-2 gap-2 rounded-full">
              <div>Order now</div>
              <Right />
            </button>
            <button className="flex gap-2 px-4 py-2 text-gray-600 font-semibold bg-gray-100 rounded-full">
              Learn more
              <Right />
            </button>
          </div>
        </div>

        <div className="relative">
          <Image
            src={"/pizza.png"}
            alt="pizza"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </section>
    </>
  );
}
