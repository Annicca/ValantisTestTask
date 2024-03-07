import { FC } from "react"
import { TProduct } from "../../types/TProduct"
import { Grid, Typography, Paper} from '@mui/material';

interface ProductItemProps {
    product: TProduct
}

export const ProductItem :FC<ProductItemProps> = ({product}) => {
    return(
        <Grid container item lg={3} sm={4} md={4} direction="column" textAlign={"left"}>
            <Paper 
                variant="outlined" 
                sx= {{
                height: '100%',
                width: '100%',
                padding: 2}}
            >
                <img
                src='src/assets/golden-ring.jpg'
                alt={product.product}
                loading="lazy"
                width = {'100%'}
                height = {'auto'}
                />
                <Typography gutterBottom variant="subtitle1" component="div" color="text.secondary">
                    {product.id}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                    {product.product}
                </Typography>
                {product.brand &&<Typography gutterBottom variant="subtitle1" component="div" color="text.secondary">
                    {product.brand}
                </Typography>}
                <Typography gutterBottom variant="body1" component={"div"} color = {"red"}>
                    {product.price}Р
                </Typography>
            </Paper>

        </Grid>
    )
}