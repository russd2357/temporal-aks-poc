import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import OnboardForm from '../components/onboard-form';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Temporal Demo Frontend</title>
        <meta name="description" content="Launch a Temporal workflow from a Next.js frontend" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Temporal Demo Frontend
        </h1>

        <p className={styles.description}>
          This sample demonstrates how to launch Temporal workflows from a frontend app. The demo is a simple patient onboarding workflow where on input of a patient&apos;s name and contact info, the patient is onboarded to a physician and hospital, then a notification is sent to the patient.
        </p>

      <OnboardForm></OnboardForm>  

      </main>

      <footer className={styles.footer}>
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/pinaproto-logo-white-1.svg" alt="Pinaproto Logo" width={324} height={72} />
          </span>
      </footer>
    </div>
  )
}
