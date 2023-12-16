//disable eslint rules in that file
/* eslint-disable */

export function MenuItem() {
  return (
    <div className="bg-gray-200 rounded-lg p-4 text-center hover:bg-white transition-all shadow-md hover:shadow-black/25">
      <div className="text-center">
        <img
          src="/pizza.png"
          alt="pizza1"
          className="max-h-auto max-h-24 block mx-auto"
        />
      </div>
      <h4 className="font-semibold my-3 text-xl"> Peperoni Pizza</h4>
      <p className="text-gray-500 text-sm">lorem ipsum dolor sit amet</p>
      <button className="bg-primary text-white px-8 py-2 rounded-full mt-5">
        Add to card $12
      </button>
    </div>
  );
}
