import { motion } from "framer-motion";

export default function ClawMachine() {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

            {/* Claw Machine Frame */}
            <div className="relative w-[500px] h-[600px] border-[10px] border-white/70 rounded-3xl bg-white/10 backdrop-blur-sm">

                {/* Moving Claw */}
                <motion.div
                    animate={{ x: [-150, 150, -150] }}
                    transition={{ repeat: Infinity, duration: 6 }}
                    className="absolute top-10 left-1/2 -translate-x-1/2"
                >
                    <div className="w-14 h-14 bg-white rounded-full shadow-xl" />
                </motion.div>

                {/* Floating Hearts */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{ y: [0, -15, 0] }}
                        transition={{
                            repeat: Infinity,
                            duration: 2 + i * 0.2,
                        }}
                        className="absolute bottom-12 text-2xl"
                        style={{ left: `${Math.random() * 85}%` }}
                    >
                        ❤️
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
