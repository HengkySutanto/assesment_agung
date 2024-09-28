import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Link href={`/products`} className="px-5 py-2 bg-slate-500 rounded text-white">go to Products Page</Link>
    </div>
  );
}
