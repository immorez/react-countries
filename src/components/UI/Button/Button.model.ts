import React from "react"
export interface ButtonProps {
    id?: string
    text?: string
    disabled?: boolean
    title?: string
    href?: string
    to?: string

    type?: "button" | "submit" | "reset" | undefined
    children: React.ReactNode
    className?: string
    onClick?: (e: React.SyntheticEvent) => void | void
    form?: string
}
