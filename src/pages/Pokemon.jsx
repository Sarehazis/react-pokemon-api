import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonData } from "../redux/reducer";
import { Link } from "react-router-dom";

export default function Pokemon() {
  const dispatch = useDispatch();
  const {
    data: pokemon,
    loading,
    error,
  } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemonData());
  }, [dispatch]);

  if (loading)
    return <div className="text-center text-xl text-white">Loading...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center text-xl">Error: {error}</div>
    );

  return (
    <div className="container mx-auto p-8 bg-gradient-to-b from-gray-900 to-black min-h-screen text-white">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-white drop-shadow-lg">
        Pokémon Collection
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {pokemon.map((poke) => (
          <div
            key={poke.name}
            className="card shadow-lg transform transition duration-300 ease-in-out hover:scale-105 bg-gray-800 rounded-xl overflow-hidden hover:shadow-2xl"
          >
            <figure className="p-6 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full mx-auto -mt-10 w-32 h-32 flex items-center justify-center">
              <img
                src={poke.sprites.front_default}
                alt={poke.name}
                className="w-24 h-24"
              />
            </figure>
            <div className="card-body p-6 text-center">
              <h2 className="card-title text-white text-2xl font-semibold mb-4 capitalize">
                {poke.name}
              </h2>
              <Link
                to={`/pokemon/${poke.id}`}
                className="btn inline-block border-none bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-200"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
