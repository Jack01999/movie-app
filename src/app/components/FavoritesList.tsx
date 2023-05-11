'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { MovieDataShape } from './MovieList';

interface FavoritesListProp {
    favorites: number[],
    setFavorites: (number) => void,
    testID: string
}

export default function FavoritesList({favorites, setFavorites, testID}: FavoritesListProp) {
    const [favoritesData, setFavoritesData] = useState<MovieDataShape[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchMovieData = () => {
            setIsLoading(true);
            try {
                setFavoritesData([]);
                favorites.forEach(async (favoriteId) => {
                    const result = await axios(`https://api.themoviedb.org/3/movie/${favoriteId}?api_key=0e9b23c93e97b7dfbb54bb659f4b3356`);
                    setFavoritesData(favoritesData => [...favoritesData, result?.data])
                })
            }
            catch (err) {
                console.error(err);
            }
            setIsLoading(false);
        }
        fetchMovieData();
    }, [favorites])

    if (!isLoading && favoritesData.length == 0) {
        return (<div><h1>You currently have no favorited movies.</h1></div>)
    }

    return (
        <div data-testID={testID}>
            <main>
            <Container sx={{ py: 8 }} maxWidth="lg">
                <Grid container spacing={4}>
                    {isLoading ? (
                        <div>Loading ...</div>
                    ) : (
                    <>
                        {favoritesData.map((movie) => (
                            <Grid xs={12} sm={6} md={4} item key={movie.id}>
                                <MovieCard 
                                    id={movie.id}
                                    title={movie.title} 
                                    release_date={movie.release_date} 
                                    description={movie.overview} 
                                    image_path={movie.backdrop_path} 
                                    rating={movie.vote_average}
                                    favorites={favorites}
                                    setFavorites={setFavorites}
                                    testID={`${testID}-card-${movie.id}`}
                                />
                            </Grid>
                        ))}
                    </>
                    )}
                </Grid>
            </Container>
            </main>
        </div>
    )
}