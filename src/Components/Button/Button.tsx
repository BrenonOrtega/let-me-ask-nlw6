import { useState } from "react";

type ButtonProps = {
    Text?: string;
    children: string;
}

function Button(props: ButtonProps) {
    const [countValue, setCounter] = useState(0);

    function Counter () {
        setCounter(countValue + 1);
        console.log(countValue);
    }

    return (
        <button onClick={ Counter }>
            { props.Text } + {props.children} + { countValue }
        </button>
    );
};  

export { Button };