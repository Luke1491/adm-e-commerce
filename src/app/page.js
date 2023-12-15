import Header from "@/components/layout/Header";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import SectionHeaders from "@/components/layout/SectionHeaders";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <HomeMenu />
      <section className="text-center my-16 ">
        <SectionHeaders subHeader={"Our Story"} mainHeader={"About Us"} />
        <div className="text-gray-500 max-w-md mx-auto flex flex-col gap-4">
          <p>
            Welcome to our pizza shop! We pride ourselves on using the freshest
            ingredients for our pizzas.
          </p>
          <p>
            Try our signature Margherita pizza, topped with ripe tomatoes, fresh
            basil, and creamy mozzarella. Or if you're feeling adventurous, go
            for our spicy Pepperoni pizza.
          </p>
          <p>
            Don't forget to check out our sides too! Our garlic bread and
            chicken wings are the perfect complement to any pizza.
          </p>
        </div>
      </section>
      <section className="text-center my-8">
        <SectionHeaders
          subHeader={"Don't hesitate"}
          mainHeader={"Contact Us"}
        />
        <div className="mt-8">
          <a
            className="text-4xl underline text-gray-500"
            href="tel:+48 111 222 333"
          >
            +48 111 222 333
          </a>
        </div>
      </section>
      <footer className=" border-t text-center py-8 mt-16">
        <p className="text-gray-500">
          &copy; {new Date().getFullYear()} Pizza Place - all rights reserved
        </p>
      </footer>
    </>
  );
}
