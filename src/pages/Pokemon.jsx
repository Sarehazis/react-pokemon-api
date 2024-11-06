import { useEffect, useState } from "react";

export default function Pokemon() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=100"
        );
        const data = await response.json();

        const pokemonDatas = await Promise.all(
          data.results.map(async (poke) => {
            const pokeResponse = await fetch(poke.url);
            return pokeResponse.json();
          })
        );

        setPokemon(pokemonDatas);
        setLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleViewDetails = (poke) => {
    setSelectedPokemon(poke);
  };

  const handleBackToList = () => {
    setSelectedPokemon(null);
  };

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-red-500 text-center text-xl">
        Error: {error.message}
      </div>
    );
  }

  if (selectedPokemon) {
    return (
      //   <div className="container mx-auto p-4">
      //     <button className="btn btn-secondary mb-4" onClick={handleBackToList}>
      //       Back to List
      //     </button>
      //     <div className="card bg-base-200 shadow-xl">
      //       <figure>
      //         <img
      //           src={selectedPokemon.sprites.front_default}
      //           alt={selectedPokemon.name}
      //           className="w-32 h-32 mx-auto my-2"
      //         />
      //       </figure>
      //       <div className="card-body">
      //         <h2 className="card-title">
      //           {selectedPokemon.name.charAt(0).toUpperCase() +
      //             selectedPokemon.name.slice(1)}
      //         </h2>
      //         <p>Height: {selectedPokemon.height}</p>
      //         <p>Weight: {selectedPokemon.weight}</p>
      //         <p>Base Experience: {selectedPokemon.base_experience}</p>
      //       </div>
      //     </div>
      //   </div>
      <div className="container mx auto p-4 flex justify-center items-center min-h-screen">
        <button
          className="btn mb-4 absolute left-10 top-20"
          onClick={handleBackToList}
        >
          Back To List
        </button>
        <div className="card bg-base-200 w-96 shadow-xl justify-center items-center">
          <h1 className="card-title pt-4">Pokemon Details</h1>
          <figure className="px-10 pt-10">
            <img
              style={{ width: "300px", height: "300px" }}
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
              className="rounded-xl"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-bold text-lg ">
              {selectedPokemon.name.charAt(0).toUpperCase() +
                selectedPokemon.name.slice(1)}
            </h2>
            <div className="flex justify-center items-center gap-4">
              <p>Height: {selectedPokemon.height}</p>
              <p>Height: {selectedPokemon.weight}</p>
            </div>
            <div className="flex justify-center items-center">
              <p>Base Experience: {selectedPokemon.base_experience}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Pokémon List</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemon.map((poke) => (
          <div key={poke.name} className="card bg-base-200 shadow-xl">
            <figure>
              <img
                src={poke.sprites.front_default}
                alt={poke.name}
                className="w-32 h-32 mx-auto my-2"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
              </h2>
              <button
                className="btn btn-primary"
                onClick={() => handleViewDetails(poke)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
