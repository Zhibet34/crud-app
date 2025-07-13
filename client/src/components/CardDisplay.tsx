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
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card }) => {
    if (!card) {
        return <div>No card to display</div>;
    }

    return (
        <div key={card._id} className="card">
            <img 
                src={card.photo} 
                alt={card.title || card.name || "Card image"} 
                className="card-image"
            />
            <div className="card-content">
                {card.title && <h1 className="card-title">{card.title}</h1>}
                {card.name && !card.title && <h1 className="card-name">{card.name}</h1>}
                <p className="card-description">{card.description}</p>
                {card.tags && card.tags.length > 0 && (
                    <div className="tags">
                        {card.tags.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardDisplay;