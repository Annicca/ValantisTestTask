import { FC } from "react";
import { Grid, Skeleton} from '@mui/material';

export const ListLoading: FC =() => {
    return (
        <Grid container spacing={6} mt={4} mb={6} pr={6} pl={2} >{Array.from(new Array(4)).map((item, index) => (
            <Grid key = {'skeleton'+index+item} container item lg={3} sm={4} md={4}>
                <Skeleton sx={{
                    width: 300,
                    height: 530,
                    transform: 'none',
                    transformOrigin: 0
                }}/>
            </Grid>
        ))}</Grid>
    )
}