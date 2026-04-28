export type QuestionType = 'multiple-choice' | 'essay';

export interface Question {
  id: number;
  type?: QuestionType;
  q: string;
  options?: string[];
  correctIndex?: number;
  answerKey?: string;
  explanation?: string;
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
  // QUIZ 1
  {
    "slug": "konsep-dasar-basis-data",
    "title": "Konsep Dasar Basis Data",
    "description": "Quiz dasar Modul 1 Basis Data: database, DBMS, ERD, CDM, PDM, entitas, dan atribut.",
    "category": "Database",
    "level": "Easy",
    "color": "#4f46e5",
    "questions": [
      {
        "id": 0,
        "q": "Apa kepanjangan dari DBMS?",
        "options": [
          "Data Base Main System",
          "Database Managed Software",
          "Data Management Storage System",
          "Database Management System"
        ],
        "correctIndex": 3,
        "explanation": "DBMS adalah singkatan dari Database Management System, yaitu sistem yang digunakan untuk mengelola dan mengatur basis data."
      },
      {
        "id": 1,
        "q": "Apa yang dimaksud dengan basis data?",
        "options": [
          "Kumpulan data yang tersimpan secara acak",
          "Kumpulan data terpusat dan terstruktur dalam sistem komputer",
          "Program untuk menulis kode",
          "Aplikasi pengolah kata"
        ],
        "correctIndex": 1,
        "explanation": "Basis data merupakan kumpulan data yang disimpan secara terpusat, terstruktur, dan dapat diakses serta dikelola oleh sistem komputer."
      },
      {
        "id": 2,
        "q": "Sistem yang digunakan untuk mengelola basis data disebut?",
        "options": ["Compiler", "Interpreter", "DBMS", "Framework"],
        "correctIndex": 2,
        "explanation": "DBMS digunakan untuk menyimpan, mengelola, dan memanipulasi data dalam sebuah basis data."
      },
      {
        "id": 3,
        "q": "Fungsi utama DBMS adalah, kecuali?",
        "options": [
          "Menambah data",
          "Menghapus data",
          "Mengubah data",
          "Mengedit gambar"
        ],
        "correctIndex": 3,
        "explanation": "DBMS berfokus pada pengelolaan data, bukan untuk mengedit gambar atau multimedia."
      },
      {
        "id": 4,
        "q": "Model database yang menyajikan data dalam bentuk tabel disebut?",
        "options": [
          "Database hierarkis",
          "Database relasional",
          "Database jaringan",
          "Database objek"
        ],
        "correctIndex": 1,
        "explanation": "Database relasional menyimpan data dalam bentuk tabel yang saling berelasi menggunakan kunci."
      },
      {
        "id": 5,
        "q": "Baris dalam tabel pada database relasional merepresentasikan?",
        "options": ["Kolom", "Field", "Record", "Atribut"],
        "correctIndex": 2,
        "explanation": "Baris (row) pada tabel merepresentasikan satu record atau satu data lengkap."
      },
      {
        "id": 6,
        "q": "Kolom pada tabel merepresentasikan?",
        "options": ["Record", "Relasi", "Atribut", "Baris"],
        "correctIndex": 2,
        "explanation": "Kolom pada tabel menunjukkan atribut atau properti dari suatu entitas."
      },
      {
        "id": 7,
        "q": "Kunci unik untuk mengidentifikasi setiap baris pada tabel disebut?",
        "options": ["Foreign Key", "Candidate Key", "Primary Key", "Composite Key"],
        "correctIndex": 2,
        "explanation": "Primary Key digunakan untuk mengidentifikasi setiap record secara unik dalam sebuah tabel."
      },
      {
        "id": 8,
        "q": "Kolom yang merujuk ke primary key pada tabel lain disebut?",
        "options": ["Primary Key", "Foreign Key", "Index", "Trigger"],
        "correctIndex": 1,
        "explanation": "Foreign Key digunakan untuk membentuk relasi antar tabel dengan merujuk ke Primary Key tabel lain."
      },
      {
        "id": 11,
        "q": "CDM merupakan singkatan dari?",
        "options": [
          "Conceptual Data Model",
          "Central Data Model",
          "Concept Data Management",
          "Common Data Model"
        ],
        "correctIndex": 0,
        "explanation": "CDM adalah Conceptual Data Model, yaitu model data konseptual yang menggambarkan kebutuhan data secara umum."
      },
      {
        "id": 12,
        "q": "Ciri utama CDM adalah?",
        "options": [
          "Sudah memiliki tipe data",
          "Berfokus pada struktur fisik database",
          "Belum menggunakan tipe data",
          "Sudah siap diimplementasikan ke DBMS"
        ],
        "correctIndex": 2,
        "explanation": "CDM belum menggunakan tipe data karena masih berada pada tahap konseptual."
      },
      {
        "id": 13,
        "q": "PDM merupakan singkatan dari?",
        "options": [
          "Physical Data Model",
          "Primary Data Model",
          "Process Data Model",
          "Program Data Model"
        ],
        "correctIndex": 0,
        "explanation": "PDM adalah Physical Data Model, yaitu model data yang menggambarkan struktur fisik database."
      },
      {
        "id": 14,
        "q": "Perbedaan utama PDM dibanding CDM adalah?",
        "options": [
          "Tidak memiliki relasi",
          "Tidak memiliki atribut",
          "Sudah memiliki tipe data dan struktur fisik",
          "Tidak bisa diimplementasikan"
        ],
        "correctIndex": 2,
        "explanation": "PDM sudah mencakup tipe data dan struktur fisik sehingga siap diimplementasikan ke DBMS."
      },
      {
        "id": 15,
        "q": "Objek utama atau Tabel yang menjadi fokus dalam perancangan database disebut?",
        "options": ["Atribut", "Relasi", "Entitas", "Kardinalitas"],
        "correctIndex": 2,
        "explanation": "Entitas merupakan objek utama yang datanya disimpan dalam bentuk tabel."
      },
      {
        "id": 16,
        "q": "Entitas yang dapat berdiri sendiri tanpa entitas lain disebut?",
        "options": [
          "Intersection entity",
          "Characteristic entity",
          "Prime entity",
          "Weak entity"
        ],
        "correctIndex": 2,
        "explanation": "Prime entity adalah entitas yang dapat berdiri sendiri tanpa bergantung pada entitas lain."
      },
      {
        "id": 17,
        "q": "Entitas yang muncul karena relasi many to many disebut?",
        "options": [
          "Prime entity",
          "Characteristic entity",
          "Intersection entity",
          "Dependent entity"
        ],
        "correctIndex": 2,
        "explanation": "Intersection entity digunakan untuk memecah relasi many to many menjadi dua relasi one to many."
      },
      {
        "id": 18,
        "q": "Properti yang mendeskripsikan suatu entitas disebut?",
        "options": ["Relasi", "Atribut", "Kardinalitas", "Primary Key"],
        "correctIndex": 1,
        "explanation": "Atribut digunakan untuk menjelaskan karakteristik atau properti dari suatu entitas."
      },
      {
        "id": 19,
        "q": "Atribut yang tidak boleh bernilai kosong (null) disebut?",
        "options": ["Optional", "Volatile", "Mandatory", "Composite"],
        "correctIndex": 2,
        "explanation": "Mandatory attribute adalah atribut yang wajib diisi dan tidak boleh bernilai null."
      },
      {
        "id": 20,
        "q": "Contoh atribut non-volatil adalah?",
        "options": ["Umur", "Jumlah saldo", "Tanggal lahir", "Status aktif"],
        "correctIndex": 2,
        "explanation": "Tanggal lahir bersifat tetap dan tidak berubah, sehingga termasuk atribut non-volatil."
      }
    ]
  },
  // QUIZ 2
  {
    "slug": "modul-2-studi-kasus",
    "title": "Studi Kasus Pemodelan Data Relasional",
    "description": "Quiz Modul 2 berbasis studi kasus: UID, relasi, kardinalitas, opsionalitas, ERD, dan precision & scale.",
    "category": "Database",
    "level": "Easy",
    "color": "#0f766e",
    "questions": [
      {
        "id": 1,
        "q": "Pada sistem akademik, setiap mahasiswa memiliki NIM yang tidak boleh kosong dan tidak berubah. NIM paling tepat digunakan sebagai?",
        "options": ["Atribut opsional", "Artificial UID", "Simple UID", "Composite UID"],
        "correctIndex": 2,
        "explanation": "NIM bersifat unik, wajib ada, dan stabil sehingga paling tepat dijadikan Simple UID."
      },
      {
        "id": 2,
        "q": "Satu mahasiswa dapat mengambil banyak mata kuliah dan satu mata kuliah dapat diambil oleh banyak mahasiswa. Relasi yang tepat adalah?",
        "options": ["One-to-One", "One-to-Many", "Many-to-Many", "Many-to-One"],
        "correctIndex": 2,
        "explanation": "Kedua entitas saling berhubungan banyak ke banyak, sehingga relasinya many-to-many."
      },
      {
        "id": 3,
        "q": "Untuk merepresentasikan relasi many-to-many antara Mahasiswa dan Mata Kuliah, solusi yang benar adalah?",
        "options": [
          "Menambahkan foreign key di salah satu tabel",
          "Menggabungkan kedua tabel",
          "Menambahkan entitas penghubung (intersection)",
          "Menghapus salah satu entitas"
        ],
        "correctIndex": 2,
        "explanation": "Relasi many-to-many harus dipecah menggunakan entitas penghubung agar bisa diimplementasikan ke database relasional."
      },
      {
        "id": 4,
        "q": "Tabel KRS memiliki primary key gabungan dari NIM dan Kode_MK. Jenis UID pada tabel KRS adalah?",
        "options": ["Simple UID", "Artificial UID", "Composite UID", "Optional UID"],
        "correctIndex": 2,
        "explanation": "Primary key dibentuk dari gabungan dua atribut, sehingga termasuk Composite UID."
      },
      {
        "id": 5,
        "q": "Dalam sistem pegawai, atribut nama_tengah boleh diisi atau tidak. Atribut ini termasuk?",
        "options": ["Mandatory", "Volatile", "Optional", "UID"],
        "correctIndex": 2,
        "explanation": "Atribut yang boleh bernilai kosong atau tidak diisi disebut atribut optional."
      },
      {
        "id": 6,
        "q": "Satu dealer dapat memiliki banyak mobil, tetapi satu mobil hanya berada pada satu dealer. Kardinalitas relasi yang tepat adalah?",
        "options": ["One-to-One", "Many-to-Many", "One-to-Many", "Many-to-One"],
        "correctIndex": 2,
        "explanation": "Satu dealer ke banyak mobil menunjukkan relasi one-to-many."
      },
      {
        "id": 7,
        "q": "Pada ERD, relasi dengan garis putus-putus menandakan bahwa relasi tersebut bersifat?",
        "options": ["Mandatory", "Optional", "Composite", "Artificial"],
        "correctIndex": 1,
        "explanation": "Garis putus-putus pada ERD menandakan relasi bersifat optional."
      },
      {
        "id": 8,
        "q": "Atribut harga_produk disimpan menggunakan tipe data DECIMAL(10,2). Angka 10 menunjukkan?",
        "options": ["Jumlah digit di belakang koma", "Jumlah total digit", "Nilai maksimum", "Jumlah record"],
        "correctIndex": 1,
        "explanation": "Angka 10 menunjukkan total jumlah digit yang bisa disimpan, termasuk sebelum dan sesudah koma."
      },
      {
        "id": 9,
        "q": "Jika sebuah atribut bertipe DECIMAL(8,3), maka jumlah digit maksimal setelah koma adalah?",
        "options": ["8", "5", "3", "11"],
        "correctIndex": 2,
        "explanation": "Angka 3 pada DECIMAL(8,3) menunjukkan jumlah digit maksimal di belakang koma."
      },
      {
        "id": 10,
        "q": "Tujuan utama penggunaan precision dan scale pada data keuangan adalah?",
        "options": [
          "Mempercepat query",
          "Menghemat storage",
          "Menjaga ketelitian dan integritas data",
          "Menghindari penggunaan foreign key"
        ],
        "correctIndex": 2,
        "explanation": "Precision dan scale digunakan untuk menjaga ketelitian nilai dan mencegah kesalahan data keuangan."
      },
      {
        "id": 11,
        "q": "Pada proses konversi CDM ke PDM, perubahan utama yang terjadi adalah?",
        "options": [
          "Penghapusan relasi",
          "Penambahan tipe data dan constraint",
          "Penghilangan entitas",
          "Perubahan nama atribut menjadi bebas"
        ],
        "correctIndex": 1,
        "explanation": "Pada tahap PDM, entitas mulai dilengkapi tipe data, primary key, foreign key, dan constraint."
      },
      {
        "id": 12,
        "q": "Mengapa setiap entitas wajib memiliki UID?",
        "options": [
          "Agar bisa digambar di ERD",
          "Agar relasi menjadi optional",
          "Agar setiap data dapat diidentifikasi secara unik",
          "Agar mudah dikonversi ke CDM"
        ],
        "correctIndex": 2,
        "explanation": "UID diperlukan agar setiap data dalam entitas dapat dibedakan secara unik."
      },
      {
        "id": 13,
        "q": "Dalam sistem penjualan, nomor invoice dibuat otomatis oleh sistem dan tidak memiliki makna bisnis. Nomor invoice paling tepat dikategorikan sebagai?",
        "options": ["Simple UID", "Composite UID", "Artificial UID", "Optional UID"],
        "correctIndex": 2,
        "explanation": "UID yang dibuat sistem tanpa makna bisnis disebut Artificial UID."
      },
      {
        "id": 14,
        "q": "Satu buku hanya ditulis oleh satu penulis, tetapi satu penulis dapat menulis banyak buku. Relasi yang tepat adalah?",
        "options": ["One-to-One", "Many-to-Many", "One-to-Many", "Many-to-One"],
        "correctIndex": 2,
        "explanation": "Satu penulis ke banyak buku menunjukkan relasi one-to-many."
      },
      {
        "id": 15,
        "q": "Jika relasi antara Buku dan Penerbit bersifat opsional di sisi Buku, artinya?",
        "options": [
          "Setiap buku wajib punya penerbit",
          "Buku boleh tidak memiliki penerbit",
          "Penerbit wajib punya buku",
          "Relasi harus many-to-many"
        ],
        "correctIndex": 1,
        "explanation": "Opsional di sisi Buku berarti data buku boleh ada meskipun tidak memiliki penerbit."
      },
      {
        "id": 16,
        "q": "Mengapa relasi many-to-many tidak langsung diimplementasikan pada PDM?",
        "options": [
          "Tidak didukung DBMS",
          "Sulit digambar di ERD",
          "Harus dipecah menjadi tabel penghubung",
          "Tidak memiliki UID"
        ],
        "correctIndex": 2,
        "explanation": "Database relasional mengharuskan relasi many-to-many dipecah menjadi tabel penghubung."
      },
      {
        "id": 17,
        "q": "Pada tabel penghubung, primary key paling umum dibentuk dari?",
        "options": [
          "Satu artificial UID",
          "Salah satu foreign key",
          "Gabungan foreign key dari tabel asal",
          "Atribut opsional"
        ],
        "correctIndex": 2,
        "explanation": "Primary key biasanya dibentuk dari gabungan foreign key agar menjamin keunikan data."
      },
      {
        "id": 18,
        "q": "Jika atribut berat_barang membutuhkan ketelitian hingga 3 angka di belakang koma, tipe data yang tepat adalah?",
        "options": ["INT", "DECIMAL(6,1)", "DECIMAL(8,3)", "VARCHAR"],
        "correctIndex": 2,
        "explanation": "DECIMAL(8,3) memungkinkan penyimpanan angka dengan 3 digit di belakang koma secara presisi."
      },
      {
        "id": 19,
        "q": "Kesalahan umum jika tidak menerapkan precision & scale dengan benar adalah?",
        "options": [
          "Query menjadi lambat",
          "Data numerik terpotong atau ditolak",
          "Relasi tidak terbentuk",
          "UID menjadi optional"
        ],
        "correctIndex": 1,
        "explanation": "Kesalahan pengaturan precision dan scale dapat menyebabkan data dibulatkan, terpotong, atau gagal disimpan."
      },
      {
        "id": 20,
        "q": "Saat asisten meminta alasan penggunaan UID gabungan pada tabel KRS, jawaban paling tepat adalah?",
        "options": [
          "Karena lebih hemat storage",
          "Karena mengikuti contoh modul",
          "Karena kombinasi NIM dan Kode MK memastikan keunikan data",
          "Karena tidak bisa membuat artificial UID"
        ],
        "correctIndex": 2,
        "explanation": "Gabungan NIM dan Kode MK menjamin tidak ada data KRS yang duplikat."
      }
    ]
  },
  // QUIZ 3
  {
    slug: "advanced-relationship-modeling-modul-3",
    title: "Relasi & Notasi",
    description: "Quiz Modul 3: Supertype, Arc, Barred, Transferability, dan Recursive relationship di Oracle Data Modeler.",
    category: "Database",
    level: "Medium",
    status: "New",
    color: "blue",
    questions: [
      {
        id: 1,
        type: 'essay',
        q: "Apa tujuan utama penggunaan Supertype dan Subtype dalam pemodelan data?",
        answerKey: "Mengelompokkan entitas yang punya karakteristik umum yang sama",
        explanation: "Supertype dan Subtype digunakan untuk mengelompokkan entitas yang memiliki atribut dan karakteristik umum, sehingga desain data lebih rapi, terstruktur, dan menghindari duplikasi atribut."
      },
      {
        id: 2,
        type: 'essay',
        q: "Dalam hierarki Supertype dan Subtype, sifat 'Inheritance' berarti...",
        answerKey: "Subtype mewarisi semua atribut dan relasi dari Supertype",
        explanation: "Inheritance berarti setiap Subtype otomatis mewarisi atribut dan relasi yang dimiliki oleh Supertype, lalu boleh menambahkan atribut khusus miliknya sendiri."
      },
      {
        id: 3,
        type: 'essay',
        q: "Simbol visual untuk Subtype di Oracle Data Modeler biasanya digambarkan sebagai...",
        answerKey: "Kotak di dalam kotak entitas Supertype",
        explanation: "Di Oracle Data Modeler, Subtype digambarkan sebagai kotak kecil yang berada di dalam kotak Supertype untuk menunjukkan hubungan hierarki."
      },
      {
        id: 4,
        type: 'essay',
        q: "Kapan kita sebaiknya menggunakan Arc Relationship?",
        answerKey: "Saat sebuah entitas hanya boleh memiliki satu hubungan aktif dari beberapa pilihan",
        explanation: "Arc Relationship digunakan ketika sebuah entitas memiliki beberapa kemungkinan relasi, tetapi hanya boleh memilih satu relasi yang aktif pada satu waktu."
      },
      {
        id: 5,
        type: 'essay',
        q: "Contoh kasus yang paling pas buat pake Arc Relationship adalah...",
        answerKey: "Pemenang undian cuma bisa pilih hadiah Motor Atau Uang",
        explanation: "Pemenang undian hanya boleh memilih satu hadiah dari beberapa opsi, sehingga cocok dimodelkan menggunakan Arc Relationship."
      },
      {
        id: 6,
        type: 'essay',
        q: "Apa yang terjadi pada Foreign Key di tabel yang memiliki Arc Relationship?",
        answerKey: "Foreign Key yang dihasilkan harus bersifat Opsional",
        explanation: "Karena hanya satu relasi yang aktif, maka Foreign Key pada Arc Relationship bersifat opsional agar hanya satu yang terisi."
      },
      {
        id: 7,
        type: 'essay',
        q: "Barred Relationship (Identifying Relationship) ditandai dengan simbol apa di diagram?",
        answerKey: "Garis vertikal kecil (Bar) di dekat entitas anak",
        explanation: "Barred Relationship ditandai dengan garis kecil (bar) yang menunjukkan bahwa entitas anak bergantung secara identitas pada entitas induk."
      },
      {
        id: 8,
        type: 'essay',
        q: "Apa dampak dari Barred Relationship terhadap UID (Unique Identifier) entitas anak?",
        answerKey: "UID anak terdiri dari UID induk ditambah atribut lain milik anak",
        explanation: "Pada Barred Relationship, UID entitas anak dibentuk dari UID induk ditambah atribut pembeda milik entitas anak."
      },
      {
        id: 9,
        type: 'essay',
        q: "Kondisi mana yang mengharuskan penggunaan Barred Relationship?",
        answerKey: "Ketika entitas anak merupakan bagian tak terpisahkan dari induk (weak entity)",
        explanation: "Barred Relationship digunakan saat entitas anak tidak bisa eksis tanpa entitas induk, atau disebut weak entity."
      },
      {
        id: 10,
        type: 'essay',
        q: "Apa yang dimaksud dengan Transferability dalam sebuah relasi?",
        answerKey: "Nilai relasi antar entitas bisa dipindah ke entitas lain",
        explanation: "Transferability menunjukkan apakah hubungan suatu entitas dapat dipindahkan ke entitas lain atau tidak."
      },
      {
        id: 11,
        type: 'multiple-choice',
        q: "Simbol Diamond (Belah Ketupat) pada garis relasi menandakan bahwa relasi tersebut bersifat...",
        options: [
          "Transferable (Bisa dipindah)",
          "Non-Transferable (Tidak bisa dipindah)",
          "Optional (Boleh kosong)",
          "Recursive (Berulang)"
        ],
        correctIndex: 1,
        explanation: "Simbol diamond menandakan relasi bersifat non-transferable, artinya hubungan tersebut tidak boleh dipindahkan."
      },
      {
        id: 12,
        type: 'multiple-choice',
        q: "Manakah contoh kasus yang paling tepat untuk Non-Transferable Relationship?",
        options: [
          "Pegawai yang bisa dipindah tugaskan ke departemen lain",
          "Buku dan Penulisnya",
          "Mahasiswa yang bisa ganti jurusan",
          "Pelanggan yang bisa ganti alamat pengiriman"
        ],
        correctIndex: 1,
        explanation: "Relasi buku dan penulis bersifat tetap dan tidak bisa dipindahkan ke penulis lain secara historis."
      },
      {
        id: 13,
        type: 'multiple-choice',
        q: "Recursive Relationship adalah hubungan yang terjadi ketika...",
        options: [
          "Satu entitas berhubungan dengan banyak entitas lain sekaligus",
          "Sebuah entitas berhubungan dengan dirinya sendiri",
          "Entitas induk memiliki banyak subtype",
          "Hubungan antar entitas tidak memiliki cardinalitas"
        ],
        correctIndex: 1,
        explanation: "Recursive Relationship terjadi ketika satu entitas memiliki relasi dengan entitas yang sama, tetapi dengan peran berbeda."
      },
      {
        id: 14,
        type: 'multiple-choice',
        q: "Contoh nyata dari Recursive Relationship di dunia kerja adalah...",
        options: [
          "Pegawai melapor ke Manajer",
          "Pegawai bekerja di Departemen",
          "Departemen memiliki banyak proyek",
          "Proyek dikerjakan oleh vendor luar"
        ],
        correctIndex: 0,
        explanation: "Pegawai dan manajer berasal dari entitas yang sama, yaitu Pegawai, sehingga membentuk recursive relationship."
      },
      {
        id: 15,
        type: 'multiple-choice',
        q: "Bagaimana cara membuat Recursive Relationship di Oracle Data Modeler?",
        options: [
          "Menarik garis dari entitas A ke entitas B",
          "Klik tool relation, lalu klik dua kali pada entitas yang sama",
          "Menggunakan tool 'New Arc'",
          "Klik kanan pada entitas lalu pilih 'Make Recursive'"
        ],
        correctIndex: 1,
        explanation: "Untuk membuat recursive relationship, relasi ditarik dari entitas ke dirinya sendiri."
      },
      {
        id: 16,
        type: 'multiple-choice',
        q: "Apa risiko utama jika Recursive Relationship tidak didesain dengan hati-hati?",
        options: [
          "Data menjadi terlalu sedikit",
          "Terjadi looping tanpa henti",
          "Tabel akan otomatis terhapus",
          "Tidak bisa membuat Primary Key"
        ],
        correctIndex: 1,
        explanation: "Jika tidak dibatasi dengan benar, recursive relationship dapat menyebabkan loop data yang tidak berujung."
      },
      {
        id: 17,
        type: 'multiple-choice',
        q: "Dalam Supertype 'tb_karyawan', atribut 'gaji' bersifat mandatory. Apa dampaknya bagi Subtype?",
        options: [
          "Subtype boleh tidak punya atribut gaji",
          "Subtype otomatis memiliki atribut gaji",
          "Subtype harus membuat atribut gaji baru dengan nama beda",
          "Atribut gaji di Subtype menjadi optional"
        ],
        correctIndex: 1,
        explanation: "Atribut mandatory pada Supertype otomatis diwariskan ke semua Subtype."
      },
      {
        id: 18,
        type: 'multiple-choice',
        q: "Jika sebuah entitas memiliki ARC yang menghubungkan 2 relasi, dan kedua relasi itu mandatory, maka...",
        options: [
          "Data harus terisi di kedua relasi tersebut secara bersamaan",
          "Data boleh kosong di kedua relasi",
          "Data harus terisi di salah satu relasi saja, tidak boleh keduanya",
          "Data di salah satu relasi boleh dihapus sembarangan"
        ],
        correctIndex: 2,
        explanation: "ARC menandakan pilihan eksklusif, sehingga data hanya boleh mengisi salah satu relasi saja."
      },
      {
        id: 19,
        type: 'multiple-choice',
        q: "Di Oracle Data Modeler, langkah pertama untuk membuat Subtype adalah...",
        options: [
          "Membuat relasi one-to-many biasa",
          "Membuat entitas baru di dalam entitas yang sudah ada",
          "Menghapus entitas Supertype",
          "Mengganti nama tabel menjadi huruf kapital semua"
        ],
        correctIndex: 1,
        explanation: "Subtype dibuat dengan menambahkan entitas baru di dalam Supertype."
      },
      {
        id: 20,
        type: 'multiple-choice',
        q: "Sifat hubungan data yang 'harus ada dan saling melengkapi' paling cocok digambarkan dengan notasi...",
        options: [
          "Recursive",
          "Non-Transferable",
          "Barred",
          "Arc"
        ],
        correctIndex: 2,
        explanation: "Barred Relationship menunjukkan ketergantungan kuat antar entitas, sehingga saling melengkapi dan tidak bisa berdiri sendiri."
      }
    ]
  },
  //QUIZ 4
  {
    slug: "normalisasi-data-logic-rules-modul-3",
    title: "Logika & Aturan Normalisasi",
    description: "Quiz modul 3: Aturan 1NF, 2NF, 3NF, dan cara benerin data yang redundan biar database-nya efisien.",
    category: "Database Normalization",
    level: "Medium",
    status: "New",
    color: "purple",
    questions: [
      {
        id: 1,
        type: 'essay',
        q: "Kondisi di mana satu sel dalam tabel berisi lebih dari satu nilai (misal: '08123, 08199') melanggar aturan normalisasi bentuk keberapa?",
        answerKey: "First Normal Form (1NF)",
        explanation: "1NF mewajibkan setiap atribut bernilai atomik (tunggal). Jika satu kolom berisi banyak nilai, maka tabel tersebut belum memenuhi 1NF."
      },
      {
        id: 2,
        type: 'essay',
        q: "Syarat WAJIBBB agar sebuah tabel dikatakan memenuhi 1NF (First Normal Form) adalah...",
        answerKey: "Setiap atribut harus bernilai tunggal",
        explanation: "Inti dari 1NF adalah memastikan setiap kolom hanya menyimpan satu nilai (atomic value), bukan multi-value atau repeating group."
      },
      {
        id: 3,
        type: 'essay',
        q: "Second Normal Form (2NF) baru bisa dilakukan kalau syarat ini terpenuhi, yaitu...",
        answerKey: "Tabel sudah memenuhi 1NF",
        explanation: "Normalisasi bersifat bertahap. Tabel harus lolos 1NF terlebih dahulu sebelum bisa dievaluasi ke 2NF."
      },
      {
        id: 4,
        type: 'essay',
        q: "Fokus utama dari aturan 2NF adalah menghilangkan...",
        answerKey: "Ketergantungan Parsial (Partial Dependency)",
        explanation: "2NF berfokus menghilangkan ketergantungan parsial, yaitu atribut non-key yang hanya bergantung pada sebagian primary key."
      },
      {
        id: 5,
        type: 'essay',
        q: "Third Normal Form (3NF) melarang adanya jenis ketergantungan apa?",
        answerKey: "Ketergantungan Transitif",
        explanation: "3NF bertujuan menghilangkan ketergantungan transitif, yaitu atribut non-key bergantung pada atribut non-key lainnya."
      },
      {
        id: 6,
        type: 'essay',
        q: "Di tabel 'Order', ada atribut 'Kota_Tujuan' yang bergantung pada 'Kode_Pos', bukan langsung ke 'ID_Order'. Ini melanggar...",
        answerKey: "3NF",
        explanation: "Ketergantungan Kota_Tujuan → Kode_Pos → ID_Order adalah contoh ketergantungan transitif yang dilarang di 3NF."
      },
      {
        id: 7,
        type: 'essay',
        q: "Apa istilah untuk bentuk data mentah yang belum melalui proses normalisasi sama sekali?",
        answerKey: "Unnormalized Form (UNF)",
        explanation: "Data mentah sebelum normalisasi disebut Unnormalized Form (UNF)."
      },
      {
        id: 8,
        type: 'essay',
        q: "Intersection Entity (Entitas Perantara) biasanya muncul saat kita menormalisasi hubungan...",
        answerKey: "Many-to-Many (M:N)",
        explanation: "Relasi M:N tidak bisa langsung diimplementasikan, sehingga perlu entitas perantara (intersection entity)."
      },
      {
        id: 9,
        type: 'essay',
        q: "Salah satu alasan kenapa kita harus menghindari 'Data Anomaly' (anomali data) adalah...",
        answerKey: "Mencegah ketidakkonsistenan data",
        explanation: "Anomali data bisa menyebabkan data tidak konsisten saat insert, update, atau delete."
      },
      {
        id: 10,
        type: 'essay',
        q: "Jika UID (Unique Identifier) terdiri dari satu atribut saja (Simple UID), apakah mungkin terjadi pelanggaran 2NF?",
        answerKey: "Tidak mungkin",
        explanation: "2NF hanya relevan jika primary key bersifat gabungan. Dengan simple UID, partial dependency tidak mungkin terjadi."
      },

      {
        id: 11,
        type: 'multiple-choice',
        q: "Apa sih tujuan utama dari melakukan normalisasi data?",
        options: [
          "Biar tabelnya jadi banyak dan terlihat kompleks",
          "Mengurangi duplikat data dan anomali",
          "Supaya data bisa dibaca oleh manusia tanpa query SQL",
          "Menggabungkan semua data menjadi satu tabel besar (Big Data)"
        ],
        correctIndex: 1,
        explanation: "Normalisasi bertujuan mengurangi redundansi (data berulang) dan mencegah anomali seperti update, insert, dan delete anomaly agar database lebih konsisten dan efisien."
      },
      {
        id: 12,
        type: 'multiple-choice',
        q: "Jika kamu nemu atribut 'Hobi' yang isinya banyak (multi-value) dalam satu entitas, apa solusi normalisasinya?",
        options: [
          "Hapus atribut Hobi dari database",
          "Biarkan saja, nanti dipisahkan pakai koma di aplikasi",
          "Buat entitas baru untuk Hobi dan hubungkan dengan relasi 1:M",
          "Jadikan atribut Hobi sebagai Primary Key"
        ],
        correctIndex: 2,
        explanation: "Atribut multi-value harus dipisah ke entitas baru agar setiap nilai berdiri sendiri dan tabel tetap memenuhi 1NF."
      },
      {
        id: 13,
        type: 'multiple-choice',
        q: "Apa yang dimaksud dengan Ketergantungan Parsial (Partial Dependency)?",
        options: [
          "Atribut non-key bergantung pada atribut non-key lainnya",
          "Atribut non-key hanya bergantung pada sebagian dari Primary Key",
          "Atribut key bergantung pada atribut non-key",
          "Tidak ada atribut yang saling bergantung"
        ],
        correctIndex: 1,
        explanation: "Partial dependency terjadi pada primary key gabungan, ketika atribut non-key tidak bergantung pada keseluruhan key."
      },
      {
        id: 14,
        type: 'multiple-choice',
        q: "Dalam tabel 'Nilai_Mahasiswa' dengan UID gabungan (NIM, Kode_Matkul), atribut 'Nama_Mahasiswa' sebaiknya dipindah. Kenapa?",
        options: [
          "Karena nama mahasiswa terlalu panjang",
          "Karena nama mahasiswa hanya bergantung pada NIM",
          "Karena nama mahasiswa bergantung pada Kode_Matkul saja",
          "Karena nama mahasiswa harusnya dienkripsi"
        ],
        correctIndex: 1,
        explanation: "Nama mahasiswa hanya bergantung pada NIM. Ini adalah contoh ketergantungan parsial yang melanggar 2NF."
      },
      {
        id: 15,
        type: 'multiple-choice',
        q: "Contoh kasus Ketergantungan Transitif yang paling tepat adalah...",
        options: [
          "A tergantung pada B, dan B adalah Primary Key",
          "A tergantung pada B, dan B tergantung pada C (C adalah Primary)",
          "A dan B sama-sama Primary Key dan keduanya saling berhubungan",
          "A tidak tergantung pada siapa-siapa, tapi semua atribut bergantung pada A"
        ],
        correctIndex: 1,
        explanation: "Jika A bergantung pada B, dan B bergantung pada C, maka A secara tidak langsung bergantung pada C (transitif)."
      },
      {
        id: 16,
        type: 'multiple-choice',
        q: "Apa solusi untuk mengatasi pelanggaran 3NF (Transitive Dependency)?",
        options: [
          "Hapus atribut yang menjadi penyebab ketergantungan",
          "Pindahkan atribut ke entitas baru yang sesuai",
          "Gabungkan semua atribut menjadi satu string panjang",
          "Ubah Primary Key tabel utama"
        ],
        correctIndex: 1,
        explanation: "Solusi 3NF adalah memecah tabel dan memindahkan atribut transitif ke entitas yang merepresentasikan ketergantungannya."
      },
      {
        id: 17,
        type: 'multiple-choice',
        q: "Dalam studi kasus Invoice Pembelian, kenapa data 'Supplier' harus dipisah dari tabel Invoice?",
        options: [
          "Supaya tabel fakturnya terlihat lebih bersih",
          "Karena data nama supplier akan ditulis berulang",
          "Karena supplier tidak penting dalam tabel transaksi",
          "Agar jumlah kolom di tabel Invoice genap"
        ],
        correctIndex: 1,
        explanation: "Memisahkan data supplier mencegah redundansi dan anomali ketika data supplier berubah."
      },
      {
        id: 18,
        type: 'multiple-choice',
        q: "Jika sebuah tabel sudah memenuhi 3NF, apakah otomatis sudah memenuhi 2NF?",
        options: [
          "Tidak, urutannya terbalik",
          "Iya",
          "Tergantung datanya",
          "Tidak ada hubungannya"
        ],
        correctIndex: 1,
        explanation: "Karena 3NF mensyaratkan lolos 1NF dan 2NF, maka tabel 3NF pasti sudah memenuhi 2NF."
      },
      {
        id: 19,
        type: 'multiple-choice',
        q: "Dalam notasi CDM (Logical), Intersection Entity dari hubungan M:N seringkali digambarkan dengan...",
        options: [
          "Penengah relasi 2 entitas",
          "Satu garis lurus tanpa panah",
          "Entitas tanpa atribut UID",
          "Relasi Arc"
        ],
        correctIndex: 0,
        explanation: "Intersection entity berperan sebagai penengah antara dua entitas dalam relasi M:N."
      },
      {
        id: 20,
        type: 'multiple-choice',
        q: "Langkah pertama yang paling logis saat menerima data nota/kuitansi mentah untuk dinormalisasi adalah...",
        options: [
          "Langsung buat tabel 3NF",
          "Identifikasi Unnormalized-nya",
          "Membuat coding aplikasi",
          "Menghapus data yang kosong"
        ],
        correctIndex: 1,
        explanation: "Proses normalisasi selalu dimulai dari memahami bentuk data mentah (UNF) sebelum dipecah ke bentuk normal."
      }
    ]
  },
  // LATIHAN UTS BASIS DATA
  {
    "slug": "oracle-db-foundation-uts",
    "title": "UTS Basis Data — Oracle Database Foundation",
    "description": "Latihan soal UTS Basis Data mencakup materi: Konsep Basis Data, CDM/LDM/PDM, Entitas & Atribut, Tipe Data, Primary Key & Foreign Key, UID, Relasi, Kardinalitas, Opsionalitas, ERDish, dan Normalisasi (1NF, 2NF, 3NF).",
    "category": "Basis Data",
    "level": "Medium",
    "status": "New",
    "color": "#E05C2A",
    "questions": [
      {
        "id": 1,
        "type": "multiple-choice",
        "q": "Apa yang dimaksud dengan basis data (database)?",
        "options": [
          "Perangkat keras yang digunakan untuk menyimpan data",
          "Kumpulan data yang terorganisir dan saling berhubungan yang disimpan secara sistematis",
          "Bahasa pemrograman untuk mengelola data",
          "Kumpulan program untuk mengolah data"
        ],
        "correctIndex": 1,
        "explanation": "Basis data adalah kumpulan data yang terorganisir, saling berhubungan, dan disimpan secara sistematis agar mudah diakses, dikelola, dan diperbarui."
      },
      {
        "id": 2,
        "type": "multiple-choice",
        "q": "DBMS (Database Management System) berfungsi untuk...",
        "options": [
          "Mengatur koneksi jaringan komputer",
          "Mengompilasi program aplikasi",
          "Merancang tampilan antarmuka pengguna",
          "Mengelola, menyimpan, dan mengakses data dalam basis data"
        ],
        "correctIndex": 3,
        "explanation": "DBMS adalah perangkat lunak yang berfungsi sebagai perantara antara pengguna dan basis data untuk mengelola, menyimpan, dan mengakses data."
      },
      {
        "id": 3,
        "type": "multiple-choice",
        "q": "Manakah berikut ini yang merupakan contoh DBMS?",
        "options": [
          "Adobe Photoshop",
          "Google Chrome",
          "Oracle Database",
          "Microsoft Word"
        ],
        "correctIndex": 2,
        "explanation": "Oracle Database adalah salah satu contoh DBMS. Contoh lain adalah MySQL, PostgreSQL, dan Microsoft SQL Server."
      },
      {
        "id": 4,
        "type": "multiple-choice",
        "q": "Salah satu keunggulan menggunakan basis data dibandingkan sistem file biasa adalah...",
        "options": [
          "Menghindari redundansi dan inkonsistensi data",
          "Ukuran file lebih besar",
          "Data lebih sulit diakses",
          "Tidak memerlukan keahlian khusus"
        ],
        "correctIndex": 0,
        "explanation": "Salah satu keunggulan utama basis data adalah kemampuannya mengurangi redundansi (duplikasi data) dan menjaga konsistensi data."
      },
      {
        "id": 5,
        "type": "multiple-choice",
        "q": "Model basis data yang menyimpan data dalam bentuk tabel dengan baris dan kolom disebut...",
        "options": [
          "Network Model",
          "Relational Model",
          "Object-Oriented Model",
          "Hierarchical Model"
        ],
        "correctIndex": 1,
        "explanation": "Relational Model adalah model basis data yang menyimpan data dalam bentuk tabel (relasi) dengan baris (tuple) dan kolom (atribut)."
      },
      {
        "id": 6,
        "type": "multiple-choice",
        "q": "CDM (Conceptual Data Model) menggambarkan...",
        "options": [
          "Gambaran tingkat tinggi dari data tanpa mempertimbangkan implementasi teknis",
          "Indeks dan partisi tabel database",
          "Query SQL yang akan digunakan",
          "Struktur fisik tabel di dalam database"
        ],
        "correctIndex": 0,
        "explanation": "CDM adalah model data level tertinggi yang menggambarkan konsep bisnis dan entitas secara umum tanpa memikirkan detail teknis atau DBMS tertentu."
      },
      {
        "id": 7,
        "type": "multiple-choice",
        "q": "Perbedaan utama antara CDM dan PDM adalah...",
        "options": [
          "CDM hanya untuk diagram, PDM hanya untuk dokumen",
          "PDM sudah mempertimbangkan platform DBMS tertentu, sedangkan CDM bersifat independen",
          "CDM menggunakan SQL sedangkan PDM tidak",
          "Tidak ada perbedaan, keduanya sama"
        ],
        "correctIndex": 1,
        "explanation": "CDM bersifat platform-independent (tidak bergantung DBMS tertentu), sedangkan PDM sudah disesuaikan dengan DBMS spesifik seperti Oracle, MySQL, dll."
      },
      {
        "id": 8,
        "type": "multiple-choice",
        "q": "LDM (Logical Data Model) berada di antara CDM dan PDM. Ciri khas LDM adalah...",
        "options": [
          "Sudah memiliki atribut dan relasi detail namun belum terikat platform DBMS tertentu",
          "Berisi kode SQL lengkap untuk membuat tabel",
          "Sudah menentukan tipe data spesifik sesuai DBMS",
          "Hanya memuat nama entitas tanpa atribut"
        ],
        "correctIndex": 0,
        "explanation": "LDM lebih detail dari CDM dengan menampilkan atribut dan relasi, namun masih bersifat independen dari DBMS tertentu seperti CDM."
      },
      {
        "id": 9,
        "type": "multiple-choice",
        "q": "Pada tahap PDM, hal yang sudah ditentukan secara spesifik adalah...",
        "options": [
          "Nama entitas bisnis",
          "Tipe data kolom sesuai DBMS yang digunakan",
          "Kardinalitas relasi",
          "Proses bisnis organisasi"
        ],
        "correctIndex": 1,
        "explanation": "PDM sudah menentukan tipe data kolom secara spesifik sesuai DBMS yang digunakan, misalnya VARCHAR2 untuk Oracle, atau DATETIME untuk MySQL."
      },
      {
        "id": 10,
        "type": "multiple-choice",
        "q": "Urutan yang benar dalam proses perancangan basis data adalah...",
        "options": [
          "CDM → LDM → PDM",
          "CDM → PDM → LDM",
          "PDM → LDM → CDM",
          "LDM → CDM → PDM"
        ],
        "correctIndex": 0,
        "explanation": "Urutan perancangan basis data yang benar dimulai dari CDM (konseptual), kemudian LDM (logis), dan terakhir PDM (fisik)."
      },
      {
        "id": 11,
        "type": "multiple-choice",
        "q": "Dalam model basis data relasional, entitas direpresentasikan sebagai...",
        "options": [
          "Tabel itu sendiri",
          "Kolom dalam tabel",
          "Kunci asing",
          "Baris dalam tabel"
        ],
        "correctIndex": 0,
        "explanation": "Dalam model relasional, sebuah entitas direpresentasikan sebagai tabel. Setiap baris (row) dalam tabel merepresentasikan satu instance dari entitas tersebut."
      },
      {
        "id": 12,
        "type": "multiple-choice",
        "q": "Atribut yang nilainya dapat membedakan satu instance entitas dari instance lainnya secara unik disebut...",
        "options": [
          "Atribut komposit",
          "Atribut turunan",
          "Atribut kunci (key attribute)",
          "Atribut multi-nilai"
        ],
        "correctIndex": 2,
        "explanation": "Atribut kunci (key attribute) adalah atribut yang nilainya unik untuk setiap instance entitas sehingga dapat membedakan satu record dari yang lain."
      },
      {
        "id": 13,
        "type": "multiple-choice",
        "q": "Atribut yang terdiri dari beberapa sub-atribut disebut...",
        "options": [
          "Atribut multi-nilai",
          "Atribut turunan",
          "Atribut tunggal",
          "Atribut komposit"
        ],
        "correctIndex": 3,
        "explanation": "Atribut komposit adalah atribut yang dapat dipecah menjadi beberapa sub-atribut. Contoh: Atribut 'Alamat' bisa terdiri dari Jalan, Kota, dan Kode Pos."
      },
      {
        "id": 14,
        "type": "multiple-choice",
        "q": "Atribut yang nilainya dihitung dari atribut lain disebut...",
        "options": [
          "Atribut multi-nilai",
          "Atribut kunci",
          "Atribut turunan",
          "Atribut komposit"
        ],
        "correctIndex": 2,
        "explanation": "Atribut turunan (derived attribute) adalah atribut yang nilainya diperoleh dari perhitungan atau derivasi atribut lain. Contoh: 'Usia' yang diturunkan dari 'Tanggal Lahir'."
      },
      {
        "id": 15,
        "type": "multiple-choice",
        "q": "Atribut yang dapat memiliki lebih dari satu nilai untuk satu instance entitas disebut...",
        "options": [
          "Atribut tunggal",
          "Atribut komposit",
          "Atribut kunci",
          "Atribut multi-nilai"
        ],
        "correctIndex": 3,
        "explanation": "Atribut multi-nilai (multivalued attribute) adalah atribut yang bisa memiliki lebih dari satu nilai. Contoh: atribut 'Nomor Telepon' seseorang yang bisa lebih dari satu."
      },
      {
        "id": 16,
        "type": "multiple-choice",
        "q": "Tipe data yang digunakan untuk menyimpan teks dengan panjang yang bervariasi di Oracle Database adalah...",
        "options": [
          "DATE",
          "CHAR",
          "VARCHAR2",
          "NUMBER"
        ],
        "correctIndex": 2,
        "explanation": "VARCHAR2 adalah tipe data Oracle untuk menyimpan string karakter dengan panjang variabel. Berbeda dengan CHAR yang panjangnya tetap."
      },
      {
        "id": 17,
        "type": "multiple-choice",
        "q": "Tipe data yang paling tepat untuk menyimpan nilai gaji karyawan yang memiliki desimal adalah...",
        "options": [
          "DATE",
          "CHAR",
          "NUMBER(10,2)",
          "VARCHAR2"
        ],
        "correctIndex": 2,
        "explanation": "NUMBER(10,2) cocok untuk nilai gaji karena bisa menyimpan angka dengan 2 digit desimal, total 10 digit. Format NUMBER(presisi, skala)."
      },
      {
        "id": 18,
        "type": "multiple-choice",
        "q": "Tipe data yang digunakan untuk menyimpan tanggal dan waktu di Oracle Database adalah...",
        "options": [
          "VARCHAR2",
          "BOOLEAN",
          "TIMESTAMP",
          "NUMBER"
        ],
        "correctIndex": 2,
        "explanation": "TIMESTAMP digunakan untuk menyimpan tanggal dan waktu dengan presisi tinggi di Oracle. DATE juga bisa, namun TIMESTAMP lebih lengkap karena menyimpan fraksi detik."
      },
      {
        "id": 19,
        "type": "multiple-choice",
        "q": "Tipe data CHAR(10) berbeda dari VARCHAR2(10) karena...",
        "options": [
          "Keduanya sama persis",
          "VARCHAR2 tidak bisa menyimpan huruf",
          "CHAR selalu menggunakan panjang tetap 10 karakter meski datanya lebih pendek",
          "CHAR hanya menyimpan angka"
        ],
        "correctIndex": 2,
        "explanation": "CHAR memiliki panjang tetap (fixed-length). Jika data yang disimpan lebih pendek dari ukuran yang ditentukan, sisanya akan diisi spasi. VARCHAR2 hanya menggunakan ruang sesuai panjang data aktual."
      },
      {
        "id": 20,
        "type": "multiple-choice",
        "q": "Tipe data yang tepat untuk kolom 'foto_profil' yang menyimpan gambar biner berukuran besar adalah...",
        "options": [
          "VARCHAR2",
          "NUMBER",
          "BLOB",
          "CHAR"
        ],
        "correctIndex": 2,
        "explanation": "BLOB (Binary Large Object) digunakan untuk menyimpan data biner berukuran besar seperti gambar, audio, atau video."
      },
      {
        "id": 21,
        "type": "multiple-choice",
        "q": "Primary Key (PK) dalam sebuah tabel berfungsi untuk...",
        "options": [
          "Menghubungkan dua tabel yang berbeda",
          "Menyimpan data dalam format tertentu",
          "Membatasi nilai yang boleh dimasukkan",
          "Mengidentifikasi setiap baris secara unik dalam tabel"
        ],
        "correctIndex": 3,
        "explanation": "Primary Key adalah satu atau lebih kolom yang nilainya secara unik mengidentifikasi setiap baris dalam sebuah tabel."
      },
      {
        "id": 22,
        "type": "multiple-choice",
        "q": "Syarat yang HARUS dipenuhi oleh sebuah Primary Key adalah...",
        "options": [
          "Nilainya boleh NULL dan boleh duplikat",
          "Harus terdiri dari lebih dari satu kolom",
          "Harus berupa angka",
          "Nilainya harus unik dan tidak boleh NULL"
        ],
        "correctIndex": 3,
        "explanation": "Primary Key harus memiliki nilai yang unik (tidak boleh sama antar baris) dan tidak boleh bernilai NULL karena digunakan sebagai identifikasi unik tiap record."
      },
      {
        "id": 23,
        "type": "multiple-choice",
        "q": "Foreign Key (FK) adalah...",
        "options": [
          "Kolom di satu tabel yang mereferensikan Primary Key di tabel lain",
          "Kolom tambahan untuk menyimpan catatan",
          "Kunci enkripsi untuk mengamankan data",
          "Kolom yang nilainya selalu unik dalam satu tabel"
        ],
        "correctIndex": 0,
        "explanation": "Foreign Key adalah kolom atau kumpulan kolom dalam suatu tabel yang nilainya mereferensikan Primary Key pada tabel lain, menciptakan hubungan antar tabel."
      },
      {
        "id": 24,
        "type": "multiple-choice",
        "q": "Jika tabel 'Mahasiswa' memiliki kolom 'id_prodi' yang mereferensikan tabel 'Prodi', maka 'id_prodi' pada tabel Mahasiswa adalah...",
        "options": [
          "Foreign Key",
          "Composite Key",
          "Primary Key",
          "Candidate Key"
        ],
        "correctIndex": 0,
        "explanation": "Kolom 'id_prodi' pada tabel Mahasiswa merupakan Foreign Key karena mereferensikan Primary Key 'id_prodi' yang ada di tabel Prodi."
      },
      {
        "id": 25,
        "type": "multiple-choice",
        "q": "Composite Key adalah...",
        "options": [
          "Kunci yang bersifat opsional",
          "Kunci yang terdiri dari satu kolom saja",
          "Kunci yang terdiri dari kombinasi dua kolom atau lebih",
          "Kunci yang mereferensikan tabel lain"
        ],
        "correctIndex": 2,
        "explanation": "Composite Key (kunci komposit) adalah Primary Key yang terdiri dari kombinasi dua kolom atau lebih. Kombinasi tersebut harus unik meskipun masing-masing kolom boleh tidak unik."
      },
      {
        "id": 26,
        "type": "multiple-choice",
        "q": "UID (Unique Identifier) dalam Oracle Designer digunakan untuk...",
        "options": [
          "Mengidentifikasi secara unik setiap instance dari sebuah entitas",
          "Menentukan opsionalitas sebuah atribut",
          "Menentukan tipe data sebuah atribut",
          "Mendefinisikan kardinalitas relasi"
        ],
        "correctIndex": 0,
        "explanation": "UID (Unique Identifier) digunakan di level CDM/LDM untuk mengidentifikasi instance entitas secara unik. UID akan menjadi Primary Key saat ditransformasi ke PDM."
      },
      {
        "id": 27,
        "type": "multiple-choice",
        "q": "UID Primer (Primary UID) berbeda dengan UID Sekunder (Secondary UID) karena...",
        "options": [
          "UID Primer hanya untuk tabel kecil",
          "UID Sekunder tidak boleh null",
          "UID Primer adalah identifier utama yang dipilih, sedangkan UID Sekunder adalah alternatif lain yang juga unik",
          "UID Primer terdiri dari lebih banyak atribut"
        ],
        "correctIndex": 2,
        "explanation": "UID Primer adalah identifier yang dipilih sebagai identifier utama entitas (setara PK), sedangkan UID Sekunder adalah atribut atau kombinasi atribut lain yang juga bersifat unik (setara Candidate Key/Unique Constraint)."
      },
      {
        "id": 28,
        "type": "multiple-choice",
        "q": "Sebuah UID dapat terdiri dari...",
        "options": [
          "Hanya atribut numerik",
          "Hanya Foreign Key",
          "Hanya satu atribut saja",
          "Satu atau lebih atribut, atau kombinasi atribut dan relasi"
        ],
        "correctIndex": 3,
        "explanation": "UID dapat terdiri dari satu atribut, kombinasi beberapa atribut (composite UID), atau bahkan kombinasi atribut dengan relasi ke entitas lain."
      },
      {
        "id": 29,
        "type": "multiple-choice",
        "q": "Relasi dalam basis data relasional menggambarkan...",
        "options": [
          "Jumlah baris dalam sebuah tabel",
          "Hubungan atau asosiasi antara dua entitas atau lebih",
          "Format penyimpanan fisik data di disk",
          "Tipe data sebuah kolom"
        ],
        "correctIndex": 1,
        "explanation": "Relasi menggambarkan hubungan atau asosiasi yang bermakna antara dua entitas atau lebih dalam model data."
      },
      {
        "id": 30,
        "type": "multiple-choice",
        "q": "Relasi antara entitas 'Mahasiswa' dan 'Mata Kuliah' di mana satu mahasiswa bisa mengambil banyak mata kuliah dan satu mata kuliah bisa diambil banyak mahasiswa adalah relasi...",
        "options": [
          "One-to-One (1:1)",
          "One-to-Many (1:N)",
          "Many-to-Many (M:N)",
          "Self-referencing"
        ],
        "correctIndex": 2,
        "explanation": "Relasi Many-to-Many (M:N) terjadi ketika satu instance dari entitas A bisa berelasi dengan banyak instance entitas B, dan sebaliknya. Dalam implementasi PDM, relasi M:N biasanya dipecah dengan tabel asosiatif."
      },
      {
        "id": 31,
        "type": "multiple-choice",
        "q": "Relasi antara entitas 'Pegawai' dan 'Kartu Pegawai' di mana satu pegawai hanya memiliki satu kartu pegawai adalah relasi...",
        "options": [
          "One-to-One (1:1)",
          "Many-to-Many (M:N)",
          "Self-referencing",
          "One-to-Many (1:N)"
        ],
        "correctIndex": 0,
        "explanation": "Relasi One-to-One (1:1) terjadi ketika satu instance entitas A hanya berelasi dengan tepat satu instance entitas B, dan sebaliknya."
      },
      {
        "id": 32,
        "type": "multiple-choice",
        "q": "Dalam pemodelan data, relasi yang menghubungkan sebuah entitas dengan dirinya sendiri disebut...",
        "options": [
          "Recursive Relationship / Unary Relationship",
          "Identifying Relationship",
          "Ternary Relationship",
          "Binary Relationship"
        ],
        "correctIndex": 0,
        "explanation": "Recursive Relationship atau Unary Relationship adalah relasi yang melibatkan satu entitas yang berelasi dengan dirinya sendiri. Contoh: entitas 'Pegawai' dengan relasi 'memiliki atasan' juga ke 'Pegawai'."
      },
      {
        "id": 33,
        "type": "multiple-choice",
        "q": "Kardinalitas dalam pemodelan data mendefinisikan...",
        "options": [
          "Apakah atribut boleh bernilai NULL atau tidak",
          "Jumlah maksimum instance yang dapat berpartisipasi dalam sebuah relasi",
          "Urutan pemrosesan data",
          "Jenis tipe data atribut"
        ],
        "correctIndex": 1,
        "explanation": "Kardinalitas mendefinisikan jumlah maksimum instance dari satu entitas yang dapat berelasi dengan instance dari entitas lain dalam sebuah relasi."
      },
      {
        "id": 34,
        "type": "multiple-choice",
        "q": "Pada notasi kardinalitas, simbol 'N' atau 'M' pada relasi berarti...",
        "options": [
          "Tepat satu instance yang berelasi",
          "Maksimal dua instance yang berelasi",
          "Tidak ada instance yang boleh berelasi",
          "Banyak instance yang dapat berelasi (lebih dari satu)"
        ],
        "correctIndex": 3,
        "explanation": "Simbol 'N' atau 'M' dalam kardinalitas menunjukkan bahwa banyak (lebih dari satu) instance entitas dapat berpartisipasi dalam relasi tersebut."
      },
      {
        "id": 35,
        "type": "multiple-choice",
        "q": "Jika satu departemen dapat memiliki banyak pegawai, namun satu pegawai hanya bekerja di satu departemen, maka kardinalitas relasi antara Departemen dan Pegawai adalah...",
        "options": [
          "1:N (One-to-Many)",
          "N:1 (Many-to-One)",
          "1:1 (One-to-One)",
          "M:N (Many-to-Many)"
        ],
        "correctIndex": 0,
        "explanation": "Departemen (satu) memiliki banyak Pegawai, sehingga relasi dari Departemen ke Pegawai adalah 1:N (One-to-Many)."
      },
      {
        "id": 36,
        "type": "multiple-choice",
        "q": "Opsionalitas dalam pemodelan data menentukan...",
        "options": [
          "Apakah partisipasi sebuah entitas dalam relasi bersifat wajib atau opsional",
          "Tipe data kolom dalam tabel",
          "Urutan atribut dalam entitas",
          "Jumlah maksimum instance yang berelasi"
        ],
        "correctIndex": 0,
        "explanation": "Opsionalitas menentukan apakah sebuah instance entitas HARUS (mandatory/wajib) atau BOLEH TIDAK (optional) berpartisipasi dalam sebuah relasi."
      },
      {
        "id": 37,
        "type": "multiple-choice",
        "q": "Dalam notasi ERDish/Oracle Designer, tanda 'O' (lingkaran kecil) pada garis relasi biasanya berarti...",
        "options": [
          "Relasi bersifat opsional (may be)",
          "Relasi bersifat wajib (mandatory)",
          "Relasi memiliki kardinalitas satu",
          "Relasi memiliki kardinalitas banyak"
        ],
        "correctIndex": 0,
        "explanation": "Tanda 'O' atau lingkaran kecil pada garis relasi menandakan opsionalitas, artinya partisipasi entitas dalam relasi tersebut bersifat opsional (may be / boleh tidak ada)."
      },
      {
        "id": 38,
        "type": "multiple-choice",
        "q": "Tanda garis tegak lurus (|) pada ujung relasi dalam notasi ERDish menunjukkan...",
        "options": [
          "Opsionalitas (boleh kosong)",
          "Wajib tepat satu (mandatory one)",
          "Banyak instance (many)",
          "Tidak ada relasi"
        ],
        "correctIndex": 1,
        "explanation": "Garis tegak lurus (|) pada ujung relasi menunjukkan bahwa partisipasi bersifat wajib dan jumlahnya tepat satu (exactly one / mandatory)."
      },
      {
        "id": 39,
        "type": "multiple-choice",
        "q": "Notasi ERDish adalah...",
        "options": [
          "Cara penulisan ERD dalam format teks atau notasi yang digunakan Oracle Designer",
          "Bahasa query untuk mengambil data",
          "Format file khusus Oracle",
          "Tipe diagram alur data"
        ],
        "correctIndex": 0,
        "explanation": "ERDish adalah notasi tekstual atau diagram yang digunakan dalam Oracle Designer untuk merepresentasikan hubungan antar entitas dalam basis data secara ekspresif."
      },
      {
        "id": 40,
        "type": "multiple-choice",
        "q": "Pernyataan ERDish: 'Each MAHASISWA must be enrolled in one and only one PRODI' menunjukkan relasi dari Mahasiswa ke Prodi dengan kardinalitas dan opsionalitas...",
        "options": [
          "Mandatory, Many",
          "Mandatory, One",
          "Opsional, One",
          "Opsional, Many"
        ],
        "correctIndex": 1,
        "explanation": "'must be' berarti mandatory (wajib), 'one and only one' berarti kardinalitas satu. Jadi relasi dari Mahasiswa ke Prodi adalah Mandatory One."
      },
      {
        "id": 41,
        "type": "multiple-choice",
        "q": "Normalisasi basis data bertujuan untuk...",
        "options": [
          "Mengubah format tipe data",
          "Mengurangi redundansi data dan mencegah anomali pada operasi insert, update, dan delete",
          "Mempercepat penulisan query SQL",
          "Menambah jumlah kolom pada tabel"
        ],
        "correctIndex": 1,
        "explanation": "Normalisasi bertujuan untuk mengurangi redundansi (pengulangan data) dan mencegah anomali yang terjadi saat melakukan operasi insert, update, dan delete pada tabel."
      },
      {
        "id": 42,
        "type": "multiple-choice",
        "q": "Sebuah tabel dikatakan sudah memenuhi 1NF (First Normal Form) jika...",
        "options": [
          "Tidak ada ketergantungan parsial",
          "Semua nilai atribut bersifat atomik (tidak ada atribut multi-nilai atau komposit) dan ada Primary Key",
          "Tidak ada ketergantungan transitif",
          "Setiap kolom hanya berisi angka"
        ],
        "correctIndex": 1,
        "explanation": "1NF mensyaratkan bahwa setiap sel tabel hanya berisi nilai atomik (satu nilai per sel), tidak ada group berulang, dan tabel memiliki Primary Key."
      },
      {
        "id": 43,
        "type": "multiple-choice",
        "q": "Ketergantungan parsial (partial dependency) yang harus dihilangkan pada 2NF terjadi ketika...",
        "options": [
          "Tabel tidak memiliki Primary Key",
          "Atribut non-kunci hanya bergantung pada sebagian dari composite key, bukan seluruhnya",
          "Atribut non-kunci bergantung pada atribut non-kunci lainnya",
          "Atribut non-kunci bergantung pada seluruh composite key"
        ],
        "correctIndex": 1,
        "explanation": "Partial dependency terjadi saat atribut non-key bergantung pada sebagian (tidak semua) kolom dari composite primary key. 2NF mensyaratkan tidak ada partial dependency."
      },
      {
        "id": 44,
        "type": "multiple-choice",
        "q": "Sebuah tabel sudah memenuhi 2NF jika...",
        "options": [
          "Setiap tabel memiliki minimal dua kolom",
          "Sudah dalam 1NF dan tidak ada ketergantungan transitif",
          "Tidak ada atribut komposit",
          "Sudah dalam 1NF dan semua atribut non-kunci bergantung sepenuhnya pada seluruh Primary Key"
        ],
        "correctIndex": 3,
        "explanation": "2NF mensyaratkan tabel sudah dalam 1NF dan setiap atribut non-key bergantung sepenuhnya (full functional dependency) pada keseluruhan Primary Key, bukan hanya sebagian."
      },
      {
        "id": 45,
        "type": "multiple-choice",
        "q": "Ketergantungan transitif (transitive dependency) yang harus dihilangkan pada 3NF adalah kondisi ketika...",
        "options": [
          "Atribut non-kunci bergantung pada sebagian Primary Key",
          "Atribut non-kunci bergantung pada Primary Key melalui atribut non-kunci lain",
          "Primary Key terdiri dari satu kolom",
          "Tabel memiliki terlalu banyak kolom"
        ],
        "correctIndex": 1,
        "explanation": "Transitive dependency terjadi ketika atribut non-key A bergantung pada atribut non-key B, dan B bergantung pada Primary Key. 3NF mensyaratkan tidak ada transitive dependency."
      },
      {
        "id": 46,
        "type": "multiple-choice",
        "q": "Sebuah tabel sudah memenuhi 3NF jika...",
        "options": [
          "Memiliki lebih dari satu Primary Key",
          "Sudah dalam 2NF dan tidak ada ketergantungan transitif antar atribut non-kunci",
          "Setiap atribut berisi nilai unik",
          "Sudah dalam 1NF dan tidak ada composite key"
        ],
        "correctIndex": 1,
        "explanation": "3NF mensyaratkan tabel sudah dalam 2NF dan tidak ada ketergantungan transitif, yaitu tidak ada atribut non-key yang bergantung pada atribut non-key lainnya."
      },
      {
        "id": 47,
        "type": "multiple-choice",
        "q": "Tabel dengan kolom (id_nilai, id_mahasiswa, id_matkul, nama_mahasiswa, nama_matkul, nilai) memiliki masalah karena...",
        "options": [
          "Kolom nilai seharusnya bertipe teks",
          "Ada redundansi: nama_mahasiswa bergantung pada id_mahasiswa, bukan pada seluruh key, melanggar 2NF",
          "id_nilai bukan Primary Key yang baik",
          "Terlalu sedikit kolom"
        ],
        "correctIndex": 1,
        "explanation": "Kolom nama_mahasiswa hanya bergantung pada id_mahasiswa (bukan seluruh composite key), dan nama_matkul hanya bergantung pada id_matkul. Ini adalah partial dependency yang melanggar 2NF."
      },
      {
        "id": 48,
        "type": "multiple-choice",
        "q": "Proses dekomposisi tabel yang ber-anomali menjadi beberapa tabel yang lebih kecil dan terfokus adalah inti dari...",
        "options": [
          "Normalisasi",
          "Indexing",
          "Denormalisasi",
          "Partitioning"
        ],
        "correctIndex": 0,
        "explanation": "Normalisasi adalah proses memecah (dekomposisi) tabel yang mengandung redundansi/anomali menjadi beberapa tabel yang lebih kecil dan bebas redundansi."
      },
      {
        "id": 49,
        "type": "multiple-choice",
        "q": "Tabel PEGAWAI(nip, nama, kode_dept, nama_dept) belum memenuhi 3NF karena...",
        "options": [
          "Tabel harus memiliki minimal 5 kolom",
          "Tidak memiliki Foreign Key",
          "nama_dept bergantung pada kode_dept (atribut non-key), bukan langsung pada nip (PK) — ini adalah transitive dependency",
          "nip bukan Primary Key yang valid"
        ],
        "correctIndex": 2,
        "explanation": "nama_dept bergantung pada kode_dept, bukan pada nip (PK). Ini adalah ketergantungan transitif: nip → kode_dept → nama_dept. Solusinya: pisahkan menjadi tabel PEGAWAI(nip, nama, kode_dept) dan DEPARTEMEN(kode_dept, nama_dept)."
      },
      {
        "id": 50,
        "type": "multiple-choice",
        "q": "Urutan normal form dari yang terendah ke tertinggi adalah...",
        "options": [
          "2NF → 1NF → 3NF",
          "1NF → 2NF → 3NF",
          "1NF → 3NF → 2NF",
          "3NF → 2NF → 1NF"
        ],
        "correctIndex": 1,
        "explanation": "Urutan normalisasi yang benar adalah 1NF → 2NF → 3NF. Setiap level yang lebih tinggi mengasumsikan level sebelumnya sudah terpenuhi."
      }
    ]
  }
]
