import { Suspense } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BASE_URL } from "../../page";
import { cacheLife } from "next/cache";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    Calendar01Icon,
    Clock01Icon,
    Location01Icon,
    UserIcon,
} from "@hugeicons/core-free-icons";

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
            <div className="flex flex-col items-center">
                <Image
                    src={details.image}
                    alt={details.title}
                    height={700}
                    width={600}
                    className="mb-10 h-auto max-h-[70vh] max-w-full rounded-2xl object-contain"
                />
                <div className="flex flex-col space-y-2">
                    <h1 className="text-[clamp(24px,4vw,40px)]">{details.title}</h1>
                    <div className="flex items-center gap-2 text-[clamp(14px,1.5vw,18px)]">
                        <HugeiconsIcon icon={Location01Icon} size={18} />
                        <p>Venue: {details.location}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[clamp(14px,1.5vw,18px)]">
                        <HugeiconsIcon icon={Calendar01Icon} size={18} />
                        <p>Date: {details.date}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[clamp(14px,1.5vw,18px)]">
                        <HugeiconsIcon icon={Clock01Icon} size={18} />
                        <p>Time: {details.time}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[clamp(14px,1.5vw,18px)]">
                        <HugeiconsIcon icon={UserIcon} size={18} />
                        <p>Organiser: {details.organiser}</p>
                    </div>
                </div>
            </div>
        )
        
    } catch (error) {
        console.log(error);
    }
}

export default EventDetailsPage;