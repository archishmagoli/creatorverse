export const ContentCreator = (props: CreatorAttributes) => {
    return (
        <>
            <p>Name: {props.name}</p>
            <p>Description: {props.description}</p>
            <p>Link to page: {props.url}</p>
            <p>ImageURL: {props.imageURL || 'hi'}</p>
        </>
    )
}

export interface CreatorAttributes {
    name: string;
    description: string;
    url: string;
    imageURL?: string;
}