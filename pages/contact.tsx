import type { NextPage } from "next";
import { Header } from "components/Header";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <Header />
      <main className="prose lg:prose-xl">
        <section>
          <p className="text-lg">
            Whether you&apos;re looking for someone to evaluate your current
            website&apos;s situation and help with updates or optimizations, or
            you&apos;re looking to build something completely from scratch, I
            may be interested!
          </p>
          <p className="text-lg">
            I&apos;m currently in search of my next opportunity, and I&apos;ll
            update this page when I&apos;m not. Vegan companies and companies
            looking to <b className="text-bold">do good</b> will be considered
            above all others.
          </p>
          <p className="text-lg">
            Please email{" "}
            <b className="text-bold">
              <a href="mailto:atdrago+business@gmail.com">
                atdrago+business@gmail.com
              </a>
            </b>{" "}
            for all inquiries. Thanks!
          </p>
          <p className="text-lg">✌🏻🖤</p>
        </section>
      </main>
    </div>
  );
};

export default Home;
