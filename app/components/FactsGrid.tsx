export default function FactsGrid({
  facts,
}: {
  facts: { title: string; icon: any }[];
}) {
  return (
    <div>
      <div className="grid-cols-3 divide-y divide-x">
        {facts.map((fact, index) => {
          return (
            <div key={index} className="flex flex-col">
              {fact.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
