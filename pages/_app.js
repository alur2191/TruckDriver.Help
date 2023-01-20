import { SessionProvider as AuthProvider } from 'next-auth/react'
import '../styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Layout from '../components/layout/layout'
import { useEffect } from "react";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";
import { SearchContextProvider } from '../store/search-context';
import { UserContextProvider } from '../store/user-context';
import { CompanyContextProvider } from '../store/company-context';
import { JobContextProvider } from '../store/job-context';
import { FilterContextProvider } from '../store/filter-context';
import { AuthContextProvider } from '../store/auth-context';
import Script from "next/script";

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const router = useRouter()


  useEffect(() => {
    // Google analytics related function that handles route changes
    const handleRouteChange = url => {
      window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
        cookieFlags: 'SameSite=None; Secure'
      })
    }
    import('react-facebook-pixel')
      .then((x) => x.default)
      .then((ReactPixel) => {
        ReactPixel.init(`${process.env.NEXT_PUBLIC_FACEBOOK_ID}`) // facebookPixelId
        ReactPixel.pageView()
        router.events.on('routeChangeComplete', () => {
          ReactPixel.pageView()
          handleRouteChange
        })
      })
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <AuthContextProvider>
      <UserContextProvider>
        <SearchContextProvider>
          <CompanyContextProvider>
            <JobContextProvider>
              <FilterContextProvider>
                <AuthProvider session={pageProps.session}>
                  <QueryClientProvider client={queryClient}>
                    <Layout>
                      {/* Google analytics scripts */}
                      <Script
												strategy="lazyOnload"
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                      />
                      <Script id="google-analytics" strategy="lazyOnload"
                        dangerouslySetInnerHTML={{
                          __html: `
                          window.dataLayer = window.dataLayer || [];
                          function gtag(){dataLayer.push(arguments);}
                          gtag('js', new Date());
                          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                            page_path: window.location.pathname,
                          });
                        `,
                        }}
                      />
                      <Component {...pageProps} />
                    </Layout>
                  </QueryClientProvider>
                </AuthProvider>
              </FilterContextProvider>
            </JobContextProvider>
          </CompanyContextProvider>
        </SearchContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  )
}



export default MyApp
