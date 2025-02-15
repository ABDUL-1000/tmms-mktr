import MapPage from "./[id]/page";



export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-4xl p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-center mb-4">Car Locations</h1>
        <MapPage />
      </div>
    </div>
  );
}
