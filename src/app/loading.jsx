const Loading = () => {

    return (

        <div className="min-h-screen flex items-center justify-center bg-base-100">

            <div className="flex flex-col items-center gap-6">

                {/* DAISY UI SPINNER */}
                <span className="loading loading-spinner loading-xl text-primary"></span>

                {/* BRAND */}
                <h2 className="text-3xl font-bold text-primary">
                    MediQueue
                </h2>

                {/* TEXT */}
                <p className="text-base-content/70 text-lg">
                    Loading...
                </p>

            </div>

        </div>
    );
};

export default Loading;