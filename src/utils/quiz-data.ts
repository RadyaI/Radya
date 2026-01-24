export interface Question {
  id: number;
  q: string;
  options: string[];
  correctIndex: number;
}

export interface QuizSet {
  slug: string;
  title: string;
  description: string;
  category: string;
  level: "Easy" | "Medium" | "Hard";
  questions: Question[];
  color: string;
}

export const quizData: QuizSet[] = [
  {
    slug: "java-basic",
    title: "Java Dasar",
    description: "Latihan dasar untuk pemula bahasa pemrograman Java.",
    category: "Programming",
    level: "Easy",
    color: "bg-red-500",
    questions: [
      {
        id: 1,
        q: "Apa keyword yang digunakan untuk mendefinisikan kelas di Java?",
        options: ["class", "struct", "define", "object"],
        correctIndex: 0,
      },
      {
        id: 2,
        q: "Manakah method utama (main method) yang valid di Java?",
        options: [
          "public void main(String[] args)",
          "public static void main(String[] args)",
          "static void main(String args)",
          "public main(String[] args)",
        ],
        correctIndex: 1,
      },
      {
        id: 3,
        q: "Tipe data untuk menyimpan nilai benar atau salah adalah...",
        options: ["int", "string", "boolean", "float"],
        correctIndex: 2,
      },
      {
        id: 4,
        q: "Perintah untuk mencetak teks ke konsol di Java adalah...",
        options: ["print()", "System.out.println()", "console.log()", "echo"],
        correctIndex: 1,
      },
      {
        id: 5,
        q: "Setiap statement di Java harus diakhiri dengan tanda...",
        options: [":", ",", ";", "."],
        correctIndex: 2,
      },
    ],
  },
  {
    slug: "database-basic",
    title: "Konsep Basis Data",
    description: "Pemahaman dasar tentang SQL dan manajemen basis data.",
    category: "Database",
    level: "Easy",
    color: "bg-blue-500",
    questions: [
      {
        id: 1,
        q: "Kepanjangan dari SQL adalah...",
        options: [
          "Structured Query Language",
          "Strong Question Language",
          "Structured Question List",
          "Simple Query Language",
        ],
        correctIndex: 0,
      },
      {
        id: 2,
        q: "Perintah SQL untuk mengambil data dari tabel adalah...",
        options: ["GET", "SELECT", "FETCH", "PULL"],
        correctIndex: 1,
      },
      {
        id: 3,
        q: "Apa yang dimaksud dengan Primary Key?",
        options: [
          "Kunci cadangan",
          "Kolom yang boleh kosong",
          "Pengidentifikasi unik untuk setiap baris",
          "Kunci asing dari tabel lain",
        ],
        correctIndex: 2,
      },
      {
        id: 4,
        q: "Perintah untuk menghapus tabel di SQL adalah...",
        options: ["DELETE", "REMOVE", "DROP", "ERASE"],
        correctIndex: 2,
      },
      {
        id: 5,
        q: "Manakah yang merupakan tipe data string di SQL?",
        options: ["INT", "VARCHAR", "FLOAT", "BOOLEAN"],
        correctIndex: 1,
      },
    ],
  },
  {
    slug: "python-basic",
    title: "Python untuk Pemula",
    description: "Tes pengetahuan sintaks dasar Python.",
    category: "Programming",
    level: "Easy",
    color: "bg-yellow-500",
    questions: [
      {
        id: 1,
        q: "Bagaimana cara membuat komentar satu baris di Python?",
        options: ["// Komentar", "/* Komentar */", "# Komentar", ""],
        correctIndex: 2,
      },
      {
        id: 2,
        q: "Keyword untuk mendefinisikan fungsi di Python adalah...",
        options: ["func", "def", "function", "void"],
        correctIndex: 1,
      },
      {
        id: 3,
        q: "Python menggunakan apa untuk menandai blok kode?",
        options: ["Kurung kurawal {}", "Titik koma ;", "Indentasi", "Tanda kurung ()"],
        correctIndex: 2,
      },
      {
        id: 4,
        q: "Manakah cara yang benar untuk membuat variabel list?",
        options: ["x = {1, 2, 3}", "x = [1, 2, 3]", "x = (1, 2, 3)", "x = <1, 2, 3>"],
        correctIndex: 1,
      },
      {
        id: 5,
        q: "Output dari print(2 ** 3) adalah...",
        options: ["6", "5", "8", "9"],
        correctIndex: 2,
      },
    ],
  },
];