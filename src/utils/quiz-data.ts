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
  },
  //========================Relasi & Notasi=========================//
  {
    "slug": "advanced-relationship-modeling-modul-3",
    "title": "Relasi & Notasi",
    "description": "Quiz Modul 3: Supertype, Arc, Barred, Transferability, dan Recursive relationship di Oracle Data Modeler.",
    "category": "Database",
    "level": "Medium",
    "status": "New",
    "color": "blue",
    "questions": [
      {
        "id": 1,
        "q": "Apa tujuan utama penggunaan Supertype dan Subtype dalam pemodelan data?",
        "options": [
          "Untuk membuat tabel terlihat lebih banyak",
          "Mengelompokkan entitas yang punya karakteristik umum yang sama",
          "Menghapus semua atribut dari entitas induk",
          "Membuat relasi antar tabel menjadi many-to-many otomatis"
        ],
        "correctIndex": 1
      },
      {
        "id": 2,
        "q": "Dalam hierarki Supertype dan Subtype, sifat 'Inheritance' berarti...",
        "options": [
          "Subtype mewarisi semua atribut dan relasi dari Supertype",
          "Supertype mengambil semua atribut unik dari Subtype",
          "Subtype tidak boleh punya atribut sendiri",
          "Supertype dan Subtype tidak saling berhubungan"
        ],
        "correctIndex": 0
      },
      {
        "id": 3,
        "q": "Simbol visual untuk Subtype di Oracle Data Modeler biasanya digambarkan sebagai...",
        "options": [
          "Lingkaran di luar kotak entitas",
          "Garis putus-putus yang menghubungkan dua entitas",
          "Kotak di dalam kotak entitas Supertype",
          "Tanda panah menunjuk ke entitas lain"
        ],
        "correctIndex": 2
      },
      {
        "id": 4,
        "q": "Kapan kita sebaiknya menggunakan Arc Relationship?",
        "options": [
          "Saat satu entitas harus berhubungan dengan semua entitas lain secara bersamaan",
          "Saat sebuah entitas hanya boleh memiliki satu hubungan aktif dari beberapa pilihan",
          "Saat kita ingin menghubungkan entitas dengan dirinya sendiri",
          "Saat atribut entitas anak bergantung penuh pada entitas induk"
        ],
        "correctIndex": 1
      },
      {
        "id": 5,
        "q": "Contoh kasus yang paling pas buat pake Arc Relationship adalah...",
        "options": [
          "Seorang mahasiswa mengambil banyak mata kuliah",
          "Pemenang undian cuma bisa pilih hadiah Motor Atau Uang",
          "Seorang pegawai punya satu manajer",
          "Satu buku ditulis oleh banyak penulis"
        ],
        "correctIndex": 1
      },
      {
        "id": 6,
        "q": "Apa yang terjadi pada Foreign Key di tabel yang memiliki Arc Relationship?",
        "options": [
          "Semua Foreign Key harus bersifat Mandatory (Wajib)",
          "Foreign Key yang dihasilkan harus bersifat Opsional",
          "Tidak ada Foreign Key yang terbentuk",
          "Foreign Key akan otomatis menjadi Primary Key"
        ],
        "correctIndex": 1
      },
      {
        "id": 7,
        "q": "Barred Relationship (Identifying Relationship) ditandai dengan simbol apa di diagram?",
        "options": [
          "Garis putus-putus",
          "Simbol Diamond (Belah Ketupat)",
          "Garis vertikal kecil (Bar) di dekat entitas anak",
          "Tanda panah dua arah"
        ],
        "correctIndex": 2
      },
      {
        "id": 8,
        "q": "Apa dampak dari Barred Relationship terhadap UID (Unique Identifier) entitas anak?",
        "options": [
          "UID anak sepenuhnya independen dan tidak butuh UID induk",
          "UID anak terdiri dari UID induk ditambah atribut lain milik anak",
          "UID anak akan menghapus UID induk",
          "Entitas anak tidak boleh punya UID sama sekali"
        ],
        "correctIndex": 1
      },
      {
        "id": 9,
        "q": "Kondisi mana yang mengharuskan penggunaan Barred Relationship?",
        "options": [
          "Ketika entitas anak bisa berdiri sendiri tanpa entitas induk",
          "Ketika entitas anak merupakan bagian tak terpisahkan dari induk (weak entity)",
          "Ketika hubungan antar entitas bersifat opsional",
          "Ketika kita ingin memindahkan data antar tabel"
        ],
        "correctIndex": 1
      },
      {
        "id": 10,
        "q": "Apa yang dimaksud dengan Transferability dalam sebuah relasi?",
        "options": [
          "Kemampuan data untuk dihapus secara permanen",
          "Nilai relasi antar entitas bisa dipindah ke entitas lain",
          "Kemampuan database untuk transfer data ke server lain",
          "Sebuah entitas bisa berubah menjadi entitas lain"
        ],
        "correctIndex": 1
      },
      {
        "id": 11,
        "q": "Simbol Diamond (Belah Ketupat) pada garis relasi menandakan bahwa relasi tersebut bersifat...",
        "options": [
          "Transferable (Bisa dipindah)",
          "Non-Transferable (Tidak bisa dipindah)",
          "Optional (Boleh kosong)",
          "Recursive (Berulang)"
        ],
        "correctIndex": 1
      },
      {
        "id": 12,
        "q": "Manakah contoh kasus yang paling tepat untuk Non-Transferable Relationship?",
        "options": [
          "Pegawai yang bisa dipindah tugaskan ke departemen lain",
          "Buku dan Penulisnya",
          "Mahasiswa yang bisa ganti jurusan",
          "Pelanggan yang bisa ganti alamat pengiriman"
        ],
        "correctIndex": 1
      },
      {
        "id": 13,
        "q": "Recursive Relationship adalah hubungan yang terjadi ketika...",
        "options": [
          "Satu entitas berhubungan dengan banyak entitas lain sekaligus",
          "Sebuah entitas berhubungan dengan dirinya sendiri",
          "Entitas induk memiliki banyak subtype",
          "Hubungan antar entitas tidak memiliki cardinalitas"
        ],
        "correctIndex": 1
      },
      {
        "id": 14,
        "q": "Contoh nyata dari Recursive Relationship di dunia kerja adalah...",
        "options": [
          "Pegawai melapor ke Manajer",
          "Pegawai bekerja di Departemen",
          "Departemen memiliki banyak proyek",
          "Proyek dikerjakan oleh vendor luar"
        ],
        "correctIndex": 0
      },
      {
        "id": 15,
        "q": "Bagaimana cara membuat Recursive Relationship di Oracle Data Modeler?",
        "options": [
          "Menarik garis dari entitas A ke entitas B",
          "Klik tool relation, lalu klik dua kali pada entitas yang sama",
          "Menggunakan tool 'New Arc'",
          "Klik kanan pada entitas lalu pilih 'Make Recursive'"
        ],
        "correctIndex": 1
      },
      {
        "id": 16,
        "q": "Apa risiko utama jika Recursive Relationship tidak didesain dengan hati-hati?",
        "options": [
          "Data menjadi terlalu sedikit",
          "Terjadi looping tanpa henti",
          "Tabel akan otomatis terhapus",
          "Tidak bisa membuat Primary Key"
        ],
        "correctIndex": 1
      },
      {
        "id": 17,
        "q": "Dalam Supertype 'tb_karyawan', atribut 'gaji' bersifat mandatory. Apa dampaknya bagi Subtype?",
        "options": [
          "Subtype boleh tidak punya atribut gaji",
          "Subtype otomatis memiliki atribut gaji",
          "Subtype harus membuat atribut gaji baru dengan nama beda",
          "Atribut gaji di Subtype menjadi optional"
        ],
        "correctIndex": 1
      },
      {
        "id": 18,
        "q": "Jika sebuah entitas memiliki ARC yang menghubungkan 2 relasi, dan kedua relasi itu mandatory, maka...",
        "options": [
          "Data harus terisi di kedua relasi tersebut secara bersamaan",
          "Data boleh kosong di kedua relasi",
          "Data harus terisi di salah satu relasi saja, tidak boleh keduanya",
          "Data di salah satu relasi boleh dihapus sembarangan"
        ],
        "correctIndex": 2
      },
      {
        "id": 19,
        "q": "Di Oracle Data Modeler, langkah pertama untuk membuat Subtype adalah...",
        "options": [
          "Membuat relasi one-to-many biasa",
          "Membuat entitas baru di dalam entitas yang sudah ada",
          "Menghapus entitas Supertype",
          "Mengganti nama tabel menjadi huruf kapital semua"
        ],
        "correctIndex": 1
      },
      {
        "id": 20,
        "q": "Sifat hubungan data yang 'harus ada dan saling melengkapi' paling cocok digambarkan dengan notasi...",
        "options": [
          "Recursive",
          "Non-Transferable",
          "Barred",
          "Arc"
        ],
        "correctIndex": 2
      }
    ]
  },
  //========================Logika & Aturan Normalisasi=========================//
  {
    "slug": "normalisasi-data-logic-rules-modul-3",
    "title": "Logika & Aturan Normalisasi",
    "description": "Quiz modul 3: Aturan 1NF, 2NF, 3NF, dan cara benerin data yang redundan biar database-nya efisien.",
    "category": "Database Normalization",
    "level": "Medium",
    "status": "New",
    "color": "purple",
    "questions": [
      {
        "id": 1,
        "q": "Apa sih tujuan utama dari melakukan normalisasi data?",
        "options": [
          "Biar tabelnya jadi banyak dan terlihat kompleks",
          "Mengurangi duplikat data dan anomali",
          "Supaya data bisa dibaca oleh manusia tanpa query SQL",
          "Menggabungkan semua data menjadi satu tabel besar (Big Data)"
        ],
        "correctIndex": 1
      },
      {
        "id": 2,
        "q": "Kondisi di mana satu sel dalam tabel berisi lebih dari satu nilai (misal: '08123, 08199') melanggar aturan normalisasi bentuk keberapa?",
        "options": [
          "First Normal Form (1NF)",
          "Second Normal Form (2NF)",
          "Third Normal Form (3NF)",
          "Zero Normal Form (unnormalized)"
        ],
        "correctIndex": 0
      },
      {
        "id": 3,
        "q": "Syarat WAJIBBB agar sebuah tabel dikatakan memenuhi 1NF (First Normal Form) adalah...",
        "options": [
          "Harus punya Primary Key ganda",
          "Setiap atribut harus bernilai tunggal",
          "Tidak boleh ada atribut yang kosong (NULL)",
          "Tabel harus sudah terhubung dengan tabel lain"
        ],
        "correctIndex": 1
      },
      {
        "id": 4,
        "q": "Jika kamu nemu atribut 'Hobi' yang isinya banyak (multi-value) dalam satu entitas, apa solusi normalisasinya?",
        "options": [
          "Hapus atribut Hobi dari database",
          "Biarkan saja, nanti dipisahkan pakai koma di aplikasi",
          "Buat entitas baru untuk Hobi dan hubungkan dengan relasi 1:M",
          "Jadikan atribut Hobi sebagai Primary Key"
        ],
        "correctIndex": 2
      },
      {
        "id": 5,
        "q": "Second Normal Form (2NF) baru bisa dilakukan kalau syarat ini terpenuhi, yaitu...",
        "options": [
          "Tabel sudah memenuhi 1NF",
          "Tabel sudah memenuhi 3NF",
          "Tabel tidak memiliki Primary Key",
          "Data dalam tabel sudah lebih dari 1000 baris"
        ],
        "correctIndex": 0
      },
      {
        "id": 6,
        "q": "Fokus utama dari aturan 2NF adalah menghilangkan...",
        "options": [
          "Ketergantungan Transitif (Transitive Dependency)",
          "Ketergantungan Parsial (Partial Dependency)",
          "Atribut yang bernilai ganda",
          "Data yang duplikat di semua baris"
        ],
        "correctIndex": 1
      },
      {
        "id": 7,
        "q": "Apa yang dimaksud dengan Ketergantungan Parsial (Partial Dependency)?",
        "options": [
          "Atribut non-key bergantung pada atribut non-key lainnya",
          "Atribut non-key hanya bergantung pada sebagian dari Primary Key",
          "Atribut key bergantung pada atribut non-key",
          "Tidak ada atribut yang saling bergantung"
        ],
        "correctIndex": 1
      },
      {
        "id": 8,
        "q": "Dalam tabel 'Nilai_Mahasiswa' dengan UID gabungan (NIM, Kode_Matkul), atribut 'Nama_Mahasiswa' sebaiknya dipindah. Kenapa?",
        "options": [
          "Karena nama mahasiswa terlalu panjang",
          "Karena nama mahasiswa hanya bergantung pada NIM, bukan pada Kode_Matkul (Parsial)",
          "Karena nama mahasiswa bergantung pada Kode_Matkul saja",
          "Karena nama mahasiswa harusnya dienkripsi"
        ],
        "correctIndex": 1
      },
      {
        "id": 9,
        "q": "Third Normal Form (3NF) melarang adanya jenis ketergantungan apa?",
        "options": [
          "Ketergantungan Fungsional Penuh",
          "Ketergantungan Parsial",
          "Ketergantungan Transitif",
          "Ketergantungan Antar Tabel"
        ],
        "correctIndex": 2
      },
      {
        "id": 10,
        "q": "Contoh kasus Ketergantungan Transitif yang paling tepat adalah...",
        "options": [
          "A tergantung pada B, dan B adalah Primary Key",
          "A tergantung pada B, dan B tergantung pada C (di mana C adalah Primary Key)",
          "A dan B sama-sama Primary Key",
          "A tidak tergantung pada siapa-siapa"
        ],
        "correctIndex": 1
      },
      {
        "id": 11,
        "q": "Di tabel 'Order', ada atribut 'Kota_Tujuan' yang bergantung pada 'Kode_Pos', bukan langsung ke 'ID_Order'. Ini melanggar...",
        "options": [
          "1NF",
          "2NF",
          "3NF",
          "Aturan Integritas Data"
        ],
        "correctIndex": 2
      },
      {
        "id": 12,
        "q": "Apa solusi untuk mengatasi pelanggaran 3NF (Transitive Dependency)?",
        "options": [
          "Hapus atribut yang menjadi penyebab ketergantungan",
          "Pindahkan atribut yang bergantung transitif ke entitas baru yang sesuai",
          "Gabungkan semua atribut menjadi satu string panjang",
          "Ubah Primary Key tabel utama"
        ],
        "correctIndex": 1
      },
      {
        "id": 13,
        "q": "Apa istilah untuk bentuk data mentah yang belum melalui proses normalisasi sama sekali?",
        "options": [
          "Abnormal Form",
          "Pre-Normalized Data",
          "Unnormalized Form (UNF)",
          "Raw Material Data"
        ],
        "correctIndex": 2
      },
      {
        "id": 14,
        "q": "Intersection Entity (Entitas Perantara) biasanya muncul saat kita menormalisasi hubungan...",
        "options": [
          "One-to-One (1:1)",
          "One-to-Many (1:M)",
          "Many-to-Many (M:N)",
          "Recursive"
        ],
        "correctIndex": 2
      },
      {
        "id": 15,
        "q": "Dalam studi kasus Invoice Pembelian, kenapa data 'Supplier' harus dipisah dari tabel Invoice?",
        "options": [
          "Supaya tabel fakturnya terlihat lebih bersih",
          "Karena data nama supplier akan berulang-ulang ditulis setiap ada Invoice baru (Redundansi)",
          "Karena supplier tidak penting dalam transaksi",
          "Agar jumlah kolom di tabel Invoice genap"
        ],
        "correctIndex": 1
      },
      {
        "id": 16,
        "q": "Jika sebuah tabel sudah memenuhi 3NF, apakah otomatis sudah memenuhi 2NF?",
        "options": [
          "Tidak, urutannya terbalik",
          "Iya",
          "Tergantung datanya",
          "Tidak ada hubungannya"
        ],
        "correctIndex": 1
      },
      {
        "id": 17,
        "q": "Salah satu alasan kenapa kita harus menghindari 'Data Anomaly' (anomali data) adalah...",
        "options": [
          "Agar ukuran database menjadi sangat besar",
          "Mencegah ketidakkonsistenan data",
          "Supaya programmer punya pekerjaan lebih banyak",
          "Agar database bisa dijual lebih mahal"
        ],
        "correctIndex": 1
      },
      {
        "id": 18,
        "q": "Dalam notasi CDM (Logical), Intersection Entity dari hubungan M:N seringkali digambarkan dengan...",
        "options": [
          "Penengah relasi 2 entitas",
          "Satu garis lurus tanpa panah",
          "Entitas tanpa atribut UID",
          "Relasi Arc"
        ],
        "correctIndex": 0
      },
      {
        "id": 19,
        "q": "Jika UID (Unique Identifier) terdiri dari satu atribut saja (Simple UID), apakah mungkin terjadi pelanggaran 2NF?",
        "options": [
          "Sangat mungkin terjadi",
          "Tidak mungkin",
          "Pasti terjadi di setiap tabel",
          "Tergantung jumlah baris datanya"
        ],
        "correctIndex": 1
      },
      {
        "id": 20,
        "q": "Langkah pertama yang paling logis saat menerima data nota/kuitansi mentah untuk dinormalisasi adalah...",
        "options": [
          "Langsung buat tabel 3NF",
          "Identifikasi Unnormalized-nya",
          "Membuat coding aplikasi",
          "Menghapus data yang kosong"
        ],
        "correctIndex": 1
      }
    ]
  }
]
