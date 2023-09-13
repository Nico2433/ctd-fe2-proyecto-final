import { useState } from "react";

import { Imodal } from "./types";

import { CloseButton, Subscribe } from "../../../../assets";

import {
  CardModal,
  CloseBtn,
  ModalContainer,
  ModalDescription,
  ModalImg,
  ModalTitle,
  SubscribeButton,
  TextContainer,
} from "../../styled";

const Modal = ({ news, setter }: Imodal) => {
  const { title, description, isPremium, image } = news;

  const [customDisplay] = useState(() => {
    if (isPremium) {
      return {
        title: "Suscríbete a nuestro Newsletter",
        description:
          "Suscríbete a nuestro newsletter y recibe noticias de nuestros personajes favoritos",
        image: Subscribe,
      };
    } else {
      return {
        title,
        description,
        image,
      };
    }
  });

  const onClick = () => {
    setTimeout(() => {
      alert("Suscripto!");
      setter(null);
    }, 1000);
  };

  return (
    <ModalContainer>
      <CardModal>
        <CloseBtn onClick={() => setter(null)}>
          <img src={CloseButton} alt="close-button" />
        </CloseBtn>
        <ModalImg src={customDisplay.image} alt="mr-burns-excelent" />
        <TextContainer>
          <ModalTitle>{customDisplay.title}</ModalTitle>
          <ModalDescription>{customDisplay.description}</ModalDescription>
          {isPremium && (
            <SubscribeButton onClick={onClick}>Suscríbete</SubscribeButton>
          )}
        </TextContainer>
      </CardModal>
    </ModalContainer>
  );
};

export default Modal;
