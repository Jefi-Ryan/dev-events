import { HugeiconsIcon } from '@hugeicons/react';
import { Location01Icon, DateTimeIcon } from "@hugeicons/core-free-icons";
import type { EventDetails } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";

const EventCard = ({ details } : {details: EventDetails }) => {
    return (
        <Link href={`/event/${details.slug}` } className="group flex flex-col max-w-sm w-full text-[clamp(16px,2vw,20px)] overflow-hidden rounded-2xl transition-transform duration-300 ease-out hover:z-10 hover:scale-105">
            <Image src={details.image} alt={details.title} width={800} height={600}  className="h-40 w-full shrink-0 object-cover" />
            <div className="bg-emerald-950 group-hover:bg-emerald-900 flex flex-col space-y-1 w-full flex-1 p-3">
                <p className='font-medium pb-1'> {details.title} </p>
                <div className='flex flex-row items-center space-x-1'>
                    <HugeiconsIcon icon={DateTimeIcon} size={15}/>
                    <p className="text-[clamp(12px,1.2vw,14px)]"> {details.date.split("T")[0]} - {details.time}</p>
                </div>
                <div className='flex flex-row items-center space-x-1'>
                    <HugeiconsIcon icon={Location01Icon} size={15}/>
                    <p className="text-[clamp(12px,1.2vw,14px)]"> {details.location} </p>
                </div>
            </div>
        </Link>
    )
}

export default EventCard;