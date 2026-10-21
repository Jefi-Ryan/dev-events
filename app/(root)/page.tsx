import EventCard from "@/components/EventCard";
import type { EventDetails } from "@/lib/data";
import { cacheLife, io } from "next/cache";
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
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
        throw new Error("NEXT_PUBLIC_BASE_URL is not configured");
    }

    await io();
    const events = await getEvents(baseUrl);

    return (
        <div>
            <h1 className="text-[clamp(25px,3vw,36px)] mb-5 text-center font-extrabold">Explore events</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center gap-4">
                {events.map((event) => (
                    <EventCard key={event.title} details={event} />
                ))}
            </div>
        </div>
    )
}

const getEvents = async (baseUrl: string): Promise<EventDetails[]> => {
    "use cache";
    cacheLife("hours");

    const response = await fetch(`${baseUrl}/api/events`);
    if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
    }

    const { events }: { events: EventDetails[] } = await response.json();
    return events;
}

export default HomePage;