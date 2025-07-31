import axios from "axios";
import { FiTrash2, FiArchive, FiMapPin } from 'react-icons/fi';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeMap from "@/components/HomeMap";

function Home() {
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/');
                setData(response.data);
            } catch (error) {
                setError(error.response?.data?.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this place?')) {
            try {
                await axios.delete(`http://localhost:3000/delete/${id}`);
                setData(Data.filter(place => place._id !== id));
            } catch (error) {
                setError('Failed to delete place');
                console.error('Delete error:', error);
            }
        }
    };

    const handleArchive = async (id) => {
        if (window.confirm('Are you sure you want to archive this place?')) {
            try {
                await axios.get(`http://localhost:3000/places/${id}`);
                setData(Data.filter(place => place._id !== id));
            } catch (error) {
                setError('Failed to archive place');
                console.error('Archive error:', error);
            }
        }
    };

    if (loading) {
        return (
            <div className="w-full max-w-2xl mx-auto p-6">
                <h1 className="text-xl text-center font-medium italic text-gray-600">Loading places...</h1>
                <div className="flex justify-center mt-6">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-teal-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full max-w-2xl mx-auto p-6 bg-red-50 border border-red-200 rounded-lg">
                <h1 className="text-xl text-center font-medium text-red-600">Error</h1>
                <p className="text-center mt-2 text-red-500">{error}</p>
                <button 
                    onClick={() => window.location.reload()}
                    className="mt-4 mx-auto block px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Map Section */}
            <div className="w-full h-96 shadow-md">
                <HomeMap places={Data} />
            </div>

            {/* Places List */}
            <div className="w-full max-w-4xl mx-auto p-4 md:p-6 mt-8">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-8 italic">
                    <FiMapPin className="inline mr-2" />
                    Top Places to Visit
                </h1>
                
                {Data.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {Data.map((place) => (
                            <div 
                                key={place._id} 
                                className="relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                            >
                                {/* Action Buttons */}
                                <div className="absolute top-3 right-3 flex gap-2 z-10">
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleArchive(place._id);
                                        }}
                                        className="p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-green-600 hover:bg-green-50 transition-colors"
                                        aria-label="Archive place"
                                    >
                                        <FiArchive size={16} />
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(place._id);
                                        }}
                                        className="p-2 bg-white rounded-full shadow-md text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                                        aria-label="Delete place"
                                    >
                                        <FiTrash2 size={16} />
                                    </button>
                                </div>

                                {/* Place Card */}
                                <div 
                                    className="h-full flex flex-col cursor-pointer"
                                    onClick={() => navigate(`/view/${place._id}`)}
                                >
                                    <div className="h-40 overflow-hidden">
                                        <img 
                                            src={place.photo} 
                                            alt={place.title} 
                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                            onError={(e) => {
                                                e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                                                e.target.className = 'w-full h-full object-cover bg-gray-100';
                                            }}
                                        />
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h2 className="font-semibold text-lg text-gray-800 mb-2 capitalize">
                                            {place.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {place.body}
                                        </p>
                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex items-center">
                                                <span className="text-yellow-400">
                                                    {'★'.repeat(Math.floor(place.favorite))}
                                                    {'☆'.repeat(5 - Math.floor(place.favorite))}
                                                </span>
                                                <span className="ml-2 text-xs text-gray-500">
                                                    ({place.favorite.toFixed(1)}/5)
                                                </span>
                                            </div>
                                            <span className="text-xs text-blue-500 hover:text-blue-700 transition-colors">
                                                View details →
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No places found</p>
                        <button 
                            onClick={() => navigate('/add-new')}
                            className="mt-4 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-colors"
                        >
                            Add New Place
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;