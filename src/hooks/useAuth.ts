import { useContext} from "react";
import { AuthConstext } from "../context/AuthContext";

export function useAuth(){
    const value = useContext(AuthConstext);

    return value
}