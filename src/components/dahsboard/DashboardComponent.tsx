import { DataItem } from "../../interfaces/DataInterface";
import { useState, useEffect } from "react";

export default function DashboardComponent() {

  const [items, setItems] = useState<DataItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [query, setQuery] = useState("")

  const filterPost = items.filter((zips) =>
    zips.zipcode.toLowerCase().includes(query.toLowerCase()) ||
    zips.state_name?.toLowerCase().includes(query.toLowerCase()))

  // Cargar los items desde la API
  const fetchItems = (page: number) => {
    const limit = 1000;
    const offset = (page - 1) * limit;
    const urlAPI = import.meta.env.VITE_API_URL

    fetch(`${urlAPI}/data?limit=${limit}&offset=${offset}`)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setItems(data.data);
        // Asumiendo que el backend te devuelve la cantidad total de items, puedes calcular el total de páginas.
        setTotalPages(Math.ceil(data.total / limit)); // Aquí se asume que tienes 100 items en total
      })
      .catch(error => console.error('Error fetching data:', error));
  };


  useEffect(() => {
    fetchItems(page)

    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
      tableContainer.scrollTop = 0; // Esto hace que el scroll se mueva hacia arriba
    }
  }, [page])
  console.log(items)

  return (
    <>
      <div className="m-auto bg-zinc-400 p-2">
        <input
          className="w-2/12 bg-zinc-500 border-zinc-400 rounded p-1 mb-1 focus:ring-zinc-500 focus:ring-2 focus:outline-none"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="bg-zinc-500 p-2 rounded-lg">
          <div className="overflow-y-auto max-h-[750px] table-container m-auto">
            <table className="min-w-full h-full table-auto">
              <thead className="bg-zinc-700 text-gray-300 sticky top-0">
                <tr>
                  <th className="px-4 py-2 text-left">ZipCode</th>
                  <th className="px-4 py-2 text-left">Hispanos</th>
                  <th className="px-4 py-2 text-left">Population</th>
                  <th className="px-4 py-2 text-left">State</th>
                  <th className="px-4 py-2 text-left">State Id</th>
                  <th className="px-4 py-2 text-left">Latitude</th>
                  <th className="px-4 py-2 text-left">Longitude</th>
                  <th className="px-4 py-2 text-left">City</th>
                </tr>
              </thead>
              <tbody>
                {filterPost.map((item, index) => (
                  <tr key={`${item.zipcode} - ${index}`} className={`${index % 2 === 0 ? "bg-zinc-500" : "bg-zinc-300"} border-b border-gray-200`}>
                    <td className="px-4 py-2">{item.zipcode}</td>
                    <td className="px-4 py-2">
                      {item.hispanos_in_us && item.population
                        ? ((item.hispanos_in_us / item.population) * 100).toFixed(2)
                        : 0}
                      %</td>
                    <td className="px-4 py-2">{item.population}</td>
                    <td className="px-4 py-2">{item.state_name}</td>
                    <td className="px-4 py-2">{item.state_id}</td>
                    <td className="px-4 py-2">{item.latitude}</td>
                    <td className="px-4 py-2">{item.longitude}</td>
                    <td className="px-4 py-2">{item.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-4">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}
            className="p-2 w-20 bg-gray-500 text-zinc-200 hover:bg-gray-600 hover:cursor-pointer rounded-lg m-2">Prev</button>
          <span className="text-zinc-300">Page {page} of {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}
            className="p-2 w-20 bg-gray-500 text-zinc-200 hover:bg-gray-600 hover:cursor-pointer rounded-lg m-2">Next</button>
        </div>
      </div>
    </>
  )
}

