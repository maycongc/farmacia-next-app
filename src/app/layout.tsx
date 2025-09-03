import '@/styles/globals.css';
import { Providers } from '../components/providers/Providers';

export const metadata = {
  title: 'Farmácia',
  description: 'Frontend Next.js Farmácia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
