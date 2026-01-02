export const getRank = (ms) => {
    if (ms < 200) return { title: "THE FLASH", desc: "Fix Curang 🫵 ngaku!", color: "text-purple-500" };
    if (ms < 220) return { title: "DOM TORETTO", desc: "Family is fast. You are family.", color: "text-red-500" };
    if (ms < 240) return { title: "PRO RACER", desc: "Refleks pembalap F1. Solid.", color: "text-orange-500" };
    if (ms < 290) return { title: "STREET RACER", desc: "Lumayan lah.", color: "text-yellow-500" };
    if (ms < 340) return { title: "OJOL", desc: "Santai banget bang, lagi bawa penumpang?", color: "text-green-500" };
    if (ms < 400) return { title: "GRANDMA", desc: "Nenek gue lebih cepet ngegasnya.", color: "text-blue-400" };
    return { title: "INTERNET EXPLORER", desc: "Loadingnya lama banget...", color: "text-gray-500" };
};

export const tips = [
    "Tunggu sampai layar HIJAU, baru klik!",
    "Jangan nge-gas duluan (False Start)!",
    "Fokus ke lampu indikator.",
    "Tarik napas...",
];