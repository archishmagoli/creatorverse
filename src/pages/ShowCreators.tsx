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
            <h1>Creator Gallery</h1>
            <div className='gallery'>
            {
                creators.length === 0 ?
                <div>
                    <h2>No Creators Yet!</h2>
                    <Link to="/add-creator">
                        <button className='button button-detail'>
                        Add a new Creator here!
                        </button>
                    </Link>
                </div>
                :
                creators.map(creator =>
                    <div key={creator.id} className='creatorCard'>
                        <ContentCreator {...creator} />
                        <br />
                        <Link to={"/creator/" + creator.id}>
                            <button className='button button-detail'>
                                View Creator
                            </button>
                        </Link>
                    </div>
                    )
            }
            </div>
            <br></br>
            <Link to="/add-creator">
                <button className='button button-detail'>
                    Add a New Creator
                </button>
            </Link>
        </>
    )
}