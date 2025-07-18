import axios from "axios";
import { FiTrash2, FiArchive } from 'react-icons/fi';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom" // Import useNavigate

import MapboxMap from "@/components/MapboxMap";

function Home(){
    const [Data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    useEffect(()=>{
        const fetchData = async ()=>{
            try {
                const response = await axios.get('http://localhost:3000/') 
                setData(response.data) 
            } catch (error) {
                setError(error.response || 'Failed to fetch data')
            } finally{
                setLoading(false)
            }
        };

        fetchData()
    },[])

    console.log(Data)
    
    if(loading){
        return(
            <div className="border border-black w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto p-4">
                <h1 className="capitalize text-lg text-center italic">Loading data...</h1>
                <div className="flex justify-center mt-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="border border-red-500 w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto p-4">
                <h1 className="uppercase text-lg text-center text-red-600">Error: {error}</h1>
                <p className="text-center mt-2">Please try again later</p>
            </div>
        );
    }

    const handleDelete = async (id) =>{
        if(window.confirm('Are you sure you want to delete this place?')){
            try {
                await axios.delete(`http://localhost:3000/delete/${id}`);
                setData(Data.filter(place => place._id !== id))
            } catch (error) {
                setError('Failed to delete place');
                console.error('Delete error:', error);
            }
        }
    }

    const handleArchive = async (id) =>{
        if(window.confirm(`the following item will be archieved, ${id}`)){
            try {
                await axios.get(`http://localhost:3000/places/${id}`);
                setData(Data.filter(place => place._id !== id))
            } catch (error) {
                setError(`Failed to Archieve, ${id}`)
                console.log(error)
            }
        }
    }
   
    
    return (
        <>
            <div className="w-full border">
                <MapboxMap/>
            </div>
            <div className="w-full md:w-3/4 lg:w-1/2 xl:w-1/3 mx-auto p-4">
                <h1 className="uppercase text-lg text-center font-bold mb-6 font-extrabold italic">Top places to visit</h1>
                {Data.length > 0 ? (
                <div className="space-y-6">
                    {Data.map((place) => (
                        <div key={place._id || place.id}  className="relative border border-black bg-white rounded-lg p-4 hover:shadow-xl transition-shadow">
                            {/* Delete Button - Fixed Positioning */}
                            <button 
                            onClick={() => handleDelete(place._id)}
                            className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Delete place"
                            >
                            <FiTrash2 size={18} />
                            </button>

                            <button 
                            onClick={() => handleArchive(place._id)}
                            className="absolute top-2 right-10 p-1 text-gray-400 hover:text-green-500 transition-colors"
                            aria-label="Delete place"
                            >
                            <FiArchive size={18} />
                            </button>

                            <div className="flex items-center space-x-4" onClick={() => navigate(`/view/${place._id}`)}>
                                <img 
                                    src={place.photo} 
                                    alt={place.title} 
                                    className="w-24 h-24 object-cover rounded shadow-2xl shadow-black justify-center"
                                    onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/100';
                                    }}
                                />
                            <div className="flex-1 md:p-4">
                                <h1 className="font-semibold text-lg md:text-center capitalize">{place.title}</h1>
                                <p className="text-gray-700 mt-2 md:text-center">{place.body}</p>
                                <div className="flex items-center mt-2 justify-end">
                                <span className="text-yellow-500">
                                    {'★'.repeat(place.favorite).padEnd(5, '☆')}
                                </span>
                                <span className="text-sm text-gray-500 ml-2">
                                    ({place.favorite}/5)
                                </span>
                                </div>
                            </div>
                            </div>
                        </div>
                    ))}
                </div>
                ) : (
                <p className="text-center text-gray-500">No places found</p>
                )}
            </div>
        </>
    )
}

export default Home