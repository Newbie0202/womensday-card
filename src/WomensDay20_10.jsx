import React, { useMemo, useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";

export default function WomensDay20_10() {
  const [step, setStep] = useState("qr"); // qr -> envelope -> card
  const [recipient, setRecipient] = useState("Em");
  const [sender, setSender] = useState("Anh");
  const [title, setTitle] = useState("Chúc Mừng 20–10 ✨");
  const [subtitle, setSubtitle] = useState("Vietnamese Women's Day");
  const [message, setMessage] = useState(
    `Gửi Em,\n\nTrong vườn hồng chiều nay, anh nhặt một tia nắng\nGói vào lá thư nhỏ, gửi đến trái tim ngoan.\nChúc em 20–10 rạng rỡ như hoa,\nBình yên như gió, và hạnh phúc như có anh ở đây.\n\n— Anh`
  );

  const syncedMessage = useMemo(() => {
    return message
      .replaceAll("Gửi Tiểu Ngọc", `Gửi ${recipient}`)
      .replaceAll("— Anh", `— ${sender}`);
  }, [message, recipient, sender]);

  const [song, setSong] = useState("rose");
  const cardRef = useRef(null);
  const audioRef = useRef(null);

  const playlist = {
    rose: { name: "Tặng Em Đóa Hoa Hồng", url: "/music/Tangemdoahoahong.mp3" },
    love: { name: "Love Story", url: "/music/Love Story.mp3" },
    piano: { name: "Romantic Piano", url: "/music/Romatic.mp3" }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = playlist[song].url;
      audioRef.current.volume = 0.4;
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => console.warn("Autoplay bị chặn."));
      }
    }
  }, [song]);

  async function downloadPNG() {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current, { backgroundColor: null, scale: 2, useCORS: true });
    const link = document.createElement("a");
    link.download = `thiep-20-10-${recipient}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-br from-pink-50 via-rose-50 to-red-100 relative overflow-hidden">
      <audio ref={audioRef} preload="auto" autoPlay loop />

      {/* Dropdown chọn nhạc */}
      <div className="absolute top-6 right-6 bg-white/70 backdrop-blur px-4 py-3 rounded-2xl text-rose-600 font-medium shadow-md flex gap-2 z-50 border border-rose-100">
        <select
          value={song}
          onChange={(e) => setSong(e.target.value)}
          className="rounded-lg border border-rose-200 text-rose-700 bg-white/80 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-rose-300"
        >
          <option value="rose">Tặng Em Đóa Hoa Hồng</option>
          <option value="love">Love Story</option>
          <option value="piano">Romantic Piano</option>
        </select>
      </div>

      {/* Hoa nền nhẹ nhàng hơn */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-pink-300/30 text-3xl select-none"
          initial={{ y: Math.random() * 600, x: Math.random() * window.innerWidth, opacity: 0 }}
          animate={{ y: [Math.random() * 600, -100], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 12 + Math.random() * 6, repeat: Infinity, ease: "easeInOut" }}
        >
          🌸
        </motion.div>
      ))}

      {/* Các bước hiển thị */}
      <AnimatePresence mode="wait">
        {step === "qr" && (
          <motion.div
            key="qr"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center justify-center text-center bg-white/85 backdrop-blur-lg px-12 py-14 rounded-3xl shadow-lg border border-rose-100 hover:shadow-rose-200 transition duration-500 ease-in-out"
          >
            <h1 className="text-3xl font-bold text-rose-600 mb-4">
              🎁 Quét mã để mở thư bí mật 💌😊🌸
            </h1>

            <p className="text-rose-500 text-lg italic mb-6 max-w-md">
              Mỗi bức thư là một món quà nhỏ... Quét mã để mở ra điều anh muốn gửi đến em 💕
            </p>

            <div className="p-3 bg-white rounded-2xl shadow-inner border border-rose-100">
              <QRCode value="https://your-vercel-link.vercel.app" size={160} />
            </div>

            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: '#f87171' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep('envelope')}
              className="mt-8 px-6 py-3 bg-rose-500 text-white rounded-xl shadow-md font-semibold text-lg tracking-wide transition-all"
            >
              💞 Tôi đã quét xong – mở thư 💌
            </motion.button>
          </motion.div>
        )}

        {step === "envelope" && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col items-center"
          >
            <motion.div
              className="w-64 h-40 bg-gradient-to-r from-pink-400 to-rose-400 rounded-t-xl shadow-lg relative overflow-hidden"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              transition={{ duration: 1.2, delay: 1.2 }}
            />
            <motion.div
              className="w-64 h-40 bg-rose-200 shadow-xl rounded-b-xl flex flex-col justify-center items-center"
              animate={{ y: [-10, 0, -10] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <p className="text-rose-600 font-semibold">Thư gửi {recipient}</p>
            </motion.div>
            <motion.button
              onClick={() => setStep("card")}
              className="mt-8 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl shadow-lg font-bold"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              💌 Mở thư
            </motion.button>
          </motion.div>
        )}

        {step === "card" && (
          <motion.div
            key="card"
            ref={cardRef}
            className="w-[90%] max-w-3xl bg-white/90 px-10 py-12 rounded-3xl shadow-2xl ring-2 ring-rose-200"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <h1 className="text-center text-6xl font-extrabold text-rose-600 mb-6 drop-shadow-lg animate-pulse">{title}</h1>
            <p className="text-center text-rose-400 mb-8 text-xl italic">{subtitle}</p>
            <div className="relative px-4">
              <motion.div
                className="absolute -left-8 -top-8 text-5xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
              >
                💖
              </motion.div>
              <p className="whitespace-pre-wrap text-rose-700 leading-8 text-lg text-center font-medium">
                {syncedMessage}
              </p>
              <motion.div
                className="absolute -right-8 -bottom-8 text-5xl"
                animate={{ rotate: [-10, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5 }}
              >
                💞
              </motion.div>
            </div>
            <p className="text-right text-rose-500 mt-10 text-xl font-semibold">— {sender}</p>

            <div className="mt-6 flex flex-col items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadPNG}
                className="px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl shadow-lg font-bold"
              >
                💌 Tải thiệp (PNG)
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
