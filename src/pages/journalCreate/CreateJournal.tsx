import { useState, FormEvent } from "react";
import { TripApi } from "../../api/TripApi";
import { RouteData } from "../../models/input/CreateRouteRequest";
import TripForm from "./components/TripForm";
import RouteForm from "./components/RouteForm";
import "./CreateJournal.css";

interface TripFormData {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    routes: RouteData[];
}

const INITIAL_ROUTE: RouteData = {
    locationName: "",
    country: "",
    city: "",
};

const INITIAL_FORM_DATA: TripFormData = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    routes: [INITIAL_ROUTE],
};

const CreateJournal = () => {
    const [formData, setFormData] = useState<TripFormData>(INITIAL_FORM_DATA);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await TripApi.createTripWithRoutes(
                {
                    title: formData.title,
                    description: formData.description,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                },
                formData.routes,
                1
            );

            console.log("Trip and routes created successfully");
        } catch (error) {
            console.error("Error creating trip:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleRouteChange = (index: number, field: keyof RouteData, value: string) => {
        setFormData(prev => ({
            ...prev,
            routes: prev.routes.map((route, i) =>
                i === index ? { ...route, [field]: value } : route
            ),
        }));
    };

    const addRoute = () => {
        setFormData(prev => ({
            ...prev,
            routes: [...prev.routes, { ...INITIAL_ROUTE }],
        }));
    };

    const removeRoute = (index: number) => {
        if (formData.routes.length === 1) return;
        setFormData(prev => ({
            ...prev,
            routes: prev.routes.filter((_, i) => i !== index),
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="create-container">
            <TripForm
                title={formData.title}
                description={formData.description}
                startDate={formData.startDate}
                endDate={formData.endDate}
                onInputChange={handleInputChange}
            />
            <RouteForm
                routes={formData.routes}
                onRouteChange={handleRouteChange}
                onAddRoute={addRoute}
                onRemoveRoute={removeRoute}
                isSubmitting={isSubmitting}
            />
        </form>
    );
};

export default CreateJournal;