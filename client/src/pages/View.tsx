import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CardDisplay from "@/components/CardDisplay";

function View(){
    const {id} = useParams();
    const [card, setCard] = useState(null)
    console.log(id)

    useEffect(() => {
        const fetchCard = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/cards/${id}`);
                setCard(response.data);
            } catch (err) {
                console.log(err.message);
            } finally {
               
            }
        };

        fetchCard();
    }, [id]);

    console.log(card)
    return(
        <>
            <h2> card id: {id}</h2>
            {card ? (
                <CardDisplay card={card} />
            ) : (
                {/** the other componet will; be here */}
            )}
        </>
    )
}

export default View;