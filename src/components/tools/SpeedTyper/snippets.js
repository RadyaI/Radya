const wordsID = [
    "saya", "kami", "dirimu", "dirinya", "seseorang", "semua", "banyak", "sedikit",
    "setiap", "beberapa", "sesuatu", "apapun", "siapa", "apa", "mana", "kapan", "bagaimana",

    "namun", "meskipun", "walaupun", "sehingga", "sementara", "sebelum", "sesudah",
    "ketika", "selama", "hingga", "tanpa", "agar", "supaya",

    "bangun", "mandi", "sarapan", "berangkat", "pulang", "istirahat", "berjalan",
    "berbicara", "tersenyum", "tertawa", "menunggu", "mencoba", "mengingat",
    "melupakan", "memulai", "mengakhiri",

    "membuat", "mengambil", "memberi", "menerima", "menyimpan", "menghapus",
    "mencari", "menemukan", "memilih", "mengubah", "mengirim", "membuka",
    "menutup", "menjalankan", "menghentikan",

    "mudah", "sulit", "aman", "berbahaya", "nyaman", "cepat", "lamban",
    "stabil", "rusak", "lengkap", "kosong", "penuh", "rapi", "acak",
    "sederhana", "kompleks",

    "senang", "sedih", "marah", "tenang", "cemas", "percaya", "ragu",
    "takut", "berani", "optimis", "pesimis", "fokus", "lelah", "semangat",

    "sekolah", "kampus", "kantor", "kelas", "ruangan", "taman", "pantai",
    "gunung", "sungai", "danau", "hutan", "desa", "pasar", "terminal",
    "stasiun", "bandara",

    "pertama", "kedua", "ketiga", "terakhir", "awal", "akhir", "sekarang",
    "sebentar", "sejenak", "lama", "cepat", "tepat", "terlambat",

    "suara", "gambar", "teks", "angka", "huruf", "kata", "kalimat",
    "paragraf", "cerita", "berita", "pesan", "email", "file",
    "arsip", "dokumen",

    "mengetik", "menekan", "menggeser", "mengklik", "menyalin",
    "menempel", "mengedit", "mengulang", "memperbaiki", "membatalkan"
];


const wordsEN = [
    "myself", "yourself", "himself", "herself", "itself",
    "ourselves", "themselves", "someone", "something", "everything",
    "nothing", "everyone", "anyone", "each", "every", "either", "neither",

    "although", "though", "while", "whereas", "unless", "until",
    "before", "afterward", "meanwhile", "therefore", "however",
    "otherwise", "instead", "besides", "toward", "within", "without",

    "run", "walk", "sit", "stand", "move", "stop", "start",
    "build", "create", "change", "improve", "remove", "delete",
    "add", "save", "load", "send", "receive", "check", "test",
    "fix", "break", "learn", "teach", "remember", "forget",
    "follow", "lead", "watch", "listen", "write", "read", "speak",

    "wake", "sleep", "eat", "drink", "cook", "drive", "travel",
    "arrive", "leave", "wait", "try", "decide", "choose", "plan",
    "finish", "begin", "continue", "practice", "repeat",

    "easy", "hard", "simple", "complex", "safe", "dangerous",
    "fast", "slow", "strong", "weak", "clean", "dirty", "quiet",
    "loud", "bright", "dark", "smooth", "rough", "sharp", "soft",
    "modern", "classic", "public", "private", "local", "global",

    "happy", "sad", "angry", "calm", "nervous", "confident",
    "afraid", "brave", "tired", "focused", "excited", "bored",
    "curious", "proud", "relaxed", "stressed",

    "today", "tomorrow", "yesterday", "morning", "evening",
    "night", "early", "late", "soon", "already", "finally",
    "initial", "next", "previous", "current", "future",

    "home", "office", "school", "campus", "room", "building",
    "street", "city", "village", "country", "world", "park",
    "beach", "mountain", "river", "forest", "station", "airport",

    "book", "table", "chair", "window", "door", "light",
    "screen", "keyboard", "mouse", "cable", "battery",
    "phone", "computer", "device", "machine", "tool",
    "paper", "note", "message", "email", "file", "folder",

    "type", "press", "click", "scroll", "drag", "drop",
    "copy", "paste", "edit", "undo", "redo", "select",

    "server", "client", "database", "query", "function",
    "variable", "array", "object", "class", "method",
    "request", "response", "cache", "debug", "deploy",
    "update", "version", "feature", "issue", "error",
    "framework", "library", "package", "runtime",

    "button", "icon", "menu", "navbar", "footer", "header",
    "page", "layout", "design", "theme", "color",
    "input", "output", "form", "validation", "responsive",

    "idea", "reason", "result", "effect", "cause",
    "problem", "solution", "process", "progress",
    "success", "failure", "goal", "plan", "option",
    "choice", "value", "quality", "balance"
];


export const generateParagraph = (lang = 'id', length = 30) => {
    const source = lang === 'id' ? wordsID : wordsEN;
    const result = [];
    
    for (let i = 0; i < length; i++) {
        const randomWord = source[Math.floor(Math.random() * source.length)];
        result.push(randomWord);
    }
    
    return {
        text: result.join(" "),
        lang: lang === 'id' ? "Indonesia" : "English"
    };
};