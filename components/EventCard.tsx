import type { EventDetails } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const EventCard = ({ details } : {details: EventDetails }) => {
    return (
        <Link href={`/event/${details.slug}`}>
            <Image src={details.image} alt={details.title} width={200} height={170} />
            <p> {details.title} </p>
            <p> {details.date} - {details.time}</p>
            <p> {details.location} </p>
        </Link>
    )
}

export default EventCard;