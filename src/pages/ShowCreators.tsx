import { supabase } from '../client';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import type { CreatorAttributes } from '../components/ContentCreator';
import { ContentCreator } from '../components/ContentCreator';

export const ShowCreators = () => {
    /* State is used to maintain the 
    "configuration" of certain variables in our code */
    const [creators, setCreators] = useState<CreatorAttributes[]>([]);

    useEffect(() => {
        const fetchCreators = async () => {
            const { data, error } = await supabase
                .from('creators')
                .select();
            
            if (!error && data) {
                setCreators(data);
            }
        };

        fetchCreators();
    }, []);

    return (
            <>
                <div className='gallery-header'>
                    <h1 id='gallery-header'>Creatorverse</h1>
                    <br />
                </div>
                <h2 id="explore-creators"><i>Explore Creators</i></h2>
                <div className='gallery'>
                {
                    creators.length === 0 ?
                    <div>
                        <h2>No Creators Yet!</h2>
                        <Link to="/add-creator">
                            <button className='button'>
                            Add a new Creator here!
                            </button>
                        </Link>
                    </div>
                    :
                    creators.map(creator =>
                        <div key={creator.id} className='creatorCard overlay' style={creator?.image_url
                        ? { backgroundImage: `url(${creator.image_url})`, backgroundPosition: 'center', backgroundSize: 'cover' }
                        : {}}>
                            <ContentCreator {...creator} />
                            <Link to={"/creator/" + creator.id}>
                                <button className='button' id="view-creator">
                                    View Creator
                                </button>
                            </Link>
                        </div>
                        )
                }
                </div>
            <div className='btn-container'>
                <Link to="/add-creator">
                    <button className='button' id="add-creator">
                        Add a New Creator
                    </button>
                </Link>
            </div>
        </>
    )
}