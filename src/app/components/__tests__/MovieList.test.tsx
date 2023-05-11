import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { describe } from 'node:test';
import MovieList from '../MovieList';
import '@testing-library/jest-dom'

const testID = 'test';
const movieId = '640146';
const movieCardTestID = `${testID}-card-${movieId}`;
const movieCardHeaderTestID = `${movieCardTestID}-header`;
const favoriteButtonTestID = `${movieCardTestID}-favorite`;

const setFavoritesMock = jest.fn();

const localStorageMock = (function () {
    let store = {};
    
    return {
        getItem(key) {
            return store[key] || null;
        },
        setItem(key, value) {
            store[key] = value.toString();
        },
        removeItem(key) {
            delete store[key];
        },
        clear() {
            store = {};
        }
    };
})();
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
})

describe('Movie List component', async () => {
    it('Renders', async () => {
        const screen = render(<MovieList favorites={[]} setFavorites={() => []} testID={testID} />)

        // Wait for load
        await waitFor(() => expect(screen.queryByTestId(movieCardTestID)).toBeInTheDocument());
        expect(screen.getByTestId(movieCardHeaderTestID)).toHaveTextContent('Ant-Man and the Wasp: Quantumania2023-02-15');
    });    
    it('Verify clicking on FavoriteIcon calls hook and adds to localStorage', async () => {
        const screen = render(<MovieList favorites={[]} setFavorites={setFavoritesMock} testID={testID} />)

        // Wait for load
        await waitFor(() => expect(screen.queryByTestId(movieCardTestID)).toBeInTheDocument());

        // Verify the local storage is empty and setFavorites hasn't been called
        let value = localStorageMock.getItem('favorites');
        expect(value).toBeNull();
        expect(setFavoritesMock).toHaveBeenCalledTimes(0);

        // Click favorite button
        fireEvent.click(screen.getByTestId(favoriteButtonTestID));

        // Verify the local storage has added the movie to favorites and setFavorites has been called
        value = localStorageMock.getItem('favorites');
        expect(value).toContain(movieId);
        expect(setFavoritesMock).toHaveBeenCalledTimes(1);
    })
})