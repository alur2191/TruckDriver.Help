import { Provider as AuthProvider } from 'next-auth/client'
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

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = url => {
      window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS, {
        page_path: url,
      })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <UserContextProvider>
      <SearchContextProvider>
        <CompanyContextProvider>
          <JobContextProvider>
            <FilterContextProvider>
              <AuthProvider session={pageProps.session}>
                <QueryClientProvider client={queryClient}>
                  <Layout>
                    <script
                      async
                      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                    />
                    <script
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
  )
}



export default MyApp
