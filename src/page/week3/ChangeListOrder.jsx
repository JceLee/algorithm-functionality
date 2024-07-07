import { useState } from "react";
import { MOCK_DATA } from "./MOCK_DATA.js";

const ChangeListOrder = () => {
  const [pokemonData, setPokemonData] = useState(MOCK_DATA);

  // TODO '위로' 버튼을 눌렀을 때, 실행되는 로직을 작성합니다. 첫 번째 아이템은 위로 이동 할 수 없음을 기억해주세요!
  const moveItemUp = () => {};

  // TODO '아래' 버튼을 눌렀을 때, 실행되는 로직을 작성합니다. 마지막 아이템은 아래로 이동 할 수 없음을 기억해주세요!
  const moveItemDown = () => {};

  return (
    <div className="container mx-auto">
      <h2 className="w-full text-center py-10">리스트 순서 바꾸기</h2>
      <div className="flex flex-col gap-2">
        {/* TODO Index 도 필요하다면, 수정해주세요 */}
        {pokemonData.map((pokemon) => (
          <div
            key={pokemon.id}
            className="pokemon p-4 border rounded-lg flex justify-between"
          >
            <div>
              <img
                src={pokemon.sprites.front_default}
                alt={pokemon.korean_name}
              />
              <p>{pokemon.korean_name}</p>
              <p>도감번호: {pokemon.id}</p>
            </div>
            <div className="flex gap-5 items-center">
              {/* TODO moveItemUp 함수에 매개변수로 넣어주고 싶은게 있으시면 추가 시키셔도 됩니다. */}
              <button
                className="bg-brand h-10 p-2 rounded text-[#ffffff] font-bold"
                onClick={() => moveItemUp()}
              >
                위로
              </button>
              {/* TODO moveItemDown 함수에 매개변수로 넣어주고 싶은게 있으시면 추가 시키셔도 됩니다. */}
              <button
                className="bg-state-warning h-10 p-2 rounded text-[#ffffff] font-bold"
                onClick={() => moveItemDown()}
              >
                아래로
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangeListOrder;
