import React, { useCallback } from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import './AnimeList.scss'

function AnimeList(props) {
    const { animes, setPagination } = props;
    const loadMoreHandling = useCallback(() => { setPagination(); }, [setPagination]);
    return (
        <div className="cards-container">
            <Grid container spacing={6} justify="center">
                {
                    animes.map((item, index) => {
                        return (
                            <Grid item xs={12} md={2} component={Card} key={index} className="item">
                                <CardContent>
                                    <img src={item.image_url} alt={item.title} />
                                </CardContent>
                                <div className="anime-title">
                                    <Typography variant="body2">{item.title}</Typography>
                                </div>
                            </Grid>
                        );
                    })
                }
                <div className="margin-t-b-30" onClick={loadMoreHandling}><button className="load-more">Load More...</button></div>
            </Grid>
        </div>
    );
}

export default AnimeList;
