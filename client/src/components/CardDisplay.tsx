import React from "react";
import MapboxMap from "./MapboxMap";

interface Card {
    _id: string;
    title?: string;
    photo: string;
    name?: string;
    author?: string;
    body: string;
    favorite: string;
    createdAt: string | Date;
    tags?: string[];
    geometry?: {
        coordinates: [number, number];
    };
}

interface CardDisplayProps {
    card: Card | null;
    favorite?: number;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card, favorite }) => {
    if (!card) {
        return <div className="card-empty">No card to display</div>;
    }

    return (
        <div className="card flex flex-col md:flex-row gap-4">
            {/* Map or Photo section */}
            <div className="w-full md:w-1/2">
                {card.geometry ? (
                    <div className="">
                        <MapboxMap geometry={card.geometry} />
                    </div>
                ) : card.photo ? (
                    <img 
                        src={card.photo} 
                        alt={card.title || card.name || "Card image"} 
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="h-full bg-gray-100"></div>
                )}
            </div>
        
            {/* Content section */}
            <div className="w-full md:w-1/2 flex flex-col gap-2 relative">
                {favorite !== undefined && (
                    <div className="absolute top-0 right-0 favorite-badge">{favorite} ♥</div>
                )}
                <img 
                    src={card.photo} 
                    alt={card.title || card.name || "Card image"} 
                    className="w-full h-full object-cover"
                    />
                {(card.title || card.name) && <h1 className="text-xl font-bold">{card.title || card.name}</h1>}
                
                {(card.body || card.body) && <p className="text-gray-700">{card.body}</p>}

                {(card.favorite || card.favorite) && <p className="text-gray-700">{card.favorite}</p>}

                {(card.author || card.author ) && <p className="text-gray-700">{card.author}</p>}
                
                {card.tags && card.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                        {card.tags.map(tag => (
                            <span key={tag} className="tag bg-gray-200 px-2 py-1 rounded text-sm">{tag}</span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CardDisplay;