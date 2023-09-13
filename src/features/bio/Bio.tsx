import { useState } from "react";

import { SimpsonsNames, INFO_SIMPSONS } from "./utils/constants";

import { Button } from "../../app/styled";
import {
  BioBtnContainer,
  BioContainer,
  BioDescription,
  BioImg,
  BioName,
} from "./styled";

const Bio = () => {
  const [activeBio, setActiveBio] = useState(INFO_SIMPSONS[SimpsonsNames.BART]);

  const onClick: (name: SimpsonsNames) => void = (name) =>
    setActiveBio(INFO_SIMPSONS[name]);

  const createButtons = () => {
    return Object.keys(INFO_SIMPSONS).map((name: string) => (
      <Button
        key={name}
        onClick={() => onClick(name as SimpsonsNames)}
        active={activeBio.id === name}
      >
        {name}
      </Button>
    ));
  };

  return (
    <BioContainer>
      <BioBtnContainer>{createButtons()}</BioBtnContainer>
      <div>
        <BioImg src={activeBio.image} alt={activeBio.name} />
        <div>
          <BioName>{activeBio.name}</BioName>
          <BioDescription>{activeBio.description}</BioDescription>
        </div>
      </div>
    </BioContainer>
  );
};

export default Bio;
