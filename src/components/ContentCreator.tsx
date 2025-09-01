import { Link } from "react-router-dom";

export const ContentCreator = (props: CreatorAttributes) => {
    return (
        <div className='creatorDetail' key={props.id}>
            {props.image_url && (
                <div className="creatorDetail-overlay" />
            )}
            <div className="creatorDetail-content">
                <h3>{props.name}</h3>
                <p className="description">{props.description}</p>
                <a href={props.url} id="profile-link">Link to Profile</a>
                <br />
                <br />
                <Link to={"/creator/" + props.id + '/edit'}>
                    <button className='button' id="edit-creator">
                        Edit Creator Details
                    </button>
                </Link>
            </div>
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