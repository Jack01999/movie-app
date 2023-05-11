'use client';

import React, {useState, useEffect} from 'react';
import MovieList from './components/MovieList';
import FavoritesList from './components/FavoritesList';
import NavBar from './components/NavBar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Home() {
    const [viewMode, setViewMode] = useState<number>(0);
    const [favorites, setFavorites] = useState<number[]>([]);
    const testID = 'app';

     // Retrieve favorites list from local storage on mount
    useEffect(() => {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
      }
    }, []);

    // Update local storage whenever favorites list changes
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    return (
        <div>
            <NavBar />
            <BottomNavigation
                showLabels
                value={viewMode}
                onChange={(event, newValue) => {
                    setViewMode(newValue);
                }}
                >
                <BottomNavigationAction label="All Movies" icon={<RestoreIcon />} />
                <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            </BottomNavigation>
            {viewMode === 0 ? 
              (<MovieList favorites={favorites} setFavorites={setFavorites} testID={`${testID}-movie-list`} />) 
              : (<FavoritesList favorites={favorites} setFavorites={setFavorites} testID={`${testID}-favorites-list`} />)
            }
        </div>
    )
}