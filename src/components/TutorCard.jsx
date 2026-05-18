import Image from "next/image";
import Link from "next/link";

const TutorCard = ({ tutor }) => {

  const {
    id,
    name,
    subject,
    image,
    experience,
    fee,
    location,
  } = tutor;

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">

      <figure className="h-64 overflow-hidden">

        <Image
          src={image}
          alt={name}
          height={300}
          width={300}
          className="w-full h-full object-cover hover:scale-105 transition duration-500"
        />
      </figure>

      <div className="card-body">

        <div className="flex justify-between items-center">

          <h2 className="card-title">
            {name}
          </h2>

          <div className="badge badge-primary">
            {subject}
          </div>
        </div>

        <div className="space-y-2 mt-2 text-sm">

          <p>
            <span className="font-semibold">
              Experience:
            </span>{" "}
            {experience}
          </p>

          <p>
            <span className="font-semibold">
              Location:
            </span>{" "}
            {location}
          </p>

          <p>
            <span className="font-semibold">
              Hourly Fee:
            </span>{" "}
            ${fee}
          </p>

        </div>

        <div className="card-actions mt-5">

          <Link
            href={`/tutors/${id}`}
            className="btn btn-primary w-full"
          >
            Book Session
          </Link>

        </div>
      </div>
    </div>
  );
};

export default TutorCard;