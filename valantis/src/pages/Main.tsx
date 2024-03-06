import { FC} from "react";
import { useProducts } from "../hooks/usePropducts";
import List from "../components/list/List";
import { ProductItem } from "../components/ProductItem/ProductItem";

export const Main: FC = () => {

    const {products, loading} = useProducts();

    console.log(products)

    if(loading) return <div>Loading...</div>
    else if(products === null) return <div>Список товаров пуст</div>
    else return (
        <List data = {products} renderItem={(item) => <ProductItem product={item} key = {item.id} />} />
    )
}