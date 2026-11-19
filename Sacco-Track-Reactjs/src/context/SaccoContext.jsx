
import { createContext, useContext, useEffect, useState } from "react";


const SaccoContext  = createContext();
 
export default function SaccoProvider({ children }) {
    const [saccos, setSaccos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3000/sacco")
        .then((response) => response.json())
        .then((data) => {
            if(data.length > 0) {
                setSaccos(data);
            }
        })
        .catch((error) => console.log(error));
    }, [])

    return (
        <SaccoContext.Provider value={{saccos, setSaccos}}>
            {children}
        </SaccoContext.Provider>
    );
}

    export function useSacco() {
        return useContext(SaccoContext);
    }
