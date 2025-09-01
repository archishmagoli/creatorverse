import { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from '../client';
import type { CreatorAttributes } from '../components/ContentCreator';

export const EditCreator = () => {
    let params = useParams(); // enables us to retrieve ID from site URL
    const [creator, setCreator] = useState<CreatorAttributes>();

    useEffect(() => {
        const fetchCreator = async () => {
            const { data, error } = await supabase
                .from('creators')
                .select()
                .filter('id', 'eq', params.id);
            
            if (!error && data) {
                setCreator(data[0]);
            }
        };

        fetchCreator();
    }, []);

    const handleChange = (e: any) => {
        e.preventDefault();
        if (!creator) return; // Handle undefined case
        const { name, value } = e.target;
        setCreator({
            ...creator,
            [name]: value
        });
    };

    const navigate = useNavigate();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!creator) return; // Handle undefined case

        try {
            const { error } = await supabase
            .from('creators')
            .update({ 
                name: creator.name,
                description: creator.description,
                url: creator.url,
                image_url: creator.image_url || ''
                })
            .eq('id', params.id)
    
            if (error) {
                throw error;
            }
    
            alert('Creator updated successfully!');
            navigate('/');
        } catch (error) {
            alert('Error editing Creator.');

        }
    };

    return (
        <div>
            { !creator ? <p>Loading...</p> :
            <div className="content">
                <h2>Edit Creator</h2>
                <form className='form' onSubmit={handleSubmit}>
                    <label htmlFor="name">Creator Name: </label>
                    <input type="text" id="name" name="name" value={creator.name} onChange={handleChange} required />
                    
                    <br /><br />

                    <label htmlFor="description">Creator Description: </label>
                    <input type="paragraph" id="description" name="description" value={creator.description} onChange={handleChange} required />
                    
                    <br /><br />

                    <label htmlFor="url">Profile URL: </label>
                    <input type="url" id="url" name="url" value={creator.url} onChange={handleChange} required />

                    <br /><br />

                    <label htmlFor="image_url">Image URL <i>(optional): </i></label>
                    <input type="image_url" id="image_url" name="image_url" value={creator.image_url || ''} onChange={handleChange} />

                    <br /><br />

                    <input className='button button-submit' type="submit" value="Submit" />
                </form>
                <div className='btn-container'><button className='button back-to-gallery' onClick={() => navigate('/')}>Back to Gallery</button></div>
            </div>
            }
        </div>
        
    );
}