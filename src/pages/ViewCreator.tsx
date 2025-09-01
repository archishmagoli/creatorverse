import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from '../client';
import type { CreatorAttributes } from '../components/ContentCreator';
import { ContentCreator } from '../components/ContentCreator';

export const ViewCreator = () => {
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

    const navigate = useNavigate();

    const deleteCreator = async (e: any) => {
        e.preventDefault();
    
        try {
            const { error } = await supabase
                .from('creators')
                .delete()
                .eq('id', params.id);

    
            if (error) {
                throw error;
            }
    
            alert('Successfully deleted creator.')

            navigate('/');
        } catch (error) {
            alert('Error deleting creator, please try again later.');

        }
    };

    return (
        <div>
            {creator !== undefined ? (
                <>
                <div id="solo-creator">
                    <div className='creatorCard' key={creator.id} style={creator?.image_url
                        ? { backgroundImage: `url(${creator.image_url})`, backgroundPosition: 'center', backgroundSize: 'cover' }
                        : {}}>
                        <div key={creator.id}>
                            <ContentCreator {...creator} />
                            <Link to={"/creator/" + creator.id}></Link>
                            <button className='button' id="delete-creator" onClick={deleteCreator}>Delete Creator</button>
                        </div>
                    </div>
                    <br></br>
                </div>
                <div className='btn-container'><button className='button back-to-gallery' onClick={() => navigate('/')}>Back to Gallery</button></div>
                </>
                
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}