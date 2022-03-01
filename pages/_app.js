import { Provider as AuthProvider } from 'next-auth/client'
import '../styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Layout from '../components/layout/layout'
import { QueryClient, QueryClientProvider } from "react-query";
import { SearchContextProvider } from '../store/search-context';
import { UserContextProvider } from '../store/user-context';
import { CompanyContextProvider } from '../store/company-context';
import { JobContextProvider } from '../store/job-context';
import { FilterContextProvider } from '../store/filter-context';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <SearchContextProvider>
        <CompanyContextProvider>
          <JobContextProvider>
            <FilterContextProvider>
              <AuthProvider session={pageProps.session}>
                <QueryClientProvider client={queryClient}>
                  <Layout>
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
