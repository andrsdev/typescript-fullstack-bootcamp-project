import { ReactNode, useMemo } from "react"
import { useCounter } from "../contexts/counterContext";

type ButtonProps = {
    children: ReactNode;
    variant?: 'primary' | 'secondary';
}
// { children, variant = 'primary' }: ButtonProps
export function Button1({ children, variant = 'primary' }: ButtonProps) {
    // const text = useRef('');
    // const buttonRef = useRef<HTMLButtonElement>(null);
    // const [counter, setCounter] = useState(0)

    const { counter, handleClick } = useCounter();

    // const query = useQuery({
    //     queryKey: ['products'],
    //     queryFn: () => fetch('https://localhost:5001/api/products')
    //         .then((result) => result.json())
    // })

    // console.log(query);

    const className = useMemo(() => {
        console.log('useMemo');
        if (variant === 'primary') {
            return 'px-4 py-2 rounded-md bg-red-600 text-white';
        } else {
            return 'px-4 py-2 rounded-md bg-gray-600 text-white';
        }
    }, [variant]);

    // const handleClick = useCallback(() => {
    //     console.log('useCallback');
    //     setCounter((prev) => prev + 1)
    //     // text.current=`Test ${Math.random()}`

    // },[setCounter]);

    return <button className={className} onClick={handleClick}>
        {children} {counter}
    </button>
}

