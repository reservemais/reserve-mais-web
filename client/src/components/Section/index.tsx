type SectionProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

const Section = ({ title, description, children }: SectionProps) => (
  <section className="mx-2 my-6 bg-gray-100 rounded-md shadow-md">
    <div className="container mx-auto">
      <div className="flex flex-col items-center">
        <h4 className="m-4 text-xl font-semibold text-primary">{title}</h4>
        {children}
        <div className="w-full p-5 mt-3 text-justify border-t rounded-b-lg border-slate-400 bg-slate-200">
          <p className="font-semibold text-center text-primary">
            {description}
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default Section;
