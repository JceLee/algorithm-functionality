import { useState } from "react";
import { MOCK_DATA } from "./MOCK_DATA.js";

const ChangeListOrderAdvanced = () => {
  const [pokemonData, setPokemonData] = useState(MOCK_DATA);
  const [isEditMode, setIsEditMode] = useState(false);

  // TODO '위로' 버튼을 눌렀을 때, 실행되는 로직을 작성합니다. 첫 번째 아이템은 위로 이동 할 수 없음을 기억해주세요!
  const moveItemUp = (index) => {
    if (index > 0) {
      const newPokemon = [...pokemonData];
      const item = newPokemon[index];
      newPokemon[index] = newPokemon[index - 1];
      newPokemon[index - 1] = item;
      setPokemonData(newPokemon);
    } else {
      alert("이동할 수 없습니다!");
    }
  };

  // TODO '아래' 버튼을 눌렀을 때, 실행되는 로직을 작성합니다. 마지막 아이템은 아래로 이동 할 수 없음을 기억해주세요!
  const moveItemDown = (index) => {
    if (index < 9) {
      const newPokemon = [...pokemonData];
      const item = newPokemon[index];
      newPokemon[index] = newPokemon[index + 1];
      newPokemon[index + 1] = item;
      setPokemonData(newPokemon);
    } else {
      alert("이동할 수 없습니다!");
    }
  };

  // TODO 변경 완료가 되었을 떄 로직을 작성해 주세요.
  const handleSubmit = () => {
    // 수정된 도감을 set으로 저장하기..
    const newPokemon = [...pokemonData];
    setPokemonData(newPokemon);
    alert("저장되었습니다!");
    setIsEditMode((prevState) => !prevState);
  };

  const toggleEditMode = () => {
    setIsEditMode((prevState) => !prevState);
  };

  const handleReset = () => {
    const check = confirm("초기화 하시겠습니까?");
    if (check === true) {
      setPokemonData(MOCK_DATA);
      setIsEditMode((prevState) => !prevState);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="w-full text-center py-10">리스트 순서 바꾸기</h2>
      <div className="flex gap-2 justify-end pb-4">
        {isEditMode ? (
          <>
            {/* TODO 취소가 눌렸을 때 단순히, toggleEdit 을 불러주기 싫을 수도 있을 것 같아요. 마음대로 리팩토링 하셔도 됩니다. */}
            <button
              className="bg-state-error h-10 p-2 rounded text-[#ffffff] font-bold"
              onClick={handleReset}
            >
              처음으로
            </button>
            {/* TODO 함수에 매개변수로 넣어주고 싶은게 있으시면 추가 시키셔도 됩니다. */}
            <button
              className="bg-section h-10 p-2 rounded text-[#ffffff] font-bold"
              onClick={() => {
                handleSubmit();
              }}
            >
              완료
            </button>
          </>
        ) : (
          <button
            className="bg-brand h-10 p-2 rounded text-[#ffffff] font-bold"
            onClick={toggleEditMode}
          >
            수정
          </button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {/* TODO Index 도 필요하다면, 수정해주세요 */}
        {pokemonData.map((pokemon, index) => (
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
            {isEditMode ? (
              <div className="flex gap-5 items-center">
                {/* TODO moveItemUp 함수에 매개변수로 넣어주고 싶은게 있으시면 추가 시키셔도 됩니다. */}
                <button
                  className="bg-brand h-10 p-2 rounded text-[#ffffff] font-bold"
                  onClick={() => moveItemUp(index)}
                >
                  위로
                </button>
                {/* TODO moveItemDown 함수에 매개변수로 넣어주고 싶은게 있으시면 추가 시키셔도 됩니다. */}
                <button
                  className="bg-state-warning h-10 p-2 rounded text-[#ffffff] font-bold"
                  onClick={() => moveItemDown(index)}
                >
                  아래로
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangeListOrderAdvanced;
