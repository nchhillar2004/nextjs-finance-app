import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar/navbar";
import Footer from "@/components/footer/footer";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/utils/SessionProvider";
import { getServerSession } from "next-auth";
import SiteConfig from "@/config/site";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
    title: {
        default: SiteConfig.title,
        template: `%s - ${SiteConfig.title}`,
    },
    metadataBase: new URL(SiteConfig.url),
    description: SiteConfig.description,
    keywords: [
        "campusOverflow",
        "Campus Overflow",
        "Delhi",
        "India",
        "Nishant chhillar",
        "Campus Overflow",
        "Stack Overflow",
        "Next.js",
        "Q&A website"
    ],
    authors: [
        {
            name: "Nishant Chhillar",
            url: "https://campus-overflow-nextjs.vercel.app",
        },
    ],
    creator: "Nishant Chhillar",
    openGraph: {
        type: "website",
        locale: "en_US",
        url: SiteConfig.url,
        title: SiteConfig.title,
        description: SiteConfig.description,
        siteName: SiteConfig.title,
        images: [
            {
                url: SiteConfig.ogImage,
                width: 1200,
                height: 630,
                alt: SiteConfig.title,
            },
        ],
    },
    icons: {
        icon: "/favicon.ico",
    },
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "white" },
        { media: "(prefers-color-scheme: dark)", color: "black" },
    ],
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession();

    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                <AuthProvider session={session}>
                    <ThemeProvider attribute="class" defaultTheme="light">
                        <Navbar />
                        <Toaster />
                        <main className="pt-[50px]">
                            <div className="campusOverflow">
                                {children}
                            </div>
                        </main>
                        <Footer />
                    </ThemeProvider>
                    <SpeedInsights />
                    <Analytics />
                </AuthProvider>
            </body>
        </html>
    );
}
