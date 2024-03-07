import { FC, useState} from "react";
import { useProducts } from "../hooks/usePropducts";
import List from "../components/list/List";
import { ProductItem } from "../components/productItem/ProductItem";
import { TFilter } from "../types/TFilter";
import { Filter } from "../components/filter/Filter";

export const Main: FC = () => {

    const [page, setPage] = useState<number>(1)
    const [filter, setFilter] = useState<TFilter>({})
    const {products, loading} = useProducts(page, filter);

    const handleChangePage = (event: React.ChangeEvent<unknown> | null, value: number) => {
        event?.preventDefault()
        setPage(value);
    };

    const handleFilter = (filter: TFilter) => {
        handleChangePage(null,1)
        setFilter(filter)
    }

    return (
        <main>
            <Filter handleFilter={handleFilter} />
            <List 
            data = {products} 
            loading = {loading}
            renderItem={(item) => <ProductItem product={item} key = {item.id} />} 
            page={page} 
            handleChangePage={handleChangePage} />
        </main>
    )
}