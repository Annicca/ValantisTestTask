import { ReactNode } from "react"
import { Grid, Pagination, Box, Typography} from '@mui/material';
import { ListLoading } from "./ListLoading";

interface ListProps<T> {
    data: T[] | null,
    loading: boolean,
    renderItem: (item: T) => ReactNode,
    page: number,
    handleChangePage: (event: React.ChangeEvent<unknown> | null, value: number) => void
}

export default function List<T>({data, loading, renderItem, page, handleChangePage}: ListProps<T>) {

    if(loading) return  <ListLoading />
    else if (!data || data.length === 0) return <Typography variant="h6" mt={4}>По данном запросу товаров не найденно</Typography> 
    else return (
        <>
            <Grid container spacing={6} mt={4} mb={6} pr={6} pl={2}>
                {data.map(renderItem)}
            </Grid>
            <Box component={"div"}>
                <Pagination 
                    count={10}
                    boundaryCount={0}
                    page={page}
                    onChange = {handleChangePage}
                />
            </Box>
        </>
    )
}