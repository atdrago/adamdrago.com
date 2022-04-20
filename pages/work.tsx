import type { NextPage } from "next";
import { Header } from "components/Header";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <Header />
      <main className="prose lg:prose-xl">
        <section>
          <h2 className="text-3xl font-bold">Profile</h2>
          <p className="text-lg">
            Front end engineer with a passion for building beautiful user
            interfaces and exceptional user experiences while adhering to
            established best practices and standards, and writing
            self-documenting, clean, and reusable code.
          </p>
        </section>
        <section>
          <h2 className="text-3xl font-bold">Skills</h2>
          <p className="text-lg">JavaScript, TypeScript, CSS, Semantic HTML</p>
          <p className="text-lg">
            React, CSS frameworks (CSS modules, tailwindcss, vanilla-extract,
            Styled Components), GraphQL (via Apollo), REST (via fetch)
          </p>
          <p className="text-lg">
            Rollup, Gulp, Webpack (mostly through Create React App), custom
            Node.js build scripts
          </p>
          <p className="text-lg">Git, GitHub, VSCode</p>
        </section>

        <section>
          <h2 className="text-3xl font-bold">Experience</h2>
          <section>
            <h3 className="text-xl font-bold">
              Staff Engineer, Schedule Engine / HomeX; Remote — 1/2018–Present
            </h3>
            <ul className="text-base" role="list">
              <li>
                Plan out architecture for front end of Schedule Engine
                application.
              </li>
              <li>
                Create script used to embed Schedule Engine scheduling widget,
                exposing client-side API to client websites. Written in
                TypeScript, initially built with Webpack, then converted to
                Rollup.
              </li>
              <li>
                Create front end of white-labeled scheduling widget, with
                several theming options for changing colors, copy, and
                preferences. Written in TypeScript, built with React and
                GraphQL, and styled using Styled Components. Eventually used by
                hundreds of home service providers across the United States and
                Canada.
              </li>
              <li className="font-bold">
                Schedule Engine acquired by HomeX around 11/2018
              </li>
              <li>
                Build and maintain shared ESLint config used by front end
                projects across the company.
              </li>
              <li>
                Assist HomeX.com front end team in adding features and fixing
                bugs.
              </li>
              <li>
                Review hundreds of resumes and assist in the hiring of several
                front end engineers.
              </li>
              <li>
                Plan out architecture for new Schedule Engine Enterprise
                product.
              </li>
              <li>
                Lead and assist team in creating React component library NPM
                module, written in TypeScript, built with Rollup.
              </li>
              <li>
                Lead and assist team in building out two separate dashboards for
                Schedule Engine Enterprise.
              </li>
            </ul>
          </section>
          <section>
            <h3 className="text-xl font-bold">
              Front End Lead (Contractor), BankMobile; Remote — 5/2017–12/2017
            </h3>
            <ul className="text-base" role="list">
              <li>
                Work with front end and back end teams to fix bugs and add
                features to existing AngularJS application.
              </li>
              <li>
                Plan out and implement build system for white-labeled banking
                web application using Gulp and Sass.
              </li>
              <li>
                Lead team and help build out features for new white-labeled
                application.
              </li>
            </ul>
          </section>
          <section>
            <h3 className="text-xl font-bold">
              UI Engineer, Apple, iTunes; Cupertino, CA — 1/2016–5/2017
            </h3>
            <ul className="text-base" role="list">
              <li>
                Build and maintain JavaScript bridge between Podcasts client and
                server
              </li>
              <li>
                Build and maintain apps for tvOS (What’s New, Subscription
                Management, and others).
              </li>
              <li>
                Debug and fix issues with iOS apps (iTunes Store, App Store,
                Podcasts, iTunes U, iBooks), Desktop iTunes, and iTunes Web
                Preview.
              </li>
              <li>
                Work with localization team to create desirable user experiences
                across all locales.
              </li>
              <li>
                Work with back end teams to create APIs that match desired HI
                designs.
              </li>
            </ul>
          </section>
          <section>
            <h3 className="text-xl font-bold">
              Front End Web Developer, Apple, Online Store; Cupertino, CA —
              8/2014–1/2016
            </h3>
            <ul className="text-base" role="list">
              <li>
                Develop and maintain marketing content for the Apple Online
                Store and Apple Store iOS App.
              </li>
              <li>
                Anticipate and provide solutions for localization and
                accessibility issues.
              </li>
              <li>Migrate team&rsquo;s Sass build from Compass to Gulp. </li>
              <li>
                Write and maintain custom Gulp module to compile Apple Store App
                style sheets using Sass, greatly improving team performance, and
                allowing code modularity, shared styles, and a more consistent
                user experiences.
              </li>
            </ul>
          </section>
          <section>
            <h2 className="text-3xl font-bold">Education</h2>
            <p className="text-lg">
              Millersville University, Millersville, PA — B.S., Computer
              Science, 2010
            </p>
          </section>
        </section>
      </main>
    </div>
  );
};

export default Home;
