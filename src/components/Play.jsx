// import data from '../data/70s.json'
// import React, { useState, useEffect } from 'react';
// import ReactPlayer from 'react-player';

// export default function Play({ searchResults }) {
//     const [currentSong, setCurrentSong] = useState(null);
//     const [progress, setProgress] = useState(0);
//     const [title, setTitle] = useState('');
//     const [artist, setArtist] = useState('');

//     const chooseRandomSong = () => {
//         const randomIndex = Math.floor(Math.random() * data.items.length);
//         setCurrentSong(data.items[randomIndex]);
//     }

//     const handleProgress = (state) => {
//         const seconds = state.playedSeconds.toFixed(0);
//         setProgress(seconds);
//     }

//     useEffect(() => {
//         setTitle(searchResults.artist);
//         setArtist(searchResults.title);
//     }, [searchResults]);
// console.log(searchResults)
//     useEffect(() => {
//         if (currentSong) {
//             const intervalId = setInterval(() => {
//                 setProgress(prevProgress => prevProgress + 1);
//             }, 1000);
//             setTimeout(() => {
//                 clearInterval(intervalId);
//                 setProgress(0);
//                 setCurrentSong(null);
//             }, 20000);
//             return () => clearInterval(intervalId);
//         }
//     }, [currentSong]);
// console.log(currentSong)
//     return (
//         <div className='play'>
//             <button onClick={chooseRandomSong}>Jouer !</button>
//             {currentSong && (
//                 <div key={currentSong.snippet.resourceId.videoId}>
//                     <ReactPlayer
//                         url={`https://www.youtube.com/watch?v=${currentSong.snippet.resourceId.videoId}`}
//                         playing={true}
//                         onProgress={handleProgress}
//                         style={{ margin: 'auto' }}
//                         width='0'
//                         height='0'
//                     />
//                     <progress value={progress} max='20' />
//                 </div>
//             )}
//             {title} - {artist}
//         </div>
//     );
// }



import data from "../data/70s.json";
import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import  compare from "../services/Compare";

export default function Play({ searchResults }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [matchingResults, setMatchingResults] = useState(false);




  const chooseRandomSong = () => {
    const randomIndex = Math.floor(Math.random() * data.items.length);
    setCurrentSong(data.items[randomIndex]);
  };

  const handleProgress = (state) => {
    const seconds = state.playedSeconds.toFixed(0);
    setProgress(seconds);
  };

  useEffect(() => {
    setTitle(searchResults.title);
    setArtist(searchResults.artist);
  }, [searchResults]);

  useEffect(() => {
    if (currentSong) {
      const intervalId = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(intervalId);
        setProgress(0);
        setCurrentSong(null);
      }, 20000);
      return () => clearInterval(intervalId);
    }
  }, [currentSong]);

  useEffect(() => {
    const searchSongResult =`${searchResults.title} ${searchResults.artist}`

    if (searchResults && currentSong ) {
      const matchingResults = compare(searchResults, currentSong);
      setMatchingResults(matchingResults);
    }
  }, [searchResults, currentSong]);
console.log(searchResults)
console.log(currentSong)
  return (
    <div className="play">
      <button onClick={chooseRandomSong}>Jouer !</button>
      {currentSong && (
        <div key={currentSong.snippet.resourceId.videoId}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${currentSong.snippet.resourceId.videoId}`}
            playing={true}
            onProgress={handleProgress}
            style={{ margin: "auto" }}
            width="0"
            height="0"
          />
          <progress value={progress} max="20" />
        </div>
      )}
      {title} - {artist}
      {matchingResults && <p>Les résultats correspondent !</p>}
    </div>
  );
}
