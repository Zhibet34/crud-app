import React from "react";
import MapboxMap from "./MapboxMap";
import { FiUser, FiArrowRight, FiStar, FiHeart, FiMapPin, FiCalendar } from 'react-icons/fi';

interface Card {
    _id: string;
    title?: string;
    photo: string;
    name?: string;
    author?: string;
    body: string;
    favorite: number;
    createdAt: string | Date;
    tags?: string[];
    geometry?: {
        coordinates: [number, number];
    };
    address?: string;
}

interface CardDisplayProps {
    card: Card | null;
    favorite?: number;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card, favorite }) => {
    if (!card) {
        return (
            <div className="flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900 rounded-2xl">
                <p className="text-gray-400 dark:text-gray-500">Select a date idea to view details</p>
            </div>
        );
    }

    const ratingValue = typeof card.favorite === 'number' ? card.favorite : 0;
    const fullStars = Math.floor(ratingValue);
    const hasHalfStar = ratingValue % 1 >= 0.5;

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-800">
            {/* Image/Map Header */}
            <div className="relative h-56 w-full">
                {card.geometry ? (
                    <div className="h-full">
                        <MapboxMap geometry={card.geometry} className="h-full w-full" />
                    </div>
                ) : card.photo ? (
                    <img 
                        src={card.photo} 
                        alt={card.title || card.name || "Date idea"} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                ) : (
                    <div className="h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                        <span className="text-gray-400 dark:text-gray-500">No image available</span>
                    </div>
                )}
                
                <div className="absolute bottom-4 left-4 flex gap-2">
                    {favorite !== undefined && (
                        <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-sm">
                            <FiHeart className="text-pink-500" />
                            {favorite}
                        </span>
                    )}
                    
                    {card.tags && card.tags.length > 0 && (
                        <span className="bg-white dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                            {card.tags[0]} {/* Show only first tag as badge */}
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {card.title || card.name}
                    </h2>
                    
                    <div className="flex items-center bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-md">
                        {[...Array(5)].map((_, i) => (
                            <FiStar 
                                key={i}
                                className={`w-4 h-4 ${i < fullStars ? 'fill-yellow-400 text-yellow-400' : 
                                    (i === fullStars && hasHalfStar ? 'fill-yellow-400/50 text-yellow-400/50' : 
                                    'text-gray-300 dark:text-gray-600')}`}
                            />
                        ))}
                        <span className="ml-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                            {ratingValue.toFixed(1)}
                        </span>
                    </div>
                </div>

                {card.author && (
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
                        <FiUser className="flex-shrink-0" />
                        <span className="text-sm">Posted by {card.author}</span>
                    </div>
                )}

                <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3">
                    {card.body}
                </p>

                <div className="space-y-3 mb-6">
                    {card.address && (
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <FiMapPin className="flex-shrink-0 text-gray-400" />
                            <span className="text-sm">{card.address}</span>
                        </div>
                    )}
                    
                    {card.createdAt && (
                        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                            <FiCalendar className="flex-shrink-0 text-gray-400" />
                            <span className="text-sm">
                                {new Date(card.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                    {card.tags && card.tags.length > 1 && (
                        <div className="flex flex-wrap gap-2">
                            {card.tags.slice(1).map((tag) => (
                                <span 
                                    key={tag} 
                                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                    
                    <button className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm transition-colors">
                        View Details
                        <FiArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CardDisplay;