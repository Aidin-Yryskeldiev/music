import { useState, useRef, useEffect } from "react";
import { Box, Typography, IconButton, Slider, Paper } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import musicFile1 from "../assets/KorgimKeledi.mp3";
import musicFile2 from "../assets/Qarangy.mp3";
import musicFile3 from "../assets/Weeknd.mp3";
import musicFile4 from "../assets/Hallelujah.mp3";
import musicFile5 from "../assets/HeatWaves.mp3";
import Mona from "../assets/Mona.jpeg";
import Qarangy from "../assets/Qarangy.jpg";
import NewSongImage1 from "../assets/Weeknd.jpg";
import NewSongImage2 from "../assets/Pentatonix.jpeg";
import NewSongImage3 from "../assets/GlassAnimals.png";

const Music = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [currentTrack, setCurrentTrack] = useState(musicFile1);
	const [currentTrackName, setCurrentTrackName] = useState("Korgim Keledi");
	const [currentArtist, setCurrentArtist] = useState("Mona Songz");
	const [currentArtistImage, setCurrentArtistImage] = useState(Mona);
	const audioRef = useRef(null);

	const handleSliderChange = (event, newValue) => {
		if (audioRef.current) {
			audioRef.current.currentTime = newValue;
			setCurrentTime(newValue);
		}
	};

	const handlePlayPause = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	const handleStop = () => {
		audioRef.current.pause();
		audioRef.current.currentTime = 0;
		setIsPlaying(false);
		setCurrentTime(0);
	};

	const handleTimeUpdate = () => {
		if (audioRef.current) {
			setCurrentTime(audioRef.current.currentTime);
		}
	};

	const handleLoadedMetadata = () => {
		if (audioRef.current) {
			setDuration(audioRef.current.duration);
		}
	};

	const handleTrackEnd = () => {
		handleNextTrack();
		if (audioRef.current) {
			audioRef.current.play();
			setIsPlaying(true);
		}
	};

	const handleNextTrack = () => {
		const tracks = [musicFile1, musicFile2, musicFile3, musicFile4, musicFile5];
		const trackNames = [
			"Korgim Keledi",
			"Qarangy",
			"Call Out My Name",
			"Hallelujah",
			"Heat Waves",
		];
		const artists = [
			"Mona Songz",
			"OST Johan",
			"The Weeknd",
			"Pentatonix",
			"Glass Animals",
		];
		const artistImages = [
			Mona,
			Qarangy,
			NewSongImage1,
			NewSongImage2,
			NewSongImage3,
		];

		const currentIndex = tracks.indexOf(currentTrack);
		const nextIndex = (currentIndex + 1) % tracks.length;

		setCurrentTrack(tracks[nextIndex]);
		setCurrentTrackName(trackNames[nextIndex]);
		setCurrentArtist(artists[nextIndex]);
		setCurrentArtistImage(artistImages[nextIndex]);
		setCurrentTime(0);
		setIsPlaying(false);
	};

	const handlePreviousTrack = () => {
		const tracks = [musicFile1, musicFile2, musicFile3, musicFile4, musicFile5];
		const trackNames = [
			"Korgim Keledi",
			"Qarangy",
			"Call Out My Name",
			"Hallelujah",
			"Heat Waves",
		];
		const artists = [
			"Mona Songz",
			"OST Johan",
			"The Weeknd",
			"Pentatonix",
			"Glass Animals",
		];
		const artistImages = [
			Mona,
			Qarangy,
			NewSongImage1,
			NewSongImage2,
			NewSongImage3,
		];

		const currentIndex = tracks.indexOf(currentTrack);
		const previousIndex = (currentIndex - 1 + tracks.length) % tracks.length;

		setCurrentTrack(tracks[previousIndex]);
		setCurrentTrackName(trackNames[previousIndex]);
		setCurrentArtist(artists[previousIndex]);
		setCurrentArtistImage(artistImages[previousIndex]);
		setCurrentTime(0);
		setIsPlaying(false);
	};

	useEffect(() => {
		if (audioRef.current) {
			audioRef.current.load();
		}
	}, [currentTrack]);

	return (
		<Box
			sx={{
				width: "100%",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: "#2c2a2a",
			}}>
			<Box
				sx={{
					width: 350,
					backgroundColor: "#242222",
					borderRadius: "10px",
					padding: "20px",
					color: "#fff",
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
					textAlign: "center",
				}}>
				<Typography variant="h6" sx={{ marginBottom: 2 }}>
					Music Player
				</Typography>
				<Paper
					sx={{
						padding: "10px",
						marginBottom: "10px",
						borderRadius: "8px",
						background: "linear-gradient(45deg, #ff6b6b, #f06595)",
					}}>
					<img
						src={currentArtistImage}
						alt={currentArtist}
						style={{
							width: "100px",
							height: "100px",
							borderRadius: "50%",
							border: "4px solid #fff",
						}}
					/>
					<Typography variant="h6" sx={{ marginTop: 1 }}>
						{currentArtist}
					</Typography>
					<Typography variant="body1" sx={{ marginBottom: 2 }}>
						{currentTrackName}
					</Typography>
				</Paper>
				<audio
					ref={audioRef}
					src={currentTrack}
					onTimeUpdate={handleTimeUpdate}
					onLoadedMetadata={handleLoadedMetadata}
					onEnded={handleTrackEnd}
				/>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						marginTop: "10px",
					}}>
					<IconButton onClick={handlePreviousTrack} sx={{ color: "#fff" }}>
						<SkipPreviousIcon />
					</IconButton>
					<IconButton
						onClick={handlePlayPause}
						sx={{
							color: "#fff",
							backgroundColor: "#ff6b6b",
							"&:hover": {
								backgroundColor: "#f06595",
							},
						}}>
						{isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
					</IconButton>
					<IconButton onClick={handleNextTrack} sx={{ color: "#fff" }}>
						<SkipNextIcon />
					</IconButton>
				</Box>
				<Slider
					value={currentTime}
					min={0}
					max={duration}
					onChange={handleSliderChange}
					sx={{
						width: "100%",
						marginTop: 2,
						color: "#ff6b6b",
					}}
				/>
				<Typography variant="body2" sx={{ marginTop: 1 }}>
					{Math.floor(currentTime)} / {Math.floor(duration)} sec
				</Typography>
			</Box>
		</Box>
	);
};

export default Music;
