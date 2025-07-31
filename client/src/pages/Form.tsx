import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiUpload, FiHome, FiUser, FiMapPin, FiStar, FiFileText } from 'react-icons/fi';

function Form() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;
        if (name === 'photo' && files && files[0]) {
            setData(prev => ({ ...prev, [name]: files[0] }));
            // Create image preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(files[0]);
        } else {
            setData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key as keyof typeof formData]);
            }
            
            await axios.post('http://localhost:3000/restaurants/restaurant', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            // Reset form
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
            setPreviewImage(null);
            
            // Show success and redirect
            setTimeout(() => {
                navigate('/');
            }, 1500);
            
        } catch (error) {
            console.error("Submission error:", error);
            alert("Failed to add restaurant. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-3xl font-bold text-center text-emerald-600 mb-8 uppercase">
                    Restaurant Submission Form
                </h1>
                
                <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8 space-y-6">
                    {/* Basic Information Section */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
                            <FiHome className="text-emerald-500" />
                            Basic Information
                        </h2>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="font-medium text-gray-700">
                                    Restaurant Name *
                                </Label>
                                <Input
                                    id="title"
                                    name="title"
                                    type="text"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="author" className="font-medium text-gray-700 flex items-center gap-1">
                                    <FiUser className="text-emerald-500" />
                                    Your Name *
                                </Label>
                                <Input
                                    id="author"
                                    name="author"
                                    type="text"
                                    value={formData.author}
                                    onChange={handleChange}
                                    required
                                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="photo" className="font-medium text-gray-700 flex items-center gap-1">
                                <FiUpload className="text-emerald-500" />
                                Restaurant Photo *
                            </Label>
                            <div className="flex items-center gap-4">
                                <Input
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChange}
                                    required
                                    className="border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                                />
                                {previewImage && (
                                    <div className="w-16 h-16 rounded-md overflow-hidden border border-gray-200">
                                        <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Location Section */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-700">
                            <FiMapPin className="text-emerald-500" />
                            Location Details
                        </h2>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="street">Street Address *</Label>
                                <Input
                                    id="street"
                                    name="street"
                                    type="text"
                                    value={formData.street}
                                    onChange={handleChange}
                                    required
                                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="borough">Borough *</Label>
                                <Input
                                    id="borough"
                                    name="borough"
                                    type="text"
                                    value={formData.borough}
                                    onChange={handleChange}
                                    required
                                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="state">State *</Label>
                                <Input
                                    id="state"
                                    name="state"
                                    type="text"
                                    value={formData.state}
                                    onChange={handleChange}
                                    required
                                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="zipCode">Zip Code *</Label>
                                <Input
                                    id="zipCode"
                                    name="zipCode"
                                    type="text"
                                    value={formData.zipCode}
                                    onChange={handleChange}
                                    maxLength={5}
                                    pattern="\d{5}"
                                    required
                                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Rating & Description */}
                    <div className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="rating" className="font-medium text-gray-700 flex items-center gap-1">
                                    <FiStar className="text-emerald-500" />
                                    Your Rating (1-5) *
                                </Label>
                                <Input
                                    id="rating"
                                    name="rating"
                                    type="number"
                                    value={formData.rating}
                                    min={1}
                                    max={5}
                                    step={0.5}
                                    onChange={handleChange}
                                    required
                                    className="border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description" className="font-medium text-gray-700 flex items-center gap-1">
                                <FiFileText className="text-emerald-500" />
                                Description *
                            </Label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Tell us about your experience at this restaurant..."
                                value={formData.description}
                                onChange={handleChange}
                                required
                                className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:border-emerald-500 focus:ring-emerald-500 focus-visible:outline-none"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => navigate('/')}
                            className="border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Add Restaurant"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Form;