import React from "react";
import {
  CommentContainerStyled,
  CommentContentSyled,
  CommentInputStyled,
  CommentNameStyled,
  CommentSectionStyled,
  CommentSendContainerStyled,
  CommentSendIconStyled,
  DateSpanStyled,
  NameAndCommentContainerStyled,
  ReloadCommentsIconStyled,
} from "./CommentsStyled";
import { DateContainerStyled, IconStyled } from "../Posts/PostsStyled";

const Comments = () => {
  return (
    <CommentSectionStyled>
      <CommentContainerStyled>
        <IconStyled>F</IconStyled>
        <NameAndCommentContainerStyled>
          <CommentNameStyled>
            Frias777 | <DateSpanStyled>22/4/2026 , 00:51am</DateSpanStyled>
          </CommentNameStyled>
          <CommentContentSyled>
            Hola alto comentario soy ahora.
          </CommentContentSyled>
        </NameAndCommentContainerStyled>
      </CommentContainerStyled>
      <CommentSendContainerStyled>
        <ReloadCommentsIconStyled></ReloadCommentsIconStyled>
        <CommentInputStyled placeholder="Escribe un comentario..."></CommentInputStyled>
        <CommentSendIconStyled></CommentSendIconStyled>
      </CommentSendContainerStyled>
    </CommentSectionStyled>
  );
};

export default Comments;
