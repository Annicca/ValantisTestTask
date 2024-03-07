import { FC, useState } from "react";
import { TFilter } from "../../types/TFilter";
import {Grid, TextField, Button} from '@mui/material'

interface FilterProps {
    handleFilter: (filter: TFilter) => void
}

export const Filter:FC<FilterProps> =({handleFilter}) => {

    const [formvalue, setFormValue] = useState<TFilter>({})
    
    const handleTextFieldValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setFormValue({
            ...formvalue,
            [name]: value
        })
    }

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        handleFilter({
            ...formvalue,
        })
    }

    const onReset = () => {
        setFormValue({})
        handleFilter({})
    }

    return(
        <Grid container component={"form"} columnGap={2} mt={2} width={'100%'} onSubmit={onSubmit} onReset={onReset}>
            <TextField id="product" name="product" label="Product" variant="outlined" 
            onChange={handleTextFieldValue} />
            <TextField id="brand" name="brand" label="Brand" variant="outlined"
            onChange={handleTextFieldValue}/>
            <TextField type="number" id="price" name="price" label="Price" variant="outlined"
            onChange={handleTextFieldValue} />
            <Button variant="outlined" color="error" type="submit">Применить</Button>
            <Button variant="outlined" color="secondary" type="reset">Очистить</Button>
        </Grid>
    )
}