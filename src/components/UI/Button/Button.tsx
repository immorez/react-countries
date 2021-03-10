import React from "react"
import Link from "next/link"
import { ButtonProps } from "./Button.model"

const Button: React.FC<ButtonProps> = (props) => {
    const { href, to, children, className, disabled, form, onClick, title, type } = props
    // Set href property on a Button to make it a link.
    if (href) {
        return (
            <a key={title} href={href}>
                {
                    // TODO: Add some dynamic styles (boolean types).}
                }
                <button type={type} className={className}>
                    {children}
                </button>
            </a>
        )
    }
    // Set 'to' property on a Button to make it a React Router Link.
    if (to) {
        return (
            <Link key={title} href={to}>
                <button type={type} className={className}>
                    {children}
                </button>
            </Link>
        )
    }
    return (
        <button className={className} type={type} onClick={onClick} disabled={disabled} form={form}>
            {children}
        </button>
    )
}

export default Button
