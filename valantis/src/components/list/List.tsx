import { ReactNode } from "react"

interface ListProps<T> {
    data: T[],
    renderItem: (item: T) => ReactNode
}

export default function List<T>({data, renderItem}: ListProps<T>) {
    return (
        <ul>
            {data.map(renderItem)}
        </ul>
    )
}