
import Layout from '../components/layout/Layout';
import '../style/global.css'

 function App({ Component, pageProps }) {
  return (
    <Layout>
        <Component {...pageProps} />
    </Layout>
  )  
}

export default App
