import { useState } from "react";
import { MOCK_DATA } from "./MOCK_DATA.js";

const ChangeListOrderAdvanced = () => {
  const [pokemonData, setPokemonData] = useState(MOCK_DATA);
  // 기존 배열을 저장할 새로운 state를 제작한다.
  const [prevPokemonData, setPrevPokemonData] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  // TODO '위로' 버튼을 눌렀을 때, 실행되는 로직을 작성합니다. 첫 번째 아이템은 위로 이동 할 수 없음을 기억해주세요!
  const moveItemUp = (selectedIndex) => {
    // 첫 번째 아이템일 경우 return을 통해 아무 코드도 실행할 수 없게 한다.
    if (selectedIndex === 0) {
      return;
    }
    // 선택된 아이템과 바로 전 아이템을 찾아서 새로운 배열로 만들고, 해당 배열을 reverse한다.
    const filteredPokemons = pokemonData
      .filter((pokemon, index) => {
        return selectedIndex === index || selectedIndex - 1 === index;
      })
      .reverse();
    // 전체 배열을 map 하여, 직전 인덱스에는 필터링한 배열의 첫번째 요소(선택된 아이템)를, 선택된 인덱스에는 두번째 요소(직전 아이템)을 넣는다.
    // 해당 두 경우가 아닐 경우에는 그대로 return 한다.
    // 해당 배열을 pokemonData에 적용한다.
    setPokemonData(
      pokemonData.map((pokemon, index) => {
        if (index === selectedIndex - 1) {
          return filteredPokemons[0];
        } else if (index === selectedIndex) {
          return filteredPokemons[1];
        }
        return pokemon;
      })
    );
  };

  // TODO '아래' 버튼을 눌렀을 때, 실행되는 로직을 작성합니다. 마지막 아이템은 아래로 이동 할 수 없음을 기억해주세요!
  const moveItemDown = (selectedIndex) => {
    // 마지막 아이템일 경우 return을 통해 아무 코드도 실행할 수 없게 한다.
    if (selectedIndex === pokemonData.length - 1) {
      return;
    }
    // 선택된 아이템과 바로 후 아이템을 찾아서 새로운 배열로 만들고, 해당 배열을 reverse한다.
    const filteredPokemons = pokemonData
      .filter((pokemon, index) => {
        return selectedIndex === index || selectedIndex + 1 === index;
      })
      .reverse();
    // 전체 배열을 map 하여, 선택된 인덱스에는 필터링한 배열의 첫번째 요소(직후 아이템)를, 직후 인덱스에는 두번째 요소(선택된 아이템)을 넣는다.
    // 해당 두 경우가 아닐 경우에는 그대로 return 한다.
    // 해당 배열을 pokemonData에 적용한다.
    setPokemonData(
      pokemonData.map((pokemon, index) => {
        if (index === selectedIndex) {
          return filteredPokemons[0];
        } else if (index === selectedIndex + 1) {
          return filteredPokemons[1];
        }
        return pokemon;
      })
    );
  };

  // TODO 변경 완료가 되었을 떄 로직을 작성해 주세요.
  const handleSubmit = () => {
    // 변경 여부 유효성 검사
    if (prevPokemonData === pokemonData) {
      alert("변경 사항이 없습니다.");
      return;
    } else {
      alert("변경이 완료되었습니다.");
    }
    // 수정 상태를 끝내기 위해 isEditMode를 false로 바꾼다.
    setIsEditMode(false);
    // prevPokemonData를 초기화한다.
    setPrevPokemonData([]);
  };

  const toggleEditMode = () => {
    if (!isEditMode) {
      // isEditMode가 아닐 경우(수정 버튼을 클릭하여 수정 상태로 변경되었을 경우) prevPokemonData에 기존 pokemonData를 넣어준다.
      setPrevPokemonData(pokemonData);
    } else {
      // isEditMode일 경우(취소 버튼을 클릭했을 경우) 수정된 부분을 다시 되돌려야 하므로 prevPokemonData에 넣었던 배열을 다시 pokemonData에 넣어준다.
      setPokemonData(prevPokemonData);
      // prevPokemonData를 초기화한다.
      setPrevPokemonData([]);
    }
    // isEditMode가 변경된다.
    setIsEditMode((prevState) => !prevState);
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
              onClick={toggleEditMode}
            >
              취소
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
