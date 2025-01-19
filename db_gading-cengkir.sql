-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 16 Jan 2025 pada 14.55
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_gading-cengkir`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `daily_exercise`
--

CREATE TABLE `daily_exercise` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `tipe` enum('Artikel','Buku','Teori-teori Akting','Video Tutorial','Gambar') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `daily_exercise`
--

INSERT INTO `daily_exercise` (`id`, `judul`, `deskripsi`, `file_path`, `tipe`, `createdAt`, `updatedAt`) VALUES
('30b73e14-f906-4603-bfe0-a56773cd1a60', 'Video Tutorial: Cara Membangun Chemistry Antar Aktor di Atas Panggung', '\"Tutorial ini menunjukkan langkah-langkah bagaimana membangun chemistry yang kuat antara aktor di atas panggung. Dengan latihan interaksi sederhana hingga teknik komunikasi non-verbal, video ini akan membantu para aktor menciptakan hubungan yang lebih mendalam dengan lawan main. Penonton akan mempelajari teknik-teknik improvisasi serta cara menghadirkan koneksi emosional yang kuat dalam setiap adegan, sehingga penampilan di panggung terasa lebih alami dan autentik.\"', '/uploads/dailyExercise/1726826435381-Dewa19 Feat Virzha - Tak Kan Ada Cinta Yang Lain - 30 Years Career of Dewa19.mp4', 'Video Tutorial', '2024-09-20 10:00:35', '2024-09-20 10:00:35'),
('3b589510-723a-4a02-9f38-d9f0bc80cdbc', 'Menjelajahi Dunia Fantasi Melalui Buku-Buku Epik', '\"Dunia fantasi selalu menawarkan pelarian dari kenyataan dengan kisah-kisah yang luar biasa. Artikel ini mengulas beberapa buku epik fantasi yang membangun dunia-dunia magis seperti \'The Lord of the Rings\' karya J.R.R. Tolkien dan \'A Song of Ice and Fire\' karya George R.R. Martin. Dari karakter heroik hingga konflik besar antara kebaikan dan kejahatan.\"', '/uploads/dailyExercise/1735003738717-Sayonara Eri.pdf', 'Buku', '2024-09-20 09:54:13', '2024-12-24 01:28:59'),
('43d8300a-2868-43b9-8730-471ccfde9d1e', 'Mengasah Keterampilan Improvisasi untuk Aktor Drama', '\"Artikel ini mengeksplorasi lebih dalam tentang pentingnya improvisasi dalam seni peran drama. Improvisasi memungkinkan aktor untuk bereaksi spontan terhadap situasi di panggung tanpa naskah yang pasti, membantu mereka beradaptasi dalam momen-momen tak terduga. Melalui latihan-latihan khusus, aktor dapat mengembangkan kreativitas, kepercayaan diri, dan kemampuan mendengarkan lawan main, sehingga setiap adegan terasa lebih hidup dan natural. Pembaca akan mempelajari teknik dasar serta cara-cara menghadirkan improvisasi yang tetap relevan dengan alur cerita tanpa keluar dari karakter yang diperankan.\"', '/uploads/dailyExercise/1726825776945-3. Form Pendaftaran Yudisium.docx', 'Artikel', '2024-09-20 09:49:36', '2024-09-20 09:49:36'),
('4d517cf2-795f-48fd-a587-fdd88de23413', 'Menguak Misteri Melalui Novel Detektif Berlangsung', '\"Novel detektif selalu memikat pembaca dengan teka-teki yang rumit dan alur cerita penuh kejutan. Artikel ini membahas beberapa novel detektif terbaik dari penulis terkenal seperti Agatha Christie dan Arthur Conan Doyle. Dari karakter-karakter detektif ikonik hingga metode investigasi yang menarik.\"', '/uploads/dailyExercise/1735003752718-Sayonara Eri.pdf', 'Buku', '2024-09-20 09:53:02', '2024-12-24 01:29:12'),
('707b27d7-02e6-4523-815f-beb8e68d22c3', 'Mengeksplorasi Karakter dalam Drama', '\"Mengeksplorasi karakter adalah fondasi penting bagi seorang aktor. Artikel ini membahas cara-cara untuk lebih mendalami psikologi dan motivasi karakter dalam skenario. Aktor diajak untuk mengeksplorasi latar belakang cerita, emosi, serta hubungan antara karakter dengan lingkungan dan tokoh lain. Dengan memahami siapa karakter mereka, aktor dapat menghadirkan penampilan yang lebih kuat dan otentik di panggung. Pembaca juga akan mempelajari teknik mendalam seperti analisis naskah, pemetaan emosi, hingga teknik improvisasi untuk memperkuat dinamika karakter yang mereka perankan.\"', '/uploads/dailyExercise/1726825680672-3. Form Pendaftaran Yudisium.docx', 'Artikel', '2024-09-20 09:48:00', '2024-09-20 09:48:00'),
('782e93f0-1306-49f8-8fab-a41da80a6d95', 'Membangun Karakter dari Dalam', '\"Teori Stanislavski adalah salah satu metode akting paling berpengaruh yang menekankan pentingnya penghayatan dan kejujuran emosi dalam setiap peran. Artikel ini membahas bagaimana aktor dapat menggunakan metode ini untuk \'hidup\' sebagai karakter mereka, dengan fokus pada konsep \'jika aku adalah karakter ini.\"', '/uploads/dailyExercise/1726826205894-3. Form Pendaftaran Yudisium.docx', 'Teori-teori Akting', '2024-09-20 09:56:45', '2024-09-20 12:26:17'),
('81b5c98c-2701-48cf-b84f-225420ea06a4', 'Teknik Olah Suara untuk Peran Karakter', '\"Olah suara adalah aspek yang sering kali diabaikan namun sangat krusial dalam akting. Artikel ini membahas teknik-teknik olah suara yang diperlukan untuk memperkuat karakter. Dari latihan artikulasi, volume, hingga intonasi yang tepat, suara dapat membedakan setiap karakter yang dimainkan. Latihan ini juga membantu aktor menyampaikan emosi dan maksud dengan lebih jelas dan kuat. Pembaca akan mempelajari cara-cara meningkatkan kualitas vokal mereka, dari menjaga kesehatan suara hingga teknik bernyanyi yang bisa diaplikasikan dalam peran-peran musikal.\"', '/uploads/dailyExercise/1735003835401-Sayonara Eri.pdf', 'Artikel', '2024-09-20 09:50:44', '2024-12-24 01:30:35'),
('8d6b516e-b364-4f18-93a0-5d5788124c95', 'Menggunakan Imajinasi dalam Akting', '\"Teori akting Michael Chekhov menekankan pentingnya imajinasi dalam menciptakan karakter yang hidup dan dinamis. Artikel ini membahas konsep-konsep inti seperti \'impuls psikologis\' dan \'gesture imajinatif,\' di mana aktor belajar menggunakan gerakan dan imajinasi untuk memahami dan mengkomunikasikan emosi karakter.\"', '/uploads/dailyExercise/1726826336549-3. Form Pendaftaran Yudisium.docx', 'Teori-teori Akting', '2024-09-20 09:58:56', '2024-09-20 12:26:26'),
('947b0688-cccb-46c3-bdbd-621b81f98de2', 'Membangun Jarak Emosional dengan Penonton', '\"Bertolt Brecht dikenal dengan teori akting epiknya, yang menekankan pemisahan emosional antara aktor dan karakter. Artikel ini mengupas bagaimana Brecht menggunakan teknik \'verfremdungseffekt\' atau efek keterasingan untuk membuat penonton berpikir kritis tentang tema yang diangkat dalam drama.\"', '/uploads/dailyExercise/1726826292911-3. Form Pendaftaran Yudisium.docx', 'Teori-teori Akting', '2024-09-20 09:58:12', '2024-09-20 12:26:36'),
('afdf5522-7e07-4fe1-9a8c-0c4fe1ce5fd4', 'Bereaksi Spontan dan Mendalam', '\"Teori Meisner menekankan pentingnya respons spontan dan alami terhadap lingkungan dan aktor lain di atas panggung. Artikel ini menjelaskan bagaimana aktor dapat fokus pada keadaan saat ini dan bereaksi terhadap hal-hal nyata yang terjadi di sekitarnya.\"', '/uploads/dailyExercise/1735003880618-Sayonara Eri.pdf', 'Teori-teori Akting', '2024-09-20 09:57:33', '2024-12-24 01:31:20'),
('c396b093-fd51-4414-8805-cbf22636b32c', 'Memahami Karakter Melalui Buku-Buku Sastra Klasik', '\"Buku-buku sastra klasik selalu menawarkan wawasan yang dalam mengenai sifat manusia. Artikel ini mengeksplorasi bagaimana penulis-penulis seperti Tolstoy, Dickens, dan Austen membangun karakter yang rumit dan multidimensional. Pembaca akan diajak untuk memahami cara penulis menggambarkan konflik internal.\"', '/uploads/dailyExercise/1726825943517-Bebas Lab_Muhammad Arif Alifan Sultoni.pdf', 'Buku', '2024-09-20 09:52:23', '2024-09-20 12:28:52'),
('dbe6d8cc-1b68-425e-8ae2-f2df15729baf', 'Inspirasi Hidup dari Buku Non-Fiksi Motivasi', '\"Buku-buku motivasi sering kali menjadi panduan berharga untuk menghadapi tantangan hidup. Artikel ini membahas beberapa karya non-fiksi terbaik yang memberikan inspirasi, seperti \'The Power of Habit\' karya Charles Duhigg dan \'Grit\' karya Angela Duckworth. Setiap buku menawarkan wawasan mengenai bagaimana mengubah kebiasaan, mengejar mimpi, dan menghadapi kegagalan.\"', '/uploads/dailyExercise/1726826020714-3. Form Pendaftaran Yudisium.docx', 'Buku', '2024-09-20 09:53:40', '2024-09-20 12:29:02'),
('ddb18949-514f-4861-89a1-c915d284d282', 'Membangun Chemistry di Atas Panggung', '\"Salah satu tantangan besar dalam pertunjukan drama adalah membangun chemistry yang kuat antaraktor di atas panggung. Artikel ini mengupas tuntas bagaimana aktor dapat mengembangkan interaksi yang harmonis dan dinamis dengan lawan main mereka. Dimulai dari latihan-latihan dasar seperti latihan mata hingga teknik improvisasi kelompok, aktor diajak untuk saling mengenal lebih dalam dan memahami peran satu sama lain. Ini membuat pertunjukan terasa lebih kohesif dan natural bagi penonton, menciptakan cerita yang lebih meyakinkan dan hidup.\"', '/uploads/dailyExercise/1726825812807-Bebas Lab_Muhammad Arif Alifan Sultoni.pdf', 'Artikel', '2024-09-20 09:50:12', '2024-09-20 09:50:12'),
('ec8e7cc1-e4a7-4afc-8b90-bb69a1434a05', 'Latihan Fisik untuk Persiapan Drama', '\"Latihan fisik memainkan peran penting dalam teater, terutama bagi aktor yang sering harus bergerak aktif di atas panggung. Artikel ini menjelaskan pentingnya latihan fisik dalam meningkatkan stamina dan fleksibilitas tubuh seorang aktor. Dari teknik pernapasan yang benar hingga gerakan yang efisien, latihan fisik memungkinkan aktor untuk tampil dengan penuh energi tanpa cepat kelelahan. Latihan ini juga memadukan gerakan yang sinkron dengan ekspresi emosi dan intensitas karakter, membuat setiap gerakan di panggung terasa lebih alami dan kuat.\"', '/uploads/dailyExercise/1726825739874-Bebas Pustaka_Muhammad Arif Alifan Sultoni.pdf', 'Artikel', '2024-09-20 09:48:59', '2024-09-20 09:48:59'),
('f26d73d3-019b-4bda-ad83-18570e0fd2ed', 'Mengasah Keterampilan Improvisasi untuk Aktor Drama', '\"Artikel ini mengeksplorasi lebih dalam tentang pentingnya improvisasi dalam seni peran drama. Improvisasi memungkinkan aktor untuk bereaksi spontan terhadap situasi di panggung tanpa naskah yang pasti, membantu mereka beradaptasi dalam momen-momen tak terduga. Melalui latihan-latihan khusus, aktor dapat mengembangkan kreativitas, kepercayaan diri, dan kemampuan mendengarkan lawan main, sehingga setiap adegan terasa lebih hidup dan natural. Pembaca akan mempelajari teknik dasar serta cara-cara menghadirkan improvisasi yang tetap relevan dengan alur cerita tanpa keluar dari karakter yang diperankan.\"', '/uploads/dailyExercise/1726825608419-Bebas Pustaka_Muhammad Arif Alifan Sultoni.pdf', 'Artikel', '2024-09-20 09:46:48', '2024-09-20 09:46:48'),
('f4080d1d-c574-44bd-ade6-4cbdbc6fca94', 'Video Tutorial: Teknik Dasar Akting untuk Pemula Dan Langsung Jadi', '\"Video tutorial ini membahas teknik dasar akting yang wajib dikuasai oleh setiap pemula. Dari pemahaman dasar tentang tubuh sebagai alat ekspresi hingga cara mengendalikan suara, video ini memberikan langkah-langkah praktis untuk mulai berakting. Setiap gerakan, ekspresi, dan intonasi akan dibahas dengan jelas, sehingga pemula dapat mengasah keterampilan mereka dengan latihan yang sederhana namun efektif. Tutorial ini sangat cocok bagi mereka yang baru terjun ke dunia drama dan ingin membangun fondasi yang kuat.\"', '/uploads/dailyExercise/1726826398508-Dewa19 Feat Virzha - Tak Kan Ada Cinta Yang Lain - 30 Years Career of Dewa19.mp4', 'Video Tutorial', '2024-09-20 09:59:59', '2024-09-20 10:20:27');

-- --------------------------------------------------------

--
-- Struktur dari tabel `drama`
--

CREATE TABLE `drama` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nama` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `drama`
--

INSERT INTO `drama` (`id`, `nama`, `deskripsi`, `createdAt`, `updatedAt`) VALUES
('44cff42e-c2b7-4c67-87d8-3e88301a02aa', 'Improvisasi', '\"Kemampuan berakting spontan tanpa naskah, menyesuaikan diri dengan situasi yang tak terduga.\"', '2024-12-22 02:06:52', '2024-12-23 05:50:36'),
('4dd29a47-eb9c-438f-b8e3-72994ba9e522', 'Pengelolaan Jiwa', '\"Kontrol emosi dan mental yang stabil untuk menghadapi tantangan dalam akting.\"', '2024-12-23 05:51:37', '2024-12-23 05:51:37'),
('65cd74ff-a274-49fc-b807-2cb424ea01b5', 'Kolaborasi Tim', '\"Kemampuan bekerja sama dengan aktor, sutradara, dan kru untuk menciptakan pertunjukan yang kohesif.\"', '2024-12-23 05:53:14', '2024-12-23 05:53:14'),
('83761c89-6f18-4f82-9cbd-536a9045dab5', 'Kepercayaan Diri  ', '\"Rasa percaya diri untuk tampil di hadapan publik dan menyampaikan karakter dengan penuh keyakinan.\"', '2024-12-19 02:02:20', '2024-12-23 05:51:11'),
('8f02b0d3-218a-4143-9db6-8adafe758e65', 'Jiwa Apresiasi Terhadap Seni', '\"Pemahaman dan penghargaan mendalam terhadap berbagai bentuk seni dan teater.\"', '2024-12-23 05:52:04', '2024-12-23 05:52:04'),
('d9fe7800-ed63-4964-b668-91b1f0bc3ef8', 'Kemampuan Akting', '\"Kemampuan untuk memerankan karakter secara autentik melalui ekspresi, suara, dan gerakan.\"', '2024-12-23 05:52:28', '2024-12-23 05:52:28');

-- --------------------------------------------------------

--
-- Struktur dari tabel `evaluasi_karakter`
--

CREATE TABLE `evaluasi_karakter` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `judul_evaluasi` varchar(255) NOT NULL,
  `evaluasi` text NOT NULL,
  `kekurangan` text DEFAULT NULL,
  `tanggal_evaluasi` datetime NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `evaluasi_karakter`
--

INSERT INTO `evaluasi_karakter` (`id`, `judul_evaluasi`, `evaluasi`, `kekurangan`, `tanggal_evaluasi`, `user_id`, `createdAt`, `updatedAt`) VALUES
('bf263b73-b799-4e09-b977-2244c826c38e', 'malas', 'sangat malas', 'sangat amat malas', '2024-12-23 00:00:00', '64b5d899-e399-488e-9844-ecda5932c930', '2024-12-23 06:05:22', '2024-12-23 06:05:22'),
('c00b40cb-2433-495c-9f59-d5604b68cd58', 'hgsdhjasgjd', 'asdasdasd ', 'cssdsdf', '2024-12-30 00:00:00', '64b5d899-e399-488e-9844-ecda5932c930', '2024-12-23 06:05:59', '2024-12-23 06:05:59'),
('ce80c3b3-d5cd-454e-9456-6983cde2632b', 'testinng', 'test', 'test', '2024-12-23 00:00:00', '08f552a8-7ab0-493e-86c4-9e4133e98fde', '2024-12-20 02:59:07', '2024-12-22 01:15:21'),
('e1e0571e-23a4-4226-93bf-6657c9d60be7', 'Evaluasi Karakter - Akting', 'Aktor memiliki kemampuan improvisasi yang baik, namun perlu meningkatkan manajemen emosi.', 'Perlu lebih percaya diri dalam adegan-adegan dramatis.', '2024-12-20 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', '2024-12-20 02:57:13', '2024-12-20 02:57:13');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kalender_acara`
--

CREATE TABLE `kalender_acara` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `tanggal_event` datetime NOT NULL,
  `file_paths` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`file_paths`)),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kalender_acara`
--

INSERT INTO `kalender_acara` (`id`, `judul`, `deskripsi`, `tanggal_event`, `file_paths`, `createdAt`, `updatedAt`) VALUES
('024947c2-63f7-4973-be7a-e2fdaed7c716', 'Siluet di Balik Kayangan', 'Ketika seorang penulis menemukan kembali buku harian lamanya, ia terjebak dalam kenangan cinta yang tak terbalas. Melalui setiap halaman, ia menggali kembali perasaan dan harapan yang telah lama terkubur, menyadari bahwa cinta yang sebenarnya tidak pernah hilang. Drama ini mengeksplorasi perjalanan emosional dari kehilangan, penyesalan, dan akhirnya, penerimaan.', '2025-04-11 00:00:00', '\"/uploads/kalender_acara/1726816279789-Queen of Tears (2024).jpg\"', '2024-09-20 07:11:19', '2025-01-05 13:25:16'),
('18a5c4c3-6082-46e1-8fd9-439e7e6355f7', 'Langit yang Hilang', 'Ketika sekelompok ilmuwan menemukan cara untuk mengubah cuaca, mereka harus menghadapi konsekuensi dari keputusan mereka. Drama ini menggali tema etika ilmiah, keserakahan manusia, dan dampak tindakan kita terhadap lingkungan. Dengan latar belakang ketegangan yang semakin meningkat, para karakter berjuang untuk menemukan keseimbangan antara inovasi dan tanggung jawab.', '2025-03-12 00:00:00', '\"/uploads/kalender_acara/1726816357872-Queen of Tears (2024).jpg\"', '2024-09-20 07:12:37', '2025-01-05 13:24:13'),
('407a0351-86d1-4c29-a7d7-4d87b66ad286', 'Langkah-Langkah Kehidupan', 'Dalam kisah yang menggugah emosi ini, kita mengikuti perjalanan hidup seorang wanita yang berjuang melawan rintangan demi mencapai impiannya menjadi penari profesional. Dari masa kecilnya yang penuh tantangan hingga momen-momen keberhasilan yang menggembirakan, drama ini menggambarkan semangat, ketekunan, dan kekuatan untuk terus melangkah meskipun menghadapi kegagalan.', '2025-01-05 00:00:00', '\"/uploads/kalender_acara/1726816216620-KANG HANEUL.jpg\"', '2024-09-20 07:10:16', '2025-01-05 13:26:21'),
('4dae925c-8251-46f3-ab18-091782b53acb', 'Kembali ke Akarnya Pencipta', 'Seorang pengusaha sukses kembali ke kampung halamannya setelah bertahun-tahun mengabaikan masa lalu. Ia menemukan bahwa akar dan budaya yang ia tinggalkan memiliki makna yang dalam dalam hidupnya. Melalui interaksi dengan orang-orang di desanya, ia belajar tentang nilai-nilai yang hilang dan pentingnya menghargai tradisi serta identitas diri.', '2025-01-05 00:00:00', '\"/uploads/kalender_acara/1727102405326-KANG HANEUL.jpg\"', '2024-09-23 14:40:05', '2025-01-05 13:27:03'),
('5d9ba904-917f-4839-b908-489ed0048134', 'Jejak di Atas Pasir', 'Dalam drama ini, sekelompok teman lama berkumpul kembali di pantai yang penuh kenangan untuk mengenang masa lalu mereka. Namun, saat mereka mulai membuka cerita masing-masing, rahasia kelam terungkap, dan ikatan persahabatan mereka diuji. Cerita ini menyentuh tentang nostalgia, kehilangan, dan arti sejati dari persahabatan yang tahan uji oleh waktu.', '2025-01-05 00:00:00', '\"/uploads/kalender_acara/1726816236177-download.jpg\"', '2024-09-20 07:10:36', '2025-01-05 13:26:13'),
('636a7d67-dd28-4490-a149-7189dfd1fead', 'Panggung Harapan', 'Di sebuah panti asuhan, sekelompok anak-anak memutuskan untuk mengadakan pertunjukan teater untuk memberikan harapan bagi diri mereka sendiri dan teman-teman mereka. Melalui tantangan dan kesulitan yang mereka hadapi, mereka belajar tentang impian, keberanian, dan pentingnya bersatu. Drama ini menggambarkan kekuatan seni dalam mengubah hidup dan memberikan semangat baru.', '2025-04-16 00:00:00', '\"/uploads/kalender_acara/1726816257060-KANG HANEUL.jpg\"', '2024-09-20 07:10:57', '2025-01-05 13:25:40'),
('71da9537-b528-4ac7-bc2e-a6e025271ba6', 'Malam Tanpa Bintang', 'Di sebuah kota kecil yang dilanda kesedihan setelah kehilangan seorang pemimpin yang dicintai, sekelompok warga berusaha menemukan cara untuk melanjutkan hidup. Melalui kisah-kisah pribadi mereka, drama ini menggambarkan perjuangan menghadapi kehilangan, harapan untuk masa depan, dan bagaimana komunitas dapat bersatu dalam kesedihan.', '2025-04-03 00:00:00', '\"/uploads/kalender_acara/1726816326456-KANG HANEUL.jpg\"', '2024-09-20 07:12:06', '2025-01-05 13:25:52'),
('7b0db926-e661-4970-9087-150a17c10982', 'MSI', 'Berbagai acara yang menarik dan asik untuk ditontojn mahasiswa teknik informatila', '2025-01-21 00:00:00', '\"/uploads/kalender_acara/1734483491392-Desain tanpa judul (8).png\"', '2024-12-18 00:58:11', '2025-01-05 13:23:38'),
('85ee1548-b21c-4aa9-97a1-ccc1c3985844', 'Kembali ke Induknya', 'Seorang pengusaha sukses kembali ke kampung halamannya setelah bertahun-tahun mengabaikan masa lalu. Ia menemukan bahwa akar dan budaya yang ia tinggalkan memiliki makna yang dalam dalam hidupnya. Melalui interaksi dengan orang-orang di desanya, ia belajar tentang nilai-nilai yang hilang dan pentingnya menghargai tradisi serta identitas diri.', '2025-01-30 00:00:00', '\"/uploads/kalender_acara/1727102285358-KANG HANEUL.jpg\"', '2024-09-23 14:38:05', '2025-01-05 13:23:48'),
('9767704a-33bf-4335-b230-3443ac83811a', 'Kembali ke Akarnya Suhu', 'Seorang pengusaha sukses kembali ke kampung halamannya setelah bertahun-tahun mengabaikan masa lalu. Ia menemukan bahwa akar dan budaya yang ia tinggalkan memiliki makna yang dalam dalam hidupnya. Melalui interaksi dengan orang-orang di desanya, ia belajar tentang nilai-nilai yang hilang dan pentingnya menghargai tradisi serta identitas diri.', '2025-01-05 00:00:00', '\"/uploads/kalender_acara/1727102370192-Queen of Tears (2024).jpg\"', '2024-09-23 14:39:30', '2025-01-05 13:27:13'),
('9f28017d-7deb-4ba6-b6dd-10a51f2cec01', 'Acara Malam Seni', 'Seorang pengusaha sukses kembali ke kampung halamannya setelah bertahun-tahun mengabaikan masa lalu. Ia menemukan bahwa akar dan budaya yang ia tinggalkan memiliki makna yang dalam dalam hidupnya. Melalui interaksi dengan orang-orang di desanya, ia belajar tentang nilai-nilai yang hilang dan pentingnya menghargai tradisi serta identitas diri.', '2025-01-05 00:00:00', '\"/uploads/kalender_acara/1727102448244-download.jpg\"', '2024-09-23 14:40:48', '2025-01-05 13:26:54'),
('ad41d4c0-442e-4796-bbd6-d61f8031d21d', 'Kembali ke Akarnya', 'Seorang pengusaha sukses kembali ke kampung halamannya setelah bertahun-tahun mengabaikan masa lalu. Ia menemukan bahwa akar dan budaya yang ia tinggalkan memiliki makna yang dalam dalam hidupnya. Melalui interaksi dengan orang-orang di desanya, ia belajar tentang nilai-nilai yang hilang dan pentingnya menghargai tradisi serta identitas diri.', '2025-02-13 00:00:00', '\"/uploads/kalender_acara/1726816397692-download.jpg\"', '2024-09-20 07:13:17', '2025-01-05 13:24:00'),
('cf5abee6-4553-4267-a2c3-3b9d924387f9', 'Queen Of Tears', 'Dalam sebuah dunia di mana waktu adalah barang berharga, dua jiwa yang terpisah oleh dimensi waktu berjuang untuk menemukan jalan kembali satu sama lain. Cerita ini mengisahkan perjalanan mereka melalui berbagai era, dari keindahan zaman kuno hingga realitas suram masa depan, sambil menggali makna cinta sejati yang melampaui waktu dan ruang.', '2025-01-05 00:00:00', '\"/uploads/kalender_acara/1726816082218-Queen of Tears (2024).jpg\"', '2024-09-20 07:08:02', '2025-01-05 13:26:37'),
('dda05b9c-4740-4308-aa8e-49ed722fef83', 'Cerita dari Dalam Hatiku', 'Seorang penulis yang sedang mengalami kebuntuan kreatif menemukan inspirasi di antara kisah-kisah orang-orang yang ia temui di jalan. Setiap karakter memiliki cerita unik yang menggambarkan perjalanan hidup, harapan, dan mimpi yang belum tercapai. Drama ini menunjukkan kekuatan mendengarkan dan bagaimana hubungan manusia dapat menjadi sumber inspirasi yang tak terbatas.', '2025-01-05 00:00:00', '\"/uploads/kalender_acara/1726816374170-KANG HANEUL.jpg\"', '2024-09-20 07:12:54', '2025-01-05 13:26:02'),
('ebf46fd5-a713-4c5f-843d-cd46eeecb63c', 'Bayang-Bayang di Balik Tirai', 'Ketika sebuah kelompok aktor terjebak dalam sebuah teater tua yang angker, mereka harus menghadapi misteri yang mengelilingi tempat tersebut. Setiap karakter memiliki rahasia yang tersimpan, dan satu per satu, mereka mulai mengalami kejadian aneh yang memaksa mereka untuk menghadapi masa lalu masing-masing. Drama ini mengeksplorasi tema penyesalan, pengampunan, dan keberanian untuk menghadapi kebenaran.', '2025-01-05 00:00:00', '\"/uploads/kalender_acara/1726816188207-download.jpg\"', '2024-09-20 07:09:48', '2025-01-05 13:26:29'),
('fb7ad00e-5cb5-4a70-9059-b991eb858ed4', 'Acara Malam Seni', 'Seorang pengusaha sukses kembali ke kampung halamannya setelah bertahun-tahun mengabaikan masa lalu. Ia menemukan bahwa akar dan budaya yang ia tinggalkan memiliki makna yang dalam dalam hidupnya. Melalui interaksi dengan orang-orang di desanya, ia belajar tentang nilai-nilai yang hilang dan pentingnya menghargai tradisi serta identitas diri.', '2025-01-05 00:00:00', '\"/uploads/kalender_acara/1727102516839-download.jpg\"', '2024-09-23 14:41:56', '2025-01-05 13:26:45');

-- --------------------------------------------------------

--
-- Struktur dari tabel `skenario`
--

CREATE TABLE `skenario` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `file_paths` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `skenario`
--

INSERT INTO `skenario` (`id`, `judul`, `deskripsi`, `file_paths`, `createdAt`, `updatedAt`) VALUES
('1fc857c3-a796-4969-8580-0be5b46559a4', 'Cinta yang Hilang', 'Dua sahabat orang, Maya dan Rudi, terpisah karena kesibukan hidup dan keputusan yang diambil masing-masing. Setelah bertahun-tahun tidak berhubungan, mereka secara kebetulan bertemu di acara reuni sekolah. Momen ini membangkitkan kembali perasaan lama dan menimbulkan pertanyaan: apakah cinta yang mereka rasakan dahulu masih ada?\" Karya oleh: Budi Santoso', '[\"/uploads/skenario/1735003938947-Sayonara Eri.pdf\"]', '2024-09-20 07:24:31', '2024-12-24 01:32:19'),
('29453fcd-3a04-437b-b5c6-5472695765bd', 'Pertemuan Tak Terduga', 'Di sebuah kafe yang ramai, dua orang asing, Lina dan Andi, bertemu secara tidak sengaja. Mereka terlibat dalam diskusi hangat mengenai impian dan harapan mereka untuk masa depan. Momen tersebut membawa keduanya pada perjalanan introspeksi, di mana mereka merenungkan keputusan hidup yang telah dibuat. Seiring waktu. Karya oleh: Budi Santoso', '[\"/uploads/skenario/1726817159949-3. Form Pendaftaran Yudisium.docx\"]', '2024-09-20 07:25:59', '2024-09-20 12:29:59'),
('3fae5f47-cdb2-4c7f-987b-673e3ca504c4', 'Kembali ke Akarnya', 'Seorang wanita bernama Sari kembali ke kampung halamannya setelah bertahun-tahun tinggal di kota besar. Kembali ke tempat di mana ia dibesarkan membawa nostalgia, tetapi juga menghadapi berbagai perubahan yang terjadi. Sari harus menghadapi kenyataan tentang perubahan dalam keluarganya dan komunitasnya. Karya oleh: Siti Aminah', '[\"/uploads/skenario/1735003950679-Sayonara Eri.pdf\"]', '2024-09-20 07:26:16', '2024-12-24 01:32:30'),
('7b438077-e74a-4bda-a6c4-b1ca14b6e4e9', 'Mencari Keluarga', 'Seorang pemuda bernama Arif, yang terpisah dari keluarganya selama bertahun-tahun akibat perang, berusaha untuk menemukan mereka kembali. Dalam pencariannya, ia menjelajahi berbagai desa dan kota, berinteraksi dengan orang-orang yang juga kehilangan orang terkasih. Karya oleh: Dwi Setiawan', '[\"/uploads/skenario/1726816987398-Aplikasi Cengkir Gading.docx\"]', '2024-09-20 07:23:07', '2024-09-20 12:30:20'),
('b8f32070-7d29-400c-9c9d-b476b2f771ca', 'Dilema Keputusan', 'Seorang pemimpin muda di sebuah perusahaan harus membuat keputusan sulit yang dapat mempengaruhi masa depan timnya. Dalam situasi yang menekan, ia harus mempertimbangkan kepentingan bisnis dan kesejahteraan karyawan. Skenario ini mengeksplorasi tema kepemimpinan, etika, dan tanggung jawab. Karya oleh: Andi Kurniawan', '[\"/uploads/skenario/1735003960208-Sayonara Eri.pdf\"]', '2024-09-20 07:26:38', '2024-12-24 01:32:40'),
('fc43a1df-850d-4fc9-af70-8e4ae8081fe4', 'Pelarian dari Masa Lalu', 'Seorang pria bernama Rian berusaha untuk melarikan diri dari bayang-bayang masa lalu yang kelam. Dihantui oleh kesalahan yang pernah dibuat, ia mencoba membangun kehidupan baru di kota yang berbeda. Namun, masa lalu tidak mudah untuk dilupakan. Dalam pencarian untuk mengatasi kesalahan dan penyesalan. Karya oleh: Lila Dewi', '[\"/uploads/skenario/1726817218870-Bebas Pustaka_Muhammad Arif Alifan Sultoni.pdf\"]', '2024-09-20 07:26:58', '2024-09-20 12:30:42');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nama` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `kataSandi` varchar(255) NOT NULL,
  `nim` varchar(20) NOT NULL,
  `role` enum('Admin','User') NOT NULL DEFAULT 'User',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `nama`, `email`, `kataSandi`, `nim`, `role`, `createdAt`, `updatedAt`) VALUES
('04e07d29-8f92-4023-8570-c1d123fe40a4', 'Andi Dwinata ', 'andi@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$/ori2hJYovc55NNQfjPv6g$4f1NNtgbnL7i7C56wS734IGztiHa/4ylAmHE4QCXs3U', '201020200', 'User', '2024-12-17 14:58:23', '2024-12-23 06:44:17'),
('08f552a8-7ab0-493e-86c4-9e4133e98fde', 'Faiz ulul', 'faiz@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$iohplVooQBFHZg6+av6hCQ$SCywTsF1JwPmhI2zKvYgOUBkfhLan9ygmsiS6p6+T5A', '20102050', 'User', '2024-09-20 03:49:54', '2024-09-21 10:48:08'),
('3535d85d-d766-4868-84cb-21eb215457dc', 'Sultan', 'sultan@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$MQuYLoeHhH25Zc9H2uBs1Q$NK9enqPWWtbcP6Qm4EaC9PwuC63dqY9WsTiKx9Ph51Q', '20102055', 'User', '2024-09-20 03:51:32', '2024-09-20 03:51:32'),
('4c8bdea8-bb45-475b-80a3-b5f7e4ecccc6', 'Aldo', 'aldo@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$ThaEnZUJu0RL8uyhatYfLg$IFezXfaKdMypYXzBubvDntv6bcm4+lOOxS8mvFb9zzU', '20102058', 'User', '2024-09-20 06:57:51', '2024-12-18 17:06:53'),
('5e0c3d52-985a-4eae-ad8f-77778708071b', 'Pian', 'pian@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$4BJVn57ymkf2Kl7YUeeHxQ$b7Pu7/N3Npinskg5HDmvQmktQn9Ive9P91JXA8/jlDs', '20102090', 'User', '2024-09-20 03:49:00', '2024-09-20 03:49:00'),
('64b5d899-e399-488e-9844-ecda5932c930', 'Toni', 'toni@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$f/fRZ++FtQNJ7YHvgkx7RQ$eHsMMqv+UR+NyfNjZ+eOHO3qqd2Q8iVgUjz2W0ns2g0', '102029390', 'User', '2024-09-20 03:49:27', '2024-09-20 03:49:27'),
('6e2f0837-2954-490b-9442-4bb1534143f0', 'Ardhana Galih Yuda Bintara', 'admin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$AnhYCQ2Fu/qS2pcV4eZbdw$g67jDTXQwpjy16gPx3xjFm3DaJGy1w4BQNh7Y6f8e5E', '20102036', 'Admin', '2024-09-12 15:42:58', '2024-12-23 04:40:59'),
('a6e07ad7-b15b-46a4-9211-fbd78d19ecc3', 'hagun', 'hagun@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Y9Jz63kcUyd7ChmCF3B89A$83agpcF3Sr4Mq+cHwz0mvvP8uxxv6CVbev7Kv5fkU9A', '2010100', 'User', '2024-12-18 16:56:08', '2024-12-18 16:56:08'),
('a7552291-f85c-479a-a0bb-2bbe02465ff1', 'Zidan 123', 'zidan@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$Qj6gUFO1ACWcbUohlmtqdA$RVz677FA3Ra48WjthzhKaXq8LtJzBwHlBpwQ2mGXIrE', '20102092', 'User', '2024-09-20 05:44:06', '2024-09-21 10:16:02'),
('c2540446-dfb4-485d-9e21-4d166304806d', 'Alga Alfara', 'alga@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$eMRqPTZd5L59tjy8orS1Fg$ASx/soc+9+krPxAciJUgVS2LGxIKrPJT0y2vg7pwdbI', '20102037', 'User', '2024-09-12 15:44:12', '2024-09-12 15:44:12');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_rating`
--

CREATE TABLE `user_rating` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `rating` int(11) NOT NULL,
  `tanggal_rating` datetime NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `parameter_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user_rating`
--

INSERT INTO `user_rating` (`id`, `rating`, `tanggal_rating`, `user_id`, `parameter_id`, `createdAt`, `updatedAt`) VALUES
('0ae34aae-72c8-4298-ab1f-dea7e8fc8916', 50, '2024-12-31 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', '8f02b0d3-218a-4143-9db6-8adafe758e65', '2024-12-24 03:29:27', '2024-12-24 03:29:27'),
('12a93d13-f613-45d7-8eab-7fee7393ab46', 75, '2025-01-06 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', '83761c89-6f18-4f82-9cbd-536a9045dab5', '2025-01-06 00:44:24', '2025-01-06 00:44:24'),
('1989445f-2012-4660-8cd4-0a96e7aaf0e0', 90, '2024-12-24 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', '44cff42e-c2b7-4c67-87d8-3e88301a02aa', '2024-12-24 03:28:54', '2024-12-24 03:29:09'),
('28f32108-c6a7-4d29-bb7a-020161ad0f85', 50, '2024-12-31 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', '83761c89-6f18-4f82-9cbd-536a9045dab5', '2024-12-24 03:29:27', '2024-12-24 03:29:27'),
('2996babe-3eb2-4d6d-9365-e9c9885d1499', 87, '2024-12-24 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', '8f02b0d3-218a-4143-9db6-8adafe758e65', '2024-12-24 03:28:54', '2024-12-24 03:28:54'),
('4f311e91-af89-4329-8fc4-4a771345ee13', 50, '2024-12-31 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', '44cff42e-c2b7-4c67-87d8-3e88301a02aa', '2024-12-24 03:29:27', '2024-12-24 03:29:27'),
('58eb7fed-3f2a-4b31-b0f3-52df668f9f65', 70, '2024-12-24 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', '4dd29a47-eb9c-438f-b8e3-72994ba9e522', '2024-12-24 03:28:54', '2024-12-24 03:29:09'),
('5ea20f5f-cc84-4122-b4fb-bce313bf321d', 50, '2024-12-31 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', '4dd29a47-eb9c-438f-b8e3-72994ba9e522', '2024-12-24 03:29:27', '2024-12-24 03:29:27'),
('7667fe6a-b9a4-4fc9-8485-a345d9c77729', 75, '2025-01-06 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', 'd9fe7800-ed63-4964-b668-91b1f0bc3ef8', '2025-01-06 00:44:24', '2025-01-06 00:44:24'),
('8284ef9a-8d84-427c-9a92-fed9d137bbbd', 70, '2025-01-06 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', '44cff42e-c2b7-4c67-87d8-3e88301a02aa', '2025-01-06 00:44:24', '2025-01-06 00:44:24'),
('9e015146-aa36-45ca-8bc9-e382ca46e11b', 73, '2024-12-24 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', 'd9fe7800-ed63-4964-b668-91b1f0bc3ef8', '2024-12-24 03:28:54', '2024-12-24 03:29:09'),
('a9417c8c-c816-4c83-8f89-68ce32b5795b', 77, '2025-01-06 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', '8f02b0d3-218a-4143-9db6-8adafe758e65', '2025-01-06 00:44:24', '2025-01-06 00:44:24'),
('bacd820d-63e4-4f12-8dc5-86da7d7bc5ff', 82, '2025-01-06 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', '65cd74ff-a274-49fc-b807-2cb424ea01b5', '2025-01-06 00:44:24', '2025-01-06 00:44:24'),
('bf07325f-2c43-40e6-b80c-342dcd0b2c19', 92, '2024-12-24 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', '83761c89-6f18-4f82-9cbd-536a9045dab5', '2024-12-24 03:28:54', '2024-12-24 03:29:09'),
('c1214264-76bf-4dee-8d29-ecda0c95c672', 69, '2025-01-06 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', '4dd29a47-eb9c-438f-b8e3-72994ba9e522', '2025-01-06 00:44:24', '2025-01-06 00:44:24'),
('c769d948-5ada-4cf9-8873-d350d41e2adc', 50, '2024-12-31 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', '65cd74ff-a274-49fc-b807-2cb424ea01b5', '2024-12-24 03:29:27', '2024-12-24 03:29:27'),
('e2fc3007-afd2-4dc1-9439-c8db76e87bf1', 50, '2024-12-31 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', 'd9fe7800-ed63-4964-b668-91b1f0bc3ef8', '2024-12-24 03:29:27', '2024-12-24 03:29:27'),
('ef5ce122-b256-4d72-852a-73a960c61069', 87, '2024-12-24 00:00:00', '04e07d29-8f92-4023-8570-c1d123fe40a4', '65cd74ff-a274-49fc-b807-2cb424ea01b5', '2024-12-24 03:28:54', '2024-12-24 03:28:54');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `daily_exercise`
--
ALTER TABLE `daily_exercise`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `drama`
--
ALTER TABLE `drama`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `evaluasi_karakter`
--
ALTER TABLE `evaluasi_karakter`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeks untuk tabel `kalender_acara`
--
ALTER TABLE `kalender_acara`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `skenario`
--
ALTER TABLE `skenario`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `user_rating`
--
ALTER TABLE `user_rating`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `parameter_id` (`parameter_id`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `evaluasi_karakter`
--
ALTER TABLE `evaluasi_karakter`
  ADD CONSTRAINT `evaluasi_karakter_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ketidakleluasaan untuk tabel `user_rating`
--
ALTER TABLE `user_rating`
  ADD CONSTRAINT `user_rating_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_rating_ibfk_2` FOREIGN KEY (`parameter_id`) REFERENCES `drama` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
