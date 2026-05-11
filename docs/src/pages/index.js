import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';
import { History, Activity, RotateCcw, BellRing } from 'lucide-react';

const features = [
  {
    title: 'Complete Traceability',
    Icon: History,
    description:
      'Track every change made to your DHIS2 metadata with Diff visualization, dependency tracking, and complete audit trails.',
  },
  {
    title: 'Real-Time Monitoring',
    Icon: Activity,
    description:
      'Monitor user activity and system changes in real time as they happen across your DHIS2 instance.',
  },
  {
    title: 'Reverse Any Change',
    Icon: RotateCcw,
    description:
      'Quickly revert accidental or unwanted changes with detailed change history and one-click rollback capabilities.',
  },
  {
    title: 'Automatic Alerts',
    Icon: BellRing,
    description:
      'Receive intelligent notifications categorized by severity level (High, Medium, Low) when critical changes happen.',
  },
];

function Feature({ title, Icon, description }) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--center padding-horiz--md padding-vert--md">
        <div className={styles.featureIconContainer}>
          <Icon size={48} className={styles.featureIcon} />
        </div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/deployment/intro">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  return (
    <Layout
      title="DHIS2 Audit Vision"
      description="A monitoring and audit platform for DHIS2 instances">
      <HomepageHeader />
      <main>
        <section className={styles.features}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <Heading as="h2">Key Features of DHIS2 Audit Vision</Heading>
              <p>
                Powerful capabilities that make DHIS2 Audit Vision an essential
                tool for accountable DHIS2 implementations.
              </p>
            </div>
            <div className="row">
              {features.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
