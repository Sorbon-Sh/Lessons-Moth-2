import { useState } from "react";
import  {url} from "./Todo";



export default function useDeleteTask(){
const [userDelete, setUserDelete] = useState<null>(null)


const deleteTask = async (id: string, refetch: ()=> void) =>{
 await fetch(`${url}/${id}`, {method: "DELETE"})
 .then((response) => response.json())
 .then((data) => setUserDelete(data))
 .catch((error) => console.log(error))
 .finally(()=> console.log('user deleted!'))

 console.log("delete")

 refetch()
}

return {deleteTask}

}