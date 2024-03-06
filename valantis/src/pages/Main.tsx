import { FC, useState} from "react";
import { useProducts } from "../hooks/usePropducts";
import List from "../components/list/List";
import { ProductItem } from "../components/ProductItem/ProductItem";
import {Pagination, Box} from '@mui/material'
import { TFilter } from "../types/TFilter";

export const Main: FC = () => {

    const [page, setPage] = useState<number>(1)
    const [filter, setFilter] = useState<TFilter|null>(null)
    const {products, loading} = useProducts(page);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleFilter = (filter: TFilter|null) => {
        setFilter(filter)
    }

    if(loading) return <div>Loading...</div>
    else if(!products) return <div>Список товаров пуст</div>
    else return (
        <main>
            <List data = {products} renderItem={(item) => <ProductItem product={item} key = {item.id} />} />
            <Box component={"div"} sx = {{mt: 4}}>
                <Pagination 
                    count={10}
                    boundaryCount={0}
                    page={page}
                    onChange = {handleChange}
                />
            </Box>

        </main>
    )
}