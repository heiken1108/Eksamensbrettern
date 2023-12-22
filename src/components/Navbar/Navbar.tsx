import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter();
    return (
        <nav className="flex items-center justify-between flex-wrap p-6 bg-blue-800">
            <button className="flex items-center flex-shrink-0 text-white mr-6" onClick={() => {router.push(".")}}>
                Tilbake
            </button>
        </nav>
    ) 
}