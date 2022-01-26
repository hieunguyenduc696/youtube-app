import { React, useContext } from "react";
import { useParams } from "react-router-dom";

import { DrawerContext } from "../../shared/contexts/sidebar-context";
import { useForm } from "../../shared/hooks/form-hook";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/utils/validators";
import "./UpdateVideo.css";

const DUMMY_VIDEOS = [
  {
    id: "v1",
    image:
      "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
    title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
    description:
      "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
    author: "RDHDComps",
    views: 4.7,
    createdAt: "8 months ago",
    videoId: "0gdh5QJ83fY",
    like: 626,
  },
  {
    id: "v2",
    image:
      "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
    title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
    description:
      "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
    author: "RDHDComps",
    views: 4.7,
    createdAt: "8 months ago",
    videoId: "uZfcxvrsL28",
    like: 626,
  },
  {
    id: "v3",
    image:
      "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
    title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
    description:
      "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
    author: "RDHDComps",
    views: 4.7,
    createdAt: "8 months ago",
    videoId: "uZfcxvrsL28",
    like: 626,
  },
  {
    id: "v4",
    image:
      "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
    title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
    description:
      "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
    author: "RDHDComps",
    views: 4.7,
    createdAt: "8 months ago",
    videoId: "uZfcxvrsL28",
    like: 626,
  },
  {
    id: "v5",
    image:
      "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
    title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
    description:
      "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
    author: "RDHDComps",
    views: 4.7,
    createdAt: "8 months ago",
    videoId: "uZfcxvrsL28",
    like: 626,
  },
  {
    id: "v6",
    image:
      "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
    title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
    description:
      "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
    author: "RDHDComps",
    views: 4.7,
    createdAt: "8 months ago",
    videoId: "uZfcxvrsL28",
    like: 626,
  },
  {
    id: "v7",
    image:
      "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
    title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
    description:
      "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
    author: "RDHDComps",
    views: 4.7,
    createdAt: "8 months ago",
    videoId: "uZfcxvrsL28",
    like: 626,
  },
  {
    id: "v8",
    image:
      "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
    title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
    description:
      "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
    author: "RDHDComps",
    views: 4.7,
    createdAt: "8 months ago",
    videoId: "uZfcxvrsL28",
    like: 626,
  },
  {
    id: "v9",
    image:
      "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
    title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
    description:
      "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
    author: "RDHDComps",
    views: 4.7,
    createdAt: "8 months ago",
    videoId: "uZfcxvrsL28",
    like: 626,
  },
  {
    id: "v10",
    image:
      "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
    title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
    description:
      "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
    author: "RDHDComps",
    views: 4.7,
    createdAt: "8 months ago",
    videoId: "uZfcxvrsL28",
    like: 626,
  },
  {
    id: "v11",
    image:
      "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
    title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
    description:
      "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
    author: "RDHDComps",
    views: 4.7,
    createdAt: "8 months ago",
    videoId: "uZfcxvrsL28",
    like: 626,
  },
  {
    id: "v12",
    image:
      "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
    title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
    description:
      "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
    author: "RDHDComps",
    views: 4.7,
    createdAt: "8 months ago",
    videoId: "uZfcxvrsL28",
    like: 626,
  },
  {
    id: "v13",
    image:
      "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
    title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
    description:
      "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
    author: "RDHDComps",
    views: 4.7,
    createdAt: "8 months ago",
    videoId: "uZfcxvrsL28",
    like: 626,
  },
  {
    id: "v14",
    image:
      "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
    title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
    description:
      "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
    author: "RDHDComps",
    views: 4.7,
    createdAt: "8 months ago",
    videoId: "uZfcxvrsL28",
    like: 626,
  },
  {
    id: "v15",
    image:
      "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
    title:
      "Neymar Jr & Ronaldinho Most Creative & Smart Plays, Neymar Jr & Ronaldinho Most Creative & Smart Plays, Neymar Jr & Ronaldinho Most Creative & Smart Plays, Neymar Jr & Ronaldinho Most Creative & Smart Plays",
    author: "RDHDComps",
    views: 4.7,
    createdAt: "8 months ago",
    videoId: "uZfcxvrsL28",
    like: 626,
  },
];
const UpdateVideo = () => {
  const drawerCtx = useContext(DrawerContext);
  const updateVideoClasses = drawerCtx.drawerIsOpen
    ? "update-video-mini"
    : "update-video";

  const videoId = useParams().vid;
  const identifiedVideo = DUMMY_VIDEOS.find((v) => v.id === videoId);

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: identifiedVideo.title,
        isValid: true,
      },
      description: {
        value: identifiedVideo.description,
        isValid: true,
      },
    },
    true
  );
  const videoUpdateSubmitHandler = (event) => {
    event.preventDefault()
    console.log(formState.inputs)
  }
  return (
    <div className={updateVideoClasses}>
      <form className="update-video-form" onSubmit={videoUpdateSubmitHandler}>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          value={formState.inputs.title.value}
          valid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (min 5 characters)."
          onInput={inputHandler}
          value={formState.inputs.description.value}
          valid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE VIDEO
        </Button>
      </form>
    </div>
  );
};

export default UpdateVideo;
