import React from "react";

interface Card {
    _id: string;
    title?: string;
    photo: string;
    author: string;
    body: string;
    createdAt: string | Date;
    address: string;
    favorite: number;
}

interface CardDisplayProps {
    card: Card | null;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card}) => {
    if (!card) {
        return <div>No card to display</div>;
    }

    return (
        <div key={card._id} className="card">
            <h1>{card.title}</h1>
            <img src={card.photo} alt={card.title || "Card image"} />
            <p>{card.body}</p>
            <span className="text-yellow-500">
                {'★'.repeat(card.favorite).padEnd(5, '☆')}
            </span> 
            {/** make this click able */}
            <p>{card.address}</p>
            <p>{card.author}</p>
        </div>
    );
};

export default CardDisplay;