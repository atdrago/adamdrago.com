import type { NextPage } from "next";
import { Header } from "components/Header";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col gap-2">
      <Header />
      <main className="prose lg:prose-xl">
        <section>
          <p className="text-lg">
            Please email me at{" "}
            <b className="text-bold">
              <a href="mailto:atdrago+business@gmail.com">
                atdrago+business@gmail.com
              </a>
            </b>{" "}
            with any questions or inquiries. Thanks!
          </p>
          <p className="text-lg">✌🏻 🖤</p>
        </section>
      </main>
    </div>
  );
};

export default Home;
