import { supabase } from '../client';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import type { CreatorAttributes } from '../components/ContentCreator';

export const AddCreator = () => {
    const [creator, setCreator] = useState<CreatorAttributes>({
        id: 0,
        name: "",
        description: "",
        url: "",
    });

    const navigate = useNavigate();

    const handleChange = (e: any) => {
        e.preventDefault();
        const { name, value } = e.target;
        setCreator({
            ...creator,
            [name]: value
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
    
        try {
            const { data, error } = await supabase
                .from('creators')
                .insert({
                    name: creator.name, 
                    url: creator.url,
                    description: creator.description,
                    image_url: creator.image_url ? creator.image_url : ""
                });
    
            if (error) {
                throw error;
            }
    
            alert('Creator added successfully!');

            // Navigate to gallery
            navigate('/');
        } catch (error: any) {
            alert(`Error adding Creator, please try again later. ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Add a New Creator!</h2>
            <form className='form' onSubmit={handleSubmit}>
                <label htmlFor="name">Creator Name: </label>
                <input type="text" id="name" name="name" value={creator.name} onChange={handleChange} required />
                
                <br /><br />

                <label htmlFor="description">Creator Description: </label>
                <input type="paragraph" id="description" name="description" value={creator.description} onChange={handleChange} required />
                
                <br /><br />

                <label htmlFor="url">Profile URL (Instagram, YouTube, etc.): </label>
                <input type="url" id="url" name="url" value={creator.url} onChange={handleChange} required />

                <br /><br />

                <label htmlFor="image_url">Image URL <i>(optional): </i></label>
                <input type="image_url" id="image_url" name="image_url" value={creator.image_url || ''} onChange={handleChange} />

                <br /><br />

                <input className='button button-submit' type="submit" value="Submit" />
            </form>
            <div className='btn-container'><button className='button back-to-gallery' onClick={() => navigate('/')}>Back to Gallery</button></div>
        </div>
        
    );
};