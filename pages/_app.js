import { Provider as AuthProvider } from 'next-auth/client'
import '../styles/globals.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Layout from '../components/layout/layout'
import { QueryClient, QueryClientProvider } from "react-query";
import { SearchContextProvider } from '../store/search-context';
import { UserContextProvider } from '../store/user-context';

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  return (
      <UserContextProvider>
        <SearchContextProvider>
          <AuthProvider session={pageProps.session}>
            <QueryClientProvider client={queryClient}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </QueryClientProvider>
          </AuthProvider>
        </SearchContextProvider>
      </UserContextProvider>
    )
}



export default MyApp
