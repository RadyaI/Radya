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
  status?: "New",
  questions: Question[];
  color: string;
}

export const quizData: QuizSet[] = [
  //========================konsep-dasar-basis-data=========================//
  {
    slug: "konsep-dasar-basis-data",
    title: "Konsep Dasar Basis Data",
    description: "Quiz dasar Modul 1 Basis Data: database, DBMS, ERD, CDM, PDM, entitas, dan atribut.",
    category: "Database",
    level: "Easy",
    status: "New",
    color: "#4f46e5",
    questions: [
      {
        id: 0,
        q: "Apa kepanjangan dari DBMS?",
        options: [
          "Data Base Main System",
          "Database Managed Software",
          "Data Management Storage System",
          "Database Management System"
        ],
        correctIndex: 3
      },
      {
        id: 1,
        q: "Apa yang dimaksud dengan basis data?",
        options: [
          "Kumpulan data yang tersimpan secara acak",
          "Kumpulan data terpusat dan terstruktur dalam sistem komputer",
          "Program untuk menulis kode",
          "Aplikasi pengolah kata"
        ],
        correctIndex: 1
      },
      {
        id: 2,
        q: "Sistem yang digunakan untuk mengelola basis data disebut?",
        options: ["Compiler", "Interpreter", "DBMS", "Framework"],
        correctIndex: 2
      },
      {
        id: 3,
        q: "Fungsi utama DBMS adalah, kecuali?",
        options: [
          "Menambah data",
          "Menghapus data",
          "Mengubah data",
          "Mengedit gambar"
        ],
        correctIndex: 3
      },
      {
        id: 4,
        q: "Model database yang menyajikan data dalam bentuk tabel disebut?",
        options: [
          "Database hierarkis",
          "Database relasional",
          "Database jaringan",
          "Database objek"
        ],
        correctIndex: 1
      },
      {
        id: 5,
        q: "Baris dalam tabel pada database relasional merepresentasikan?",
        options: ["Kolom", "Field", "Record", "Atribut"],
        correctIndex: 2
      },
      {
        id: 6,
        q: "Kolom pada tabel merepresentasikan?",
        options: ["Record", "Relasi", "Atribut", "Baris"],
        correctIndex: 2
      },
      {
        id: 7,
        q: "Kunci unik untuk mengidentifikasi setiap baris pada tabel disebut?",
        options: ["Foreign Key", "Candidate Key", "Primary Key", "Composite Key"],
        correctIndex: 2
      },
      {
        id: 8,
        q: "Kolom yang merujuk ke primary key pada tabel lain disebut?",
        options: ["Primary Key", "Foreign Key", "Index", "Trigger"],
        correctIndex: 1
      },
      {
        id: 11,
        q: "CDM merupakan singkatan dari?",
        options: [
          "Conceptual Data Model",
          "Central Data Model",
          "Concept Data Management",
          "Common Data Model"
        ],
        correctIndex: 0
      },
      {
        id: 12,
        q: "Ciri utama CDM adalah?",
        options: [
          "Sudah memiliki tipe data",
          "Berfokus pada struktur fisik database",
          "Belum menggunakan tipe data",
          "Sudah siap diimplementasikan ke DBMS"
        ],
        correctIndex: 2
      },
      {
        id: 13,
        q: "PDM merupakan singkatan dari?",
        options: [
          "Physical Data Model",
          "Primary Data Model",
          "Process Data Model",
          "Program Data Model"
        ],
        correctIndex: 0
      },
      {
        id: 14,
        q: "Perbedaan utama PDM dibanding CDM adalah?",
        options: [
          "Tidak memiliki relasi",
          "Tidak memiliki atribut",
          "Sudah memiliki tipe data dan struktur fisik",
          "Tidak bisa diimplementasikan"
        ],
        correctIndex: 2
      },
      {
        id: 15,
        q: "Objek utama atau Tabel yang menjadi fokus dalam perancangan database disebut?",
        options: ["Atribut", "Relasi", "Entitas", "Kardinalitas"],
        correctIndex: 2
      },
      {
        id: 16,
        q: "Entitas yang dapat berdiri sendiri tanpa entitas lain disebut?",
        options: [
          "Intersection entity",
          "Characteristic entity",
          "Prime entity",
          "Weak entity"
        ],
        correctIndex: 2
      },
      {
        id: 17,
        q: "Entitas yang muncul karena relasi many to many disebut?",
        options: [
          "Prime entity",
          "Characteristic entity",
          "Intersection entity",
          "Dependent entity"
        ],
        correctIndex: 2
      },
      {
        id: 18,
        q: "Properti yang mendeskripsikan suatu entitas disebut?",
        options: ["Relasi", "Atribut", "Kardinalitas", "Primary Key"],
        correctIndex: 1
      },
      {
        id: 19,
        q: "Atribut yang tidak boleh bernilai kosong (null) disebut?",
        options: ["Optional", "Volatile", "Mandatory", "Composite"],
        correctIndex: 2
      },
      {
        id: 20,
        q: "Contoh atribut non-volatil adalah?",
        options: ["Umur", "Jumlah saldo", "Tanggal lahir", "Status aktif"],
        correctIndex: 2
      }
    ]
  },
  //========================Studi Kasus Pemodelan Data Relasional=========================//
  {
    slug: "modul-2-studi-kasus",
    title: "Studi Kasus Pemodelan Data Relasional",
    description: "Quiz Modul 2 berbasis studi kasus: UID, relasi, kardinalitas, opsionalitas, ERD, dan precision & scale.",
    category: "Database",
    level: "Easy",
    status: "New",
    color: "#0f766e",
    questions: [
      {
        id: 1,
        q: "Pada sistem akademik, setiap mahasiswa memiliki NIM yang tidak boleh kosong dan tidak berubah. NIM paling tepat digunakan sebagai?",
        options: ["Atribut opsional", "Artificial UID", "Simple UID", "Composite UID"],
        correctIndex: 2
      },
      {
        id: 2,
        q: "Satu mahasiswa dapat mengambil banyak mata kuliah dan satu mata kuliah dapat diambil oleh banyak mahasiswa. Relasi yang tepat adalah?",
        options: ["One-to-One", "One-to-Many", "Many-to-Many", "Many-to-One"],
        correctIndex: 2
      },
      {
        id: 3,
        q: "Untuk merepresentasikan relasi many-to-many antara Mahasiswa dan Mata Kuliah, solusi yang benar adalah?",
        options: [
          "Menambahkan foreign key di salah satu tabel",
          "Menggabungkan kedua tabel",
          "Menambahkan entitas penghubung (intersection)",
          "Menghapus salah satu entitas"
        ],
        correctIndex: 2
      },
      {
        id: 4,
        q: "Tabel KRS memiliki primary key gabungan dari NIM dan Kode_MK. Jenis UID pada tabel KRS adalah?",
        options: ["Simple UID", "Artificial UID", "Composite UID", "Optional UID"],
        correctIndex: 2
      },
      {
        id: 5,
        q: "Dalam sistem pegawai, atribut nama_tengah boleh diisi atau tidak. Atribut ini termasuk?",
        options: ["Mandatory", "Volatile", "Optional", "UID"],
        correctIndex: 2
      },
      {
        id: 6,
        q: "Satu dealer dapat memiliki banyak mobil, tetapi satu mobil hanya berada pada satu dealer. Kardinalitas relasi yang tepat adalah?",
        options: ["One-to-One", "Many-to-Many", "One-to-Many", "Many-to-One"],
        correctIndex: 2
      },
      {
        id: 7,
        q: "Pada ERD, relasi dengan garis putus-putus menandakan bahwa relasi tersebut bersifat?",
        options: ["Mandatory", "Optional", "Composite", "Artificial"],
        correctIndex: 1
      },
      {
        id: 8,
        q: "Atribut harga_produk disimpan menggunakan tipe data DECIMAL(10,2). Angka 10 menunjukkan?",
        options: ["Jumlah digit di belakang koma", "Jumlah total digit", "Nilai maksimum", "Jumlah record"],
        correctIndex: 1
      },
      {
        id: 9,
        q: "Jika sebuah atribut bertipe DECIMAL(8,3), maka jumlah digit maksimal setelah koma adalah?",
        options: ["8", "5", "3", "11"],
        correctIndex: 2
      },
      {
        id: 10,
        q: "Tujuan utama penggunaan precision dan scale pada data keuangan adalah?",
        options: [
          "Mempercepat query",
          "Menghemat storage",
          "Menjaga ketelitian dan integritas data",
          "Menghindari penggunaan foreign key"
        ],
        correctIndex: 2
      },
      {
        id: 11,
        q: "Pada proses konversi CDM ke PDM, perubahan utama yang terjadi adalah?",
        options: [
          "Penghapusan relasi",
          "Penambahan tipe data dan constraint",
          "Penghilangan entitas",
          "Perubahan nama atribut menjadi bebas"
        ],
        correctIndex: 1
      },
      {
        id: 12,
        q: "Mengapa setiap entitas wajib memiliki UID?",
        options: [
          "Agar bisa digambar di ERD",
          "Agar relasi menjadi optional",
          "Agar setiap data dapat diidentifikasi secara unik",
          "Agar mudah dikonversi ke CDM"
        ],
        correctIndex: 2
      },
      {
        id: 13,
        q: "Dalam sistem penjualan, nomor invoice dibuat otomatis oleh sistem dan tidak memiliki makna bisnis. Nomor invoice paling tepat dikategorikan sebagai?",
        options: ["Simple UID", "Composite UID", "Artificial UID", "Optional UID"],
        correctIndex: 2
      },
      {
        id: 14,
        q: "Satu buku hanya ditulis oleh satu penulis, tetapi satu penulis dapat menulis banyak buku. Relasi yang tepat adalah?",
        options: ["One-to-One", "Many-to-Many", "One-to-Many", "Many-to-One"],
        correctIndex: 2
      },
      {
        id: 15,
        q: "Jika relasi antara Buku dan Penerbit bersifat opsional di sisi Buku, artinya?",
        options: [
          "Setiap buku wajib punya penerbit",
          "Buku boleh tidak memiliki penerbit",
          "Penerbit wajib punya buku",
          "Relasi harus many-to-many"
        ],
        correctIndex: 1
      },
      {
        id: 16,
        q: "Mengapa relasi many-to-many tidak langsung diimplementasikan pada PDM?",
        options: [
          "Tidak didukung DBMS",
          "Sulit digambar di ERD",
          "Harus dipecah menjadi tabel penghubung",
          "Tidak memiliki UID"
        ],
        correctIndex: 2
      },
      {
        id: 17,
        q: "Pada tabel penghubung, primary key paling umum dibentuk dari?",
        options: [
          "Satu artificial UID",
          "Salah satu foreign key",
          "Gabungan foreign key dari tabel asal",
          "Atribut opsional"
        ],
        correctIndex: 2
      },
      {
        id: 18,
        q: "Jika atribut berat_barang membutuhkan ketelitian hingga 3 angka di belakang koma, tipe data yang tepat adalah?",
        options: ["INT", "DECIMAL(6,1)", "DECIMAL(8,3)", "VARCHAR"],
        correctIndex: 2
      },
      {
        id: 19,
        q: "Kesalahan umum jika tidak menerapkan precision & scale dengan benar adalah?",
        options: [
          "Query menjadi lambat",
          "Data numerik terpotong atau ditolak",
          "Relasi tidak terbentuk",
          "UID menjadi optional"
        ],
        correctIndex: 1
      },
      {
        id: 20,
        q: "Saat asisten meminta alasan penggunaan UID gabungan pada tabel KRS, jawaban paling tepat adalah?",
        options: [
          "Karena lebih hemat storage",
          "Karena mengikuti contoh modul",
          "Karena kombinasi NIM dan Kode MK memastikan keunikan data",
          "Karena tidak bisa membuat artificial UID"
        ],
        correctIndex: 2
      }
    ]
  }


]
