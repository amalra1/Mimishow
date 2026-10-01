import type { Metadata, Viewport } from 'next';
import Preloader from '@/components/layout/Preloader/Preloader';
import RouteIris from '@/components/layout/RouteIris/RouteIris';
import SkipLink from '@/components/layout/SkipLink/SkipLink';
import TopControls from '@/components/layout/TopControls/TopControls';
import Backdrop from '@/components/ornaments/Backdrop/Backdrop';
import Providers from '@/components/providers/Providers/Providers';
import { MAIN_CONTENT_ID } from '@/constants/routes';
import { AUTHOR_NAME, AUTHOR_URL, SITE_NAME, SITE_URL } from '@/constants/site';
import type { RootLayoutProps } from '@/types/components/layout';
import { fontClassNames } from './fonts';
import '@/styles/tokens.css';
import '@/styles/reset.css';
import '@/styles/focus.css';
import '@/styles/utilities.css';
import '@/styles/motion.css';

const TITLE = 'MimiShow · O show de mímica no seu celular';
const DESCRIPTION =
  'Jogo de mímica para jogar com amigos usando um celular só. Cada um por si ou em equipes, cronômetro, placar e mais de 300 palavras. Sem cadastro, sem servidor.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE, template: `%s · ${SITE_NAME}` },
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
  openGraph: {
    type: 'website',
    url: '/',
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: 'pt_BR',
    alternateLocale: 'en_US',
  },
  twitter: { card: 'summary', title: TITLE, description: DESCRIPTION },
};

export const viewport: Viewport = {
  themeColor: '#140f17',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="pt-BR" className={fontClassNames} suppressHydrationWarning>
      <body>
        <Providers>
          <SkipLink />
          <Backdrop />
          <Preloader />
          <TopControls />
          <main id={MAIN_CONTENT_ID} className="main">
            {children}
          </main>
          <RouteIris />
        </Providers>
      </body>
    </html>
  );
}
