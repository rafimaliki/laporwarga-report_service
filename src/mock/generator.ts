import type {
  Report,
  ReportType,
  Visibility,
  Status,
  ActorRole,
  MediaType,
  TimelineEntry,
  Media,
} from "./interface";

const reportTypes: ReportType[] = [
  "kriminalitas",
  "kebersihan",
  "kesehatan",
  "fasilitas",
  "lainnya",
];
const visibilities: Visibility[] = ["public", "private", "anonymous"];
const statuses: Status[] = [
  "submitted",
  "verified",
  "in_progress",
  "resolved",
  "rejected",
  "escalated",
];
const actorRoles: ActorRole[] = ["citizen", "officer", "supervisor", "system"];
const mediaTypes: MediaType[] = ["image", "video", "audio"];

const names = ["Ahmad", "Siti", "Budi", "Dewi", "Rudi", "Maya", "Joko", "Nina"];
const agencies = [
  "Polisi",
  "Dinas Kebersihan",
  "Dinas Kesehatan",
  "Dinas Fasilitas Umum",
  "Pemerintah Daerah",
];

// Indonesian cities with real coordinates (population-weighted for realistic distribution)
const indonesianCities = [
  // Java (high population density - more reports expected here)
  { name: "Jakarta Pusat", province: "DKI Jakarta", lat: -6.1751, lng: 106.865, weight: 10 },
  { name: "Jakarta Selatan", province: "DKI Jakarta", lat: -6.2615, lng: 106.8106, weight: 8 },
  { name: "Jakarta Timur", province: "DKI Jakarta", lat: -6.225, lng: 106.9004, weight: 8 },
  { name: "Jakarta Barat", province: "DKI Jakarta", lat: -6.1484, lng: 106.7558, weight: 7 },
  { name: "Jakarta Utara", province: "DKI Jakarta", lat: -6.1214, lng: 106.9229, weight: 6 },
  { name: "Surabaya", province: "Jawa Timur", lat: -7.2575, lng: 112.7521, weight: 9 },
  { name: "Bandung", province: "Jawa Barat", lat: -6.9175, lng: 107.6191, weight: 8 },
  { name: "Semarang", province: "Jawa Tengah", lat: -6.9666, lng: 110.4196, weight: 6 },
  { name: "Yogyakarta", province: "DI Yogyakarta", lat: -7.7956, lng: 110.3695, weight: 5 },
  { name: "Bekasi", province: "Jawa Barat", lat: -6.2383, lng: 106.9756, weight: 7 },
  { name: "Tangerang", province: "Banten", lat: -6.1783, lng: 106.63, weight: 6 },
  { name: "Depok", province: "Jawa Barat", lat: -6.4025, lng: 106.7942, weight: 5 },
  { name: "Malang", province: "Jawa Timur", lat: -7.9778, lng: 112.6349, weight: 4 },
  { name: "Bogor", province: "Jawa Barat", lat: -6.5971, lng: 106.806, weight: 4 },

  // Sumatra
  { name: "Medan", province: "Sumatera Utara", lat: 3.5952, lng: 98.6722, weight: 7 },
  { name: "Palembang", province: "Sumatera Selatan", lat: -2.9761, lng: 104.7754, weight: 5 },
  { name: "Pekanbaru", province: "Riau", lat: 0.5071, lng: 101.4478, weight: 4 },
  { name: "Batam", province: "Kepulauan Riau", lat: 1.0456, lng: 104.0305, weight: 3 },
  { name: "Padang", province: "Sumatera Barat", lat: -0.9471, lng: 100.4172, weight: 3 },
  { name: "Bandar Lampung", province: "Lampung", lat: -5.3971, lng: 105.2668, weight: 3 },

  // Kalimantan
  { name: "Balikpapan", province: "Kalimantan Timur", lat: -1.2379, lng: 116.8529, weight: 3 },
  { name: "Banjarmasin", province: "Kalimantan Selatan", lat: -3.3194, lng: 114.59, weight: 3 },
  { name: "Pontianak", province: "Kalimantan Barat", lat: -0.0263, lng: 109.3425, weight: 2 },
  { name: "Samarinda", province: "Kalimantan Timur", lat: -0.4948, lng: 117.1436, weight: 2 },

  // Sulawesi
  { name: "Makassar", province: "Sulawesi Selatan", lat: -5.1477, lng: 119.4327, weight: 5 },
  { name: "Manado", province: "Sulawesi Utara", lat: 1.4748, lng: 124.8421, weight: 2 },
  { name: "Palu", province: "Sulawesi Tengah", lat: -0.8917, lng: 119.8707, weight: 2 },

  // Bali & Nusa Tenggara
  { name: "Denpasar", province: "Bali", lat: -8.6705, lng: 115.2126, weight: 4 },
  { name: "Mataram", province: "Nusa Tenggara Barat", lat: -8.5833, lng: 116.1167, weight: 2 },
  { name: "Kupang", province: "Nusa Tenggara Timur", lat: -10.1772, lng: 123.607, weight: 1 },

  // Papua & Maluku
  { name: "Jayapura", province: "Papua", lat: -2.5337, lng: 140.7181, weight: 1 },
  { name: "Ambon", province: "Maluku", lat: -3.6954, lng: 128.1814, weight: 1 },
];

// Build weighted array for population-based distribution
const weightedCities: typeof indonesianCities = [];
indonesianCities.forEach((city) => {
  for (let i = 0; i < city.weight; i++) {
    weightedCities.push(city);
  }
});

// Street names for realistic addresses
const streetNames = [
  "Sudirman", "Thamrin", "Gatot Subroto", "Diponegoro", "Ahmad Yani",
  "Hayam Wuruk", "Gajah Mada", "Imam Bonjol", "Sisingamangaraja", "Rasuna Said",
  "MT Haryono", "HR Rasuna Said", "Panglima Polim", "Kemang Raya", "Fatmawati",
];

const titles: Record<ReportType, string[]> = {
  kriminalitas: [
    "Pencurian di Malam Hari",
    "Perampokan di Jalan",
    "Penganiayaan",
    "Penculikan",
    "Penipuan",
  ],
  kebersihan: [
    "Sampah Menumpuk di Jalan",
    "Got yang Tersumbat",
    "Limbah Industri",
    "Kotoran Hewan",
    "Daerah Kumuh",
  ],
  kesehatan: [
    "Wabah Penyakit",
    "Kecelakaan Lalu Lintas",
    "Keracunan Makanan",
    "Kesehatan Lingkungan",
    "Epidemi",
  ],
  fasilitas: [
    "Jalan Rusak",
    "Lampu Jalan Mati",
    "Fasilitas Umum Rusak",
    "Parkir Ilegal",
    "Transportasi Umum",
  ],
  lainnya: [
    "Keluhan Umum",
    "Saran untuk Pemerintah",
    "Pertanyaan",
    "Laporan Lain",
    "Masukan",
  ],
};

const descriptions: Record<ReportType, string[]> = {
  kriminalitas: [
    "Ada kejadian kriminal yang perlu segera ditangani.",
    "Saya menyaksikan insiden ini dan ingin melaporkan.",
    "Korban memerlukan bantuan segera.",
  ],
  kebersihan: [
    "Lingkungan ini sangat kotor dan perlu dibersihkan.",
    "Ada masalah sanitasi yang mengganggu.",
    "Kesehatan masyarakat terancam.",
  ],
  kesehatan: [
    "Ada masalah kesehatan yang memerlukan perhatian.",
    "Kecelakaan terjadi dan butuh penanganan medis.",
    "Risiko kesehatan lingkungan.",
  ],
  fasilitas: [
    "Fasilitas umum tidak berfungsi dengan baik.",
    "Ada kerusakan yang perlu diperbaiki.",
    "Penggunaan fasilitas tidak optimal.",
  ],
  lainnya: [
    "Ada hal penting yang ingin saya sampaikan.",
    "Masukan untuk perbaikan.",
    "Pertanyaan atau laporan umum.",
  ],
};

function randomUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function randomDate(): string {
  const now = new Date();
  const past = new Date(
    now.getTime() - Math.random() * 365 * 24 * 60 * 60 * 1000
  );
  return past.toISOString();
}

function randomDateAfter(baseDate: Date, maxDaysAfter: number = 30): string {
  const offset = Math.random() * maxDaysAfter * 24 * 60 * 60 * 1000;
  const futureDate = new Date(baseDate.getTime() + offset);
  return futureDate.toISOString();
}

function randomIndonesianLocation() {
  // Pick a weighted random city (more reports in bigger cities)
  const city = randomElement(weightedCities);
  
  // Add small random offset (~1-3km) for realistic clustering within city
  const latOffset = (Math.random() - 0.5) * 0.05; // ~5.5km range
  const lngOffset = (Math.random() - 0.5) * 0.05;
  
  return {
    lat: city.lat + latOffset,
    lng: city.lng + lngOffset,
    city: city.name,
    province: city.province,
  };
}

function randomElement<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error("Cannot select random element from empty array");
  }
  return arr[Math.floor(Math.random() * arr.length)] as T;
}

export function generateMockReports(count: number): Report[] {
  const reports: Report[] = [];
  for (let i = 0; i < count; i++) {
    const type = randomElement(reportTypes);
    const visibility = randomElement(visibilities);
    const currentStatus = randomElement(statuses);
    const createdAt = randomDate();
    const createdDate = new Date(createdAt);
    const loc = randomIndonesianLocation();
    const reporterName = randomElement(names);
    const userId = randomUUID();

    const mediaCount = Math.floor(Math.random() * 4);
    const media: Media[] = [];
    for (let j = 0; j < mediaCount; j++) {
      const mediaType = randomElement(mediaTypes);
      const url =
        mediaType === "image"
          ? `https://picsum.photos/seed/${randomUUID()}/200/300`
          : `https://example.com/${mediaType}/${randomUUID()}`;
      media.push({
        media_id: randomUUID(),
        type: mediaType,
        url,
        uploaded_at: randomDateAfter(createdDate, 1), // Within 1 day of creation
      });
    }

    // Create timeline with chronological order
    const timeline: TimelineEntry[] = [];
    const timelineCount = Math.floor(Math.random() * 5) + 1;
    let lastTimestamp = createdDate;
    
    for (let k = 0; k < timelineCount; k++) {
      const dayOffset = (k + 1) * (Math.random() * 5 + 1); // 1-6 days between events
      const eventDate = new Date(createdDate.getTime() + dayOffset * 24 * 60 * 60 * 1000);
      
      timeline.push({
        status: randomElement(statuses),
        actor: {
          actor_id: randomUUID(),
          actor_role: randomElement(actorRoles),
        },
        note: "Status updated",
        timestamp: eventDate.toISOString(),
      });
      
      lastTimestamp = eventDate;
    }

    // Sort timeline by timestamp
    timeline.sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());

    const typeTitles = titles[type];
    const typeDescriptions = descriptions[type];

    const report: Report = {
      report_id: randomUUID(),
      type: type,
      title: randomElement(typeTitles),
      description: randomElement(typeDescriptions),
      visibility,
      reporter: {
        user_id: userId,
        name: reporterName,
        contact: {
          email: `${reporterName.toLowerCase()}@example.com`,
          phone: `+628${Math.floor(Math.random() * 1000000000)}`,
        },
      },
      location: {
        latitude: loc.lat,
        longitude: loc.lng,
        address: `Jl. ${randomElement(streetNames)} No. ${Math.floor(
          Math.random() * 100
        )}, ${loc.city}, ${loc.province}`,
        city: loc.city,
        province: loc.province,
      },
      media,
      status: {
        current: currentStatus,
        updated_at: lastTimestamp.toISOString(), // Use last timeline event timestamp
      },
      timeline,
      votes: {
        upvote_count: Math.floor(Math.random() * 100),
        voters: Array.from({ length: Math.floor(Math.random() * 10) }, () =>
          randomUUID()
        ),
      },
      authority: {
        assigned_agency: randomElement(agencies),
        assigned_unit: "Unit Khusus",
        assigned_officer_id: randomUUID(),
      },
      escalation: {
        is_escalated: Math.random() > 0.8,
        escalated_to: "Supervisor",
        escalation_reason: "Urgent",
        escalated_at: Math.random() > 0.8 ? randomDateAfter(createdDate, 7) : null,
      },
      created_at: createdAt,
    };
    reports.push(report);
  }
  return reports;
}
