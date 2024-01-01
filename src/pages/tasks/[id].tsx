import { getTaskById } from "../../lib/api";
import type { InferGetServerSidePropsType } from 'next'
import { createVariant } from "../../lib/taskSetup";

export default function Task({ task, variant }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    
    return (
        <div>
            <h2>{task.title}</h2>
            <p>{variant[0]} = {variant[1]}</p>
        </div>
    )
}

export async function getServerSideProps(context: any) {
    const { id } = context.query;

    const task = await getTaskById(id);
    const variant = createVariant(task);
    return {
        props: {
            task,
            variant
        }
    }
}