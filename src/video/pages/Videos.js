import VideoList from "../components/Videos/VideoList";
import MainHeader from "../../shared/components/Navigation/MainHeader";

const Videos = () => {
  const DUMMY_VIDEOS = [
    {
      id: "0gdh5QJ83fY",
      image:
        "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
      title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
      description:
        "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
      author: "RDHDComps",
      views: 4.7,
      createdAt: "8 months ago",
      likes: 626,
    },
    {
      id: "9V9I1KbJvs0",
      image:
        "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
      title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
      description:
        "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
      author: "RDHDComps",
      views: 4.7,
      createdAt: "8 months ago",
      likes: 626,
    },
    {
      id: "ubT6qNnUmQw",
      image:
        "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
      title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
      description:
        "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
      author: "RDHDComps",
      views: 4.7,
      createdAt: "8 months ago",
      likes: 626,
    },
    {
      id: "gg1bWTVGODg",
      image:
        "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
      title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
      description:
        "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
      author: "RDHDComps",
      views: 4.7,
      createdAt: "8 months ago",
      likes: 626,
    },
    {
      id: "zayVTfRIqcs",
      image:
        "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
      title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
      description:
        "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
      author: "RDHDComps",
      views: 4.7,
      createdAt: "8 months ago",
      likes: 626,
    },
    {
      id: "vPYaPNUnkqA",
      image:
        "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
      title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
      description:
        "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
      author: "RDHDComps",
      views: 4.7,
      createdAt: "8 months ago",
      likes: 626,
    },
    {
      id: "eNq-Q73ilk0",
      image:
        "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
      title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
      description:
        "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
      author: "RDHDComps",
      views: 4.7,
      createdAt: "8 months ago",
      likes: 626,
    },
    {
      id: "wp1ZltRNdJs",
      image:
        "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
      title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
      description:
        "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
      author: "RDHDComps",
      views: 4.7,
      createdAt: "8 months ago",
      likes: 626,
    },
    {
      id: "6Jtn-H2mX4g",
      image:
        "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
      title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
      description:
        "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
      author: "RDHDComps",
      views: 4.7,
      createdAt: "8 months ago",
      likes: 626,
    },
    {
      id: "BqfG0wSrVYY",
      image:
        "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
      title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
      description:
        "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
      author: "RDHDComps",
      views: 4.7,
      createdAt: "8 months ago",
      likes: 626,
    },
    {
      id: "9_O6TSyYAlE",
      image:
        "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
      title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
      description:
        "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
      author: "RDHDComps",
      views: 4.7,
      createdAt: "8 months ago",
      likes: 626,
    },
    {
      id: "zMxZovxcx-o",
      image:
        "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
      title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
      description:
        "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
      author: "RDHDComps",
      views: 4.7,
      createdAt: "8 months ago",
      likes: 626,
    },
    {
      id: "lHCMnNhxDbw",
      image:
        "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
      title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
      description:
        "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
      author: "RDHDComps",
      views: 4.7,
      createdAt: "8 months ago",
      likes: 626,
    },
    {
      id: "fS03nwOIAs8",
      image:
        "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
      title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
      description:
        "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
      author: "RDHDComps",
      views: 4.7,
      createdAt: "8 months ago",
      likes: 626,
    },
    {
      id: "3_Rxnb_E_TI",
      image:
        "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
      title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
      description:
        "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
      author: "RDHDComps",
      views: 4.7,
      createdAt: "8 months ago",
      likes: 626,
    },
  ];

  return (
    <div>
      <MainHeader />

      <VideoList videos={DUMMY_VIDEOS} />
    </div>
  );
};

export default Videos;
