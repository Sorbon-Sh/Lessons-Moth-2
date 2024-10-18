import { useState } from "react";
import { url } from "./Todo";

export default function useEditTasks(){
    const [updateTask, setUpdateTask] = useState<null>(null)

    const editTask = async (id: string, refetch:() =>void, data: string) =>{
        await fetch(`${url}/${id}`, {method: "PATCH", body: data})
        .then((response) => response.json())
        .then((data) => setUpdateTask(data))
        .catch((error) => console.log(error))
        .finally(()=> console.log('task updated!'))
    
        refetch()
    }


    return {editTask}
}