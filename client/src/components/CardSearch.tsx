import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface CardSearchProps {
    onSearch: (searchTerm: string) => void;
}

const CardSearch: React.FC<CardSearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            onSearch(searchTerm);
        }
    };

    return (
        <div className="card-search">
            <form onSubmit={handleSubmit}>
                <Label htmlFor="card-search">Card Name:</Label>
                <Input
                    id="card-search"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter card name..."
                />
                <Button type="submit" className="mt-2">
                    Search
                </Button>
            </form>
        </div>
    );
};

export default CardSearch;