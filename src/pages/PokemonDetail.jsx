import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchPokemonDetail } from "../redux/reducer";

export default function PokemonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    detail: pokemon,
    loading,
    error,
  } = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(fetchPokemonDetail(id));
  }, [dispatch, id]);

  if (loading)
    return <div className="text-center text-xl text-gray-700">Loading...</div>;
  if (error)
    return (
      <div className="text-red-500 text-center text-xl">Error: {error}</div>
    );

  return (
    <div className="container mx-auto p-4 flex justify-center">
      {pokemon && (
        <div className="card flex flex-col md:flex-row bg-white border border-gray-300 shadow-lg rounded-lg max-w-lg">
          <figure className="p-4 flex justify-center bg-gray-100 rounded-t-lg md:rounded-t-none md:rounded-l-lg">
            <img
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
              className="w-32 h-32 object-contain"
            />
          </figure>
          <div className="card-body p-6 text-gray-800">
            <h2 className="card-title text-3xl font-bold text-center mb-4">
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h2>
            <p className="mb-2">
              <strong>Number:</strong> {pokemon.id}
            </p>
            <p className="mb-2">
              <strong>Type:</strong>{" "}
              {pokemon.types.map((type) => type.type.name).join(", ")}
            </p>
            <p className="mb-2">
              <strong>Max CP:</strong> {pokemon.stats[0]?.base_stat}
            </p>
            <p className="mb-2">
              <strong>Stats:</strong>
            </p>
            <ul className="list-disc list-inside mb-4">
              {pokemon.stats.map((stat) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
            <div className="card-actions flex justify-between mt-4">
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-600 transition"
              >
                Back
              </button>
              <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                Catch {pokemon.name}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
