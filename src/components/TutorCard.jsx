import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaGraduationCap,
  FaArrowRight,
} from "react-icons/fa";

const TutorCard = ({ tutor }) => {
  const {
    _id,
    name,
    subject,
    photo,
    experience,
    fee,
    location,
    totalSlot,
  } = tutor;

  const [imageSrc, setImageSrc] = useState(
    photo &&
      photo.trim() !== "" &&
      photo.startsWith("http")
      ? photo
      : "/avatar.png"
  );

  return (
    <div
      className="
            group
            overflow-hidden
            rounded-[32px]
            border
            border-base-300/30
            bg-base-100/80
            backdrop-blur-xl
            shadow-xl
            hover:shadow-2xl
            hover:-translate-y-3
            transition-all
            duration-500
        "
    >
      {/* IMAGE */}
      <div className="relative h-72 overflow-hidden">

        <Image
          src={imageSrc}
          alt={name || "Tutor"}
          fill
          loading="eager"
          unoptimized
          onError={() => {
            if (imageSrc !== "/avatar.png") {
              setImageSrc("/avatar.png");
            }
          }}
          className="
        object-cover
        transition-transform
        duration-700
        group-hover:scale-110
    "
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

        {/* Subject Badge */}
        <div
          className="
                    absolute
                    top-4
                    left-4
                    px-4
                    py-2
                    rounded-full
                    bg-primary
                    text-primary-content
                    text-sm
                    font-semibold
                    shadow-lg
                "
        >
          {subject}
        </div>

        {/* Slots Badge */}
        <div
          className="
                    absolute
                    top-4
                    right-4
                    px-4
                    py-2
                    rounded-full
                    bg-success
                    text-success-content
                    text-sm
                    font-semibold
                    shadow-lg
                "
        >
          {totalSlot || 0} Slots
        </div>

        {/* Tutor Name */}
        <div className="absolute bottom-5 left-5 right-5">

          <h3 className="text-2xl font-bold text-white">
            {name}
          </h3>

          <div className="flex items-center gap-2 text-white/90 mt-1">
            <FaGraduationCap />
            <span>{experience}</span>
          </div>

        </div>
      </div>

      {/* BODY */}
      <div className="p-6">

        <div className="space-y-4">

          <div className="flex items-center gap-3">
            <div
              className="
                            w-10
                            h-10
                            rounded-xl
                            bg-primary/10
                            flex
                            items-center
                            justify-center
                            text-primary
                        "
            >
              <FaMapMarkerAlt />
            </div>

            <div>
              <p className="text-xs text-base-content/60">
                Location
              </p>

              <p className="font-medium">
                {location}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="
                            w-10
                            h-10
                            rounded-xl
                            bg-secondary/10
                            flex
                            items-center
                            justify-center
                            text-secondary
                        "
            >
              <FaMoneyBillWave />
            </div>

            <div>
              <p className="text-xs text-base-content/60">
                Hourly Fee
              </p>

              <p className="font-bold text-lg">
                ৳{fee}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div
              className="
                            w-10
                            h-10
                            rounded-xl
                            bg-accent/10
                            flex
                            items-center
                            justify-center
                            text-accent
                        "
            >
              <FaClock />
            </div>

            <div>
              <p className="text-xs text-base-content/60">
                Available Sessions
              </p>

              <p className="font-medium">
                {totalSlot || 0} Slots Available
              </p>
            </div>
          </div>

        </div>

        {/* CTA */}
        <Link
          href={`/tutors/${_id}`}
          className="
                    mt-6
                    w-full
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    px-6
                    py-4
                    rounded-2xl
                    bg-linear-to-r
                    from-primary
                    to-secondary
                    text-white
                    font-semibold
                    shadow-lg
                    hover:shadow-xl
                    transition-all
                    duration-300
                    hover:scale-[1.02]
                "
        >
          View Details
          <FaArrowRight />
        </Link>
      </div>
    </div>
  );
};

export default TutorCard;