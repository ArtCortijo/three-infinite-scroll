"use client";

import {
	PerspectiveCamera,
	Preload,
	Scroll,
	ScrollControls,
} from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import Slides from "./Slides";
import TextSlides from "./TextSlides";

const Hero = () => {
	return (
		<Canvas gl={{ antialias: false }} dpr={[1, 1.5]}>
			<Suspense fallback={null}>
				<ScrollControls infinite horizontal pages={3} distance={1}>
					<Scroll>
						<Slides />
					</Scroll>
					<Scroll html>
						<TextSlides />
					</Scroll>
				</ScrollControls>
				<Preload />
			</Suspense>
		</Canvas>
	);
};

export default Hero;
