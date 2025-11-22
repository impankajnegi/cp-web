import { FaSearchLocation, FaShoppingCart } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa6"; 
import { Items } from "./components/items";
import Image from "next/image";

export const dynamic = "force-dynamic"; // ⬅ prevents prerender errors
// OR: export const revalidate = 0;

type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  inStock: boolean;
};

export default async function Home() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product?page=1`,
      { cache: "no-store" } // ⬅ important to avoid static rendering
    );

    const products: Product[] = await res.json();

    return (
      <div className="flex flex-col gap-2">
        {/* Navbar */}
        <div className="flex flex-row flex-wrap h-20 bg-amber-400 rounded">
          {/* logo */}
          <Image
            className="w-1/10 p-2"
            src="https://static.vecteezy.com/system/resources/previews/019/136/319/non_2x/amazon-logo-amazon-icon-free-free-vector.jpg"
            alt="logo"
            width={60}
            height={60}
          />

          {/* title */}
          <div className="flex flex-row w-2/10">
            <div className="flex justify-center items-center">
              <div className="bg-red-200 flex flex-row gap-1 p-1 items-center hover:bg-emerald-100 rounded shadow-2xl">
                <FaSearchLocation />
                <p>Delhi</p>
                <FaArrowDown />
              </div>
            </div>
          </div>

          {/* navbar */}
          <nav className="flex w-6/10">
            <ul className="flex flex-row w-10/10 justify-end items-center gap-2 mr-5">
              <li className="bg-white p-1 pl-2 pr-2 rounded-2xl cursor-pointer hover:bg-amber-100">Electronic</li>
              <li className="bg-white p-1 pl-2 pr-2 rounded-2xl cursor-pointer hover:bg-amber-100">Furniture</li>
              <li className="bg-white p-1 pl-2 pr-2 rounded-2xl cursor-pointer hover:bg-amber-100">Photography</li>
              <li className="bg-white p-1 pl-2 pr-2 rounded-2xl cursor-pointer hover:bg-amber-100">Gaming</li>
              <li className="bg-white p-1 pl-2 pr-2 rounded-2xl cursor-pointer hover:bg-amber-100">Riding</li>
            </ul>
          </nav>

          {/* cart icon */}
          <div className="flex w-1/10 items-center justify-center">
            <FaShoppingCart className="text-white" />
          </div>
        </div>

        {/* banner */}
        <main className="flex justify-evenly h-60">
          <Image src="/images/banner-1.png" alt="banner-image" width={800} height={200} />
        </main>

        {/* item list */}
        <section className="flex flex-wrap justify-evenly pr-3 pl-3 pt-3">
          <Items products={products} />
        </section>

        <footer className="flex h-10 justify-center pt-2 bg-neutral-500">
          This is footer
        </footer>
      </div>
    );
  } catch (err) {
    return <div>Failed to load data</div>;
  }
}
