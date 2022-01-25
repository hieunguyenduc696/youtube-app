import VideoList from "../components/Videos/VideoList";

const Videos = () => {
  const DUMMY_VIDEOS = [
    {
      id: 'v1',
      image: 'https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw',
      title: 'Neymar Jr & Ronaldinho Most Creative & Smart Plays',
      author: 'RDHDComps',
      views: 4.7,
      createdAt: '8 months ago'
    },
    {
      id: 'v2',
      image: 'https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw',
      title: 'Neymar Jr & Ronaldinho Most Creative & Smart Plays',
      author: 'RDHDComps',
      views: 4.7,
      createdAt: '8 months ago'
    },
    {
      id: 'v3',
      image: 'https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw',
      title: 'Neymar Jr & Ronaldinho Most Creative & Smart Plays',
      author: 'RDHDComps',
      views: 4.7,
      createdAt: '8 months ago'
    },
    {
      id: 'v4',
      image: 'https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw',
      title: 'Neymar Jr & Ronaldinho Most Creative & Smart Plays',
      author: 'RDHDComps',
      views: 4.7,
      createdAt: '8 months ago'
    },
    {
      id: 'v5',
      image: 'https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw',
      title: 'Neymar Jr & Ronaldinho Most Creative & Smart Plays',
      author: 'RDHDComps',
      views: 4.7,
      createdAt: '8 months ago'
    },
    {
      id: 'v6',
      image: 'https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw',
      title: 'Neymar Jr & Ronaldinho Most Creative & Smart Plays',
      author: 'RDHDComps',
      views: 4.7,
      createdAt: '8 months ago'
    },
    {
      id: 'v7',
      image: 'https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw',
      title: 'Neymar Jr & Ronaldinho Most Creative & Smart Plays',
      author: 'RDHDComps',
      views: 4.7,
      createdAt: '8 months ago'
    },
    {
      id: 'v8',
      image: 'https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw',
      title: 'Neymar Jr & Ronaldinho Most Creative & Smart Plays',
      author: 'RDHDComps',
      views: 4.7,
      createdAt: '8 months ago'
    },
    {
      id: 'v9',
      image: 'https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw',
      title: 'Neymar Jr & Ronaldinho Most Creative & Smart Plays',
      author: 'RDHDComps',
      views: 4.7,
      createdAt: '8 months ago'
    },
    {
      id: 'v10',
      image: 'https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw',
      title: 'Neymar Jr & Ronaldinho Most Creative & Smart Plays',
      author: 'RDHDComps',
      views: 4.7,
      createdAt: '8 months ago'
    },
    {
      id: 'v11',
      image: 'https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw',
      title: 'Neymar Jr & Ronaldinho Most Creative & Smart Plays',
      author: 'RDHDComps',
      views: 4.7,
      createdAt: '8 months ago'
    },
    {
      id: 'v12',
      image: 'https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw',
      title: 'Neymar Jr & Ronaldinho Most Creative & Smart Plays',
      author: 'RDHDComps',
      views: 4.7,
      createdAt: '8 months ago'
    },
    {
      id: 'v13',
      image: 'https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw',
      title: 'Neymar Jr & Ronaldinho Most Creative & Smart Plays',
      author: 'RDHDComps',
      views: 4.7,
      createdAt: '8 months ago'
    },
    {
      id: 'v14',
      image: 'https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw',
      title: 'Neymar Jr & Ronaldinho Most Creative & Smart Plays',
      author: 'RDHDComps',
      views: 4.7,
      createdAt: '8 months ago'
    },
    {
      id: 'v15',
      image: 'https://i.ytimg.com/vi/uZfcxvrsL28/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCGh7xxQbMgq8h-39aXVLVjDym0Vw',
      title: 'Neymar Jr & Ronaldinho Most Creative & Smart Plays',
      author: 'RDHDComps',
      views: 4.7,
      createdAt: '8 months ago'
    },
  ]

  return <div>
    <VideoList videos={DUMMY_VIDEOS} />
  </div>
};

export default Videos;
