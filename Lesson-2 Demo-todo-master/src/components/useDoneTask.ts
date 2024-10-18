import { useState } from "react";
import { url } from "./Todo";

export default function useDoneTask(){
    const [doneTask, setDoneTask] = useState<null>(null)

    const taskDone = async (id: string, refetch:() =>void, data: string) =>{
        await fetch(`${url}/${id}`, {method: "PATCH", body: data})
        .then((response) => response.json())
        .then((data) => setDoneTask(data))
        .catch((error) => console.log(error))
        .finally(()=> console.log('task is done!'))
    
        refetch()
    }


    return {taskDone}
}