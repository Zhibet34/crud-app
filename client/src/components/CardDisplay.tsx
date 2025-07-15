import React from "react";

interface Card {
    _id: string;
    title?: string;
    photo: string;
    name?: string;
    description: string;
    createdAt: string | Date;
    tags?: string[];
}

interface CardDisplayProps {
    card: Card | null;
    favorite?: number;  // Add this line
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card, favorite }) => {
    if (!card) {
        return <div>No card to display</div>;
    }

    return (
        <div key={card._id} className="card">
            {favorite !== undefined && (
                <div className="favorite-badge">{favorite} ♥</div>
            )}
            <img src={card.photo} alt={card.title || card.name || "Card image"} />
            <h1>{card.title || card.name}</h1>
            <p>{card.description}</p>
            {card.tags && card.tags.length > 0 && (
                <div className="tags">
                    {card.tags.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CardDisplay;