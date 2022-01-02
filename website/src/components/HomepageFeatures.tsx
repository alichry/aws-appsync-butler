import React from 'react';
import clsx from 'clsx';
import styles from './HomepageFeatures.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Intuitive autoloading',
    //image: '/img/undraw_docusaurus_mountain.svg',
    image: '',
    description: (
      <>
        AppSync Butler supplies your stack's AppSync API construct
        with resolvers and functions loaded from disk. 
      </>
    ),
  },
  {
    title: 'Named variables',
    //image: '/img/undraw_docusaurus_tree.svg',
    image: '',
    description: (
      <>
        Variables referenced in your VTL files will be replaced
        by their defined values. 
      </>
    ),
  },
  {
    title: 'Associate Data Sources',
    //image: '/img/undraw_docusaurus_react.svg',
    image: '',
    description: (
      <>
        Specify data sources directly from 
        request mapping templates or rely on the configured default data source.
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      { image ? (
        <div className="text--center">
          <img className={styles.featureSvg} alt={title} src={image} />
        </div>
      ) : null}
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
