import { useEffect, useState } from "react"

export interface PopupProps {
    message: string
}

const defaultProps: PopupProps = {
    message: ""
}

export default function Popup(props: PopupProps = defaultProps) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        console.log("asdads")
    }, [props.message])

    return <div>
        {props.message}
    </div>
}