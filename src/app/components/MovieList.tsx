'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import MovieCard from './MovieCard';

export interface MovieDataShape {
    id: number,
    title: string,
    adult: boolean,
    backdrop_path: string,
    genre_ids: number[],
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    video: boolean,
    vote_average: number,
    vote_count: number
};

interface MovieListProp {
    favorites: number[],
    setFavorites: (number) => void,
    testID: string
}

export default function MovieList({favorites, setFavorites, testID}: MovieListProp) {
    const [movieData, setMovieData] = useState<MovieDataShape[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    useEffect(() => {
        const fetchMovieData = async () => {
            setIsLoading(true);
            try {
                const result = await axios('https://api.themoviedb.org/3/movie/popular?api_key=0e9b23c93e97b7dfbb54bb659f4b3356&language=en-US&page=1');
                setMovieData(result?.data.results);
            }
            catch (err) {
                console.error(err);
            }
            setIsLoading(false);
        }
        fetchMovieData();
    }, [])

    return (
        <div data-testid={testID}>
            <main>
            <Container sx={{ py: 8 }} maxWidth="lg">
                <Grid container spacing={4}>
                    {isLoading ? (
                        <div>Loading ...</div>
                    ) : (
                    <>
                        {movieData.map((movie) => (
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