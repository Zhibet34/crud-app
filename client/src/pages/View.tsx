import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CardDisplay from "@/components/CardDisplay";
import CardSearch from "@/components/CardSearch";

function View(){
    const {id} = useParams();
    const navigate = useNavigate();
    const [card, setCard] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchCardById = async (id) =>{
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/cards/${id}`);
            setCard(response.data);
            setError(null);
        } catch (error) {
            setError('Card not found');
            setCard(null);
        } finally {
            setLoading(false)
        }
    };

    const searchByName = async (searchTerm) => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:3000/cards/search?name=${searchTerm}`);
            if(response.data){
                setCard(response.data);
                navigate(`/view/${response.data._id}`)
            };
            setError(null);
        } catch (error) {
            setError('No card found with that name');
            setCard(null)
        } finally {
            setLoading(false)
        }
    }

    console.log(card)

    useEffect(()=>{
        if(id && !card) {
           fetchCardById(id)
        }
    },[id]);

    if (loading){
        return(
            <div>
                <h1>the card is loading ...</h1>
            </div>
        )
    };

    if(error){
        return(
            <div>
                <h1>{error}</h1>
            </div>
        )
    }

    return(
        <>
            {card ? (
               <CardDisplay card={card}/>
            ) : (
               <CardSearch onSearch={searchByName}/>
            )}
        </>
    )
}

export default View;