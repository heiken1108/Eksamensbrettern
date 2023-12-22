import { useRouter } from "next/router";

export default function Task() {
    const router = useRouter();
    const { id } = router.query
    return (
        <div>
            <h1>Task: {id}</h1>
        </div>
    )
}