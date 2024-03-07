import { ReactNode } from "react"
import { Grid, Pagination, Box} from '@mui/material';
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
    else if (!data || data?.length === 0) <div>Список товаров пуст</div> 
    else return (
        <>
            <Grid container spacing={6} mt={4} mb={6}>
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