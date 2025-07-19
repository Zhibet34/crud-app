import { Label } from "@radix-ui/react-label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useNavigate } from "react-router-dom" // Import useNavigate
import { useState } from "react"

function Form() {
    const navigate = useNavigate(); // Initialize the navigate function

    const [formData, setData] = useState({
        title: '',
        photo: null,
        author: '',
        street: '',
        borough: '',
        state: '',
        zipCode: '',
        rating: '',
        description: ''
    });

    const handleChange = (e : any) => {
        const {name, value, files} = e.target;
        setData(prev => ({
            ...prev,
            [name]: files ? files[0] : value
        }));
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            for(const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            await axios.post('http://localhost:3000/restaurants/restaurant', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Restaurant added successfully!');
            
            // Reset form after successful submission
            setData({
                title: '',
                photo: null,
                author: '',
                street: '',
                borough: '',
                state: '',
                zipCode: '',
                rating: '',
                description: ''
            });

            // Redirect to home page after 1.5 seconds
            setTimeout(() => {
                navigate('/'); // Redirect to home page
            }, 1500);
        } catch (error) {
            alert("Failed to add restaurant");
        }
    }

    return(
        <>
            <h1 className="text-emerald-600 mt-4 text-center p-4 uppercase font-bold text-3xl md:w-2/4 mx-auto rounded">
                Restaurant form
            </h1>
            <form onSubmit={handleSubmit} className="p-4 space-y-4 md:w-2/5 2xl:w-1/5 mx-auto capitalize italic">
                <div className="space-y-2">
                    <Label htmlFor="title" className="italic">name</Label>
                    <Input 
                        id="title" 
                        name="title" 
                        type="text" 
                        className="border border-black"
                        value={formData.title}
                        onChange={handleChange} 
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="photo" className="italic">Photo</Label>
                    <Input 
                        id="photo" 
                        name="photo" 
                        type="file" 
                        accept="image/*"
                        className="border border-red-500"
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="author" className="italic">Author</Label>
                    <Input 
                        id="author" 
                        name="author" 
                        type="text" 
                        className="border border-black" 
                        value={formData.author}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="md:w-4/5 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="street">Street</Label>
                        <Input 
                            id="street" 
                            name="street" 
                            type="text" 
                            className="border border-black" 
                            value={formData.street}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2 flex-1">
                        <Label htmlFor="borough">Borough</Label>
                        <Input 
                            id="borough" 
                            name="borough" 
                            type="text" 
                            className="border border-black w-40" 
                            value={formData.borough}
                            onChange={handleChange}
                            required
                        />
                    </div> 

                    <div className="space-y-2 flex-1">
                        <Label htmlFor="state">state</Label>
                        <Input 
                            id="state" 
                            name="state" 
                            type="text" 
                            className="border border-black w-20" 
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </div> 

                    <div className="space-y-2 flex-1">
                        <Label htmlFor="zipCode">Zip Code</Label>
                        <Input 
                            id="zipCode" 
                            name="zipCode" 
                            type="text" 
                            className="border border-black w-25 text-center" 
                            value={formData.zipCode}
                            maxLength={5}
                            onChange={handleChange}
                            required
                        />
                    </div>  
                    <div className="space-y-2 flex-1">
                        <Label htmlFor="rating">rating</Label>
                        <Input 
                            id="rating" 
                            name="rating" 
                            type="number" 
                            className="border border-black w-20 text-center"
                            value={formData.rating}
                            min={1} 
                            max={5}
                            step={.5}
                            onChange={handleChange}
                            required
                        />
                    </div>       
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <textarea 
                        id="description" 
                        name="description" 
                        placeholder="Describe the restaurant..." 
                        className="flex h-20 resize-none w-full rounded-md border border-black bg-transparent px-3 py-2 text-sm"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="flex justify-center">
                    <Button type="submit" className="w-full bg-red-400 hover:bg-red-500 w-2/5">
                        Add Restaurant
                    </Button>
                </div>
            </form>
        </>
    )
}

export default Form