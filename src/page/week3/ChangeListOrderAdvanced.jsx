import { useState } from "react";
import { MOCK_DATA } from "./MOCK_DATA.js";

const ChangeListOrderAdvanced = () => {
  const [pokemonData, setPokemonData] = useState(MOCK_DATA);
  const [isEditMode, setIsEditMode] = useState(false);

  const moveItemUp = (index) => {
    if (index === 0) return; // 첫 번째 아이템은 위로 이동할 수 없음
    const newData = [...pokemonData];
    const temp = newData[index];
    newData[index] = newData[index - 1];
    newData[index - 1] = temp;
    setPokemonData(newData);
  };

  const moveItemDown = (index) => {
    if (index === pokemonData.length - 1) return; // 마지막 아이템은 아래로 이동할 수 없음
    const newData = [...pokemonData];
    const temp = newData[index];
    newData[index] = newData[index + 1];
    newData[index + 1] = temp;
    setPokemonData(newData);
  };

  const handleSubmit = () => {
    // 변경 완료 로직 (필요에 따라 추가 작업 수행 가능)
    toggleEditMode();
  };

  const toggleEditMode = () => {
    setIsEditMode((prevState) => !prevState);
  };

  return (
    <div className="container mx-auto">
      <h2 className="w-full text-center py-10">리스트 순서 바꾸기</h2>
      <div className="flex gap-2 justify-end pb-4">
        {isEditMode ? (
          <>
            <button
              className="bg-state-error h-10 p-2 rounded text-[#ffffff] font-bold"
              onClick={toggleEditMode}
            >
              취소
            </button>
            <button
              className="bg-section h-10 p-2 rounded text-[#ffffff] font-bold"
              onClick={handleSubmit}
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
                <button
                  className="bg-brand h-10 p-2 rounded text-[#ffffff] font-bold"
                  onClick={() => moveItemUp(index)}
                >
                  위로
                </button>
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
