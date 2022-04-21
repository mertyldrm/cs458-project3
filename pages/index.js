import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CS 458 Test Driven Development Project</title>
        <meta name="description" content="Generated by Team Ahmet, Mert and Bora" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          CS 458 Test Driven Development Project
        </h1>

        <p className={styles.description}>
          Do operations by clicking the options below:
        </p>

        <div className={styles.grid}>
          <Link href="/currentCountry">
            <div className={styles.card}>
              <h2>Show your Current Country &rarr;</h2>
              <p>Provide your coordinates and get the country where you are currently in!</p>
            </div>
          </Link>

          <Link href="/toNorthPole">
            <div className={styles.card}>
            <h2>Distance to Terrestrial North Pole &rarr;</h2>
            <p>Automatically calculate your distance to the Geographic North Pole! </p>
            </div>
          </Link>

          <Link href="/toMoonCoreOne">
            <div className={styles.card}>
            <h2>Distance to the Moon Core 1 &rarr;</h2>
            <p>Provide your coordinates and get the distance to the Moon Core!</p>
            </div>
          </Link>

          <Link href="/toMoonCoreTwo">
            <div className={styles.card}>
            <h2>Distance to the Moon Core 2 &rarr;</h2>
            <p>Automatically find the distance to the Moon Core with your GPS!</p>
            </div>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
