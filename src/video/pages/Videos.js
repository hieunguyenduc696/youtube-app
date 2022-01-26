import VideoList from "../components/Videos/VideoList";

const Videos = () => {
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
      likes: 626,
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
      videoId: "0gdh5QJ83fY",
      likes: 626,
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
      videoId: "0gdh5QJ83fY",
      likes: 626,
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
      videoId: "0gdh5QJ83fY",
      likes: 626,
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
      videoId: "0gdh5QJ83fY",
      likes: 626,
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
      videoId: "0gdh5QJ83fY",
      likes: 626,
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
      videoId: "0gdh5QJ83fY",
      likes: 626,
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
      videoId: "0gdh5QJ83fY",
      likes: 626,
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
      videoId: "0gdh5QJ83fY",
      likes: 626,
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
      videoId: "0gdh5QJ83fY",
      likes: 626,
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
      videoId: "0gdh5QJ83fY",
      likes: 626,
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
      videoId: "0gdh5QJ83fY",
      likes: 626,
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
      videoId: "0gdh5QJ83fY",
      likes: 626,
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
      videoId: "0gdh5QJ83fY",
      likes: 626,
    },
    {
      id: "v15",
      image:
        "https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw",
      title: "Neymar Jr & Ronaldinho Most Creative & Smart Plays",
      description:
        "Please Subscribe if you Enjoy my videos it gives me motivation to make more videos. Turn notifications on and you will never miss a video again.",
      author: "RDHDComps",
      views: 4.7,
      createdAt: "8 months ago",
      videoId: "0gdh5QJ83fY",
      likes: 626,
    },
  ];

  return (
    <div>
      <VideoList videos={DUMMY_VIDEOS} />
    </div>
  );
};

export default Videos;
