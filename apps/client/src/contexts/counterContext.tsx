import { createContext, ReactNode, useContext, useState } from "react";

type CounterContextType = {
    counter: number;
    handleClick: () => void;
}
type CounterContextProviderProps = {
    children: ReactNode;
}


const CounterContext = createContext<CounterContextType>({
    counter: 0,
    handleClick: () => { },
});

export function CounterContextProvider({ children }: CounterContextProviderProps) {
    const [counter, setCounter] = useState(0)
    const handleClick = () => {
        setCounter((prev) => prev + 1)
    };

    return (<CounterContext.Provider value={{ counter, handleClick }}>
        {children}
    </CounterContext.Provider>)
};

export const useCounter = () => useContext(CounterContext);