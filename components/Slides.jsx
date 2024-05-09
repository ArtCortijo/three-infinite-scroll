"use client";

import { useRef } from "react";
import { ImageProps, Image as DImage, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Group, MathUtils } from "three";

function DreiImage(props) {
	const ref = useRef(null);
	const group = useRef(null);
	const data = useScroll();

	useFrame((state, delta) => {
		if (group.current && ref.current && data) {
			group.current.position.z = MathUtils.damp(
				group.current.position.z,
				Math.max(0, data.delta * 100),
				4,
				delta
			);
			ref.current.material.grayscale = MathUtils.damp(
				ref.current.material.grayscale,
				Math.max(0, 1 - data.delta * 1000),
				4,
				delta
			);
		}
	});

	return (
		<group ref={group}>
			<DImage ref={ref} {...props} />
		</group>
	);
}

function Slide({ urls = [""], ...props }) {
	const ref = useRef(null);
	const { width } = useThree((state) => state.viewport);
	const w = width < 10 ? 1.5 / 3 : 1 / 3;

	return (
		<group {...props}>
			<DreiImage position={[-width * w, 0, 0]} scale={[5, 7]} url={urls[0]} />
			<DreiImage position={[0, 0, 0]} scale={[7, 5]} url={urls[1]} />
			<DreiImage position={[width * w, 0, 0]} scale={[5, 5]} url={urls[2]} />
		</group>
	);
}

const Slides = () => {
	const { width } = useThree((state) => state.viewport);
	return (
		<>
			<Slide
				position={[0, 0, 0]}
				urls={[
					"https://images.pexels.com/photos/23285793/pexels-photo-23285793/free-photo-of-two-chairs-and-a-table-on-the-beach-with-the-ocean-in-the-background.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
					"https://images.pexels.com/photos/20193491/pexels-photo-20193491/free-photo-of-a-woman-standing-in-a-car.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
					"https://images.pexels.com/photos/14828596/pexels-photo-14828596.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				]}
			/>
			<Slide
				position={[width * 1, 0, 0]}
				urls={[
					"https://images.pexels.com/photos/16804526/pexels-photo-16804526/free-photo-of-man-doing-woodwork-outside-near-a-house.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
					"https://images.pexels.com/photos/22816072/pexels-photo-22816072/free-photo-of-a-woman-standing-next-to-a-pole-with-a-sign.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
					"https://images.pexels.com/photos/21365393/pexels-photo-21365393/free-photo-of-a-woman-sitting-on-a-couch-with-a-cat.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
				]}
			/>
			<Slide
				position={[width * 2, 0, 0]}
				urls={[
					"https://images.pexels.com/photos/2187605/pexels-photo-2187605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
					"https://images.pexels.com/photos/590478/pexels-photo-590478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
					"https://images.pexels.com/photos/1822605/pexels-photo-1822605.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
				]}
			/>
		</>
	);
};

export default Slides;
