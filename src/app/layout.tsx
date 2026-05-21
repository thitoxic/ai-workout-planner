import type { Metadata } from 'next'
import { JetBrains_Mono, Source_Sans_3 } from "next/font/google";
import { cn } from "@/lib/utils";

const sourceSans3Heading = Source_Sans_3({ subsets: ['latin'], variable: '--font-heading' });

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
    title: 'My App',
    description: 'My App is a...',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className={cn("font-mono", jetbrainsMono.variable, sourceSans3Heading.variable)}>
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    )
}