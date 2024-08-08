import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="p-4 my-2 rounded-md border-b leading-8">
        <div className="font-bold">This is title one</div>
        <div>
          We recommend starting a new Next.js app using create-next-app, which
          sets up everything automatically for you. To create a project, run:
        </div>

        <div className="flex gap-4 mt-4 justify-end">
          <Link
            className="bg-slate-200 px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest"
            href={"/edit"}
          >
            Edit
          </Link>

          <button className="bg-red-500  text-white px-4 py-2 rounded-md uppercase text-sm font-bold tracking-widest">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
