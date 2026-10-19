import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BASE_URL } from "../../page";
import { cacheLife } from "next/cache";

type EventPageProps = {
    params: Promise<{ slug: string }>;
};

const EventDetailsPage = ({ params }: EventPageProps) => (
    <Suspense fallback={<p>Loading event details...</p>}>
        <EventDetails params={params} />
    </Suspense>
);

const EventDetails = async ({ params }: EventPageProps) => {

    "use cache";
    cacheLife("hours");
    
    try {
        
        const { slug } = await params;
        const response = await fetch(`${BASE_URL}/api/events/${slug}`);
        if (!response.ok) throw new Error("Could not fetch event details.");
        const details = await response.json();

        if (!details) {
            notFound();
        }

        return (
            <div>
                <Image src={details.image} alt={details.title} height={120} width={200} />
                <div>
                    <h1>{details.title}</h1>
                    <p>Venue: {details.location}</p>
                    <p>Date: {details.date}</p>
                    <p>Time: {details.time}</p>
                    <p>Organiser: {details.organiser}</p>
                </div>
            </div>
        )
        
    } catch (error) {
        console.log(error);
    }
}

export default EventDetailsPage;