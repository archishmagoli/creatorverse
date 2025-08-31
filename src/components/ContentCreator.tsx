import { Link } from "react-router-dom";

export const ContentCreator = (props: CreatorAttributes) => {
    return (
        <div className='creatorDetail' key={props.id}>
            <h2><b>{props.name}</b></h2>
            {props.image_url ? <img className='creatorImage' src={props.image_url}></img>:<></>}
            <p>{props.description}</p>
            <br></br>
            <Link to={"/creator/" + props.id + '/edit'}>
                <button className='button button-info'>
                    Edit Creator Details
                </button>
            </Link>
            <br></br>
        </div>
    )
}

export interface CreatorAttributes {
    id: number;
    name: string;
    description: string;
    url: string;
    image_url?: string;
}