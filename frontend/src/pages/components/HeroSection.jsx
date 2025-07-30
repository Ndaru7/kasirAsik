import heroImage from '../../assets/photo/hero-image.png'; // ganti path dengan gambar kamu
import Animation from '../../assets/animation.mp4'

const HeroSection = () => {
    return (
        <section className="w-full bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">
                {/* Left Text */}
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Bukan Sekadar Aplikasi<br />Tapi Partner Setia yang Nggak Pernah Cuti
                    </h1>
                    <p className="mt-6 text-gray-600 text-lg">
                        Dirancang buat bantu kamu yang sibuk jualan, ngatur stok, dan ngitung cuan. Tanpa ribet, tanpa drama. KasirKita kerja siang-malam biar kamu bisa fokus ke hal yang lebih penting — kayak istirahat.</p>


                    {/* Powered by */}
                    <div className="mt-12 text-sm text-gray-500">
                        <span className="block mb-2 font-medium">Powered by:</span>
                        <div className="flex items-center gap-6 justify-center lg:justify-start">
                            <span className="text-base font-semibold">React</span>
                            <span className="text-base font-semibold">Django</span>
                        </div>
                    </div>
                </div>

                {/* Right: Video from local */}
                <div className="lg:w-1/2 aspect-video rounded-xl overflow-hidden shadow-lg">
                    <video
                        src={`${Animation}`}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover pointer-events-none"
                    />
                </div>


            </div>
        </section>
    );
};

export default HeroSection;
