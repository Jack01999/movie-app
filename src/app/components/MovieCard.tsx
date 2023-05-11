'use client';

import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

interface MovieCardProps {
    id: number,
    title: string,
    release_date: string,
    description: string,
    image_path: string,
    rating: number,
    favorites: number[],
    setFavorites: (number) => void,
    testID: string
};

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    color: 'black'
};

export default function MovieCard({id, title, release_date, description, image_path, rating, favorites, setFavorites, testID}: MovieCardProps) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    function addToFavorites() {   
        const storedFavorites = localStorage.getItem("favorites");
        let updatedFavorites:number[] = [];

        if (storedFavorites) {
            updatedFavorites = JSON.parse(storedFavorites);
        }

        if (updatedFavorites.includes(id)) {
            updatedFavorites = updatedFavorites.filter((currId) => currId !== id);
        } else {
            updatedFavorites.push(id);
        }

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
    };

    return (
        <Card sx={{ maxWidth: '100%', height: '100%', border: '5px solid red' }} variant="outlined" data-testid={testID}>
            <CardHeader
                title={title}
                subheader={release_date}
                sx={{width: '100%', height: 100}}
                data-testid={`${testID}-header`}
            />
            <CardMedia
                component="img"
                height="194"
                image={`https://image.tmdb.org/t/p/original/${image_path}`}
                data-testid={`${testID}-media`}
            />
            <CardActions disableSpacing>
                <IconButton aria-label="add-to-favorites" onClick={() => addToFavorites()} data-testid={`${testID}-favorite`}>
                    <FavoriteIcon/>
                </IconButton>
                <Button onClick={() => setIsModalOpen(true)} id="open-modal" data-testid={`${testID}-open-modal`}>See More</Button>
            </CardActions>
            <Modal
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                data-testid={`${testID}-modal`}
            >
                <Box sx={modalStyle}>
                    <h1 id="modal-title" style={{ fontWeight: 'bold' }} data-testid={`${testID}-modal-title`}>{title}</h1>
                    <p id="modal-description" data-testid={`${testID}-modal-description`}>{description}</p>
                    <p id="modal-rating" style={{ fontWeight: 'bold' }} data-testid={`${testID}-modal-rating`}>Rating: {rating}</p>
                </Box>
            </Modal>
        </Card>
    )
}