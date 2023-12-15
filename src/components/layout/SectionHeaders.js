export default function SectionHeaders({ subHeader, mainHeader }) {
  return (
    <>
      <div className="text-center mb-4">
        <h3 className="test-gray-600 uppercase font-semibold leading-3">
          {" "}
          {subHeader}
        </h3>
        <h2 className="text-primary font-bold text-4xl italic">{mainHeader}</h2>
      </div>
    </>
  );
}
