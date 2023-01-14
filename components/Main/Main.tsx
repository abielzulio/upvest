const Main = ({ children }: { children: React.ReactNode }) => (
  <main className="w-screen bg-white sm:px-[24px]">
    <section className="sm:max-w-[500px] relative h-screen-safe m-auto sm:border-[3px] overflow-hidden sm:border-black/10 sm:shadow-2xl bg-white sm:rounded-xl flex flex-col">
      {children}
    </section>
  </main>
)

export default Main
