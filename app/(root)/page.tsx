import EventCard from "@/components/EventCard";
import type { EventDetails } from "@/lib/data";
import { cacheLife } from "next/cache";
import { Suspense } from "react";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const HomePage = () => {
    return (
        <Suspense fallback={<p>Loading events...</p>}>
            <Home />
        </Suspense>
    )
}

const Home = async () => {
    "use cache";
    cacheLife("hours");

    if (!BASE_URL) {
        throw new Error("NEXT_PUBLIC_BASE_URL is not configured");
    }

    const response = await fetch(`${BASE_URL}/api/events`);
    if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
    }

    const { events }: { events: EventDetails[] } = await response.json();

    return (
        <div>
            <h1>Explore events</h1>
            <div className="events">
                {events.map((event: EventDetails) => (
                    <EventCard key={event.title} details={event} />
                ))}
            </div>
        </div>
    )
}

export default HomePage;