import { Header } from "app/(lib)/components/Header";

export const PageLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <div
      className={`
        absolute left-0 right-0 top-2/3 print:top-0
        mx-auto px-8
        font-serif max-w-prose
        flex flex-col gap-2
      `}
    >
      <Header />
      {children}
    </div>
  );
};
