import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { describe } from 'node:test';
import { MovieDataShape } from '../MovieList';
import MovieCard from '../MovieCard';
import '@testing-library/jest-dom'

const mockMovie = {
    id: 1,
    title: 'Ant Man',
    adult: true,
    backdrop_path: '',
    genre_ids: [],
    original_language: 'English',
    original_title: 'Ant Man',
    overview: "Super-Hero partners Scott Lang and Hope van Dyne, along with with Hope's parents Janet van Dyne and Hank Pym, and Scott's daughter Cassie Lang, find themselves exploring the Quantum Realm, interacting with strange new creatures and embarking on an adventure that will push them beyond the limits of what they thought possible.",
    popularity: 1,
    poster_path: '',
    release_date: '2023-02-15',
    video: true,
    vote_average: 6.6,
    vote_count: 100

} satisfies MovieDataShape;

const testID='test';
const headerID=`${testID}-header`;
const modalButtonID=`${testID}-open-modal`;
const modalTitleID=`${testID}-modal-title`;
const modalDescriptionID=`${testID}-modal-description`;
const modalRatingID=`${testID}-modal-rating`;

describe('Movie Card component', async () => {
    it('Renders', async () => {
        const screen = render(
            <MovieCard 
                id={mockMovie.id}
                title={mockMovie.title} 
                release_date={mockMovie.release_date} 
                description={mockMovie.overview} 
                image_path={mockMovie.backdrop_path} 
                rating={mockMovie.vote_average}
                favorites={[]}
                setFavorites={() => []}
                testID={testID}
            />
        )

        expect(screen.getByTestId(headerID)).toHaveTextContent(`${mockMovie.title}${mockMovie.release_date}`);

        fireEvent.click(screen.getByTestId(modalButtonID));

        // Wait for modal to load
        await waitFor(() => expect(screen.queryByTestId(modalTitleID)).toBeInTheDocument());

        // Verify content of modal
        expect(screen.getByTestId(modalTitleID)).toHaveTextContent(mockMovie.title);
        expect(screen.getByTestId(modalDescriptionID)).toHaveTextContent(mockMovie.overview);
        expect(screen.getByTestId(modalRatingID)).toHaveTextContent(mockMovie.vote_average.toString());
    })
})