import { ReactNode } from "react"
import { Grid } from '@mui/material';

interface ListProps<T> {
    data: T[],
    renderItem: (item: T) => ReactNode
}

export default function List<T>({data, renderItem}: ListProps<T>) {
    return (
        <Grid container spacing={6} >
            {data.map(renderItem)}
        </Grid>
    )
}