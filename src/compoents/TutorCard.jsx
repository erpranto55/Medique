import Link from "next/link";

const TutorCard = ({ tutor }) => {
  return (
    <div className="card bg-base-100 shadow-xl hover:-translate-y-2 duration-300">
      
      <figure className="h-64 overflow-hidden">
        <img
          src={tutor.image}
          alt={tutor.name}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">
          {tutor.name}
        </h2>

        <p className="text-primary font-semibold">
          {tutor.subject}
        </p>

        <div className="space-y-1 text-sm">
          <p>
            Experience: {tutor.experience}
          </p>

          <p>
            Teaching Mode: {tutor.mode}
          </p>

          <p>
            Hourly Fee: ${tutor.fee}
          </p>
        </div>

        <div className="card-actions mt-4">
          <Link
            href={`/tutors/${tutor.id}`}
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