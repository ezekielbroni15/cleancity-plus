import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

export const metadata = {
  title: {
    default: "CleanCity+",
    template: "%s | CleanCity+"
  },
  description: "Interactive waste management tracker for recycling logs, pledges, and category education.",
  applicationName: "CleanCity+",
  manifest: "/manifest.webmanifest",
  keywords: ["CleanCity+", "recycling tracker", "waste management", "sustainability", "Next.js capstone"],
  authors: [{ name: "Ezekiel Broni" }],
  creator: "Ezekiel Broni",
  icons: {
    icon: [{ url: "/icons/icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/icons/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/icons/maskable-icon.svg", type: "image/svg+xml" }]
  },
  appleWebApp: {
    capable: true,
    title: "CleanCity+",
    statusBarStyle: "black-translucent"
  },
  openGraph: {
    title: "CleanCity+",
    description: "Learn waste categories, log recycling effort, visualize progress, and make cleaner-city pledges.",
    type: "website"
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#16c7b7" },
    { media: "(prefers-color-scheme: dark)", color: "#101a26" }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Navbar />
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
